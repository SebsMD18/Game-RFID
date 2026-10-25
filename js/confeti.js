const Confeti = (() => {
  const COLORES = ['#FFCB2E', '#FF6F4F', '#2FAE60', '#3DA5FF', '#B66DFF', '#FF8FC7'];
  const cv = $('#confeti');
  const cx = cv.getContext('2d');
  let particulas = [];
  let raf = 0;

  function ajustar(){
    const d = window.devicePixelRatio || 1;
    cv.width = innerWidth * d;
    cv.height = innerHeight * d;
    cx.setTransform(d, 0, 0, d, 0, 0);
  }

  function lanzar(n = 140){
    if(Util.reducirMovimiento) n = Math.min(n, 40);
    for(let i = 0; i < n; i++){
      particulas.push({
        x: innerWidth / 2 + (Math.random() - .5) * innerWidth * .35, y: innerHeight * .42,
        vx: (Math.random() - .5) * 15, vy: -Math.random() * 15 - 5, g: .3 + Math.random() * .12,
        w: 8 + Math.random() * 8, h: 6 + Math.random() * 8,
        r: Math.random() * 6.28, vr: (Math.random() - .5) * .35,
        c: Util.azar(COLORES), vida: 0, max: 130 + Math.random() * 90
      });
    }
    if(!raf) raf = requestAnimationFrame(paso);
  }

  function paso(){
    cx.clearRect(0, 0, innerWidth, innerHeight);
    particulas = particulas.filter(p => p.y < innerHeight + 30 && p.vida < p.max);
    for(const p of particulas){
      p.vx *= .992; p.vy += p.g; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vida++;
      cx.save();
      cx.globalAlpha = Math.min(1, (p.max - p.vida) / 30);
      cx.translate(p.x, p.y); cx.rotate(p.r);
      cx.fillStyle = p.c; cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      cx.restore();
    }
    raf = particulas.length ? requestAnimationFrame(paso) : 0;
    if(!raf) cx.clearRect(0, 0, innerWidth, innerHeight);
  }

  function iniciar(){ ajustar(); addEventListener('resize', ajustar); }

  return { iniciar, lanzar };
})();
