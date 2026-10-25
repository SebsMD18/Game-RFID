/* Flujo del juego: rondas, acierto, error amable y pantalla final. */

const Juego = (() => {
  const est = { pantalla:'inicio', ronda:[], idx:0, hechos:[], objetivo:null };
  const pantallas = $$('.pantalla');
  let tOops = 0;

  /* ---------- Pantallas ---------- */
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

  /* ---------- Partida ---------- */
  function iniciar(){
    const asignados = ANIMALES.filter(a => Util.normUID(Ajustes.tarjetas[a.id]));
    const pool = asignados.length ? asignados : ANIMALES;   // sin tarjetas guardadas: modo demostración
    const n = Math.max(1, Math.min(Number(Ajustes.opciones.rondas) || 5, pool.length));
    est.ronda = Util.mezclar(pool).slice(0, n);
    est.idx = 0; est.hechos = [];
    mostrarAnimal();
    irA('juego');
  }

  function mostrarAnimal(){
    const a = est.ronda[est.idx];
    est.objetivo = a;
    $('#animal').textContent = a.emoji;
    $('#nombre').textContent = a.nombre;
    const sol = $('#sol');
    sol.style.setProperty('--sol-color', a.color);
    sol.classList.remove('mecer');          // si no, «mecer» (error anterior) tapa la animación de entrada
    Util.reiniciarAnimacion(sol, 'entra');
    dibujarEstrellas();
    const frase = 'Busca ' + Util.alAnimal(a);
    $('#anuncio').textContent = frase;
    Sonido.hablar(frase);
  }

  function ocultarOops(){
    clearTimeout(tOops);
    $('#oops').classList.remove('visible');
  }

  function acierto(){
    const a = est.objetivo;
    est.hechos.push(a);
    ocultarOops();
    const dato = Util.azar(a.datos);
    const titulo = Util.azar(FELICITACIONES);
    $('#okTitulo').textContent = titulo;
    $('#okAnimal').textContent = a.emoji;
    $('#okSol').style.setProperty('--sol-color', a.color);
    $('#okNombre').textContent = a.nombre;
    $('#datoTexto').textContent = dato;
    const ultimo = est.hechos.length >= est.ronda.length;
    $('#btnSiguiente').firstChild.textContent = ultimo ? 'Terminar ' : 'Siguiente ';
    irA('ok');
    Util.reiniciarAnimacion($('#okAnimal'), 'saltar');
    Sonido.efecto('ok'); Confeti.lanzar(); Lector.enviar('OK');
    setTimeout(() => { if(est.pantalla === 'ok') Sonido.hablar(`${titulo} ${dato}`); }, 650);
  }

  function error(animal){
    const a = est.objetivo;
    const titulo = Util.azar(ANIMOS);
    const texto = animal
      ? `Esa tarjeta es ${Util.delAnimal(animal)}. ¡Busca ${Util.alAnimal(a)}!`
      : `No conozco esa tarjeta. ¡Prueba con otra y busca ${Util.alAnimal(a)}!`;
    $('#oopsEmoji').textContent = animal ? animal.emoji : '🤔';
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
    mostrarAnimal();
    irA('juego');
  }

  function final(){
    const n = est.hechos.length;
    const texto = n === 1 ? 'Encontraste 1 animal' : `Encontraste ${n} animales`;
    $('#trofeo').textContent = est.hechos.map(a => a.emoji).join(' ');
    $('#finalTexto').textContent = texto;
    irA('final');
    Sonido.efecto('final'); Confeti.lanzar(220); setTimeout(() => Confeti.lanzar(120), 450);
    Sonido.hablar(`¡Lo lograste! ${texto}.`);
  }

  /* ---------- Entradas ---------- */
  /* Tarjeta real, botón de modo prueba o «Probar» del panel. animal = null si no se conoce. */
  function jugarCon(animal){
    if(est.pantalla !== 'juego') return;
    if(animal && animal.id === est.objetivo.id) acierto(); else error(animal);
  }

  const alUid = uid => jugarCon(Ajustes.animalDe(uid));

  function mostrarPrueba(visible){ $('#prueba').hidden = !visible; }

  function init(){
    $('#btnJugar').onclick = () => { Sonido.efecto('clic'); iniciar(); };
    $('#btnSiguiente').onclick = siguiente;
    $('#btnOtra').onclick = () => { Sonido.efecto('clic'); iniciar(); };
    $('#btnVoz').onclick = () => Sonido.hablar($('#datoTexto').textContent, true);
    $('#oops').onclick = ocultarOops;

    /* Modo prueba: una tarjeta de mentira por animal */
    const prueba = $('#prueba');
    ANIMALES.forEach(a => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = a.emoji; b.title = a.nombre;
      b.setAttribute('aria-label', 'Probar con la tarjeta de ' + a.nombre);
      b.onclick = () => jugarCon(a);
      prueba.append(b);
    });
  }

  return { init, jugarCon, alUid, mostrarPrueba, pantalla: () => est.pantalla };
})();
