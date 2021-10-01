#include <Servo.h>
// index fan[] based on lsb of ASCII values, with 6 msb to set PWM duty cycle.
// https://blekenbleu.github.io/Arduino/SimHubPWMfans

#define LED PC13			// Blue Pill green LED pin

// 4-wire fan;  keep duty cycle in the range of 1 to 99, avoiding 0 and 100
#define pwm0 PA8    // both are on T1;  servos are on T4 (PB8,9)
#define pwm1 PA9
TIM_TypeDef *Instance = (TIM_TypeDef *)pinmap_peripheral(digitalPinToPinName(pwm0), PinMap_PWM);
HardwareTimer  *MyTim = new HardwareTimer(Instance);
uint32_t   channel[2] = {STM_PIN_CHANNEL(pinmap_function(digitalPinToPinName(pwm0), PinMap_PWM)),
			 STM_PIN_CHANNEL(pinmap_function(digitalPinToPinName(pwm1), PinMap_PWM))};

void setup() {			// setup() code runs once
  pinMode(LED, OUTPUT);		// initialize output digital pin connected to green LED
  digitalWrite(LED, LOW);	// turn on LED by pulling pin LOW

	     // channel, pin, frequency, duty cycle)
  MyTim->setPWM(channel[0], pwm0, 25000, 1);
  MyTim->setPWM(channel[1], pwm1, 25000, 1);

  // Initialize serial and wait for port to be opened:
  Serial.begin(115200);
  while (!Serial)
    delay(1);			// wait for native USB serial port to connect
  Serial.println("SimHubPWMfans: connected");
  digitalWrite(LED, HIGH);	// extinguish LED until possible tension clipping
}

// loop() is not REALLY a loop;
// it is just the designated user routine which Arduino main() calls often.
void loop() {
  if (0 < Serial.available()) {
    byte received = Serial.read();
    byte i = received & 1;
    uint32_t dutycycle = received;	// update duty cycle
    
    Serial.print("duty cycle = ");
    Serial.println(dutycycle);
    MyTim->setCaptureCompare(channel[i], dutycycle, PERCENT_COMPARE_FORMAT);
    digitalWrite(LED, (50 > dutycycle) ? HIGH : LOW);
  }
}
