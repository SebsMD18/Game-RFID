/* Arranque: conecta los módulos entre sí. */

Confeti.iniciar();
Juego.init();
Panel.init();

Lector.iniciar({
  alUid:     uid => { if(!Panel.alUid(uid)) Juego.alUid(uid); },
  alEstado:  e   => { Panel.mostrarEstado(e); Juego.mostrarPrueba(!e.conectado); },
  alMensaje: Panel.msg
});
Lector.reconectarGuardado();
