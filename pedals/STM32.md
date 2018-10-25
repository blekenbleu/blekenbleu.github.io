## Logitech G29 brake pedal mods
Having poor coordination always and no depth perception until vision fused in my 40s,
driving and bicycling were as nearly athletic as I cared to get.
Gloria got a BMW E21 320i when her old Toyota Corolla died in the early 1990s.
This led, in 1995, to a 1985 BMW E23 735i, which by 1997 began attending BMW CCA
driving schools at Watkins Glen, Mont-Tremblant, Road Atlanta, Mid Ohio, Sebring, Summit Point and Putnam Park.  Driving schools mostly ended for us around 2003;  too expensive and increasing likelihood of non-trivial track offs as my confidence increased, but mainly the 735i ECU became unreliable.  Meanwhile, I still ride bicycles...

Nostalgia being what it is, VIRTUALLY revisiting driver schools seems attractive.
Many cars and tracks that I drove are available with sim racing program Assetto Corsa
and can be played using relatively cheap Logitech G29 pedals and steering wheel.
Playing Assetto Corsa on conventional PC monitors limits field-of-view;
 I opted for Samsung mixed reality headset.

By lacking inertial cues from velocity changes, sim racing seems harder than real.
Although Logitech improved pedal feel with their G29, braking remains problematic:,
1. signals to sim software are based on pedal movement distance, not pressure.
2. feedback for tires losing grip during braking comes thru the wheel, instead of the pedal.

Those 2 brake simulation shortcomings can be mitigated, respectively, by:
1. replacing brake pedal potentiometer with a load cell, e.g
[Logitec G27 Load cell brake modification](https://imgur.com/gallery/gOjAf)
   * That mod used analog conversion, but [SP_Adapter](https://github.com/robotsrulz/SP_Adapter) separates pedals from wheel.
1. adding ABS feedback to the brake pedal
   * e.g. 3:50/10:56 [DIY RUMBLE PEDALS SIM RACING](https://www.youtube.com/watch?v=8aLqqcEaUVk)
   * Get tire slip data from Assetto Corsa via UDP socket or [Python](https://gist.github.com/robertcedwards/2f7a061af8ccc987aab2)
   * [proTyres app](https://www.assettocorsa.net/forum/index.php?threads/protyres-v1-0-0-it%E2%80%99s-all-about-the-tyre.43361/)
includes Tyre slip indicator during braking

### Assetto Corsa software development
* [Assetto Corsa Programming](https://www.assettocorsa.net/forum/index.php?forums/programming-language-apps-gui-themes.22/)
* [acplugins](https://github.com/minolin/acplugins)
* [Python reference doc](https://www.assettocorsa.net/forum/index.php?attachments/acpythondocumentation-pdf.110364/)
* [Getting started](https://github.com/ckendell/ACAppTutorial/blob/master/ACAppTutorial.md)
  * "I have developed an app with `import socket` and it works fine for me and a few other guys, but there are some other users where the socket cannot be loaded"  
you can fix it by embed import *.pyd files into environment

1. download python 3.3 and extract it.
1. copy file socket.pyd from python /Dlls/ to your game folder \Steam\steamapps\common\assettocorsa\apps\python\yourapp\DLLs
   * and modify the script that cause error, insert follow code after you import socket
```
sys.path.insert(0,os.path.join(os.path.dirname(__file__),"DLLs"))
os.environ['path'] = os.environ['PATH'] + ";," 
```

A "complete" [hardware car sim slaved to Assetto Corsa](https://github.com/cv256/CVJoy)

Monitor app for more or less the complete AC API
(might useful for App developers). See the screenshot in the attachments. 
* AC values: download [zip](https://www.assettocorsa.net/forum/index.php?attachments/ac_values-zip.57504/)
* AC API: download [zip](https://www.assettocorsa.net/forum/index.php?attachments/aci_api_1-1_full-zip.57505/)


## STM32 USB HID adapter for Logitech G29 pedals with load cell brake

Prototype using [Blue Pill](http://wiki.stm32duino.com/index.php?title=Blue_Pill)

Blue Pill uses [STM32F103C8T6](https://www.st.com/en/microcontrollers/stm32f103c8.html)
with 128Kbytes of Flash and 20 Kbytes SRAM

Blue Pill STM32F103 clocked @ standard 72 MHz measured [~49 VAX (integer) MIPS  and 9 Whetstone (floating point) MIPS](http://www.stm32duino.com/viewtopic.php?t=76&start=20)

... while a 1994 Pentium PC rated [~ 71 VAX MIPS and 12 Whetstone MIPS](http://www.roylongbottom.org.uk/whetstone.htm)

Clone [Logitech pedals as separate USB game controller](https://github.com/robotsrulz/SP_Adapter)

[Arduino USB Composite library](http://www.stm32duino.com/viewtopic.php?f=9&t=3994&start=20)

### HX711 support
- [STM32duino HX711 lib](https://www.stm32duino.com/viewtopic.php?t=1613)
- [STM32duino API](http://wiki.stm32duino.com/index.php?title=API)
- [Arduino HX711.cpp](https://github.com/bogde/HX711/blob/master/HX711.cpp)
- [HX711 Arduino UNO code to stm32f103 blue pill board](http://www.stm32duino.com/viewtopic.php?f=2&t=2222#p30232)

Still need dfu-util to load second stage Black Magic Probe
since its bootloader expects/requires that.

BMP bootloader can be installed by ST-Link..

