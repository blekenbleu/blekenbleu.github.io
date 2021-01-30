---
title: Arduino for Blue Pill
---
*updated 30 Jan 2021*

#### Background
Arduino originally employed microcontrollers lacking USB support.  
Their workaround involved boards with USB-to-TTL converter chips,  
usually configured as USB COM devices for serial IO,  
which microcontrollers traditionally support.
  
While not an official Arduino platform,  
[WeMos D1 UNO R1](ESPDuino) is a supported ESP8266 board,  
communicating via CH340 USB-serial chip.
 
While STM32 chips' ROM bootloaders typically support USB directly,  
Blue Pill's `FC103C8` chip lacks USB bootloader support in ROM.  

There are at least 4 ways to program STM32 chips:  
1) SWD via ST-LINK  
2) STM serial bootloader  
   [Load firmware via USART1 by jumpering](https://stm32duinoforum.com/forum/wiki_subdomain/index_title_Bootloader.html#Boot0_and_Boot1_pin_settings):  
   `Boot0 HIGH`  
   `Boot1 LOW`  
  ... then resetting MCU
3) DFU (device firmware update) using DfuSe utility,  
    using the [STM32 system memory bootloader in ROM](https://www.st.com/en/development-tools/stsw-stm32080.html),  
    but USB is [**NOT** supported by Blue Pill's ROM bootloader](https://stm32duinoforum.com/forum/wiki_subdomain/index_title_Bootloader.html)  
4) (Arduino) USB bootloader[s] <- there have been several:  
    [STM32duino Bootloader](https://stm32duinoforum.com/forum/wiki_subdomain/index_title_Bootloader.html) AKA bootloader 2.0 AKA HID bootloader  
   [Maple-derivative bootloaders](https://github.com/jonatanolofsson/maple-bootloader)  
   Maple boards had USB reset hardware to force re-enumeration  
   [Roger Clark's 8k bootloader](https://github.com/rogerclarkmelbourne/STM32duino-bootloader)  
   Not sure which core (libmaple or stm32duino) [this bootloader supports, but is 4k](https://github.com/davidgfnet/stm32-dfu-bootloader)  

STM32duino expects a USB HID bootloader,  
which gets launched by Blue Pill's ROM bootloader,  
then that USB HID bootloader installs sketches above it in flash.  

A clone ST-LINK V2 costs no more than a USB COM dongle,  
connects to otherwise unused Blue Pill pins and supports debug.  
Clone USB COM dongles *may not* support 3.3V to Blue Pill serial boot pins..  
Blue Pill boot jumpers *are unchanged* when flashing by ST-LINK or HID bootloader.  

#### Time lurches on: STM32duino
Many STM32 Arduino projects and websites use [Roger Clark's core](https://github.com/rogerclarkmelbourne/Arduino_STM32) and bootloader,  
but STM now supports an stm32duino [core](https://github.com/stm32duino/Arduino_Core_STM32/releases)
and [board manager](https://raw.githubusercontent.com/stm32duino/BoardManagerFiles/master/STM32/package_stm_index.json),  
for which there is now an [HID bootloader](https://github.com/Serasidis/STM32_HID_Bootloader),
as described [on YouTube](https://www.youtube.com/watch?v=Myon8H111PQ).  
That video installs the Blue Pill HID bootloader via USB COM dongle,   
but we will here describe using an [ST-LINK V2 clone](https://www.ebay.com/itm/183320329257).  
My clone happens to have the *correct pinout* printed on its cover;  
**Check clone pin artwork** by sliding that cover partly open (along the USB plug):
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
Do **NOT** connect USB or other power to Blue Pill with 3.3V also connected to ST-LINK!  
Put another way, when using ST-LINK for debugging Blue Pill plugged to USB,  
  **do NOT connect 3.3V to Blue Pill from ST-LINK**.  

### Installing (by Windows ST-LINK) Blue Pill HID bootloader for STM core
 - For Windows, stlink-org tools depend on STM's `ST-LINK driver`,  
   bundled with [STM32 ST-LINK utility](https://www.st.com/en/development-tools/stsw-link004.html),  
   which utility was *also* wanted for updating clone ST-LINK firmware.  
 - Since *already* using [STM32 ST-LINK utility](https://www.st.com/en/development-tools/stsw-link004.html), also use it to install HID bootloader.
 - These instructions apply *specifically* for 64-bit Windows, ST-LINK clone,  
   HID-bootloader, Blue Pill and STM core.  

1) Download and install [STM32 ST-LINK utility](https://www.st.com/en/development-tools/stsw-link004.html)  
   in my case, to `D:\packages\STM32\`
2) Plug bare ST-LINK clone into USB.  
   If it shows up in **`Device Manager`** under **`Other devices`** (*with a yellow warning*),  
   then drivers *were not* installed; see 1)  
   else it should appear under **`Universal Serial Bus Devices`**.
3) Launch **`STM32 ST-LINK Utility.exe`**  
   in my case,  
`D:\packages\STM32\ST-LINK Utility\STM32 ST-LINK Utility.exe`
4) Select `ST-LINK` > `Firmware update`  
   click `Device Connect`
   click `Yes>>>>`
5) Unplug ST-LINK clone from USB and wire it to Blue Pill as shown above.
6) Connect Blue Pill `BOOT-0` and `BOOT-1` pins (or on-board jumpers) to `0`  
   ** *and leave them*! **  
   Disconnect everything except ST-LINK from Blue Pill, and plug ST-LINK to USB.  
7) Download `stm32_binaries.zip` from [the latest HID Bootloader release](https://github.com/Serasidis/STM32_HID_Bootloader/releases)  
   From it, extract:  `hid_generic_pc13.bin`  
   (*Blue Pill on-board LED is connected to pin `PC13`*)  
   in my case, to `D:\packages\STM32\`
8) To flash HID Bootloader to a Blue Pill, in STM32 ST-LINK Utility:  
   `File` > `Open File...` > `hid_generic_pc13.bin`  
   `Target` > `Program...` > **`Start address`** `0x8000000` **`File path`** `D:\packages\STM32\hid_generic_pc13.bin`
   ![Download](Download.gif)  
   click **`Start`** (*that should complete quickly*)  
   (*Blue Pill red LED on for power, green LED flickers quickly*)  
   Unplug ST-LINK, unwire ST_LINK from Blue Pill, and connect Blue Pill to USB.  
   (*Blue Pill red LED on for power, green LED flickers quickly*)

### Installing STM32duino support
Since GitHub already includes an older version of Arduino,  
install the portable (ZIP file) version for STM32;  
no need to install Arduino-specific driver[s]...
1) Download, unzip, and run [Arduino](https://www.arduino.cc/en/software)  
   in my case, to `E:\my\Arduino\`  
   *much of the following is thanks to [sgbotic](https://www.sgbotic.com/index.php?dispatch=pages.view&page_id=48)*
2) Go to **`File` > `Preferences`**, add to **`Additional Board Manager URLs`** text box:
   [https://github.com/stm32duino/BoardManagerFiles/raw/master/STM32/package_stm_index.json](https://github.com/stm32duino/BoardManagerFiles/raw/master/STM32/package_stm_index.json)
3) Go to **`Tools` > `Board` > `Boards Manager`**, enter search for **`STM32`**:  
   ![Boards Manager STM32 search](https://www.sgbotic.com/images/companies/1/learn/F103_Arduino/board_manager_install.png?1596271243306)  
   click **`STM32 Cores`**, then **`Install`**  (*takes quite awhile*)  
4) Quit and restart Arduino; then  
   from **`Tools` > `Board:` > `STM32 Boards`**, select [`Generic STM32F1 series`].  
   From **`Tools` > `Board Part Number:`**, select [`BluePill F103C8`].  
   From **`Tools` > `Upload method:`**, select [`HID Bootloader 2.1`] or newer.  
   ![Tools mmenu](tools.gif)  

   Check in Windows' `Device Manager` under `Ports (COM & LPT)` for `USB Serial Device (COM*n*)`,  
   where in my case `n = 5`.    
   **`Port:`** `COM[5]` is unavailable until a sketch is loaded, e.g. [`Blue_Servo`](https://github.com/blekenbleu/blekenbleu.github.io/blob/master/Arduino/Blue_Servo):
![Blue_Blink sketch](Blue_Blink.gif)   

Here is a Blue Pill pinout reference:
![Generic STM32F103 board pinout](https://www.electronicshub.org/wp-content/uploads/2020/02/STM32F103C8T6-Blue-Pill-Pin-Layout.gif)  
- 5V tolerant PWM pins are wanted for driving hobby servos, e.g. `PA8-10` and `PB6-9`.  
- 5V tolerant CAN BUS pins `PB8,9` look good.

A simple next step adds servos to the blink loop sketch.  
As an additional test, [this new sketch](https://github.com/blekenbleu/blekenbleu.github.io/tree/master/Arduino/Blue_Servo) is under Git revision control,  
with a shortcut to that sketch folder in the Arduino "work" folder.  
Both of these ploys work; the sketch runs..  
**This sketch can be used to verify servo wiring to Blue Pills**  

### Serial servos
Here is the [Arduino reference for Serial communication](https://www.arduino.cc/reference/en/language/functions/communication/serial/)  
In STM32duino, **`Serial`** device is USB virtual COM port,  
using `PA11+12`, and **`Serial1`** is UART `PA9+10`,  
but **Serial** *may be* UART in [PlatformIO Arduino framework](https://platformio.org/frameworks)  
unless configured as a USB Virtual COM port in Tools.  

Put [`while (!Serial){;}` in `setup(){}`](https://www.arduino.cc/reference/en/language/functions/communication/serial/ifserial/)  
Toggling LED off before and on or blinking after provides feedback.  
The first sketch I found mixing `Serial` and `<Servo.h>` is  
[Matt Williamson's serial_servo_rx.ino](https://github.com/mattwilliamson/Arduino-RC-Receiver/blob/master/serial_servo_rx_ino/serial_servo_rx.ino)  

My strap servos usefully rotate less than 127 degrees,  
set odd values 1-127 to one strap  
and even values 0-126 for the other,  
perhaps reserving values 0-1 for other controls,  
such as setting strap offsets based on **next** values.  
Single-character control [avoids serial string blocking and overflows](https://www.forward.com.au/pfod/ArduinoProgramming/Serial_IO/index.html).  

Green LED blink codes can feedback when processing servo values,  
e.g. briefly off for one belt and briefly on for the other,  
with 50% duty cycle for idle operation.  
Blink timing by `delay()` impacts serial bandwidth, so use `millis()`.

For serial experiments *without* SimHub,  
[this sketch](https://github.com/blekenbleu/blekenbleu.github.io/tree/master/Arduino/Blue_ASCII_Servo) accepts e.g. ASCII characters from Arduino `Tools` > `Serial Monitor`.  
to move left or right servo based on least-significant bit.  
Characters `> 127` do not arrive intact from SimHub JavaScript,  
but useful strap servo range is `< 127`, so apply offsets to received values.  
Testing suggests that, running on STM32 Blue Pill,  
this sketch handles 60Hz updates of 4 characters,  
where 2 should suffice and servos respond less quickly.

Corresponding [SimHub hacking is described here](SimHubCustomSerial.md).
