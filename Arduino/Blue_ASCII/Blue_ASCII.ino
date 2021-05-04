#include <Servo.h>
// echo received Serial bytes back
// https://blekenbleu.github.io/Arduino/

#define LED PC13		// Blue Pill green LED
Servo left, right;
unsigned long then, timeout=0;
int next = HIGH;
int even = 30, odd = 30;	// even: LED on count

void setup() {			// setup() code runs once
  then = millis();   		// start the clock
  // initialize as an output digital pin connected to green LED
  pinMode(LED, OUTPUT);
  digitalWrite(LED, HIGH);	// turn off LED by floating pin HIGH
  left.attach(PB8);		// Blue Pill 5V tolerant PWM pins
  right.attach(PB9);
  left.write(65);		// initial servo positions
  right.write(65);

  // Initialize serial and wait for port to be opened:
  Serial.begin(9600);
  while (!Serial)
    delay(1);			// wait for native USB serial port to connect
  Serial.println("Blue_ASCII: connected");
}

// loop() is not REALLY a loop;
// it is just the main routine, which gets called often.
void loop() {
  // main code goes here, to be called repeatedly:
  byte received;
  unsigned long now = millis();	// should initially toggle on (LOW)

  if (then < now) {		// LED feedback for left vs right vs waiting
    if (1000000 < timeout) {	// idle for a second or so?
      even = odd = 30;		// idle waiting feedback
      timeout = 0;
    }
    if (next == LOW) {
      next = HIGH;
      then = now + odd;		// LED off for odd milliseconds
    }
    else {
      next = LOW;
      then = now + even;	// LED on for even milliseconds
    }
    digitalWrite (LED, next);	// toggle LED: HIGH turns it off
    if (40 > even)		// idle?
      delay(30);		// this may facilitate interrupting
  }
  if (0 < Serial.available()) {
    char hex[] = "0123456789ABCDEF";

    received = Serial.read();
//  Serial.write(received);
    if (0 == received) {
      Serial.write('\r');
      Serial.write('\n');
    }
    Serial.write(hex[received>>4]);
    Serial.write(hex[0x0F&received]);
    if (1 & received) {
//    right.write((127&received)+radd);  // for servo, not ASCII echo
      even = 40;		// LED briefly on
      odd = 180;		// right has long odds
    } else {
//    left.write((127&received)+ladd);
      even = 180;		// LED mostly on
      odd = 40;	
    }
    timeout = 0;
  }
  else timeout++;
}
