#include <Servo.h>
// hobby servo equivalent to LED blink
// https://blekenbleu.github.io/Arduino/

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
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite (LED, HIGH); // turn the LED off by letting pin go HIGH
  left.write(90);
  right.write(10);
  delay(1500);                // wait 1.5 seconds
  digitalWrite (LED, LOW);  // turn the LED on by pulling pin LOW
  left.write(10);
  right.write(90);
  delay(3000);               // wait for 3 seconds
}
