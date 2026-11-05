/* Contenido del juego. Cada objeto es una tarjeta RFID:
     id        identificador interno (sin espacios)
     nombre    lo que se muestra al acertar
     emoji     imagen (sticker) que se muestra al acertar
     imagen    ruta directa al archivo de imagen
     uid       UID de la tarjeta en hexadecimal, sin espacios (lo que imprime el Arduino: "UID:296FD50F")
     pregunta  la pista que ve el niño
     dato      dato curioso al acertar
*/

const OBJETOS = [
  { id:'telescopio', nombre:'Telescopio', emoji:'<img src="img/telescopio.png" alt="Telescopio" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/telescopio.png', uid:'296FD50F',
    pregunta:'¿Qué instrumento se utiliza para observar estrellas, planetas y galaxias lejanas?',
    dato:'Permite viajar en el tiempo visualizando la luz de astros que tardó millones de años en llegar a nuestros ojos.' },
  { id:'cohete', nombre:'Cohete espacial', emoji:'<img src="img/cohete.png" alt="Cohete espacial" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/cohete.png', uid:'87103B12',
    pregunta:'¿Qué vehículo vence la fuerza de gravedad para explorar el espacio exterior?',
    dato:'Utiliza enormes motores de propulsión y puede alcanzar velocidades superiores a los 40,000 km/h.' },
  { id:'tierra', nombre:'Planeta Tierra', emoji:'<img src="img/tierra.png" alt="Planeta Tierra" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/tierra.png', uid:'E94F0410',
    pregunta:'¿Cuál es nuestro hogar en el Sistema Solar y el único planeta conocido con vida?',
    dato:'Está cubierto un 70% por agua y es el único del sistema solar cuyo nombre no proviene de un dios mitológico.' },
  { id:'microscopio', nombre:'Microscopio', emoji:'<img src="img/microscopio.png" alt="Microscopio" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/microscopio.png', uid:'89E5F30F',
    pregunta:'¿Qué herramienta óptica se usa para ver células y microorganismos invisibles?',
    dato:'Permite observar mundos diminutos que son miles de veces más pequeños que un grano de arena.' },
  { id:'adn', nombre:'ADN', emoji:'<img src="img/adn.png" alt="ADN" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/adn.png', uid:'379D4312',
    pregunta:'¿Qué molécula contiene la información genética de los organismos vivos?',
    dato:'Si estiraras el ADN de una sola de tus células, mediría 2 metros de largo, ¡pero cabe en una célula microscópica!' },
  { id:'atomo', nombre:'Átomo', emoji:'<img src="img/atomo.png" alt="Átomo" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/atomo.png', uid:'29405110',
    pregunta:'¿Cuál es la unidad básica de la materia compuesta por un núcleo y electrones?',
    dato:'¡Todo en el universo está hecho de átomos, pero son un 99.999999999% espacio vacío!' },
  { id:'panel-solar', nombre:'Panel solar', emoji:'<img src="img/panel-solar.png" alt="Panel solar" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/panel-solar.png', uid:'2950B10F',
    pregunta:'¿Qué tecnología convierte la luz del sol directamente en energía eléctrica?',
    dato:'No tienen piezas móviles, por lo que pueden generar electricidad silenciosamente durante décadas.' },
  { id:'iman', nombre:'Imán', emoji:'<img src="img/iman.png" alt="Imán" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/iman.png', uid:'89D50510',
    pregunta:'¿Qué objeto genera un campo invisible capaz de atraer metales como el hierro?',
    dato:'La Tierra misma funciona como un gigantesco imán con polos norte y sur.' },
  { id:'agua', nombre:'H2O o Agua', emoji:'<img src="img/agua.png" alt="H2O o Agua" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/agua.png', uid:'E9590C10',
    pregunta:'¿Qué molécula compuesta por hidrógeno y oxígeno es indispensable para la vida?',
    dato:'Es la única sustancia en la Tierra que existe naturalmente en tres estados: sólido, líquido y gaseoso.' },
  { id:'ia', nombre:'Inteligencia Artificial', emoji:'<img src="img/ia.png" alt="Inteligencia Artificial" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/ia.png', uid:'097C1110',
    pregunta:'¿Cómo se llama la simulación de procesos de inteligencia humana por sistemas computacionales?',
    dato:'Permite a las computadoras aprender a reconocer rostros y traducir idiomas casi como humanos.' },
  { id:'dron', nombre:'Dron', emoji:'<img src="img/dron.png" alt="Dron" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/dron.png', uid:'C9600310',
    pregunta:'¿Qué vehículo aéreo no tripulado se usa para fotografía, rescate y exploración?',
    dato:'Pueden volar de forma totalmente autónoma utilizando sistemas de navegación GPS y sensores.' },
  { id:'fosil', nombre:'Fósil', emoji:'<img src="img/fosil.png" alt="Fósil" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/fosil.png', uid:'E76D3F12',
    pregunta:'¿Qué restos o huellas petrificadas permiten estudiar animales y plantas de la prehistoria?',
    dato:'Algunos fósiles se han conservado intactos dentro de ámbar (resina de árbol fosilizada) durante millones de años.' },
  { id:'satelite', nombre:'Satélite', emoji:'<img src="img/satelite.png" alt="Satélite" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/satelite.png', uid:'E984F30F',
    pregunta:'¿Qué dispositivo en órbita se usa para telecomunicaciones, GPS y ciencia?',
    dato:'Hay miles de satélites orbitando nuestro planeta para conectar llamadas y transmitir internet al instante.' },
  { id:'rover', nombre:'Rover marciano', emoji:'<img src="img/rover.png" alt="Rover marciano" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/rover.png', uid:'19EDF90F',
    pregunta:'¿Qué robot explorador con ruedas analiza el suelo y el clima de Marte?',
    dato:'Se comunican con la Tierra con retrasos de hasta 20 minutos debido a la inmensa distancia.' },
  { id:'vacuna', nombre:'Vacuna', emoji:'<img src="img/vacuna.png" alt="Vacuna" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/vacuna.png', uid:'A70EF006',
    pregunta:'¿Qué preparación biológica entrena al sistema inmune para defenderse de enfermedades?',
    dato:'El nombre viene de "vacas", ya que los primeros experimentos científicos usaban viruela bovina.' },
  { id:'agujero-negro', nombre:'Agujero negro', emoji:'<img src="img/agujero-negro.png" alt="Agujero negro" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/agujero-negro.png', uid:'57003E12',
    pregunta:'¿Qué región cósmica tiene una gravedad tan intensa que ni la luz puede escapar?',
    dato:'Si cayeras dentro de uno, experimentarías un estiramiento extremo llamado "espaguetificación".' },
  { id:'aerogenerador', nombre:'Aerogenerador o turbina eólica', emoji:'<img src="img/aerogenerador.png" alt="Aerogenerador o turbina eólica" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/aerogenerador.png', uid:'E9ADD40F',
    pregunta:'¿Qué molino moderno transforma la fuerza del viento en energía eléctrica?',
    dato:'Una sola vuelta de sus enormes aspas puede alimentar un hogar por horas.' },
  { id:'baterias', nombre:'Baterías de litio', emoji:'<img src="img/baterias.png" alt="Baterías de litio" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/baterias.png', uid:'F915F20F',
    pregunta:'¿Qué dispositivo de almacenamiento químico alimenta celulares y computadoras?',
    dato:'El litio es tan ligero que flota en el agua (aunque reacciona violentamente si entra en contacto con ella).' },
  { id:'computadora', nombre:'Computadora', emoji:'<img src="img/computadora.png" alt="Computadora" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/computadora.png', uid:'A9AAE40F',
    pregunta:'¿Qué máquina electrónica procesa datos rápidamente para ejecutar programas y juegos?',
    dato:'La primera computadora programable de la historia era del tamaño de una habitación entera.' },
  { id:'sol', nombre:'Sol', emoji:'<img src="img/sol.png" alt="Sol" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/sol.png', uid:'C9681410',
    pregunta:'¿Cuál es la estrella central de nuestro sistema solar que nos da luz y calor?',
    dato:'Es tan gigantesca que cabrían más de 1.3 millones de Tierras dentro de ella.' },
  { id:'nuclear', nombre:'Energía nuclear', emoji:'<img src="img/nuclear.png" alt="Energía nuclear" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/nuclear.png', uid:'19EE1410',
    pregunta:'¿Qué tecnología aprovecha la división de los átomos para generar electricidad?',
    dato:'Es el mismo proceso físico que alimenta y hace brillar a las estrellas del universo.' },
  { id:'gps', nombre:'GPS', emoji:'<img src="img/gps.png" alt="GPS" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/gps.png', uid:'E7984212',
    pregunta:'¿Qué sistema de navegación usa satélites para calcular la posición exacta en el mapa?',
    dato:'Calcula tu ubicación exacta midiendo el tiempo que tarda la señal en viajar desde el espacio hasta tu celular.' },
  { id:'engranaje', nombre:'Engranaje', emoji:'<img src="img/engranaje.png" alt="Engranaje" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/engranaje.png', uid:'D9F3D80F',
    pregunta:'¿Qué rueda dentada sirve para transmitir fuerza, potencia y velocidad en las máquinas?',
    dato:'Permiten cambiar la velocidad de giro, como las marchas de una bicicleta o los relojes mecánicos.' },
  { id:'submarino', nombre:'Submarino', emoji:'<img src="img/submarino.png" alt="Submarino" style="width:1.15em;height:1.15em;max-width:100%;max-height:100%;object-fit:contain;vertical-align:middle;">', imagen:'img/submarino.png', uid:'39C60E10',
    pregunta:'¿Qué vehículo sumergible está diseñado para navegar en las profundidades del océano?',
    dato:'Para sumergirse o flotar, llenan o vacían tanques especiales con agua de mar.' }
];

/*Color de fondo del círculo, repartido en orden*/
const PALETA = ['#FFC83D', '#BCD0EE', '#FFD98A', '#E8C39A', '#A5DBF6', '#B3E58F', '#9BE0BE', '#86CBF7'];
OBJETOS.forEach((o, i) => { o.color = PALETA[i % PALETA.length]; });

/*uID por defecto de cada tarjeta (se toma de OBJETOS)*/
const TARJETAS_POR_DEFECTO = Object.fromEntries(OBJETOS.map(o => [o.id, o.uid]));

const FELICITACIONES = ['¡Muy bien!', '¡Correcto!', '¡Genial!', '¡Eso es!', '¡Lo descubriste!'];
const ANIMOS = ['¡Casi!', '¡Uy, casi!', '¡Sigue intentando!'];
