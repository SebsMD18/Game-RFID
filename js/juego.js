/* Flujo del juego: pista, acierto, error amable y pantalla final. */

const Juego = (() => {
  const est = { pantalla:'inicio', ronda:[], idx:0, hechos:[], objetivo:null };
  const pantallas = $$('.pantalla');
  let tOops = 0;

  /*Pantallas*/
  function irA(nombre){
    est.pantalla = nombre;
    pantallas.forEach(p => p.classList.toggle('activa', p.dataset.p === nombre));
    const f = $('.pantalla.activa [data-foco]');
    if(f) f.focus({ preventScroll:true });
  }

  function dibujarEstrellas(){
    const cont = $('#estrellas');
    cont.textContent = '';
    for(let i = 0; i < est.ronda.length; i++){
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      s.setAttribute('viewBox', '0 0 24 24');
      s.setAttribute('class', 'estrella' + (i < est.hechos.length ? ' on' : ''));
      s.innerHTML = '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>';
      cont.append(s);
    }
  }

  /*Juego actual*/
  function iniciar(){
    const asignados = OBJETOS.filter(o => Util.normUID(Ajustes.tarjetas[o.id]));
    const pool = asignados.length ? asignados : OBJETOS;   // sin tarjetas asignadas: modo demostración
    const n = Math.max(1, Math.min(Number(Ajustes.opciones.rondas) || 5, pool.length));
    est.ronda = Util.mezclar(pool).slice(0, n);
    est.idx = 0; est.hechos = [];
    mostrarPista();
    irA('juego');
  }

  function mostrarPista(){
    const o = est.ronda[est.idx];
    est.objetivo = o;
    $('#pregunta').textContent = o.pregunta;
    $('#anuncio').textContent = o.pregunta;
    const sol = $('#sol');
    sol.style.setProperty('--sol-color', o.color);
    sol.classList.remove('mecer');          // si no, «mecer» (error anterior) tapa la animación de entrada
    Util.reiniciarAnimacion(sol, 'entra');
    dibujarEstrellas();
    Sonido.hablar(o.pregunta);
  }

  function ocultarOops(){
    clearTimeout(tOops);
    $('#oops').classList.remove('visible');
  }

  function acierto(){
    const o = est.objetivo;
    est.hechos.push(o);
    ocultarOops();
    const titulo = Util.azar(FELICITACIONES);
    $('#okTitulo').textContent = titulo;
    $('#okIcono').textContent = o.emoji;
    $('#okSol').style.setProperty('--sol-color', o.color);
    $('#okNombre').textContent = o.nombre;
    $('#datoTexto').textContent = o.dato;
    const ultimo = est.hechos.length >= est.ronda.length;
    $('#btnSiguiente').firstChild.textContent = ultimo ? 'Terminar ' : 'Siguiente ';
    irA('ok');
    Util.reiniciarAnimacion($('#okIcono'), 'saltar');
    Sonido.efecto('ok'); Confeti.lanzar(); Lector.enviar('OK');
    setTimeout(() => { if(est.pantalla === 'ok') Sonido.hablar(`${titulo} ${o.nombre}. ${o.dato}`); }, 650);
  }

  /* objeto = el de la tarjeta que pasó el niño, o null si no se conoce. */
  function error(objeto){
    const titulo = Util.azar(ANIMOS);
    const texto = objeto
      ? `Esa es la tarjeta de «${objeto.nombre}». ¡Lee la pista otra vez e inténtalo de nuevo!`
      : 'No conozco esa tarjeta. ¡Prueba con otra!';
    $('#oopsEmoji').textContent = objeto ? objeto.emoji : '🤔';
    $('#oopsTitulo').textContent = titulo;
    $('#oopsTexto').textContent = texto;
    const o = $('#oops');
    o.classList.remove('visible'); void o.offsetWidth; o.classList.add('visible');
    $('#sol').classList.remove('entra');
    Util.reiniciarAnimacion($('#sol'), 'mecer');
    Sonido.efecto('no'); Lector.enviar('NO');
    Sonido.hablar(`${titulo} ${texto}`);
    clearTimeout(tOops);
    tOops = setTimeout(ocultarOops, 3600);
  }

  function siguiente(){
    Sonido.efecto('clic');
    if(est.hechos.length >= est.ronda.length){ final(); return; }
    est.idx++;
    mostrarPista();
    irA('juego');
  }

  function final(){
    const n = est.hechos.length;
    const texto = n === 1 ? 'Descubriste 1 objeto' : `Descubriste ${n} objetos`;
    $('#trofeo').textContent = est.hechos.map(o => o.emoji).join(' ');
    $('#finalTexto').textContent = texto;
    irA('final');
    Sonido.efecto('final'); Confeti.lanzar(220); setTimeout(() => Confeti.lanzar(120), 450);
    Sonido.hablar(`¡Lo lograste! ${texto}.`);
  }

  /*Entradas
  Tarjeta real, botón de modo prueba o «Probar» del panel. objeto = null si no se conoc
  */
  function jugarCon(objeto){
    if(est.pantalla !== 'juego') return;
    if(objeto && objeto.id === est.objetivo.id) acierto(); else error(objeto);
  }

  const alUid = uid => jugarCon(Ajustes.objetoDe(uid));

  function mostrarPrueba(visible){ $('#prueba').hidden = !visible; }

  function init(){
    $('#btnJugar').onclick = () => { Sonido.efecto('clic'); iniciar(); };
    $('#btnSiguiente').onclick = siguiente;
    $('#btnOtra').onclick = () => { Sonido.efecto('clic'); iniciar(); };
    $('#btnVoz').onclick = () => Sonido.hablar($('#datoTexto').textContent, true);
    $('#btnPista').onclick = () => Sonido.hablar(est.objetivo.pregunta, true);
    $('#oops').onclick = ocultarOops;

    /* Modo prueba: una tarjeta fake por objeto */
    const prueba = $('#prueba');
    OBJETOS.forEach(o => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = o.emoji; b.title = o.nombre;
      b.setAttribute('aria-label', 'Probar con la tarjeta de ' + o.nombre);
      b.onclick = () => jugarCon(o);
      prueba.append(b);
    });
  }

  return { init, jugarCon, alUid, mostrarPrueba, pantalla: () => est.pantalla };
})();
