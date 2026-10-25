/* Lector de tarjetas: Arduino por USB (Web Serial, Chrome o Edge).
   No toca el DOM. Se comunica con el resto mediante callbacks:
     alUid(uid)        -> llegó una tarjeta
     alEstado(estado)  -> { conectado }
     alMensaje(texto)  -> aviso para el maestro
   Protocolo (115200 baudios): la placa envía líneas "UID:04A1B2C3"; el juego responde "OK" o "NO". */

const Lector = (() => {
  const s = { puerto:null, lector:null, cerrando:false, ultimoUID:'', ultimoTiempo:0 };
  const cb = { alUid(){}, alEstado(){}, alMensaje(){} };
  const soportaUSB = 'serial' in navigator;

  const notificar = () => cb.alEstado({ conectado: !!s.puerto });

  /* ---------- Entrada de tarjetas ---------- */
  function emitirUid(crudo){
    const uid = Util.normUID(crudo);
    if(!uid) return;
    const ahora = performance.now();
    if(uid === s.ultimoUID && ahora - s.ultimoTiempo < 900) return;   // evita lecturas repetidas
    s.ultimoUID = uid; s.ultimoTiempo = ahora;
    cb.alUid(uid);
  }

  function procesarLinea(l){
    const m = /^UID:\s*([0-9A-Za-z]+)/.exec(l);
    if(m) emitirUid(m[1]);
  }

  /* ---------- Conexión ---------- */
  async function abrirPuerto(p){
    if(s.puerto) return;
    try{ await p.open({ baudRate:115200 }); }
    catch(e){ cb.alMensaje('No se pudo abrir el puerto: ' + e.message + ' (¿lo está usando el Monitor Serie de Arduino?)'); return; }
    s.puerto = p; s.cerrando = false;
    notificar(); cb.alMensaje('Lector conectado.');
    leerPuerto(p);
  }

  async function leerPuerto(p){
    const dec = new TextDecoder();
    let buf = '';
    while(p.readable && !s.cerrando){
      const r = p.readable.getReader();
      s.lector = r;
      try{
        for(;;){
          const { value, done } = await r.read();
          if(done) break;
          buf += dec.decode(value, { stream:true });
          let i;
          while((i = buf.search(/[\r\n]/)) >= 0){
            const linea = buf.slice(0, i).trim();
            buf = buf.slice(i + 1);
            if(linea) procesarLinea(linea);
          }
        }
      }catch{ /* error de lectura; si es fatal, p.readable queda en null */ }
      finally{ r.releaseLock(); }
    }
    try{ await p.close(); }catch{}
    s.puerto = null; s.lector = null;
    notificar();
  }

  async function conectarUSB(){
    try{ await abrirPuerto(await navigator.serial.requestPort()); }
    catch(e){ if(e.name !== 'NotFoundError') cb.alMensaje('No se pudo conectar: ' + e.message); }
  }

  async function desconectar(){
    if(!s.puerto) return;
    s.cerrando = true;
    try{ await s.lector?.cancel(); }catch{}
  }

  /* Envía "OK" o "NO" a la placa (enciende el LED verde o rojo). */
  async function enviar(texto){
    const p = s.puerto;
    if(!p || !p.writable) return;
    let w;
    try{ w = p.writable.getWriter(); await w.write(new TextEncoder().encode(texto + '\n')); }
    catch{} finally{ if(w) w.releaseLock(); }
  }

  /* Al abrir la página: reconecta al puerto que el navegador ya autorizó. */
  function reconectarGuardado(){
    if(soportaUSB) navigator.serial.getPorts().then(ps => { if(ps[0]) abrirPuerto(ps[0]); }).catch(() => {});
  }

  function iniciar(callbacks){
    Object.assign(cb, callbacks);
    if(soportaUSB) navigator.serial.addEventListener('connect', e => abrirPuerto(e.target));
  }

  return { iniciar, reconectarGuardado, conectarUSB, desconectar, enviar, soportaUSB };
})();
