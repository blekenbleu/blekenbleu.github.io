#include <Servo.h>
// index fan[] based on 3 bits of ASCII values, with 4 lsb to set PWM duty cycle.
// https://blekenbleu.github.io/Arduino/SimHubPWMfans
// Arduino STMicroelectronics board library in /c/Users/bleke/AppData/Local/Arduino15/packages/
// specifically: hardware/stm32/2.0.0/cores/arduino/HardwareTimer.h and hardware/stm32/2.0.0/cores/arduino/stm32/pinmap.h

#define LED PC13			// Blue Pill green LED pin
Servo servo[4];				// Blue Pill has 7 5-Volt tolerant PWM pins; reserving 3 for fan PWM
byte offset[] = {63,65,0,0};	  // initial servo offsets:  unloaded arm angles
#if 0   // only for hobby servos
byte LUT[] = {0,8,12,16,20,24,28,32,36,40,45,51,57,64,74,84};  // tension steps
byte next = 0;				// delay clip LED turnoff if only one servo is 15
byte special = 0;			// commands in 4 lsb of 0x70
byte loading = 0;			// LUT loading index
char hex[] = "0123456789ABCDEF";
#endif

/* 4-wire fan;  keep duty cycle in the range of 1 to 99, avoiding 0 and 100
 ; PA8 is an Arduino macro fro digital pin;  needs conversion to an STM32 PinName (port and pin)
 ; https://github.com/stm32duino/wiki/wiki/HardwareTimer-library
 ; https://www.programmersought.com/article/42635087817/
 */
#define pin PA8
// for PA8-10, pinmap_peripheral() presumably returns TIM1
TIM_TypeDef *Instance = (TIM_TypeDef *)pinmap_peripheral(digitalPinToPinName(pin), PinMap_PWM);
HardwareTimer *MyTim = new HardwareTimer(Instance);
// extract channel number from STM32 PinName; should be 1-4 if including PA11 (in use by USB)
#define STPMAP(pin) STM_PIN_CHANNEL(pinmap_function(digitalPinToPinName(pin), PinMap_PWM))
uint32_t channel[] = {STPMAP(PA8), STPMAP(PA9), STPMAP(PA10)};

char hint[] = "0'-'9' for PA8; 'A'-'P' for PA9; 'a'-'p' for PA10";
char ch[] = "channel = ";
byte chn = 0;
uint32_t  ticks = 0;  // reduce overhead?

void setup() {			// setup() code runs once
  pinMode(LED, OUTPUT);		// initialize output digital pin connected to green LED
  digitalWrite(LED, LOW);	// turn on LED by pulling pin LOW
  servo[0].attach(PB8);		// Blue Pill 5V tolerant PWM pins
  servo[1].attach(PB9);
/*
  servo[2].attach(PB6);
  servo[3].attach(PB7);
 */
  for (int i = 0; i < 2; i++) {
    servo[i].write(offset[i]);	// initial servo positions
  }

/* channel, pin, frequency, duty cycle)  <- specifying both channel and pin seems redundant;
 * setPWM() seemingly accepts either pin number or name
 ; there are only a few alternate pin mappings for a timer's channels ..??
 ; https://www.stm32duino.com/viewtopic.php?t=550
 */
  MyTim->setPWM(channel[0], PA8, 25000, 1); // set 25kHz
  ticks = MyTim->getOverflow(TICK_FORMAT);  // how many ticks?
  // initialize the other PWM channels and pins
  MyTim->setMode(channel[1], TIMER_OUTPUT_COMPARE_PWM1, PA9);
  MyTim->setMode(channel[2], TIMER_OUTPUT_COMPARE_PWM1, PA10);
  // Initialize serial and wait for port to be opened:
  Serial.begin(115200);
  while (!Serial)
    delay(1);			// wait for native USB serial port to connect
  Serial.println("BluePWMfan: connected");
  digitalWrite(LED, HIGH);	// extinguish LED until possible tension clipping
  Serial.print(ch);
  Serial.print(channel[chn]);
  Serial.print(";  25kHz ticks = ");
  Serial.println(ticks);
  Serial.println(hint);
}

// loop() is not REALLY a loop;
// it is just the designated user routine which Arduino main() calls often.
void loop() {
  if (0 < Serial.available()) {
    byte received = Serial.read();
    byte dutycycle;
    
    if ('0' <= received && '9' >= received) {
      /* at least 3 possible fan behaviors at/below some minimum pwm (20%?)
       ; https://www.glkinst.com/cables/cable_pics/4_Wire_PWM_Spec.pdf
       ; assume minimum speed at 20% and off for less; want step 1/9 == 20% (ticks/5)
       ; step 0 = 1/5 - 1/9 = 4/45
       */
      dutycycle = map(received, '0', '9', (45*ticks)/450, ticks - 1);
      chn = 0;
    }
    else if ('A' <= received && 'P' >= received) {
      // step 1/15 == ticks/5; step 0 = 1/5 - 1/15 = 10/75
      dutycycle = map(received, 'A', 'P', (10*ticks)/75, ticks - 1);
      chn = 1;
    }
    else if ('a' <= received && 'p' >= received) {
      dutycycle = map(received, 'a', 'p', (10*ticks)/75, ticks - 1);
      chn = 2;
    }
    else {
      Serial.println(hint);
      return;
    }
    
    // my theory: since sharing the same timer, need only specify duty cycles for other channels
    Serial.print(ch);
    Serial.println(channel[chn]);
    // 4-wire fan
    // update duty cycle
    Serial.print("duty cycle = ");
    Serial.println(dutycycle);
    // TICK_COMPARE_FORMAT may be faster than PERCENT_COMPARE_FORMAT, as well as more precise...
    // https://www.stm32duino.com/viewtopic.php?t=566
    MyTim->setCaptureCompare(channel[chn], dutycycle, TICK_COMPARE_FORMAT);
  }
}
