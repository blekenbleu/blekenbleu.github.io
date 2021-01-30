#include <Servo.h>

#define LED PC13		// Blue Pill green LED
Servo left, right;
unsigned long then;
int next, even, odd;

void setup() {			// put setup code here, to run once:
  // initialize as an output digital pin connected to green LED
  pinMode(LED, OUTPUT);
  digitalWrite (LED, HIGH);	// turn off LED by floating pin HIGH
  left.attach(PB8);		// Blue Pill 5V tolerant PWM pins
  right.attach(PB9);
  left.write(65);		// initial positions
  right.write(65);

  then = millis();   		// start the clock
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB
  }
  Serial.println("Blue_ASCII_Servo: connected");
  next = HIGH;
  even = odd = 30;		// even odds
}

void loop() {
  byte received;
  unsigned long now;

  // put your main code here, to run repeatedly:
  now = millis();		// should initially toggle on (LOW)
  if (then < now) {		// LED feedback for left vs right vs waiting
    if (next == LOW) {
      next = HIGH;
      then = now + odd;		// LED off for odd milliseconds
    }
    else {
      next = LOW;
      then = now + even;	// LED on for even milliseconds
    }
    digitalWrite (LED, next);	// toggle LED: HIGH turns it off
  }
  if (Serial.available() > 0) {
    received = Serial.read();
    if (1 & received) {
      right.write((127&received)+29); // mismatched arms
      even = 60;
      odd = 150;		// right has long odds
    } else {
      left.write((127&received)+21);
      even = 150;
      odd = 60;	
    }
  }
  else
      even = odd = 30;		// idle waiting
}
