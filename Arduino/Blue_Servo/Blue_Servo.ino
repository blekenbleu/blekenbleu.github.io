#include <Servo.h>

#define LED PC13	// Blue Pill green LED
Servo strap[2];

void setup() {
  // put Blue Pill setup code here, to run once:
  // initialize as an output digital pin connected to green LED
  pinMode(LED, OUTPUT);
  strap[0].attach(PB8);	// 5V tolerant PWM pins
  strap[1].attach(PB9);
  strap[0].write(50);	// initial positions
  strap[1].write(50);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite (LED, HIGH); // turn the LED off by letting pin go HIGH
  strap[0].write(90);
  strap[1].write(10);
  delay(1500);                // wait 1.5 seconds
  digitalWrite (LED, LOW);  // turn the LED on by pulling pin LOW
  strap[0].write(10);
  strap[1].write(90);
  delay(3000);               // wait for 3 seconds
}
