#include <Servo.h>
/* blek2char 2 ASCII character commands = 2 x 7 - 1 sync bit per character = 12 available bits: 5 address + 7 data
 ; of 32 possible channels, 0x7F reserved reset and 0x5E for special commands leaves 30 for servos and other PWM pins
 ; compatible with e.g. this SimHub Custom serial profile:
 ; https://blekenbleu.github.io/Arduino/blek2char/blek2char.shsds
 */

#define LED PC13      // LED pin
//#define BLACKPILL 1

#ifdef BLACKPILL
/* Black Pill
 ; STM32F401: all pins are 5V tolerant (25 5V PWM pins)
 ; STM32F411: PA0(pin10) and PB5(pin41) are 3.3V only (23 5V PWM pins)
 ;            PA11(pin32) prevents device from being recognized in windows
 ;            15 PWM pins assigned
 ;                  ________T4________  ______T1______  ________T3________  ________T2________
 ;                  CH4  CH3  CH2  CH1  CH3   CH2  CH1  CH4  CH3  CH2  CH1  CH4  CH3  CH2  CH1 */
const byte pin[] = {PB9, PB8, PB7, PB6, PA10, PA9, PA8, PB1, PB0, PA7, PA6, PA3, PA2, PA1, PA15};
const char *msg = "Black Pill 2char PWM: connected.  ";

#else

/* Blue Pill: seven 5V tolerant pins until PB1, then 3.3V excluding PS15
 ;                  ________T4________  ______T1______  ________T3________  ________T2________
 ;                  CH4  CH3  CH2  CH1  CH3   CH2  CH1  CH4  CH3  CH2  CH1  CH4  CH3  CH2  CH1 */
const byte pin[] = {PB9, PB8, PB7, PB6, PA10, PA9, PA8, PB1, PB0, PA7, PA6, PA3, PA2, PA1};//PA15};
const char *msg = "blek2char Blue Pill: connected.  ";

#endif                // BLACKPILL

const byte num_pwm = sizeof(pin);
byte tmin[num_pwm], tmax[num_pwm], *LUT=NULL;   // e.g. per-channel offsets, tmax
byte gain[num_pwm], spare[num_pwm];             // room to grow
#define NL 4                                    // base 0 LUT count
byte* table[NL+1] = {tmin, tmax, gain, spare};  // subtract 5 from special to index table[]
byte active_PWMs = 4, Lcount = 0, Lidx = 0, Lid = 0;
Servo servo[num_pwm];
byte min_defaults[] = {52,52,52,52,52,52,52,52,52,52,52,52,52,52,52};  // initial servo min angles; 52 + 126 = 178
byte tmax_defaults[] = {126,126,126,126,126,126,126,126,126,126,126,126,126,126,126};     // tension thresholds for overload echo '*'

byte info_level = 0;  // commands in 6 lsb of character after 0x5F
byte loading = 0;     // state: waiting for second character
const int max_cols = 180;  // roughly 180 column SimHub incoming serial data display width
const char *hex = "0123456789ABCDEF";
int col = 0;


void setup() {            // setup() code runs once
  pinMode(LED, OUTPUT);   // initialize output digital pin connected to green LED
  digitalWrite(LED, LOW); // turn on LED by pulling pin LOW

  for (byte i = 0; i < active_PWMs; i++) {
    servo[i].attach(pin[i]);
    servo[i].write(tmin[i] = min_defaults[i]);  // initialize servo positions
  }

  // Initialize serial and wait for port to be opened:
  Serial.begin(115200);
  while (!Serial)
    delay(1);               // wait for native USB serial port to connect
  Serial.write(msg);
  digitalWrite(LED, HIGH);  // extinguish LED until possible tension clipping
}


