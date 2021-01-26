---
title: Arduino for Black or Blue Pill, ESP8266
---

#### Background
Arduino originally employed microcontrollers lacking USB support.  
The workaround involved USB-to-TTL converter chips,  
usually configured as USB COM devices for serial IO,  
which microcontrollers traditionally support.
  
While not an official Arduino platform,  
[WeMos D1 UNO R1](ESPduino) is an ESP8266 board,  
communicating via CH340 USB-serial chip.
 
While STM32 chips generally can support USB directly,  
the Blue Pill's chip lacks USB bootloader support.       
