---
title: Arduino for Blue Pill
---
*updated 28 Jan 2021*

#### Background
Arduino originally employed microcontrollers lacking USB support.  
Their workaround involved boards with USB-to-TTL converter chips,  
usually configured as USB COM devices for serial IO,  
which microcontrollers traditionally support.
  
While not an official Arduino platform,  
[WeMos D1 UNO R1](ESPDuino) is a supported ESP8266 board,  
communicating via CH340 USB-serial chip.
 
While STM32 chips typically can support USB directly,  
the Blue Pill's chip lacks USB bootloader support in ROM.  

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

STM32duino expects a USB bootloader at the start of flash,  
which gets launched by the ROM bootloader,  
then that USB bootloader installs sketches above it in flash.  

A clone ST-LINK V2 costs no more than a USB COM dongle,  
connects to otherwise unused Blue Pill pins and supports debug.  
Clone USB COM dongles *may not* support 3.3V to Blue Pill pins..  
Blue Pill boot jumpers are unchanged for flashing by ST-LINK.  

#### Time lurches on: STM32duino
Many STM32 Arduino projects and websites use [Roger Clark's core](https://github.com/rogerclarkmelbourne/Arduino_STM32) and bootloader,  
but STM now supports an stm32duino [core](https://github.com/stm32duino/Arduino_Core_STM32/releases)
and [board manager](https://raw.githubusercontent.com/stm32duino/BoardManagerFiles/master/STM32/package_stm_index.json),  
for which there is now an [HID bootloader](https://github.com/Serasidis/STM32_HID_Bootloader),
as described [on YouTube](https://www.youtube.com/watch?v=Myon8H111PQ).  
That video installs the Blue Pill serial bootloader via USB COM dongle,   
but we will here describe using an [ST-LINK V2 clone](https://www.ebay.com/itm/183320329257).  
My clone happens to have the *correct pinout* printed on its cover;  
slide that cover partly open (along the USB plug) to **check board pin artwork:**  
![ST-LINK pin artwork](ST-Link.jpg)  

[Here is the **Arduino for STM32** forum](https://www.stm32duino.com).  It replaced an earlier one.  
[Here is the READ-ONLY version of that earlier Arduino for STM32 forum](https://stm32duinoforum.com/forum/index_php.html).  
[Here is the Arduino software page](https://www.arduino.cc/en/software).  

### ST-LINK and Blue Pill
This [YouTube video](https://www.youtube.com/watch?v=KgR3uM21y7o) programs a Blue Pill
by ST-LINK using [STM32 ST-LINK utility](https://www.st.com/en/development-tools/stsw-link004.html).  
[This was the first *useful* page](https://medium.com/coinmonks/coding-the-stm32-blue-pill-with-rust-and-visual-studio-code-b21615d8a20)
found for wiring Blue Pill to ST-LINK V2 clone:
![wiring Blue Pill to ST-LINK V2 clone](https://miro.medium.com/max/875/1*pFNIcoAq2s3l4lwsM0gj8w.jpeg)  
![wiring chart](https://miro.medium.com/max/533/1*NwPYrVoPUbciDWzvGsTavQ.png)  
Do **NOT** connect USB or other power to Blue Pill with 3.3V connected to ST-LINK!  
Put another way, when using ST-LINK for debugging,  
  **do NOT connect 3.3V to Blue Pill from ST-LINK**.  

### Installing (by Windows ST-LINK) Blue Pill HID bootloader for STM core
 - For Windows, stlink-org tools depend on STM's ST-LINK driver,  
   bundled with [STM32 ST-LINK utility](https://www.st.com/en/development-tools/stsw-link004.html),  
   which utility was *also* wanted for updating clone ST-LINK firmware.  
 - Since *already* using [STM32 ST-LINK utility](https://www.st.com/en/development-tools/stsw-link004.html), also use it to install HID bootloader.
 - These instructions apply *specifically* for 64-bit Windows, ST-LINK clone,  
   HID-bootloader, Blue Pill and STM core.  

1) Download and install [STM32 ST-LINK utility](https://www.st.com/en/development-tools/stsw-link004.html)  
   in my case, to D:\packages\STM32\
2) Plug bare ST-LINK clone into USB.  
   If it shows up in **Device Manager** under **Other devices** (with a yellow warning),  
   then drivers *were not* installed; see 1)  
   else it should appear under **Universal Serial Bus Devices**.
3) Launch **STM32 ST-LINK Utility.exe**  
   in my case,  
D:\packages\STM32\STM32 ST-LINK Utillity v.4.6.0\ST-LINK Utility\STM32 ST-LINK Utility.exe
4) Select ST-LINK > Firmware update  
   click Device Connect
   click Yes>>>>
5) Unplug ST-LINK clone from USB and wire it to Blue Pill as shown above.
6) Connect Blue Pill BOOT-0 and BOOT-1 pins (or on-board jumpers) to '0'  
   *and leave them*!  
   Disconnect everything except ST-LINK from Blue Pill, and plug ST-LINK to USB.  
7) Download stm32_binaries.zip from [the latest HID Bootloader release](https://github.com/Serasidis/STM32_HID_Bootloader/releases)  
   From it, extract:  hid_generic_pc13.bin  
   (*Blue Pill on-board LED is connected to pin PC13*)  
   in my case, to D:\packages\STM32\
8) To flash HID Bootloader to a Blue Pill, in STM32 ST-LINK Utility:  
   File > Open File... > hid_generic_pc13.bin  
   Target > Program... > **Start address** 0x8000000 **File path** D:\packages\STM32\hid_generic_pc13.bin
   ![Download](Download.gif)  
   click **Start** (*that should complete quickly*)  
   (*Blue Pill red LED on for power, green LED flickers quickly*)  
   Unplug ST-LINK, unwire ST_LINK from Blue Pill,  
     and connect Blue Pill to USB.  
   (*Blue Pill red LED on for power, green LED flickers quickly*)

### Installing STM32duino support
Since GitHub already includes an older version of Arduino,  
install the portable (ZIP file) version for STM32;  
no need to install Arduino-specific driver[s]...
1) Download, unzip, and run [Arduino](https://www.arduino.cc/en/software)  
   in my case, to E:\my\Arduino\  
   *much of the next is thanks to [sgbotic](https://www.sgbotic.com/index.php?dispatch=pages.view&page_id=48)*
2) Go to **File > Preferences**, add to **Additional Board Manager URLs** text box:
   [https://github.com/stm32duino/BoardManagerFiles/raw/master/STM32/package_stm_index.json](https://github.com/stm32duino/BoardManagerFiles/raw/master/STM32/package_stm_index.json)
3) Go to **Tools > Board > Boards Manager**, enter search for **STM32**:  
   ![Boards Manager STM32 search](https://www.sgbotic.com/images/companies/1/learn/F103_Arduino/board_manager_install.png?1596271243306)  
   click **STM32 Cores**, then **Install**  (*takes awhile*)  
4) Quit and restart Arduino; from **Tools > Board: > STM32 Boards**,  
   select [Generic STM32F1 series]. 
   From **Tools > Board Part Number:**, select [BluePill F103C8].  
   From **Tools > Upload method:**, select [HID Bootloader 2.1] or newer.  
   ![Tools mmenu](tools.gif)  

   **Port:** COM[5] is unavailable until a sketch is loaded, e.g. Blue_Blink.ino:
![Blue_Blink sketch](Blue_Blink.gif)   

Here is a Blue Pill pinout reference:
![Generic STM32F103 board pinout](https://www.electronicshub.org/wp-content/uploads/2020/02/STM32F103C8T6-Blue-Pill-Pin-Layout.gif)  
- 5V tolerant PWM pins are wanted for driving hobby servos, e.g. PA8-10 and PB6-9.  
- 5V tolerant CAN BUS pins PB8,9 look good.

The easiest next step would be to add servos to the blink loop sketch.  
As an additional test, this new sketch is under Git revision control,  
with a shortcut to that sketch folder in the Arduino "work" folder.  
Both of these ploys appear to work; the sketch runs..  
