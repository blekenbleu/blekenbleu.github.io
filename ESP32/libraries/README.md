# Description

Libraries to support [ESP32-S2-Saola-1 Arduino sketches](https://github.com/blekenbleu/midi_examples)
- [midi](midi) from [EP32TinyUSB](https://github.com/chegewara/EspTinyUSB) examples  
- [midi_test](midi_test) from [Adafruit_TinyUSB_Arduino](https://github.com/adafruit/Adafruit_TinyUSB_Arduino)  
- [Basic_IO](Basic_IO) from [MIDI_Library](https://github.com/FortySevenEffects/arduino_midi_library)
- [RGBW](RGBW) from [Freenove WS2812 Lib for ESP32](https://www.arduino.cc/reference/en/libraries/freenove-ws2812-lib-for-esp32)
- [ESPAsyncWebServer](ESPAsyncWebServer) from [ESP32-S2/Arduino (ESP32-S2-Saola-1) web server control onboard RGB LED (NeoPixel)](http://arduino-er.blogspot.com/2021/04/esp32-s2arduino-esp32-s2-saola-1-web.html)  

# Hardware
To use native ESP32-S2 USB needs connecting pins 19 and 20 to usb cable or with similar connectors:
![](https://eji4evk5kxx.exactdn.com/wp-content/uploads/2020/10/ESP32-S2-DevKit-LiPo-Battery-Board-Pinout-768x330.jpg)


## ESP32TinyUSB Known issue
Currently library is not working with vanila arduino-esp32,
 due to some tinyusb callbacks cant be overriden and are used by arduino-esp32.
 To make it work required adding `__attribute__ ((weak)) ` in 3 lines in local arduino file:
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L266
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L275
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L284