// loop() is Arduino's designated user routine which main() calls often.
void loop() {
  if (0 < Serial.available()) {
    byte received = Serial.read();

    if (3 == info_level) {               // echo hex
      char h[4] = "   "; h[1] = hex[received >> 4]; h[2] = hex[15 & received];
      Serial.write(h);
      col += 3;
    }

    if (0x7F == received) {
      Serial.write("resetting...  ");
      info_level = (loading = col = 0);
      for (byte i = 0; i < active_PWMs; i++) {
        tmax[i] = tmax_defaults[i];
        servo[i].write(tmin[i] = min_defaults[i]);  // initial servo positions
      }
      Serial.write(msg);
    }

    else if (4 == info_level) {          // echo ASCII values
      if (10 == received) {
        Serial.write('\n');              // special case new line
        col = 0;
      }
      else if (32 > received) {
        Serial.write('x');
        Serial.write(hex[received >> 4]);
        Serial.write(hex[15 & received]);
        Serial.write(' ');
        col += 3;
      }
      else {
        Serial.write((char)received);
        col++;
      }
    }

    else if (0x40 & received && LUT == NULL) {  // sync bit == 1
      digitalWrite(LED, LOW);                   // illuminate LED
      if (loading) {  // did preceding character also have 0x40 set?
        if (2 <= info_level) {
          Serial.write("sync error: consecutive characters with 0x40 bit set\n");
          col = 0;
        }
        else if (1 == info_level) {
          Serial.write('E');
          col++;
        }
        loading = 0;
      }
      else loading = received;
    }

    else if (loading) {                     // sync bit == 0
      if (Lcount) {                         // LUT load in progress?
        if (Lidx < active_PWMs && Lid < NL)
          LUT[Lidx++] = received;
        else {
          if (Lid >= NL)
            Lidx++;                         // run thru the count
          Serial.write("\nWARNING: ignoring LUT entry that would overflow allocated space!\n");
          col = 0;
        }
        if (Lcount <= Lidx) {
          LUT = NULL;
          Lcount = loading = Lidx = 0;
        }
        return;
      }

      if (LUT) {                            // LUT load initiating?
        if (active_PWMs != received) {
          Serial.write("\nWARNING: LUT length "); Serial.print(received);
          Serial.write(" != active PWM count "); Serial.println(active_PWMs);
        }
        if (!received) {
          LUT = NULL;
          loading = 0;
        }
        else {
          Lcount = received;
          if(Lid < NL) {
            Serial.write(" Loading "); Serial.print(received); Serial.write(" bytes to LUT "); Serial.print(Lid); Serial.write(": ");
            col += 29;
          }
          Lidx = 0;
        }
        return;
      }

      if (0x5F == loading) {                // info_level?
        if (4 < received) {                 // LUT loading
          Lid = received - 5;
          if (NL <= Lid) {
            Serial.write("ignoring info_level exceeding defined LUTs: ");
            Serial.println(received);
            col = 0;
          }
          else LUT = table[Lid];             // point to the LUT
          digitalWrite(LED, LOW);            // illuminate LED during LUT loads
          return;                            // continue loading
        }

        if (info_level != received) {        // info_level change?
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

      else {                                      // write to servo
        digitalWrite(LED, HIGH);                  // extinguish LED
        byte addr = 0x1F & loading;               // really only 5 lsb;

        received |= ((0x20 & loading) << 1);      // restore msb of 7-bit data

        if (30 == addr) {                         // active PWM count
          if (num_pwm < received) {
            Serial.write("Error: active_PWMs update exceeds available pins ");
            Serial.print(num_pwm);
            Serial.write(": ");
            Serial.println(received);
            col = 0;
            received = num_pwm;                   // ignore invalid setting
          }
          for (byte i = received - 1; i < active_PWMs; i++)
            servo[i].detach();
          for (byte i = active_PWMs - 1; i < received; i++) {
            tmin[i] = min_defaults[i];
            servo[i].attach(pin[i]);
          }
          active_PWMs = received;
          Serial.write("active_PWMs: ");
          Serial.print(received);
        }

        else if (active_PWMs > addr) {
          if (tmax[addr] <= received || 1 > received) {  // clipping
            digitalWrite(LED, LOW);  // illuminate LED
            if (1 == info_level) {
              Serial.print(addr);
              Serial.write((1 > received) ? "# " : "* ");
              col += 3;
            }
            else if (2 & info_level) {
              Serial.write((1 > received) ? '#' : '*');
              col++;
              if(2 == info_level) {
                Serial.write(" Channel "); Serial.print(addr+": "+received);
                if (1 > received)
                  Serial.write(" <= 0\n");
                else Serial.println(">= "+tmax[addr]);
                col = 0;
              }
            }
            if (tmax[addr] <= received)
              received = tmax[addr];
          }
          else if (2 == info_level) { // servo:value
            Serial.write(' ');
            Serial.print(addr);
            Serial.write(':');
            Serial.print(tmin[addr] + received);
            //Serial.write(':');
            //Serial.print(received);
            col += 7;
          }
          servo[addr].write(tmin[addr] + received);
        }                          // active_PWMs > addr
        else {
          digitalWrite(LED, LOW);  // illuminate LED
          if (2 & info_level) {
            Serial.write("channel address beyond active range of ");
            Serial.print(active_PWMs);
            Serial.write(": ");
            Serial.println(addr);
            col = 0;
          }
          else if (1 == info_level) {
            Serial.write("E");
            col++;
          }
        }
      }                        // write to servo
      loading = 0;
    }                          // sync bit == 0

    else {                     // NOT loading
      digitalWrite(LED, LOW);  // illuminate LED
      if (2 & info_level) {
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
  }        // 0 < Serial.available()
}
