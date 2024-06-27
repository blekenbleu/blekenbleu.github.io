---
---
## multi-character control for SimHub Custom serial devices

.. as advertized on [RaceDepartment](https://www.racedepartment.com/threads/multi-character-control-for-simhub-custom-serial-devices.208661/)

SimHub Custom Serial protocol loosely inspired by MIDI

### 15 Jan 2022 update by @sierses: [real Arduino support](https://www.racedepartment.com/threads/multi-character-control-for-simhub-custom-serial-devices.208661/post-3477031)

Edit near the top of Arduino sketch [blek2char.ino](blek2char.ino) to select the appropriate target:
```
/* Uncomment one microprocessor */
//#define BLUEPILL 1
//#define BLACKPILL 1
#define UNO 1 // Arduino Uno, Nano
//#define LEONARDO 1 // Arduino Leonardo, Micro
//#define PROMICRO 1 // Sparkfun ProMicro
//#define MEGA 1 // Arduino Mega 2560 
```
- Arduino sketch:&nbsp; [blek2char.ino](blek2char.ino)
- Custom serial device profile:&nbsp; [blek2char.shsds](https://github.com/blekenbleu/SimHub-Profiles/blob/main/blek2char.shsds)

- ShakeIt telemetry profile:&nbsp; [blek2char.siprofile](https://github.com/blekenbleu/SimHub-Profiles/blob/main/blek2char.siprofile)
	- Custom serial device profile for use with ShakeIt telemetry profile:&nbsp; [new2char.shsds](https://github.com/blekenbleu/SimHub-Profiles/blob/main/new2char.shsds)
		- [JavaScript](new2char.js) in new2char.shsds

![](Page1.gif)  
![](Page2.gif)  
