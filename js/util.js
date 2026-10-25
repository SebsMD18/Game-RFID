/* Utilidades sin dependencias del juego. */

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const Util = {
  azar: a => a[Math.floor(Math.random() * a.length)],

  mezclar(a){
    const b = [...a];
    for(let i = b.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    return b;
  },

  normUID: s => String(s || '').toUpperCase().replace(/[^0-9A-Z]/g, ''),

  alAnimal:  a => (a.art === 'el' ? 'al '  : 'a la ')  + a.nombre.toLowerCase(),
  delAnimal: a => (a.art === 'el' ? 'del ' : 'de la ') + a.nombre.toLowerCase(),

  reducirMovimiento: matchMedia('(prefers-reduced-motion: reduce)').matches,

  reiniciarAnimacion(el, clase){
    el.classList.remove(clase);
    void el.offsetWidth;
    el.classList.add(clase);
  }
};
