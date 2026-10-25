/*
  Lector de tarjetas RFID con Arduino Uno (solo USB)
  -----------------------------------------------------------------
  Usa "Conectar por USB" en la pagina.

  Protocolo (texto, una línea por mensaje, 115200 baudios):
    Arduino -> página :  UID:04A1B2C3
    página -> Arduino :  OK  /  NO      (enciende el LED verde / rojo)

  Librería: «MFRC522» de GithubCommunity (miguelbalboa).

  Conexión del MFRC522:
    RC522   Arduino Uno
    SDA  -> 10
    SCK  -> 13
    MOSI -> 11
    MISO -> 12
    RST  -> 9
    3.3V -> 3.3V Bajar corriende de 5V a 3.3V
    GND  -> GND
*/

#include <SPI.h>
#include <MFRC522.h>

const byte PIN_SS  = 10;
const byte PIN_RST = 9;

// Opcionales (el pin 13 no se usa para LED porque es el reloj SPI). 255 = no usar.
const byte PIN_LED_OK = 7;
const byte PIN_LED_NO = 6;

const unsigned long REPETICION_MS = 1500;

MFRC522 lector(PIN_SS, PIN_RST);

String ultimoUid = "";
unsigned long ultimoTiempo = 0;
unsigned long apagarEn = 0;
String lineaSerial = "";

void poner(byte pin, bool encendido) {
  if (pin != 255) digitalWrite(pin, encendido ? HIGH : LOW);
}

void retroalimentar(bool acierto) {
  poner(PIN_LED_OK, false);
  poner(PIN_LED_NO, false);
  poner(acierto ? PIN_LED_OK : PIN_LED_NO, true);
  apagarEn = millis() + (acierto ? 700UL : 350UL);
}

void procesarComando(String comando) {
  comando.trim();
  comando.toUpperCase();
  if (comando == "OK") retroalimentar(true);
  else if (comando == "NO") retroalimentar(false);
}

void leerSerial() {
  while (Serial.available()) {
    char c = (char)Serial.read();
    if (c == '\n' || c == '\r') {
      if (lineaSerial.length() > 0) procesarComando(lineaSerial);
      lineaSerial = "";
    } else if (lineaSerial.length() < 16) {
      lineaSerial += c;
    }
  }
}

void setup() {
  Serial.begin(115200);
  if (PIN_LED_OK != 255) pinMode(PIN_LED_OK, OUTPUT);
  if (PIN_LED_NO != 255) pinMode(PIN_LED_NO, OUTPUT);
  SPI.begin();
  lector.PCD_Init();
}

void loop() {
  leerSerial();

  if (apagarEn != 0 && (long)(millis() - apagarEn) >= 0) {
    poner(PIN_LED_OK, false);
    poner(PIN_LED_NO, false);
    apagarEn = 0;
  }

  if (!lector.PICC_IsNewCardPresent()) return;
  if (!lector.PICC_ReadCardSerial()) return;

  String uid = "";
  for (byte i = 0; i < lector.uid.size; i++) {
    if (lector.uid.uidByte[i] < 0x10) uid += "0";
    uid += String(lector.uid.uidByte[i], HEX);
  }
  uid.toUpperCase();

  unsigned long ahora = millis();
  bool repetida = (uid == ultimoUid) && (ahora - ultimoTiempo < REPETICION_MS);
  if (!repetida) {
    ultimoUid = uid;
    ultimoTiempo = ahora;
    Serial.print("UID:");
    Serial.println(uid);
  }

  lector.PICC_HaltA();
  lector.PCD_StopCrypto1();
}
