#include <Servo.h>
// index servo[] based on 3 bits of ASCII values, with 4 lsb to index LUT
// https://blekenbleu.github.io/Arduino/

#define LED PC13			// Blue Pill green LED pin
Servo servo[7];				// Blue Pill has 7 5-Volt tolerant PWM pins
byte offset[] = {63,65,0,0,0,0,0};	// initial servo offsets:  unloaded arm angles
byte LUT[] = {0,8,12,16,20,24,28,32,36,40,45,51,57,64,74,84};  // tension steps
byte next = 0;				// delay clip LED turnoff if only one servo is 15
byte special = 0;			// commands in 4 lsb of 0x70
byte loading = 0;			// LUT loading index
int col = 0;          // roughly 180 column SimHub incoming display width
char hex[] = "0123456789ABCDEF";

void setup() {			// setup() code runs once
  pinMode(LED, OUTPUT);		// initialize output digital pin connected to green LED
  digitalWrite(LED, LOW);	// turn on LED by pulling pin LOW
  servo[0].attach(PB8);		// Blue Pill 5V tolerant PWM pins
  servo[1].attach(PB9);
/*
  servo[2].attach(PB6);
  servo[3].attach(PB7);
  servo[4].attach(PA8);
  servo[5].attach(PA9);
  servo[6].attach(PA10);
 */
  for (int i = 0; i < 2; i++) {
    servo[i].write(offset[i]);	// initial servo positions
  }

  // Initialize serial and wait for port to be opened:
  Serial.begin(115200);
  while (!Serial)
    delay(1);			// wait for native USB serial port to connect
  Serial.println("BlueLUT_Servo: connected");
  digitalWrite(LED, HIGH);	// extinguish LED until possible tension clipping
}

// loop() is not REALLY a loop;
// it is just the designated user routine which Arduino main() calls often.
void loop() {
  if (0 < Serial.available()) {
    byte received = Serial.read();
    
    if (3 == special) {
      Serial.print(received, HEX);
      Serial.write(' ');
      col += 3;
    }
    if (loading || 0x70 <= received) {	// special commands
      if (0 == loading) {		// not in LUT-loading sequence?
        if (0x7F == received) {		// init LUT loading
      	  Serial.println("loading LUTs");
          col = 0;
          loading = 1;
      	} else if (7 == (received >> 4)){
          special = received & 15;
          Serial.print("special ");
          Serial.println(special);
          col = 0;
      	}
      }
      else {				// 0 < loading
        if (3 > loading)
          offset[loading - 1] = received;  // load = 1 to offset[0]
        else
          LUT[loading - 2] = received;  // do not update LUT[0] = 0
        loading++;
        if (17 < loading) {
          Serial.println(" LUTs loaded");
          col = loading = 0;
        }
      }
    }
    else {				// servo movements
      byte which = 7 & (received >> 4);
      next++;
      received &= 15;
      servo[1 & which].write(offset[which] + LUT[received]);	// only 2 servos, for now
      if (15 == received) {
        digitalWrite(LED, LOW);		// possibly clipped tension
        next = 0;
	      if (special == 1) {
	        Serial.write('F');		// echo possible clips
          col++;
	      }
      } else {
	      if (next > 1) {			// leave LED on if either update is 15
	        digitalWrite(LED, HIGH);	// extinguish LED
	        next = 0;
	      }
	      if (2 == special) {		// echo LUT indices
	        Serial.write(hex[received]);
          col++;
	      }
      }
    }
    if (180 < col) {
      Serial.println("");
      col = 0;
    }
  }
}
