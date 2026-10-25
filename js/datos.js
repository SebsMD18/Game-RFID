const ANIMALES = [
  { id:'leon', nombre:'León', emoji:'🦁', art:'el', color:'#FFC83D', datos:[
    'El rugido del león se puede escuchar a más de 8 kilómetros de distancia.',
    'Los leones duermen muchísimo: ¡hasta 20 horas al día!',
    'Los leones viven en familias que se llaman manadas.' ]},

  { id:'elefante', nombre:'Elefante', emoji:'🐘', art:'el', color:'#BCD0EE', datos:[
    'El elefante es el animal más grande que vive en la tierra.',
    'Los elefantes usan su trompa para oler, beber, agarrar cosas y hasta para saludarse.',
    'Una cría de elefante pesa alrededor de 100 kilos cuando nace.' ]},
  
    { id:'jirafa', nombre:'Jirafa', emoji:'🦒', art:'la', color:'#FFD98A', datos:[
    'La jirafa es el animal más alto del mundo: puede medir casi 6 metros.',
    'La lengua de la jirafa mide casi 50 centímetros y es de color morado oscuro.',
    'Las jirafas tienen siete huesos en el cuello, ¡los mismos que tú!' ]},
  
    { id:'mono', nombre:'Mono', emoji:'🐒', art:'el', color:'#E8C39A', datos:[
    'Algunos monos usan la cola como una quinta mano para agarrarse de las ramas.',
    'Los monos viven en grupos y se limpian el pelo unos a otros para ser amigos.',
    'Hay monos tan pequeños que caben en la palma de tu mano.' ]},
  
    { id:'pinguino', nombre:'Pingüino', emoji:'🐧', art:'el', color:'#A5DBF6', datos:[
    'El pingüino es un ave, pero no puede volar: ¡usa sus alas para nadar!',
    'El pingüino emperador es el más grande de todos los pingüinos.',
    'Algunos papás pingüino cuidan el huevo sobre sus patas para que no se enfríe.' ]},
  
    { id:'rana', nombre:'Rana', emoji:'🐸', art:'la', color:'#B3E58F', datos:[
    'Las ranas empiezan su vida como renacuajos, que viven en el agua y tienen cola.',
    'La rana puede respirar por la piel, además de usar sus pulmones.',
    'La rana atrapa insectos con su lengua pegajosa.' ]},
  
    { id:'tortuga', nombre:'Tortuga', emoji:'🐢', art:'la', color:'#9BE0BE', datos:[
    'El caparazón de la tortuga es parte de su cuerpo: no se lo puede quitar.',
    'Algunas tortugas viven más de 100 años.',
    'Las tortugas marinas regresan a la playa donde nacieron para poner sus huevos.' ]},
  
    { id:'delfin', nombre:'Delfín', emoji:'🐬', art:'el', color:'#86CBF7', datos:[
    'El delfín no es un pez: es un mamífero y respira aire por un orificio en la cabeza.',
    'Los delfines se hablan entre ellos con silbidos y chasquidos.',
    'Cuando el delfín duerme, deja la mitad de su cerebro despierto.' ]}
];

const TARJETAS_POR_DEFECTO = {
  leon:'', elefante:'', jirafa:'', mono:'', pinguino:'', rana:'', tortuga:'', delfin:''
};

const FELICITACIONES = ['¡Muy bien!','¡Correcto!','¡Genial!','¡Eso es!','¡Lo encontraste!'];
const ANIMOS = ['¡Casi!','¡Uy, casi!','¡Sigue intentando!'];