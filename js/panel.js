/* Panel maestro: conexión del Arduino, asignación de tarjetas y opciones. */

const Panel = (() => {
  let aprendiendo = null;     // id del animal que espera una tarjeta

  const estaAbierto = () => $('#panel').classList.contains('abierto');
  const msg = t => { $('#panelMsg').textContent = t || ''; };

  /* ---------- Lista de tarjetas ---------- */
  function construirLista(){
    const cont = $('#listaTarjetas');
    cont.textContent = '';
    ANIMALES.forEach(a => {
      const f = document.createElement('div');
      f.className = 'fila'; f.dataset.id = a.id;
      f.innerHTML =
        `<span class="f-emoji" aria-hidden="true">${a.emoji}</span>` +
        `<span class="f-nombre">${a.nombre}</span>` +
        `<button class="mini" data-acc="leer">Leer</button>` +
        `<button class="mini sec" data-acc="probar">Probar</button>` +
        `<input class="f-uid" autocomplete="off" spellcheck="false" placeholder="UID de la tarjeta" aria-label="UID de la tarjeta de ${a.nombre}">`;
      cont.append(f);
    });
  }

  function actualizarFilas(){
    $$('#listaTarjetas .fila').forEach(f => {
      const id = f.dataset.id;
      f.classList.toggle('aprende', aprendiendo === id);
      $('.f-uid', f).value = Ajustes.tarjetas[id] || '';
      $('[data-acc=leer]', f).textContent = aprendiendo === id ? 'Pasa la tarjeta…' : 'Leer';
    });
  }

  function asignar(id, uid){
    Ajustes.asignar(id, uid);
    aprendiendo = null;
    actualizarFilas();
    msg(`Tarjeta ${uid} asignada a ${ANIMALES.find(a => a.id === id).nombre}.`);
  }

  function abrir(abrir){
    const p = $('#panel');
    p.classList.toggle('abierto', abrir);
    p.inert = !abrir;
    $('#velo').hidden = !abrir;
    $('#btnPanel').setAttribute('aria-expanded', String(abrir));
    if(abrir){ actualizarFilas(); $('#btnCerrar').focus(); }
    else { aprendiendo = null; actualizarFilas(); msg(''); }
  }

  /* ---------- Conexión con el lector ---------- */
  function mostrarEstado(e){
    $('#luz').classList.toggle('on', e.conectado);
    $('#lectorEstado').textContent = e.conectado ? 'Arduino conectado por USB ✔' : 'Sin conectar';
    $('#btnConectar').hidden = e.conectado;
    $('#lectorNota').hidden = e.conectado;
    $('#btnDesconectar').hidden = !e.conectado;
  }

  /* Devuelve true si el panel usó la tarjeta (asignación o panel abierto) y el juego debe ignorarla. */
  function alUid(uid){
    $('#ultimoUID').textContent = uid;
    if(aprendiendo){ asignar(aprendiendo, uid); return true; }
    return estaAbierto();
  }

  /* ---------- Arranque ---------- */
  function iniciarConexion(){
    $('#btnDesconectar').onclick = Lector.desconectar;

    if(Lector.soportaUSB){
      $('#btnConectar').onclick = Lector.conectarUSB;
      $('#lectorNota').textContent = 'En la lista elige el puerto del Arduino (suele llamarse «Arduino Uno» o «USB-SERIAL CH340»). Cierra el Monitor Serie del IDE antes de conectar.';
    }else{
      $('#btnConectar').disabled = true;
      $('#lectorNota').textContent = 'Este navegador no puede conectarse por USB. Usa Chrome o Edge en computadora. Mientras tanto puedes probar el juego con los botones «Probar».';
    }
  }

  function iniciarOpciones(){
    const o = Ajustes.opciones;
    $('#optVoz').checked = !!o.voz;
    $('#optSonido').checked = !!o.sonido;
    $('#optRondas').value = o.rondas;
    $('#optRondas').max = ANIMALES.length;
    $('#optVoz').onchange = e => { o.voz = e.target.checked; Ajustes.guardarOpciones(); };
    $('#optSonido').onchange = e => { o.sonido = e.target.checked; Ajustes.guardarOpciones(); };
    $('#optRondas').onchange = e => {
      const v = Math.max(1, Math.min(ANIMALES.length, Number(e.target.value) || 5));
      e.target.value = v; o.rondas = v; Ajustes.guardarOpciones();
    };
  }

  function iniciarTarjetas(){
    construirLista(); actualizarFilas();

    $('#listaTarjetas').addEventListener('click', e => {
      const b = e.target.closest('[data-acc]');
      if(!b) return;
      const id = b.closest('.fila').dataset.id;
      if(b.dataset.acc === 'leer'){
        aprendiendo = (aprendiendo === id) ? null : id;
        actualizarFilas();
        msg(aprendiendo ? 'Pasa la tarjeta por el lector…' : '');
      }else{
        if(Juego.pantalla() !== 'juego'){ msg('Primero pulsa «¡Jugar!» y luego usa «Probar».'); return; }
        abrir(false);
        Juego.jugarCon(ANIMALES.find(a => a.id === id));
      }
    });

    $('#listaTarjetas').addEventListener('change', e => {
      if(!e.target.classList.contains('f-uid')) return;
      Ajustes.asignar(e.target.closest('.fila').dataset.id, e.target.value);
      actualizarFilas();
    });

    $('#btnBorrar').onclick = () => {
      if(!confirm('¿Borrar las tarjetas guardadas en este navegador?')) return;
      Ajustes.restablecerTarjetas(); actualizarFilas(); msg('Tarjetas borradas.');
    };
  }

  function init(){
    $('#btnPanel').onclick = () => abrir(true);
    $('#btnCerrar').onclick = () => abrir(false);
    $('#velo').onclick = () => abrir(false);
    addEventListener('keydown', e => { if(e.key === 'Escape') abrir(false); });
    iniciarConexion();
    iniciarOpciones();
    iniciarTarjetas();
  }

  return { init, alUid, mostrarEstado, msg };
})();
