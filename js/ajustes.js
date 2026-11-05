/* Datos guardados en el navegador: tarjetas asignadas y opciones. */

const almacen = {
  leer(k, def){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; }catch{ return def; } },
  guardar(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch{} }
};

const Ajustes = (() => {
  const guardadas = almacen.leer('animalitos.tarjetas', {});
  const tarjetas = {};
  OBJETOS.forEach(o => { tarjetas[o.id] = guardadas[o.id] || TARJETAS_POR_DEFECTO[o.id] || ''; });

  const opciones = Object.assign({ voz:true, sonido:true, rondas:5 }, almacen.leer('animalitos.opciones', {}));

  return {
    tarjetas,
    opciones,
    guardarTarjetas: () => almacen.guardar('animalitos.tarjetas', tarjetas),
    guardarOpciones: () => almacen.guardar('animalitos.opciones', opciones),

    objetoDe: uid => OBJETOS.find(o => Util.normUID(tarjetas[o.id]) === uid) || null,

    /* Asigna uid a un objeto y se lo quita a cualquier otro que lo tuviera. */
    asignar(id, uid){
      uid = Util.normUID(uid);
      for(const k in tarjetas){ if(k !== id && uid && Util.normUID(tarjetas[k]) === uid) tarjetas[k] = ''; }
      tarjetas[id] = uid;
      Ajustes.guardarTarjetas();
    },

    restablecerTarjetas(){
      OBJETOS.forEach(o => { tarjetas[o.id] = TARJETAS_POR_DEFECTO[o.id] || ''; });
      Ajustes.guardarTarjetas();
    }
  };
})();
