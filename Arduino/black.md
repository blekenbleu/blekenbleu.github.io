
---
Arduino for Black Pill
---
*updated 30 Jun 2021*

#### Background
Arduino originally employed microcontrollers lacking USB support.  
Arduino now offers a few STM32 modules with integrated USB,  
and ST Microelectronics now supports many STM32 chips and boards.  
- Black and Blue Pill modules use the same Arduino board manager.
- Arduino wants STM32CubeProgrammer for Black Pill DFU; installed in Aurora E:\my
  * added to path  
  * Setup package in USB1TB\Windows  
  
Here is a Black Pill pinout reference:
![Generic STM32F4x1 board pinout](https://raw.githubusercontent.com/WeActTC/MiniSTM32F4x1/master/images/STM32F4x1_PinoutDiagram_RichardBalint.png)  
- 5V tolerant PWM pins are wanted for driving hobby servos or 4-wire PC fans.  
- Unlike Blue Pills, nearly all F401 Black Pill pins are 5V tolerant, but not PA0 and PB5 on STM32F411.  
- [Other Black (STM32F411) vs Blue (STM32F103) differences](https://hackaday.com/2021/01/20/blue-pill-vs-black-pill-transitioning-from-stm32f103-to-stm32f411/)  
- [Black Pill `KEY` button pulls PA0 LOW](https://stm32-base.org/boards/STM32F411CEU6-WeAct-Black-Pill-V2.0.html)  
- USB-C takes more pins; 14 remaining 5V-tolerant PWM pins:
PA15,PB3  PB6-9    PB0,1    PB 10  PA6,7    PA1-3
T2 CH1,2  T4 CH1-4 T3 CH3,4 T2 CH3 T3 CH1,2 T5 CH2-4

T2 and T5 are 32-bit;  T3 and T4 are 16-bit;  T1 is [advanced 16-bit](https://stm32f4-discovery.net/2014/05/stm32f4-stm32f429-discovery-pwm-tutorial)  

Two more complementary PWM: PB13,15: T1 CH 1,3

While STM32 chips' ROM bootloaders typically support USB directly,  
Blue Pill's `FC103C8` chip lacks USB bootloader support in ROM.  

There are at least 4 ways to flash STM32 chips:  
1) DFU (device firmware update) using DfuSe utility,  
    using the [STM32 system memory bootloader in ROM](https://www.st.com/en/development-tools/stsw-stm32080.html),  
    using the [Black Pill's DFU bootloader with Arduino](https://www.sgbotic.com/index.php?dispatch=pages.view&page_id=49)  
    By default, must force Black Pill into DFU using buttons on board
    [Arduino `use_1200bps_touch` sketch code](https://arduino.github.io/arduino-cli/latest/platform-specification) jumps to [STM32 ROM DFU bootloader](https://github.com/arduino/tooling-rfcs/pull/2#issuecomment-825908911).  
    [Beta enhancement](https://github.com/stm32duino/Arduino_Core_STM32/pull/710)  
    [Seemingly already supported for Arduino STM32 modules](https://github.com/arduino/arduino-cli/issues/1083)  
    [May require a resistor and capacitor](https://stackoverflow.com/questions/26891432/jump-to-bootloader-in-stm32-through-application-i-e-using-boot-0-and-boot-1-pins#26958578)  
2) SWD via ST-LINK  
   This can be used with any STM32 chip.
3) (Arduino) USB bootloader[s] <- there have been several:  
   * [STM32duino Bootloader](https://stm32duinoforum.com/forum/wiki_subdomain/index_title_Bootloader.html) AKA bootloader 2.0 AKA HID bootloader  
     This is wanted for ST Microelectronics-supported Arduino libraries
   * the rest are IMO obsolete:
     - [Maple-derivative bootloaders](https://github.com/jonatanolofsson/maple-bootloader)  
     - Maple boards had USB reset hardware to force re-enumeration  
     - [Roger Clark's 8k bootloader](https://github.com/rogerclarkmelbourne/STM32duino-bootloader)  
       Be aware that some of Roger Clark core code is also called Stm32duino..
     - Not sure which core (libmaple or stm32duino) [this bootloader supports, but is 4k](https://github.com/davidgfnet/stm32-dfu-bootloader)  
4) STM serial bootloader
   Blue Pill micro has only a serial bootloader  
   [Load firmware via USART1 by jumpering](https://stm32duinoforum.com/forum/wiki_subdomain/index_title_Bootloader.html#Boot0_and_Boot1_pin_settings):  
   `Boot0 HIGH`  
   `Boot1 LOW`  
  ... then resetting MCU

A clone ST-LINK V2 costs no more than a USB COM dongle,  
connects to dedicated pins and supports debug.  
Clone USB COM dongles *may not* support 3.3V to Blue Pill serial boot pins..  

#### STM32duino
Arduino now has an ST Microelectronics-supported [core and board manager](https://github.com/stm32duino/Arduino_Core_STM32/releases)  
My clone ST-Link happens to have the *correct pinout* printed on its cover;  
**Verify ST-LINK clone pin artwork** by sliding that cover partly open (along the USB plug):
![ST-LINK pin artwork](ST-Link.jpg)  

[Here is the Arduino software page](https://www.arduino.cc/en/software).  
[Here is the **Arduino for STM32** forum](https://www.stm32duino.com).
It replaced an earlier one, mostly for Maple/Roger Clark libraries.  
[Here is the READ-ONLY version of that earlier Arduino for STM32 forum](https://stm32duinoforum.com/forum/index_php.html).  

### [STM32F411xC/E Reference manual](https://www.st.com/resource/en/reference_manual/dm00119316-stm32f411xc-e-advanced-arm-based-32-bit-mcus-stmicroelectronics.pdf)  

### ST-LINK and Blue Pill
[This video](https://www.youtube.com/watch?v=KgR3uM21y7o) programs a Blue Pill using [STM32 ST-LINK utility](https://www.st.com/en/development-tools/stsw-link004.html).  
Wiring Blue Pill to ST-LINK V2 clone:
![wiring Blue Pill to ST-LINK V2 clone](https://miro.medium.com/max/875/1*pFNIcoAq2s3l4lwsM0gj8w.jpeg)  
![wiring chart](https://miro.medium.com/max/533/1*NwPYrVoPUbciDWzvGsTavQ.png)  
Connect 3.3V from ST-LINK to Blue Pill **only when Blue Pill has no other connections**  
Put another way, when using ST-LINK to debug Blue Pill e.g. plugged to USB,  
  **do NOT connect 3.3V to Blue Pill from ST-LINK**.  


### Installing STM32duino support
Since SimHub already includes an *older version* of Arduino,  
install the portable (ZIP file) version for STM32;  
no need to install Arduino-specific driver[s]...
1) Download, unzip, and run [Arduino](https://www.arduino.cc/en/software)  
   in my case, to `E:\my\Arduino\`  
   *much of the following is thanks to [sgbotic](https://www.sgbotic.com/index.php?dispatch=pages.view&page_id=48)*
2) Go to **`File` > `Preferences`**, add to **`Additional Board Manager URLs`** text box:
   [https://github.com/stm32duino/BoardManagerFiles/raw/master/package_stmicroelectronics_index.json](https://github.com/stm32duino/BoardManagerFiles/raw/master/package_stmicroelectronics_index.json)  
3) Go to **`Tools` > `Board` > `Boards Manager`**, enter search for **`STM32`**:  
   ![Boards Manager STM32 search](https://www.sgbotic.com/images/companies/1/learn/F103_Arduino/board_manager_install.png?1596271243306)  
   click **`STM32 Cores`**, then **`Install`**  (*takes quite awhile*)  
4) Quit and restart Arduino; then  
   from **`Tools` > `Board:` > `STM32 Boards`**, select [`Generic STM32F4 series`].  
   From **`Tools` > `Board Part Number:`**, select [`BlackPill F411CE`].  
   From **`Tools` > `Upload method:`**, select [`STM32CubeProgrammer (DFU)`].  

A simple next step adds servos to the blink loop sketch.  
[This servo cycling sketch](https://github.com/blekenbleu/blekenbleu.github.io/tree/master/Arduino/Blue_Servo) is under GitHub revision control,  
with a shortcut to that sketch folder in the Arduino "work" folder.  
Both of these ploys work; the sketch runs..  
**This sketch can be used to verify servo wiring to a Blue Pill** *without* serial control. 

### Serial servos e.g. for SimHub harness tensioning
Here is the [Arduino reference for Serial communication](https://www.arduino.cc/reference/en/language/functions/communication/serial/)  
In STM32duino, **`Serial`** device is USB virtual COM port,  
using `PA11+12`, and **`Serial1`** is UART `PA9+10`,  
but **Serial** *may be* UART in [PlatformIO Arduino framework](https://platformio.org/frameworks)  
unless configured as a USB Virtual COM port in Tools.  

Put [`while (!Serial){;}` in `setup(){}`](https://www.arduino.cc/reference/en/language/functions/communication/serial/ifserial/)  
Toggling LED off before and on or blinking after provides connection feedback.  
The first Arduino sketch I found that combined `Serial` and `<Servo.h>` is  
[Matt Williamson's serial_servo_rx.ino](https://github.com/mattwilliamson/Arduino-RC-Receiver/blob/master/serial_servo_rx_ino/serial_servo_rx.ino)  

Single-character control [avoids serial string blocking and overflows](https://www.forward.com.au/pfod/ArduinoProgramming/Serial_IO/index.html).  
Useful rotation range for my harness' servos is less than 127 degrees;  
direct odd rotation values 3-127 to the right harness strap  
and even rotation values 2-126 to the left,  
reserving values 0-1 to set strap offsets based on **immediately next** values.  

Green LED blink codes feedback when processing servo values,  
with 50% duty cycle for idle operation.  
Perhaps better to use that LED to signal when servo values are max..?   
Blink timing by `delay()` impacts serial bandwidth, so use `millis()`.

For serial servo control, with or *even without* **SimHub Custom serial device**,  
**[this sketch](https://github.com/blekenbleu/blekenbleu.github.io/tree/master/Arduino/Blue_ASCII_Servo)** accepts e.g. ASCII characters from Arduino `Tools` > `Serial Monitor`.  
to move left or right servo based on least-significant bit.  
**See [above](#stm32duino) for Blue Pill flash programming information.**  
Characters `> 127` do not arrive intact from SimHub JavaScript,  
but useful strap servo range is `< 127`, with offsets applied to received values.  
Testing suggests that, running on STM32 Blue Pill,  
this sketch handles 60Hz updates of 4 characters,  
where 2 should suffice and servos respond less quickly.  
By changing from Blue Pill-specific PWM pin and LED assignments,  
this sketch should work for other Arduino-supported modules with PWM-capable pins.

Corresponding [SimHub Custom serial hacking is described here](SimHubCustomSerial.md).
