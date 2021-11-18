# Description

### Libraries to support [ESP32-S2-Saola-1 Arduino sketches](https://github.com/blekenbleu/midi_examples)
- [**esp32s2LED**](https://github.com/blekenbleu/esp32s2LED)  
   wrappers for [Freenove_WS2812_Lib_for_ESP32](Freenove_WS2812_Lib_for_ESP32) and [ESP32_S2_ISR_Servo](https://github.com/khoih-prog/ESP32_S2_ISR_Servo)  
   for use with sketches expecting traditional library support

- [Freenove_WS2812_Lib_for_ESP32](file:///C:/Users/bleke/Documents/Arduino/libraries/Freenove_WS2812_Lib_for_ESP32)
  from [Arduino](https://www.arduino.cc/reference/en/libraries/freenove-ws2812-lib-for-esp32/)   
    Controls ws2812b RGB LED on ESP32  
    Arduino install by:  `Sketch > Include Library > Manage Libraries`  
  Sample `midi.ino` reported many redefined's: `CFG_TUSB_RHPORT0_MODE, CFG_TUSB_OS, CFG_TUD_CDC, CFG_TUD_MSC, CFG_TUD_HID, CFG_TUD_MIDI, CFG_TUD_VIDEO, CFG_TUD_DFU_RUNTIME, CFG_TUD_VENDOR`

- [ESP32_S2_ISR_Servo](https://github.com/khoih-prog/ESP32_S2_ISR_Servo)  
  Support for up to 16 PWM hobby servos using one hardware timer interrupt  

- [ESP32TinyUSB](https://github.com/blekenbleu/TinyMIDIUSB) from [GitHub](https://github.com/chegewara/EspTinyUSB)  
  originally from [Arduino](https://www.arduino.cc/reference//en/libraries/esp32tinyusb), but wanted change[s]  
  `msc/flashdisk.cpp` and `flashdisk.h` were hacked to stifle warnings  
  `arduino-1.8.16/portable/packages/esp32` is built with different compiler flags than `Documents\Arduino\hardware\espressif`; problematic for `libfatfs`    
   TinyUSB device enabling is configured in `hardware/espressif/esp32/tools/sdk/esp32s2/include/arduino_tinyusb/include/tusb_config.h`
  `libfatfs` warning may be affected by `CFG_TUSB_MEM_ALIGN` e.g in the same file.

- [**TinyMIDIUSB**](https://github.com/blekenbleu/TinyMIDIUSB)  
  wrapper for [ESP32TinyUSB](https://github.com/blekenbleu/TinyMIDIUSB),
  replacing Arduino's [MIDIUSB](https://www.arduino.cc/reference/en/libraries/midiusb/)  
  to enable using generic Arduino MIDI sketches with ESP32-S2  
  `MIDIUSB.h` includes `"esptinyusb.h"` as well as `"Tmidiusb.h"` copied from `ESP32TinyUSB/src/midiusb.h`  
   to work around a seeming Arduino bug.  

- [MIDI_Library](file:///C:/Users/bleke/Documents/Arduino/libraries/MIDI_Library) from [Arduino](https://www.arduino.cc/reference/en/libraries/midi-library/)  
  provides `MIDI.h`;   includes `midiusb.h`, `serialMIDI.h`  

- [USB-MIDI](file:///C:/Users/bleke/Documents/Arduino/libraries/USB-MIDI) from [Arduino](https://www.arduino.cc/reference/en/libraries/usbmidi/)  
  provides `midiusb.h`;  depends on `MIDIUSB.h`, using `MidiUSB.read()`, `MidiUSB.sendMIDI(packet)` and `MidiUSB.flush()`, while not declaring `MidiUSB`  
  Provides transport layer for the Arduino MIDI Library and Arduino's MIDIUSB;  
  compatibly with AppleMIDI, ipMIDI and BLE-MIDI transports.

- [AsyncTCP](file:///C:/Users/bleke/Documents/Arduino/libraries/AsyncTCP) from [GitHub](https://github.com/me-no-dev/AsyncTCP)
- [ESPAsyncWebServer](file:///C:/Users/bleke/Documents/Arduino/libraries/ESPAsyncWebServer) from [GitHub](https://github.com/me-no-dev/ESPAsyncWebServer)  
  will be used to serve sliders for a MIDI control surface

#### Libraries with possibly interesting examples:
- [Control Surface](https://github.com/tttapa/Control-Surface) provides support and extensive documentation for MIDI control surface sketches.  

#### How to install [libraries from Arduino](https://www.arduino.cc/en/Guide/Libraries?setlang=en)  
#### Disabling libraries bundled with Arduino:  
`bleke@ALIENWARE-R7 MSYS /d/packages/Arduino/arduino-1.8.16/libraries`  
`$ mv Adafruit_Circuit_Playground Esplora Firmata Keyboard Mouse Robot_Motor ../not_libraries/`  

#### Where Arduino builds and caches objects
`/c/Users/bleke/AppData/Local/Temp/arduino_build_857189/core`  
`/c/Users/bleke/AppData/Local/Temp/arduino_build_857189/libraries`  

#### [Changing the `Tools > Board selection` causes Arduino's cache to be cleared](https://forum.arduino.cc/t/how-to-rebuild-3rd-party-library/527157) e.g. for library rebuilds  

### ESP32TinyUSB Known issue
Library currently is not working with vanila arduino-esp32,
 due to some tinyusb callbacks cant be overriden and are used by arduino-esp32.
 To make it work required adding `__attribute__ ((weak)) ` in 3 lines in local arduino file:
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L266
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L275
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L284

#### disabling ESP32TinyUSB devices not of interest
`hardware/espressif/esp32/tools/sdk/esp32s2/include/arduino_tinyusb/include/tusb_config.h`  
`hardware/espressif/esp32/tools/sdk/esp32s2/include/config/sdkconfig.h`  
