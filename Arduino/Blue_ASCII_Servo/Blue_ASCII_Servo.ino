#include <Servo.h>

#define LED PC13	// Blue Pill green LED
Servo left, right;

void setup() {
  // put Blue Pill setup code here, to run once:
  // initialize as an output digital pin connected to green LED
  pinMode(LED, OUTPUT);
  left.attach(PB8);	// 5V tolerant PWM pins
  right.attach(PB9);
  left.write(50);	// initial positions
  right.write(50);
  digitalWrite (LED, LOW);  // turn the LED on by pulling pin LOW

  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB
  }
  Serial.println("Blue_ASCII_Servo: connected");
}

void loop() {
  byte received;
  int even, odd;

  // put your main code here, to run repeatedly:
  digitalWrite (LED, HIGH); // turn the LED off by letting pin go HIGH
  if (Serial.available() > 0) {
    received = Serial.read();
    if (1 & received) {
      right.write(0x7F & received);
      even = 150;
      odd = 60;
    } else {
      left.write(0x7E & received);
      even = 60;
      odd = 150;
    }
  }
  else  // LED feedback for left vs right vs waiting
    even = odd = 30;
  delay(even);
  digitalWrite (LED, LOW);  // turn the LED on by pulling pin LOW
  delay(odd);
}
