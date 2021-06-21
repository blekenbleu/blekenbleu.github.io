
---
WeMos D1 UNO R1 ESP8266 Arduino UNO-R3 Clone
---

```
http://www.mpja.com/Arduino-UNO-Clone-with-WiFi/productinfo/35097+MP/
http://www.mpja.com/download/35097mpdata.pdf

The above MPJA data sheet claims "Arduino UNO-R3 clone board"
.. where Arduino UNO-R3 added SDA & SCL pins, 5v IOref pin (next to reset)
   maybe 3.3V tolerant shields..?
 https://startingelectronics.org/articles/arduino/uno-r3-r2-differences/
https://www.quora.com/What-is-the-difference-between-an-Arduino-Uno-and-an-Arduino-Uno-R3

It has a D1 UNO R1, not R2:
MPJA Data sheet has current Wemos URL:
https://wiki.wemos.cc/tutorials:get_started:get_started_in_arduino

Includes CH340G USB-serial adapter
- not programmable
- cannot use Windows HID game controller control panel

I/O is 3.3V;  NOT 5V tolerant; most UNO shields would be 5V...
https://www.reddit.com/r/arduino/comments/3znkpv/arduino_uno_esp8266_single_board_wemos_d1_any/

Non-UNO ESP8266 tech info from https://www.amazon.com/dp/B01D1D0EO4
https://nurdspace.nl/ESP8266

Good R2 documentation, including AT commands
https://www.addicore.com/D1-DevBoard-p/ad286.htm

Available IDEs
- Arduino
- NodeMCU  https://frightanic.com/iot/tools-ides-nodemcu/
- PlatformIO https://platformio.org/install
  https://www.survivingwithandroid.com/2016/07/arduino-alternative-ide.html
- Eclipse
https://www.survivingwithandroid.com/2018/08/10-arduino-ide-alternative-to-start-programming.html
http://cyaninfinite.com/tutorials/getting-started-with-the-wemos-d1-esp8266-wifi-board/

https://www.ebay.com/itm/132806428073
https://www.amazon.com/Qunqi-Electronics-ESP-12E-ESP8266-Compatible/dp/B01C6Y5SKY

Programs using free Arduino IDE available from www.arduino.cc
Power: 9-24VDC Not included
Processor: 80Mhz ESP8266 RISC CPU
Digital I/O: 11 with PWM available on all
Analog Input: 1 (A0) (3.2V max) A1-5 not available
Memory: Flash: 4Mb
SRAM: 96Kb
EEPROM: 64Kb
USB Bridge: CH340G USB/TTL (Driver available from many sites)
.1in. Pitch female headers for direct connection to functions
USB port: Micro Type B female
Power Port: 5.5mm X 2.1mm Jack

The ESP8266 is a UART to WiFi SoC
 built around a Tensilica Xtensa LX3 processor
Arduino support added:
https://makezine.com/2015/04/01/esp8266-5-microcontroller-wi-fi-now-arduino-compatible/
https://github.com/esp8266/Arduino

AKA ESPDuino
https://diyprojects.io/unpacking-wemos-d1-r2-espduino-clone-esp8266-development-board-arduino-uno-format/

https://www.amazon.com/dp/B016PNJ40W
"download the ESP8266 profile in the Arduino IDE, then the WeMos flavors will show up in tools>>board. Take a look here:"
 http://esp8266.github.io/Arduino/versions/2.0.0/doc/installing.html

Uno vs WeMos
http://www.vdhsoft.com/$arduino4fun/a4fphpbb/viewtopic.php?t=27
https://forum.arduino.cc/index.php?topic=346064.15
performance comparison (17x UNO)
https://www.youtube.com/watch?v=cZk3LW8bS70

Original D1 vs D1R2 vs D1R3
https://frightanic.com/iot/comparison-of-esp8266-nodemcu-development-boards/#v3
WeMos-D1R2 is based on an ESP8266-12
esp-13 wifi module is more stable
https://www.instructables.com/id/Programming-the-WeMos-Using-Arduino-SoftwareIDE/
https://roboticboyer.wordpress.com/2016/03/13/esp-wemos-d1-version-r1-and-r2/

D1 R1 vs R2, getting started
https://www.youtube.com/watch?v=CZVOp4oVfBk
https://alselectro.wordpress.com/2018/04/14/wifi-esp8266-development-board-wemos-d1/

WeMos D1 R2 vs Uno R3
https://arduino.stackexchange.com/questions/49119/arduino-uno-r3-to-wemos-d1-r2-project-migration-pinout-problems

NodeMCU custom build
https://nodemcu-build.com/faq.php
https://wiki.wemos.cc/tutorials:get_started:get_started_in_nodemcu


Kindle
https://www.amazon.com/ESP8266-Weather-Station-Getting-Started-ebook/dp/B01LFX8Z5W
https://www.amazon.com/Zero-Hero-ESP8266-Manoj-Thakur-ebook/dp/B01MSXZWKR

webserver with dynamically-updated bar graph
https://randomnerdtutorials.com/esp8266-web-server/
https://canvasjs.com/html5-javascript-dynamic-chart/

ESP8266 Weather station code
https://github.com/ThingPulse/esp8266-weather-station
https://www.goodreads.com/book/show/31832816-esp8266-weather-station
https://www.wemustbegeeks.com/esp8266-project-extraordinaire-interview-with-daniel-eichhorn/
https://blog.squix.org/wp-content/uploads/2018/09/esp8266weatherstationgettingstartedguide-20180911.pdf

acurite 5n1 weather station decode over 433 mhz ask rx module on esp8266
https://gist.github.com/zerog2k/00bad44d59bcd7937420

board hardware design
https://github.com/iotmakervn/iot-wifi-uno-hw

Mongoose OS
https://blog.squix.org/2017/09/esp8266-and-esp32-interview-with-sergey-lyubka-from-mongoose-os.html

Load cell + HX711
https://blog.squix.org/2016/07/esp8266-turn-a-9-body-scale-into-a-smart-scale-part-1.html

https://github.com/squix78/esp8266-projects/tree/master/arduino-ide/wifi-scale

Ads1115 Module 16 Bit I2c 4 Channel ADC $1.98
https://www.ebay.com/itm/282227009732
description
https://www.adafruit.com/product/1085

ADS1115 with ESP8266
https://www.hackster.io/whatnick/esp8266-iot-energy-monitor-b199ed
https://community.blynk.cc/t/nodemcu-using-adc-extender-ads1115/18511
```
