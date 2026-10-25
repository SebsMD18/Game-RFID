# Juego RFID
Juego educativo para niños: asocia animales con tarjetas RFID y aprende datos curiosos.

## ¿Cómo funciona?
1. La pantalla muestra un animal.
2. El niño busca la tarjeta correcta.
3. Al pasarla por el lector, la página indica si es correcta y muestra un dato curioso.
3.1. De lo contrario la pagina incentiva al niño a hacer otro intento

## Características
- Juego interactivo: Muestra un animal en la página web para que el niño lo busque.
- Escaneo RFID: Utiliza un lector RFID para escanear la tarjeta del animal seleccionado.
- Retroalimentación inmediata y datos curiosos: Ofrece una respuesta al instante y datos interesantes cuando se escanea la tarjeta correcta.

## Tecnologías
- Lector RFID: MFRC522
- Microcontrolador: Arduino
- Web: HTML, JavaScript

## Estado del proyecto
- [x] Lectura de tarjetas
- [x] Página web interactiva
- [ ] Pruebas con niños
- [ ] Más animales y datos curiosos

## Aprendizajes
Observamos que a muchos niños de primaria les cuesta mantener la atención en actividades de aprendizaje tradicionales. Este proyecto propone una alternativa: un juego que combina tarjetas físicas y tecnología RFID, donde el niño interactúa con objetos reales y recibe retroalimentación inmediata y datos curiosos, con el objetivo de despertar su curiosidad y motivarlo a aprender.

## Archivos

| Ruta | Qué es |
|---|---|
| `index.html` | Solo el marcado de las pantallas. |
| `css/base.css` | Fuente, colores, fondo y pantallas. |
| `css/pantallas.css` | Inicio, juego, acierto, error y final. |
| `css/panel.css` | Engrane y panel del maestro. |
| `js/datos.js` | **Animales, datos curiosos y UID de tarjetas (aquí se edita el contenido).** |
| `js/util.js` | Funciones auxiliares. |
| `js/ajustes.js` | Tarjetas, opciones y WiFi guardados en el navegador. |
| `js/sonido.js` | Voz y efectos de sonido. |
| `js/confeti.js` | Confeti. |
| `js/lector.js` | Lector por USB, WiFi y teclado (sin DOM). |
| `js/juego.js` | Rondas, acierto, error y final. |
| `js/panel.js` | Panel del maestro. |
| `js/main.js` | Conecta los módulos. |
| `fonts/` | Fuente Fredoka (licencia OFL), incluida para funcionar sin internet. |
| `firmware/esp32_animalandia/` | Código principal: ESP32 + RC522, por WiFi y por USB. |
| `firmware/arduino_uno_serial/` | Respaldo: Arduino Uno + RC522, solo USB. Mismo protocolo. |

Orden de carga (`index.html`): `datos → util → ajustes → sonido → confeti → lector → juego → panel → main`. Los módulos son scripts clásicos con objetos globales (`Juego`, `Lector`, `Panel`…), por lo que funciona abriendo `index.html` con doble clic.

## Usarlo

1. Abre `index.html` en **Chrome o Edge** (doble clic o con un servidor local, por ejemplo `python -m http.server`).
2. Sin lector, puedes jugar con los botones de **Modo prueba** que aparecen abajo.
3. Con lector: abre el engrane (arriba a la derecha):
   - **USB:** «Conectar por USB» y elige el puerto de la placa.
4. En «Tarjetas de los animales» pulsa **Leer** junto a cada animal y pasa su tarjeta. Queda guardado en el navegador.
   Para dejarlas fijas en el código, pega los UID en `TARJETAS_POR_DEFECTO` (`js/datos.js`).

## Protocolo (texto, una línea por mensaje)

- Placa → página: `UID:04A1B2C3`
- Página → placa: `OK` (acierto) o `NO` (fallo)

## Agregar animales

