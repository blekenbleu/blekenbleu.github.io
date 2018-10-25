25 October 2018

## Logitech G29 brake mods
### Background
Having poor coordination always and no depth perception until vision fused in my 40s,
driving and bicycling were as nearly athletic as I cared to get.
My wife got a BMW E21 320i when her old Toyota Corolla died in the early 1990s.
The best BMW garage in town offered discounts to BMW CCA members, so we joined.
This led, in 1995, to a 5-speed [1985 BMW E23 735i](https://drive-my.com/en/test-drive/item/2201-road-test-1985-bmw-735i-e23.html),
which I waanted to own since reading the September 1985 Road & Track review.
By 1997, I was driving it at BMW CCA
driving schools on Watkins Glen, Mont-Tremblant, Road Atlanta, Mid Ohio, Sebring, Summit Point and Putnam Park.  Driving schools mostly ended for us around 2003, owing to increasing expenses and likelihood of non-trivial track offs as my confidence grew. The [Motronic DME](http://www.unixnerd.demon.co.uk/m30.html) had also became unreliable.  Meanwhile, I still ride bicycles...

Nostalgia being what it is, *VIRTUALLY* revisiting driver schools seems attractive.
Many cars and tracks that I have driven are available with sim racing program Assetto Corsa
and can be played using relatively cheap [Logitech G29](https://www.amazon.com/dp/B00Z0UWWYC) pedals and steering wheel.
Playing Assetto Corsa on conventional PC monitors limits field-of-view;
 I opted for Samsung mixed reality headset.

### Problems
By lacking inertial cues from velocity changes, sim racing seems harder than real.
Although Logitech improved pedal feel with their G29, braking remains problematic:,
1. signal to sim software is based on pedal movement distance, not pressure.
2. feedback for tires losing grip during braking currently comes thru the steering wheel, instead of the brake pedal.

### Project
Those 2 brake simulation shortcomings can be mitigated, respectively, by:
1. replacing brake potentiometer with a load cell, e.g
[Logitec G27 Load cell brake modification](https://imgur.com/gallery/gOjAf)
   * That mod used analog conversion, but [SP_Adapter](https://github.com/robotsrulz/SP_Adapter) separates pedals from wheel.
2. simulating ABS feedback at the brake pedal
   * e.g. @ 3:47/10:56 of this video: [DIY RUMBLE PEDALS SIM RACING](https://www.youtube.com/watch?v=8aLqqcEaUVk)
   * Get tire slip data from Assetto Corsa via UDP socket or [Python](https://gist.github.com/robertcedwards/2f7a061af8ccc987aab2)
   * [proTyres app](https://www.assettocorsa.net/forum/index.php?threads/protyres-v1-0-0-it%E2%80%99s-all-about-the-tyre.43361/) [*requires registration*]
includes indicator for Tyre slip during braking

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


### STM32 USB HID adapter for Logitech G29 pedals with load cell brake
- Prototype using a $2 [Blue Pill](http://wiki.stm32duino.com/index.php?title=Blue_Pill)
- Blue Pill uses [STM32F103C8T6](https://www.st.com/en/microcontrollers/stm32f103c8.html)
with 128Kbytes of Flash and 20 Kbytes SRAM
- Blue Pill STM32F103 measured [~49 VAX (integer) MIPS  and 9 Whetstone (floating point) MIPS](http://www.stm32duino.com/viewtopic.php?t=76&start=20)
  - 1994 Pentium PCs rated [~ 71 VAX MIPS and 12 Whetstone MIPS](http://www.roylongbottom.org.uk/whetstone.htm)

Clone code from [Logitech pedals as separate USB game controller](https://github.com/robotsrulz/SP_Adapter)

[Arduino USB Composite library](http://www.stm32duino.com/viewtopic.php?f=9&t=3994&start=20)

### HX711 support
- [STM32duino HX711 lib](https://www.stm32duino.com/viewtopic.php?t=1613)
- [STM32duino API](http://wiki.stm32duino.com/index.php?title=API)
- [Arduino HX711.cpp](https://github.com/bogde/HX711/blob/master/HX711.cpp)
- [HX711 Arduino UNO code to stm32f103 blue pill board](http://www.stm32duino.com/viewtopic.php?f=2&t=2222#p30232)

Black Magic Probe bootloader expects/requires [dfu-util](http://dfu-util.sourceforge.net/) to load second stage

BMP bootloader can be installed by ST-Link..

