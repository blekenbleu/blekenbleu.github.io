#include <Servo.h>
/* Two ASCII cnaracter commands = 2 x 7 - 1 sync bit per character = 12 available bits: 5 address + 7 data
 ; compatible with e.g. this SimHub Custom serial profile:
 ; https://blekenbleu.github.io/Arduino/Blue2charServo/proto2char.shsds
 */

#define LED PC13			// Blue Pill green LED pin
Servo servo[7];				// Blue Pill has 7 5-Volt tolerant PWM pins
byte offset[] = {63,65,0,0,0,0,0};	// initial servo offsets:  unloaded arm angles
byte next = 0;				// delay clip LED turnoff if only one servo is 15
byte special = 0;			// commands in 6 lsb of character after 0x5F
byte loading = 0;			// state: waiting for second character
byte tmax = 0x7E;			// tension threshold for overload echo 'F'
byte col = 0;          			// roughly 180 column SimHub Incoming serial data
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
  Serial.println("Blue2charServo: connected");
  digitalWrite(LED, HIGH);	// extinguish LED until possible tension clipping
}

// loop() is not REALLY a loop;
// it is just Arduino's designated user routine which main() calls often.
void loop() {
  if (0 < Serial.available()) {
    byte received = Serial.read();
    
    if (2 == special) {
      Serial.print(received, HEX);
      Serial.write(' ');
      col += 3;
    }

    if (0x7F == received) {
      if (2 == special)
        Serial.println("resetting..");
      else if (1 == special)
	Serial.println("R");
      next = special = loading = 0;
      offset[0] = 63; offset[0] = 65;
      tmax = 0x7E;
      servo[0].write(offset[0]);
      servo[1].write(offset[1]);
      return;
    } 

    if (0x40 & received) {
      if (loading) { 	// did preceding character also have 0x40 set?
	if (2 == special) {
	  Serial.println("sync error: consecutive characters with 0x40 bit set");
          col = 0;
	}
	else if (1 == special) {
	  Serial.println("E");
	  col++;
	}
	loading = 0;
      }
      else loading = received;
      digitalWrite(LED, LOW);	// illuminate LED
      return;
    }

    if (loading) {	// sync bit == 0
      if (0x5F == loading) {		// special?
	byte addr;	// really only 5 lsb;

	special = received;
	if (2 == special) {
      	  Serial.print("special ");
      	  Serial.println(special);
          col = 0;
	}
	if (2 < special)
	  tmax = special << 1;
      } else {		// not so special
	received |= ((0x20 & loading) << 1);	// restore msb of 7-bit data
        if (2 > (addr = 0x1F & loading))
	  offset[addr] = received;
      	else if (4 > addr) {
	  if (tmax <= received && 1 == special) {
	    Serial.print("F");
	    col++
	  }
          servo[addr].write(offset[addr - 2] + received);
	}
	else {
	  if (2 == special) {
      	    Serial.print("Channel address out of implemented range: ");
      	    Serial.println(addr);
	    col = 0;
	  }
	  else if (1 == special) {
	    Serial.print("E");
	    col++;
	  }
	}
      }
      loading = 0;
      digitalWrite(LED, HIGH);	// extinguish LED
    } else {		// NOT loading
      if (2 == special) {
        Serial.println("consecutive byte without sync bit:  ignored");
        col = 0;
      }
      else if (1 == special) {
	Serial.print("E");
	col++;
      }
      digitalWrite(LED, LOW);	// illuminate LED
    }

    if (180 < col) {
      Serial.println("");
      col = 0;
    }
  }	// 0 < Serial.available()
}