En `js/datos.js`, dentro de `ANIMALES`, copia un bloque y cambia `id`, `nombre`, `emoji`, `color` y `datos`. Agrégalo también en `TARJETAS_POR_DEFECTO`.

## Créditos

Fuente [Fredoka](https://fonts.google.com/specimen/Fredoka) (SIL Open Font License). Los animales son emojis del sistema.




**---------------------------------------------------------





# Game-RFID
Interactive RFID learning game with web interface: children find the matching animal card, scan it, and receive instant feedback along with fun facts.

## How it Works
1. The screen displays an animal.
2. The child searches for the matching card.
3. Upon scanning it with the RFID reader, the web page indicates whether it is correct and displays a fun fact.
   3.1. Otherwise, the page encourages the child to try again.

## Features
- Interactive Gameplay: Displays an animal on the web page for the child to find.
- RFID Scanning: Uses an RFID reader to scan the selected animal card.
- Instant Feedback & Fun Facts: Provides immediate response and interesting facts when the correct card is scanned.

## Technologies Used
- RFID Reader: MFRC522
- Microcontroller: Arduino
- Web Technologies: HTML, JavaScript

## Project Status

- [x] Card scanning functionality
- [x] Interactive web interface
- [ ] User testing with children
- [ ] Adding more animals and fun facts

## Key Takeaways / Insights

We observed that many elementary school children struggle to stay engaged with traditional learning methods. This project proposes an alternative: an interactive game combining physical cards with RFID technology. By interacting with tangible objects and receiving instant feedback alongside engaging fun facts, children are motivated to learn while having their curiosity sparked.

## Files
| Path | What it is |
|---|---|
| `index.html` | Screen markup only. |
| `css/base.css` | Font, colors, background, and screens. |
| `css/pantallas.css` | Home, game, correct, error, and end. |
| `css/panel.css` | Gear icon and teacher's panel. |
| `js/datos.js` | **Animals, fun facts, and card UIDs (edit content here).** |
| `js/util.js` | Helper functions. |
| `js/ajustes.js` | Saved cards, options, and WiFi stored in the browser. |
| `js/sonido.js` | Voice and sound effects. |
| `js/confeti.js` | Confetti. |
| `js/lector.js` | Reader via USB, WiFi, and keyboard (no DOM). |
| `js/juego.js` | Rounds, correct, error, and end. |
| `js/panel.js` | Teacher's panel. |
| `js/main.js` | Connects the modules. |
| `fonts/` | Fredoka font (OFL license), included to work offline. |
| `firmware/esp32_animalandia/` | Main code: ESP32 + RC522, via WiFi and USB. |
| `firmware/arduino_uno_serial/` | Backup: Arduino Uno + RC522, USB only. Same protocol. |

Load order (`index.html`): `datos → util → ajustes → sonido → confeti → lector → juego → panel → main`. Modules are classic scripts with global objects (`Juego`, `Lector`, `Panel`…), so it works by double-clicking `index.html`.

## Usage
1. Open `index.html` in **Chrome or Edge** (double click or using a local server, e.g., `python -m http.server`).
2. Without a reader, you can play using the **Test mode** buttons at the bottom.
3. With a reader: open the gear icon (top right):
   - **USB:** "Connect via USB" and select the board's port.
4. Under "Animal cards", click **Read** next to each animal and scan its card. It will be saved in the browser.
   To make them permanent in the code, paste the UIDs into `TARJETAS_POR_DEFECTO` (`js/datos.js`).

## Protocol (text, one line per message)
- Board → page: `UID:04A1B2C3`
- Page → board: `OK` (correct) or `NO` (incorrect)

## Adding animals
In `js/datos.js`, inside `ANIMALES`, copy a block and change `id`, `nombre`, `emoji`, `color`, and `datos`. Also add it to `TARJETAS_POR_DEFECTO`.

## Credits
[Fredoka](https://fonts.google.com/specimen/Fredoka) font (SIL Open Font License). Animals are system emojis.
