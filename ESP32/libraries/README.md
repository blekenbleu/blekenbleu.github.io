# Description

### Libraries to support [ESP32-S2-Saola-1 Arduino sketches](https://github.com/blekenbleu/midi_examples)
- [AsyncTCP](file:///C:/Users/bleke/Documents/Arduino/libraries/AsyncTCP) from [GitHub](https://github.com/me-no-dev/AsyncTCP)
- [**esp32s2LED**](https://github.com/blekenbleu/esp32s2LED) wrapper for [Freenove_WS2812_Lib_for_ESP32](Freenove_WS2812_Lib_for_ESP32)
- [ESPAsyncWebServer](file:///C:/Users/bleke/Documents/Arduino/libraries/ESPAsyncWebServer) from [GitHub](https://github.com/me-no-dev/ESPAsyncWebServer)  
- [Freenove_WS2812_Lib_for_ESP32](file:///C:/Users/bleke/Documents/Arduino/libraries/Freenove_WS2812_Lib_for_ESP32)
  from [Arduino](https://www.arduino.cc/reference/en/libraries/freenove-ws2812-lib-for-esp32/)   
    control ws2812b LED on ESP32  
    install by:  `Sketch > Include Library > Manage Libraries`  
  Sample `midi.ino` reported many redefined's: CFG_TUSB_RHPORT0_MODE, CFG_TUSB_OS, CFG_TUD_CDC,
        CFG_TUD_MSC, CFG_TUD_HID, CFG_TUD_MIDI, CFG_TUD_VIDEO, CFG_TUD_DFU_RUNTIME, CFG_TUD_VENDOR

- [ESP32TinyUSB](https://github.com/blekenbleu/TinyMIDIUSB) from [GitHub](https://github.com/chegewara/EspTinyUSB)  
  originally from [Arduino](https://www.arduino.cc/reference//en/libraries/esp32tinyusb), but wanted change[s]  
  `msc/flashdisk.cpp` and `flashdisk.h` were hacked to stifle warnings  
  `arduino-1.8.16/portable/packages/esp32` is built with different compiler flags than `Documents\Arduino\hardware\espressif`; problematic for `libfatfs`    

- [**TinyMIDIUSB**](https://github.com/blekenbleu/TinyMIDIUSB) wrapper for [ESP32TinyUSB](https://github.com/blekenbleu/TinyMIDIUSB)
   to emulate Arduino [MIDIUSB](https://www.arduino.cc/reference/en/libraries/midiusb/)  
  `MIDIUSB.h` includes `"esptinyusb.h"` as well as `"Tmidiusb.h"` renamed from `midiusb.h`  
   to work around Arduino bug.  

- [MIDI_Library](file:///C:/Users/bleke/Documents/Arduino/libraries/MIDI_Library) from [Arduino](https://www.arduino.cc/reference/en/libraries/midi-library/)  
  provides `MIDI.h`;  *usually* includes `midiusb.h`, `serialMIDI.h`  

- [MIDIUSB](file:///C:/Users/bleke/Documents/Arduino/libraries/MIDIUSB) from [Arduino](https://www.arduino.cc/reference/en/libraries/midiusb/)  
  *usually* provides `MIDIUSB.h`
    - does NOT support ESP32-S2-Saola-1  
    allows *other* Arduino microcontrollers with native USB to appear as MIDI peripherals

- [USB-MIDI](file:///C:/Users/bleke/Documents/Arduino/libraries/USB-MIDI) from [Arduino](https://www.arduino.cc/reference/en/libraries/usbmidi/)  
  provides `midiusb.h`;  depends on `MIDIUSB.h`, using `MidiUSB.read()`, `MidiUSB.sendMIDI(packet)` and `MidiUSB.flush()`, while not declaring `MidiUSB`  
  Provides transport layer for the Arduino MIDI Library and Arduino's MIDIUSB;  
  compatibly with AppleMIDI, ipMIDI and BLE-MIDI transports.

#### Libraries with possibly interesting examples:
- [Control Surface](https://github.com/tttapa/Control-Surface) provides support and extensive documentation for MIDI control surface sketches.  

#### How to install [libraries from Arduino](https://www.arduino.cc/en/Guide/Libraries?setlang=en)  
#### Disabling libraries bundled with Arduino:  
`bleke@ALIENWARE-R7 MSYS /d/packages/Arduino/arduino-1.8.16/libraries`  
`$ mv Adafruit_Circuit_Playground Esplora Firmata Keyboard Mouse Robot_Motor ../not_libraries/`  
#### Installing Arduino libraries from GitHub by clone, using GitHub Desktop
    ... which handles submodule automagically...  
In [GitHub Desktop](https://desktop.github.com):  
- File > Clone repository...
- URL
- fill in username/repository, e.g. `chegewara/EspTinyUSB`  
- fill in Local path. e.g. `C:\Users\popeye\Documents\Arduino\libraries`
- push clone
- the Arduino IDE console window will show complaints about an invalid library

#### Where Arduino builds and caches objects
`/c/Users/bleke/AppData/Local/Temp/arduino_build_857189/core`  
`/c/Users/bleke/AppData/Local/Temp/arduino_build_857189/libraries`  

#### [Changing the `Tools > Board selection` causes Arduino's cache to be cleared](https://forum.arduino.cc/t/how-to-rebuild-3rd-party-library/527157) e.g. for library rebuilds  

## ESP32TinyUSB Known issue
Library currently is not working with vanila arduino-esp32,
 due to some tinyusb callbacks cant be overriden and are used by arduino-esp32.
 To make it work required adding `__attribute__ ((weak)) ` in 3 lines in local arduino file:
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L266
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L275
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L284
