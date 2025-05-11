---
---
*16 Aug 2024*  
![](Jan14stitch.jpg)  
## Signal Processing
  - [Aliasing and oversampling](../static/ImageProcessing/ao.html)
  - [Apple AirPod Pro as lame hearing aid](Apple/)  
  - [DeltaWave vs Wave Corrector](../static/ImageProcessing/DeltaWave_WaveCorrector.html)
  - [dimg - visual difference utility](../static/ImageProcessing/dimg.html)
  - [dither:&nbsp; noise is not always bad](../static/ImageProcessing/dither.html)
  - [Hugin image alignment](microscope/objectives/Hugin.htm)  
  - [LED color rendering meta-analaysis](../static/ColorRendering/)  
  - [Monotone Cubic Fits over an interval](../static/ImageProcessing/MonotoneCubic.htm)
  - [Neighborhood Mask Dithered Interpolation](../static/ImageProcessing/NMDI.html)
  - [Niquist was not wrong but is misunderstood](../static/ImageProcessing/Nyquist.html)
  - [Special Error Diffusion](../static/ImageProcessing/sped.html)
  - [TinyML:&nbsp; TensorFlow Lite on Arduino, STM32 and ESP32](../static/ImageProcessing/TinyML.htm)  

### [Arduino custom ESP32 / STM32 USB sketches](Arduino/)
- e.g. for [harness tensioning](pedals/index.htm#hartens) servos
    - ESP8266 **WeMos D1 UNO R1** [(*background*)](Arduino/ESPDuino) is a COM device  
    - COM ports work from SimHub, but most sim games expect <a href="Windows/HID/#DI">DirectInput</a>
      - SimHub *directly* supports *real* Arduinos,  
        but can drive *any* COM port by **SimHub Custom Serial devices**  
        Some ESP32 / STM32 may appear as Arduino USB COM ports
- [Direct Drive harness tension](https://github.com/blekenbleu/Direct-Drive-harness-tension-tester)  
- [ESP32-S2](../static/ESP32/index.htm)  
- [**mi-360** Xbox360 controller emulation](Arduino/mi360)
- [pedal sketches](Arduino/) for [STM32](pedals/STM32) 
- SimHub USB-attached [PWM PC fans](Arduino/SimHubPWMfans/)
- [VJoySerialFeeder](Arduino/VJoySerialFeeder) -  [install](Arduino/vJoySFinstall)

#### Arduino IDE [Alternatives](https://www.javacodegeeks.com/2018/08/10-arduino-ide-alternative.html)
- [**Visual Micro**](https://www.visualmicro.com/) supports debugging in
  - [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/)  (as used e.g. for [**SimHub plugins**](../static/SimHub/))
  - [Visual Micro in VisualStudio **Marketplace**](https://www.visualmicro.com/)  
	- [*reviewed*](https://maker.pro/arduino/tutorial/how-to-use-visual-studio-for-arduino-development)  
- Discounted:&nbsp; options using Visual Studio **Code**, *a confusingly named editor*  
	- I prefer [**GVim**](https://www.vim.org/download.php)
- [Arduino Command Line Interface (*Arduino-cli*)](https://arduino.github.io/arduino-cli/0.31/)
	- interesting, because [configuration file options per folder or root folder](https://arduino.github.io/arduino-cli/0.31/commands/arduino-cli_config_init/)
  - [**STM32 Black Pill** for *more capable* custom USB Arduino devices](Arduino/black)
  - [**ESP32-S[2-3]**](../static/ESP32/) for **composite USB** and wireless Arduino devices  

## Audio  
 &nbsp; [**Audio-Technica AT-LP140XP**](../static/AT-LP140XP/) microphonics  
 &nbsp; [**Altec Model 19**](../static/altec/)  
 &nbsp; [Blu-Ray movies on Windows PC](WinBluRay)  
 &nbsp; [**Carver AL-III**](../static/Carver/)  
 &nbsp; [Line 6 JTV-89F guitar](JTV89F/Variax)  
 &nbsp; [**Technics SL-7** direct drive linear tracking turntable](../static/SL-7/)  
 &nbsp; [**Thorens TD 160 MK II**](ThorensTD126MKII/README) with SME Series III  
 &nbsp; [Windows audio](Windows/WinAudio.htm)  
  
### [Cameras &amp; lenses (Canon)](../static/Canon/) &nbsp; [Sony A7 II](../static/A7II)  

### [Chromebook](ChromeBook/)

### [Ender-3 V3 SE](../static/Ender3V3SE/)

### [GitHub Repositories](https://github.com/blekenbleu?tab=repositories)

## [Microscopes and photomicography](microscope/)  
 &nbsp; **American Optical** [Series 10](microscope/#AO) / [Series 120](microscope/AO/) / [Reichert EPIStar](microscope/#EPIStar)  
 &nbsp; **Nikon** [Optiphot 150](microscope/Nikon/OptiphotInfinity/index.html#other) / [Optiphot 66](microscope/Nikon/) / [Optiphot 1](microscope/Nikon/Optiphot/) / [Metaphot](microscope/Nikon/Metaphot/)  

## [MIDI](MIDI/), *including Android app* - [**SimHub plugin**](MIDI/plugin/)
 &nbsp; [Node.js **WebSocket MIDI server**](MIDI/midisrv)

### [OnShape CAD](../static/CAD/)

## [Sim driving](pedals/)
- Logitech [G29 pedal mods](pedals/#pedals)
  - [STM32](pedals/STM32) - programmable USB dongle can be configured as [HID gamepad](Windows/HID/)
  - [ESP8266](pedals/ESP8266) - CH340 USB chip can appear *only* as a COM port to Windows
  - [**analog pedals**](pedals/#pedals) plugged into [SimXperience AccuForce controller](pedals/#analog)  
- [ShakeSeat](pedals/#shakeseat)  
- SimHub USB-attached [PWM PC fans](Arduino/SimHubPWMfans/)
- [TH8A](pedals/#TH8A) Thrustmaster shifter mods
- [wheels for GT racing in VR](pedals/steering.htm)  

## [SimHub](SimHub/) sim driving telemetry processing
- [Bass Shaker Profiles](pedals/shakeit.htm) for [pedals](pedals/index.htm#haptic) and [ShakeSeat](pedals/index.htm#shakeseat)
- [Custom serial profiles](Arduino/shsds.htm) e.g. for [harness tensioning](pedals/index.htm#hartens)  
	- [corresponding Arduino sketches](Arduino/) for [STM32](pedals/STM32) 
- [Plugins](../static/SimHub/index.htm) 
	- [Fake8](https://github.com/blekenbleu/Fake8) properties and 8-bit serial data for [Custom serial profiles](Arduino/shsds.htm)  
	- [JSONio](https://github.com/blekenbleu/JSONio) for per-car properties e.g. in [ShakeIt Bass Shaker Profiles](pedals/shakeit.htm)  
	- [MIDIio](MIDI/plugin/) including [vJoy](https://github.com/blekenbleu/vJoySDK) and [Direct Input controllers](Windows/HID/index.htm#DI)  
	- [OxyPlot](https://github.com/blekenbleu/OxyPlotPlugin) XY scatter plot plot one SimHub property vs another  
	- [XtraMouse](https://github.com/blekenbleu/XtraMouse) use a second mouse to directly control SimHub properties, e.g. for MIDIio  

### [Somnium VR1](VR1) - premium PC XR headset
### [Two Factor Authentication](2fas/) - iOS and 2FAS

### [USB](../static/USB.htm)

## [Virtual Reality (VR) and Mixed Reality (MR)](XR/)  
- [Glossary](XR/Glossary)  
- [OpenVR vs OpenXR](XR/mbucchia.html)
- [Samsung Odyssey+ and HP Reverb for Assetto Corsa](pedals/#hmd)  
  using [SteamVR](https://steamcommunity.com/app/250820)
  and [Windows Mixed Reality (WMR)](https://learn.microsoft.com/en-us/windows/mixed-reality/enthusiast-guide/)  
- Virtual desktops, Immersed and
  [vergence-accommodation conflict](https://medium.com/vrinflux-dot-com/vergence-accommodation-conflict-is-a-bitch-here-s-how-to-design-around-it-87dab1a7d9ba).  
  [Immersed](https://www.immersed.com/) has one of the better known
  [remote collaboration software apps](https://www.roadtovr.com/vr-apps-work-from-home-remote-office-design-review-training-education-cad-telepresence-wfh/),  
  and has opted, along with e.g. [Somnium](https://store.steampowered.com/app/875480/Somnium_Space_VR/),
  to develop [their own XR headset](https://www.roadtovr.com/immersed-visor-pre-orders-500/).  
  While Immersed software seems more practical,  
  their headset seems less credible than the
  [**Somnium VR1**](XR/VR1.html).  

### **vJoy** [C# SDK](https://github.com/blekenbleu/vJoySDK)  
  - [added to SimHub **MIDIio plugin**](MIDI/plugin/)
  - [Windows Joystick HID](Windows/HID/) shared with SimHub
  - [Windows 10 vJoy installation](Windows/HID/vJoy/)
     - [Arduino VJoySerialFeeder](Arduino/VJoySerialFeeder) -  [install](Arduino/vJoySFinstall)
     - [Arduino **mi-360** Xbox360 controller emulation](Arduino/mi360)

## [Windows](Windows/)
- [Alienware Aurora R7 crashing and overheating](Windows/R7.htm)  
- [**Antec Phantom VR build** &nbsp; i5-13600, Galax RTX 4090](Windows/PhantomVR.htm)  
- [HID game controllers and SimHub](Windows/HID/)  &nbsp; [Serial-Lab](Windows/SerialLab)
- [MSYS2](Windows/MSYS2/)
- [PC misguided buying - January 2022](Windows/PC)  
  - [Flight Simulator 2020 and Alienware Area 51 R2](Windows/FS2020)
  - [H670 ATX motherboards](Windows/H670ATX) *cannot underVolt*
- **Routers, modems and SAN**:  
  - [Buffalo LinkStation 210](../static/network/LinkStation.htm)  
  - [Sagemcom F@st 5260, FreshTomato and Linksys EA6500v2](../static/network/FreshTomato.htm)  
  - [Spectrum modem and router regressions](../static/network/Spectrum.htm)  
  - [**Synology DiskStation DS920+**](../static/network/DS920.htm)  
- [RTX3090](Windows/RTX3090)  
- **[Sound and VoiceMeeter](Windows/WinAudio.htm), [VST hosts](Windows/VSThost.htm) and [VST3 plugins](Windows/steinberg/)**  
- Storage shortage:&nbsp;  [Dell Inspiron 13 7000 2-in-1 Windows 10 NVMe SSD](Windows/NVMe/Inspiron13.htm)  
- [Vim and X-Mouse](VimTXmouse)
- Visual Studio Community *abuse*:&nbsp; [shared installation](VSC2017)
- [Windows 10 boot from NVMe on PCIe PCs without NVMe BIOS](Windows/NVMe/)  

### HVAC
- [Air filtration](../static/hvac/index.htm)  

---

#### [COVID-19 plots](../static/covid)

---

### [GitHub Pages:&nbsp; Jekyll Installation How-(not)-To](pages)

[**Site Map**](SiteMap.htm)  

**[W3C Link Checker](https://validator.w3.org/checklink)**  

[GitHub repository](https://github.com/blekenbleu/blekenbleu.github.io)
for this markdown  

[![Auction Sniper](https://www.gixen.com/images/gixenlink.gif)](https://www.gixen.com/index.php)
