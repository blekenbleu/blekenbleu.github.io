# Description

### Libraries to support [ESP32-S2-Saola-1 Arduino sketches](https://github.com/blekenbleu/midi_examples)
- [AsyncTCP](file:///C:/Users/bleke/Documents/Arduino/libraries/AsyncTCP) from [GitHub](https://github.com/chegewara/EspTinyUSB)
- [esp32s2LED](file:///C:/Users/bleke/Documents/Arduino/libraries/esp32s2LED) wrapper for [Freenove_WS2812_Lib_for_ESP32](Freenove_WS2812_Lib_for_ESP32)
- [ESPAsyncWebServer](file:///C:/Users/bleke/Documents/Arduino/libraries/ESPAsyncWebServer) from [GitHub](https://github.com/me-no-dev/ESPAsyncWebServer)  
- [Freenove_WS2812_Lib_for_ESP32](file:///C:/Users/bleke/Documents/Arduino/libraries/Freenove_WS2812_Lib_for_ESP32)
  from [Arduino](https://www.arduino.cc/reference/en/libraries/freenove-ws2812-lib-for-esp32/)   
    control ws2812b LED on ESP32  
    install by:  `Sketch > Include Library > Manage Libraries`  
  Sample `midi.ino` reported many redefined's: CFG_TUSB_RHPORT0_MODE, CFG_TUSB_OS, CFG_TUD_CDC, CFG_TUD_MSC, CFG_TUD_HID, CFG_TUD_MIDI, CFG_TUD_VIDEO, CFG_TUD_DFU_RUNTIME, CFG_TUD_VENDOR
- [ESP32TinyUSB](file:///C:/Users/bleke/Documents/Arduino/libraries/ESP32TinyUSB) from [Arduino](https://www.arduino.cc/reference//en/libraries/esp32tinyusb)  
  provides `midiusb.h`  
- [MIDI_Library](file:///C:/Users/bleke/Documents/Arduino/libraries/MIDI_Library) from [Arduino](https://www.arduino.cc/reference/en/libraries/midi-library/)  
  provides `MIDI.h`  
- [MIDIUSB](file:///C:/Users/bleke/Documents/Arduino/libraries/MIDIUSB) from [Arduino](https://www.arduino.cc/reference/en/libraries/midiusb/) - does NOT support ESP32-S2-Saola-1  
    allows *other* Arduino microcontrollers with native USB to appear as MIDI peripherals
- [USB-MIDI](file:///C:/Users/bleke/Documents/Arduino/libraries/USB-MIDI) from [Arduino](https://www.arduino.cc/reference/en/libraries/usbmidi/)  
  depends on MIDIUSB  
  Provides transport layer for the Arduino MIDI Library and Arduino's MIDIUSB;  
  compatibly with AppleMIDI, ipMIDI and BLE-MIDI transports.

#### Libraries with possibly interesting examples:
- [esp-idf](file:///C:/Users/bleke/Documents/Arduino/esp-idf) from [GitHub](https://github.com/espressif/esp-idf/tree/release/v4.4) - switched from master to release 4.4  
  Arduino reports this as Invalid library: no headers files (.h) found  
  It was downloaded to understand TinyUSB changes and  
  MIDI that is seemingly missing from the [Arduino ESP32 package](https://github.com/espressif/arduino-esp32)

#### How to install [libraries from Arduino](https://www.arduino.cc/en/Guide/Libraries?setlang=en)  
#### Installing Arduino libraries from GitHub by clone, using GitHub Desktop
    ... which handles submodule automagically...  
In [GitHub Desktop](https://desktop.github.com):  
- File > Clone repository...
- URL
- fill in username/repository, e.g. `chegewara/EspTinyUSB`  
- fill in Local path. e.g. `C:\Users\popeye\Documents\Arduino\libraries`
- push clone
- the Arduino IDE console window will show complaints about an invalid library


## ESP32TinyUSB Known issue
Library currently is not working with vanila arduino-esp32,
 due to some tinyusb callbacks cant be overriden and are used by arduino-esp32.
 To make it work required adding `__attribute__ ((weak)) ` in 3 lines in local arduino file:
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L266
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L275
https://github.com/espressif/arduino-esp32/blob/master/cores/esp32/esp32-hal-tinyusb.c#L284
