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
    [STM32duino Bootloader](https://stm32duinoforum.com/forum/wiki_subdomain/index_title_Bootloader.html) AKA bootloader 2.0  
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
Blue Pill boot jumpers are unchanged for flashing by ST-Link.  

#### Time lurches on: STM32duino
Many STM32 Arduino projects and websites use [Roger Clark's core](https://github.com/rogerclarkmelbourne/Arduino_STM32) and bootloader,  
but STM now supports an stm32duino [core](https://github.com/stm32duino/Arduino_Core_STM32/releases)
and [board manager](https://raw.githubusercontent.com/stm32duino/BoardManagerFiles/master/STM32/package_stm_index.json),  
for which there is now an [HID bootloader](https://github.com/Serasidis/STM32_HID_Bootloader),
as described [on YouTube](https://www.youtube.com/watch?v=Myon8H111PQ).  
That video describes using the Blue Pill serial bootloader via USB COM dongle,   
but we will here describe using an [ST-Link V2 clone](https://www.ebay.com/itm/183320329257).  
My clone happens to have the *correct pinout* printed on its cover;  
slide that cover partly open (along the USB plug) to **check board pin artwork:**  
![ST-Link pin artwork](ST-Link.jpg)  

[Here is the Arduino for STM32 bulletin board](https://www.stm32duino.com).  It replaced an earlier one.  
[Here is the READ-ONLY version of that earlier Arduino for STM32 forum](https://stm32duinoforum.com/forum/index_php.html).  
[Here is the Arduino software page](https://www.arduino.cc/en/software).  

### ST-Link and Blue Pill
This [YouTube video](https://www.youtube.com/watch?v=KgR3uM21y7o) programs a Blue Pill
by ST-LINK using [STM32 ST-LINK utility](https://www.st.com/en/development-tools/stsw-link004.html).  
[This was the first *useful* page](https://medium.com/coinmonks/coding-the-stm32-blue-pill-with-rust-and-visual-studio-code-b21615d8a20)
found for wiring Blue Pill to ST-LINK V2 clone:
![wiring Blue Pill to ST-Link V2 clone](https://miro.medium.com/max/875/1*pFNIcoAq2s3l4lwsM0gj8w.jpeg)  
![wiring chart](https://miro.medium.com/max/533/1*NwPYrVoPUbciDWzvGsTavQ.png)  
Do **NOT** connect USB or any other power to Blue Pill while 3.3V is connected to ST-Link!  
Put another way, when using ST-LINK for debugging,  
  **do NOT connect 3.3V to Blue Pill from ST-Link**.  

### Installing (by Windows ST-Link) Blue Pill HID bootloader for STM core
Since *only* for ST-Link, Blue Pill and STM core, instructions [have been simplified](https://github.com/Serasidis/STM32_HID_Bootloader/blob/master/README.md):  
1) Download stlink.org [stlink Tools for Windows (v1.3.0)](https://github.com/stlink-org/stlink/releases/tag/v1.3.0)  
2) Extract stlink-1.3.0-win64.zip to your hard disk.  
   In step 6., you will be running st-flash.exe (it is in the bin folder).  
3) Download stm32_binaries.zip from [the latest HID Bootloader release](https://github.com/Serasidis/STM32_HID_Bootloader/releases)  
   From it, extract:  hid_generic_pc13.bin
4) Copy hid_generic_pc13.bin into that bin folder.
   The Blue Pill on-board LED is connected to pin PC13.  
5) Connect BOOT-0 and BOOT-1 pins (or on-board jumpers) to '0' *and leave them*!  
   disconnect everything except ST-Link from Blue Pill and plug ST-LinK to USB
6) To flash HID Bootloader to a Blue Pill, type in Windows CMD:  
    st-flash.exe write hid_generic_pc13.bin 0x8000000  
   Here is [stlink Tools Tutorial](https://github.com/stlink-org/stlink/blob/develop/doc/tutorial.md)  
7) From Arduino IDE Tools, select:  
   Board > [your_stm32_board]  
   Upload method > HID Bootloader 2.1 or newer  

