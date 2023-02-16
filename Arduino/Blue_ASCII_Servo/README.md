## about Blue ASCII Servo
*16 Feb 2023*

[Stuyo's sim belt servo tensioner](https://diy-sim.com/guides/how-tos/servo-belt-tensioner-diy) is based on this Arduino sketch.  

It requires a *compatible* SimHub Custom Serial profile,  
e.g. from [SimHub Custom serial profile atlas](https://blekenbleu.github.io/Arduino/shsds.htm),  
as discussed in [SimHub Custom serial device for Blue Pill](https://blekenbleu.github.io/Arduino/SimHubCustomSerial).  

The name comes from:
- **Blue** for [Blue Pill](https://stm32-base.org/boards/STM32F103C8T6-Blue-Pill.html), a cheap STM32 module, *sadly seldom available*.  
  Many still advertised are *near clones* and may not work with the original Arduino Blue Pill board profile.
- **ASCII** for 7-bit characters, which is a SimHub Custom Serial limitation.  
- **Servo** for the [Arduino servo library](https://docs.arduino.cc/tutorials/generic/basic-servo-control)  

With few modifications, this sketch reportedly works for *real* Arduino modules.  
The sketch is intentionally simple, to run quickly.&nbsp;  Most code controls the LED, used for protocol diagnostics.  
The Blue_ASCII_Servo protocol is **completely incompatible** with any used by SimHub Arduinos.  
It is deliberately minimilist, using short messages to reduce latency and overhead.  
The protocol attempts to be tolerant of electrical interference.  
Properly implemented USB could be robust against noise,  
but most adapters (e.g. Blue Pill) do NOT fully isolate their USB transceiver,   
sharing a ground connection with noisy power to motors, etc.  

[Here is description for Blue Pill, troubleshooting and protocol evolution](https://blekenbleu.github.io/Arduino/).  
Servo tensioner design motivation was from **@RacingMat**, [as documented here](https://www.racedepartment.com/threads/2dof-harness-tensionner-with-fly-ptmover.194331/).  
Some ongoing servo harness tensioning discussions occur in [SimHub Discord](https://discord.com/channels/299259397060689920/843488620546490378).

### Opinion:&nbsp; sim racing harness
[Cheap 4 point belts](https://www.ebay.com/sch/i.html?_nkw=racing%20seat%20belt&_udhi=25) can work great.  
Those who claim otherwise probably have lap belts too loose;&nbsp; **lap belts should be as tight as possible**.  
For those with deep bucket seats, lap belt tightening straps should pull *towards the buckle*, not away.  
Harnesses with smooth webbing are liable to loosen too easily.  

Tighter shoulder straps increase servo current, leading to overheating and failures.  
Wide bed casters work fine as pulleys for 2-inch shoulder straps:  
![racedepartment](https://www.racedepartment.com/attachments/bedcasters-jpg.437943/)  
