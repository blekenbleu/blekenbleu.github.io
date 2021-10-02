#include <Servo.h>
/* Two ASCII character commands = 2 x 7 - 1 sync bit per character = 12 available bits: 5 address + 7 data
 ; of 32 possible channels, 1 reserved for special commands leaves 15 for PWM and 15 for offsets
 ; compatible with e.g. this SimHub Custom serial profile:
 ; https://blekenbleu.github.io/Arduino/Blue2charServo/proto2char.shsds
 */

#define LED PC13      // LED pin
//#define BLACKPILL 1

#ifdef BLACKPILL
/* Black Pill
 ; STM32F401: all pins are 5V tolerant (25 5V PWM pins)
 ; STM32F411: PA0(pin10) and PB5(pin41) are 3.3V only (23 5V PWM pins)
 ;            PA11(pin32) prevents device from being recognized in windows
 ;            15 PWM pins assigned
 ;                  ________T4________  ________T1___   ________T2________   ________T3________
 ;                  CH1  CH2  CH3  CH4  CH1  CH2  CH3   CH1  CH2  CH3  CH4   CH1  CH2  CH3  CH4 */
const byte pin[] = {PB6, PB7, PB8, PB9, PA8, PA9, PA10, PA15, PA1, PA2, PA3, PA6, PA7, PB0, PB1};
const char *msg = "Black Pill 2charServo: connected\n";

#else

/* Blue Pill: seven 5V tolerant pins until PA6, then 3.3V excluding PS15
 ;                  ________T4________  ________T1___   ________T3________  _______T2_________
 ;                  CH3  CH4  CH1  CH2  CH1  CH2  CH3   CH1  CH2  CH3  CH4  CH2  CH3  CH4  CH1	*/
const byte pin[] = {PB8, PB9, PB6, PB7, PA8, PA9, PA10, PA6, PA7, PB0, PB1, PA1, PA2, PA3};//PA15};
const char *msg = "Blue2charServo: connected\n";

#endif		// BLACKPILL

const byte num_pwm = sizeof(pin);
byte num_servos = 4;
Servo servo[num_pwm];
byte offset[15];
byte offset_defaults[] = {60,60,60,60,60,60,60,60,60,60,60,60,60,60,60};  // initial servo offsets:  unloaded arm angles

byte info_level = 0;  // commands in 6 lsb of character after 0x5F
byte loading = 0;     // state: waiting for second character
byte tmax = 0x7E;     // tension threshold for overload echo '*'
const int max_cols = 180;  // roughly 180 column SimHub incoming serial data display width
const char *hex = "0123456789ABCDEF";
int col = 0;


void setup() {      // setup() code runs once
  pinMode(LED, OUTPUT);   // initialize output digital pin connected to green LED
  digitalWrite(LED, LOW); // turn on LED by pulling pin LOW

  for (byte i = 0; i < num_servos; i++) {
    servo[i].attach(pin[i]);
    servo[i].write(offset[i] = offset_defaults[i]);  // initialize servo positions
  }

  // Initialize serial and wait for port to be opened:
  Serial.begin(115200);
  while (!Serial)
    delay(1);			// wait for native USB serial port to connect
  Serial.write(msg);
  digitalWrite(LED, HIGH);	// extinguish LED until possible tension clipping
}


// loop() is Arduino's designated user routine which main() calls often.
void loop() {
  if (0 < Serial.available()) {
    byte received = Serial.read();
    
    if (3 == info_level) {
      // Serial.print(received, HEX);
      Serial.write(hex[received >> 4]);
      Serial.write(hex[15 & received]);
      Serial.write(' ');
      col += 3;
    }

    if (0x7F == received) {
      Serial.write("resetting...  ");
      info_level = loading = col = 0;
      tmax = 0x7E;
      for (byte i = 0; i < num_servos; i++) {
	servo[i].write(offset[i] = offset_defaults[i]);  // initial servo positions
      }
      Serial.write(msg);
    }

    else if (4 == info_level) {
      if (32 > received) {
	Serial.write('x');
	Serial.write(hex[received >> 4]);
	Serial.write(hex[15 & received]);
	Serial.write(' ');
	col += 3;
      }
      else {
	Serial.print((char)received);
	col++;
      }
    }

    else if (0x40 & received) {	// sync bit == 1
      digitalWrite(LED, LOW);	// illuminate LED
      if (loading) {  // did preceding character also have 0x40 set?
	if (3 & info_level) {
	  Serial.write("sync error: consecutive characters with 0x40 bit set\n");
	        col = 0;
	}
	else if (1 == info_level) {
	  Serial.write("E");
	  col++;
	}
	loading = 0;
      }
      else loading = received;
    }

    else if (loading) {  // sync bit == 0
      digitalWrite(LED, HIGH);     // extinguish LED
      byte addr = 0x1F & loading;  // really only 5 lsb;

      if (0x5F == loading) {			// info_level?
	if (4 < received)
	  tmax = received << 1;
	else if (info_level != received) {	// info_level change?
	  if (3 == received || 3 & info_level) {
	    Serial.write("info_level = ");
	    Serial.println(received);
	    col = 0;
	  }
	  info_level = received;
	  if (4 == info_level) {
	    Serial.write("ASCII echo enabled; reset to disable\n");
	    col = 0;
	  }
	}
      }

      else {	// write to servo
	received |= ((0x20 & loading) << 1);	// restore msb of 7-bit data

	if (30 == addr) {
	  if (num_pwm < received) {
	    Serial.write("Error: num_servos update exceeds allowable ");
	    Serial.print(num_pwm);
	    Serial.write(": ");
	    Serial.println(received);
	    col = 0;
	    received = num_pwm;  // ignore invalid setting
	  }
	  for (byte i = received - 1; i < num_servos; i++) {
	    servo[i].detach();
	  }
	  for (byte i = num_servos - 1; i < received; i++) {
	    offset[i] = offset_defaults[i];
	    servo[i].attach(pin[i]);
	  }
	  num_servos = received;
	  Serial.write("num_servos: ");
	  Serial.println(received);
	}
	else if (num_servos > addr)
	  offset[addr] = received;
	else if (num_servos * 2 > addr) {
	  servo[addr - num_servos].write(offset[addr - num_servos] + received);
	  if (2 == info_level) { // servo:value
	    Serial.write(' ');
	    Serial.print(addr - num_servos);
	    Serial.write(':');
	    Serial.print(offset[addr - num_servos] + received);
	    //Serial.write(':');
	    //Serial.print(received);
	    col += 7;
	  }
	  if (tmax <= received) {  // clipping
	    digitalWrite(LED, LOW);  // illuminate LED
	    if (3 & info_level) {
	      Serial.write("*");
	      col++;
	    }
	  }
	}
	else {
	  digitalWrite(LED, LOW);  // illuminate LED
	  if (3 & info_level) {
	    Serial.write("channel address out of implemented range of ");
	    Serial.print(num_servos);
	    Serial.write(": ");
	    Serial.println(addr);
	    col = 0;
	  }
	  else if (1 == info_level) {
	    Serial.write("E");
	    col++;
	  }
	}
      }
      loading = 0;
    }

    else {			// NOT loading
      digitalWrite(LED, LOW);	// illuminate LED
      if (3 & info_level) {
	Serial.write("ignore consecutive byte without sync bit: ");
	Serial.println(received, HEX);
	col = 0;
      }
      else if (1 == info_level) {
	Serial.write("E");
	col++;
      }
    }

    if (max_cols < col) {
      Serial.write("\n");
      col = 0;
    }
  }	// 0 < Serial.available()
}
