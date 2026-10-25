/* Voz (SpeechSynthesis) y efectos de sonido (WebAudio, sin archivos). */

const Sonido = (() => {
  let ac = null;

  function hablar(texto, forzar = false){
    const { voz } = Ajustes.opciones;
    if((!voz && !forzar) || !('speechSynthesis' in window)) return;
    try{
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(texto);
      u.lang = 'es-MX'; u.rate = .95; u.pitch = 1.1;
      speechSynthesis.speak(u);
    }catch{}
  }

  function nota(f, t, d, tipo = 'sine', v = .16){
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = tipo; o.frequency.value = f;
    g.gain.setValueAtTime(.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + .02);
    g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g); g.connect(ac.destination);
    o.start(t); o.stop(t + d + .05);
  }

  /* tipo: 'ok' | 'final' | 'no' | 'clic' */
  function efecto(tipo){
    if(!Ajustes.opciones.sonido) return;
    try{
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if(ac.state === 'suspended') ac.resume();
      const t = ac.currentTime + .02;
      if(tipo === 'ok')         [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => nota(f, t + i * .1, .28, 'triangle'));
      else if(tipo === 'final') [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5, 1318.5].forEach((f, i) => nota(f, t + i * .12, .35, 'triangle'));
      else if(tipo === 'no'){   nota(392, t, .22, 'sine', .12); nota(330, t + .2, .3, 'sine', .1); }
      else if(tipo === 'clic')  nota(660, t, .12, 'sine', .1);
    }catch{}
  }

  return { hablar, efecto };
})();
