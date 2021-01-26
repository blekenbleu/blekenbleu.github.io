---
title: Arduino for Black or Blue Pill, ESP8266
---

#### Background
Arduino originally employed microcontrollers lacking USB support.  
The workaround involved USB-to-TTL converter chips,  
usually configured as USB COM devices for serial IO,  
which microcontrollers traditionally support.
  
While not an official Arduino platform,  
[WeMos D1 UNO R1](ESPDuino) is an ESP8266 board,  
communicating via CH340 USB-serial chip.
 
While STM32 chips generally can support USB directly,  
the Blue Pill's chip lacks USB bootloader support.  

There are at least 4 ways to program STM32  
1) SWD via ST-LINK  
2) STM serial bootloader  
   [Load firmware via USART1 by jumpering](https://stm32duinoforum.com/forum/wiki_subdomain/index_title_Bootloader.html#Boot0_and_Boot1_pin_settings)  
   - Boot0 HIGH  
   - Boot1 LOW  
  ... then resetting MCU  
3) DFU (device firmware update) using DfuSe utility,  
    using the [STM32 system memory bootloader in ROM](https://www.st.com/en/development-tools/stsw-stm32080.html),  
    but USB is [**NOT** supported by Blue Pill ROM bootloader](https://stm32duinoforum.com/forum/wiki_subdomain/index_title_Bootloader.html)  
4) (Arduino) USB bootloader[s] <- there have been several:  
    STM32duino Bootloader AKA bootloader 2.0  
    https://stm32duinoforum.com/forum/wiki_subdomain/index_title_Bootloader.html  
   [Maple-derivative bootloaders](https://github.com/jonatanolofsson/maple-bootloader)  
   Maple boards had USB reset hardware to force re-enumeration  
   [Roger Clark's 8k bootloader](https://github.com/rogerclarkmelbourne/STM32duino-bootloader)  
   Not sure which core (libmaple or stm32duino) [this bootloader supports, but is 4k](https://github.com/davidgfnet/stm32-dfu-bootloader)  

STM32duino wants a USB bootloader at the start of flash,  
which gets launched by the ROM bootloader,  
then that USB bootloader installs sketches above it in flash.  

A clone ST-Link V2 costs no more than a USB COM dongle,  
connects to otherwise unused Blue Pill pins and supports debug.  
Clone USB COM dongles may not support 3.3V to Blue Pill pins..  
