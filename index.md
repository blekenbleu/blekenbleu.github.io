6 Feb 2023  
## Signal Processing
  - [DeltaWave vs Wave Corrector](ImageProcessing/DeltaWave_WaveCorrector.html)
  - [dimg - visual difference utility](ImageProcessing/dimg.html)
  - [Hugin image alignment](microscope/objectives/Hugin.htm)  
  - [Special Error Diffusion](ImageProcessing/sped.html)
  - [Neighborhood Mask Dithered Interpolation](ImageProcessing/NMDI.html)
  - [Harry Niquist was not wrong but is misunderstood](ImageProcessing/Nyquist.html)
  - [dither:&nbsp; noise is not always bad](ImageProcessing/dither.html)

## Audio  
 &nbsp; [**Audio-Technica AT-LP140XP**](AT-LP140XP/) microphonics  
 &nbsp; [**Altec Model 19**](altec/)  
 &nbsp; [Blu-Ray movies on Windows PC](WinBluRay)  
 &nbsp; [Line 6 JTV-89F guitar](JTV89F/Variax)  
 &nbsp; [**Technics SL-7** direct drive linear tracking turntable](SL-7/)  
 &nbsp; [**Thorens TD 160 MK II**](ThorensTD126MKII/README.md) with SME Series III  
  
### [Cameras &amp; lenses (Canon)](Canon/)

### [Chromebook](ChromeBook/)

## [MIDI](MIDI/) wireless, *including Android app* - [**SimHub plugin**](MIDI/plugin/)
 &nbsp; [Node.js **WebSocket MIDI server**](MIDI/midisrv)

## [Microscopes and photomicography](microscope/)  
 &nbsp; **American Optical** [Series 10](microscope/#AO) / [Series 120](microscope/AO/) / [Reichert EPIStar](microscope/#EPIStar)  
 &nbsp; **Nikon** [Optiphot 66](microscope/Nikon/) / [Optiphot 1](microscope/Nikon/Optiphot/) [Metaphot](microscope/Nikon/Metaphot/)  

## Microsoft
- [MSYS2](MSYS2/)
- Visual Studio Community 2017 *abuse*:&nbsp; [shared installation](VSC2017)
- [PC misguided buying - January 2022](PC)  
  - [Flight Simulator 2020 and Alienware Area 51 R2](Windows/FS2020)  
- **Routers, modems and SAN**:  
  - [Buffalo LinkStation 210](network/LinkStation.htm)  
  - [Sagemcom F@st 5260, FreshTomato and Linksys EA6500v2](network/FreshTomato.htm)  
  - [Spectrum modem and router regressions](network/Spectrum.htm)  
  - [Synology DiskStation DS920+](network/DS920.htm)  
- [Vim and X-Mouse](VimTXmouse)
- [Windows 10 boot from NVMe on PCIe PCs without NVMe BIOS](NVMe/)  
- Storage shortage:&nbsp;  [Dell Inspiron 13 7000 2-in-1 Windows 10 NVMe SSD](NVMe/Inspiron13.htm)  

## [Sim driving](pedals/)
- [ Samsung Odyssey+ for Assetto Corsa ](pedals/#hmd) - [SteamVR](https://steamcommunity.com/app/250820)
 and [WMR](https://learn.microsoft.com/en-us/windows/mixed-reality/enthusiast-guide/)  
- [TH8A](pedals/#TH8A) Thrustmaster shifter mods
- Logitech [G29 pedal mods](pedals/#pedals)
  - [STM32](pedals/STM32) - programmable USB dongle can be configured as [HID gamepad](Windows/HID)
  - [ESP8266](pedals/ESP8266) - CH340 USB chip can appear *only* as a COM port to Windows
  - **[analog](pedals/#pedals) pedals** plugged into [SimXperience AccuForce controller](pedals/#analog)  
### [Arduino custom USB STM32 Blue Pill sketches](Arduino/)
- e.g. for harness tensioning servos
    - ESP8266 **WeMos D1 UNO R1** [(*background*)](Arduino/ESPDuino) is a COM device  
    - COM ports work from SimHub, but sim games expect HID DirectInput
      - SimHub *directly* supports *real* Arduinos,  
        but *any* COM may be driven by **SimHub Custom Serial devices**  
        Some ESP32 / STM32 may be programmed to appear as Arduinos
- USB-attached [PWM PC fans](Arduino/SimHubPWMfans/)

- **Alternatives to Arduino IDE**
  - [There are *many*](https://www.survivingwithandroid.com/10-arduino-ide-alternative-to-start-programming/)
  - [**Visual Micro**](https://www.visualmicro.com/) supports debugging in Visual Studio  
    (which I use e.g. for [**SimHub plugins**](SimHub/))
    - in [VisualStudio **Marketplace**](https://marketplace.visualstudio.com/items?itemName=VisualMicro.ArduinoIDEforVisualStudio)  
    - [*reviewed*](https://maker.pro/arduino/tutorial/how-to-use-visual-studio-for-arduino-development)  
    - I discount Visual Studio **Code** options;&nbsp; it is *a confusingly named editor*, and I prefer GVim
  - [Arduino Command Line Interface (*Arduino-cli*)](https://arduino.github.io/arduino-cli/0.31/)
    - interesting, because [configuration file options per folder or root folder](https://arduino.github.io/arduino-cli/0.31/commands/arduino-cli_config_init/)
- [**STM32 Black Pill** for *more capable* custom USB Arduino devices](Arduino/black)
- [**ESP32-S[2-3]**](ESP32/) for **composite USB** and wireless Arduino devices  

### **vJoy** [C# SDK](https://github.com/blekenbleu/vJoySDK)  
  - [added to SimHub **MIDIio plugin**](MIDI/plugin)
  - [Windows Joystick HID](Windows/HID) shared with SimHub
  - [Windows 10 vJoy installation](pedals/vJoy)
     - [Arduino VJoySerialFeeder](Arduino/VJoySerialFeeder) -  [install](Arduino/vJoySFinstall)
     - [Arduino **mi-360** Xbox360 controller emulation](Arduino/mi360.md)

### [cable modem downgrade](Spectrum.htm)

---

#### [COVID-19 plots](covid)

---

## GitHub Pages:&nbsp; Jekyll Installation How-(not)-To
**[Windows 8.1](GitHubPages)**  with **GitHub Desktop** and **Git for Windows**  
**[Windows 10](GitHubW10)** with **GitHub Desktop**   
**[Ubuntu on Windows (WSL)](GitHubWSL) (or NOT)** with **SmartGit**  and its `git-bash.exe`  
**[macOS](GitHubMac) High Sierra** with **MacPorts** and **SmartGit**  
 &nbsp; [**Git-Cola installed from MacPorts**](GitColaMacPorts)  
 &nbsp; **macOS local [gitolite](MacGit) server**

*Notes:*
1. Far easier to *instead* install [Chrome extension **Markdown
   Viewer**](https://chrome.google.com/webstore/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk?hl=en)
2. Unlike html pages, markdown pages (`.md` files) get URLs *without* `.md`  
3. If no [`index.md`](/), then Jekyll uses `README.md` for landing page  
   **Workaround**:&nbsp;  Create `index.md`, which Jekyll will use instead  
4. Jekyll expects UTF-8 character encoding, fails for BOM (Byte Order Mark)
   This was especially problematic with Jekyll style gem files on WSL...  
   **Workaround** (using `vim`):  
```
   :set nobomb
   :wq
```
5. **IPv6** tends to be problematic, requiring Windows reboots:&nbsp;
   [Disabling IPv6 on Windows 10](https://help.my-private-network.co.uk/support/solutions/articles/6000158531-how-to-disable-ipv6-on-windows-10)
6. Helpful URLs:  
  [GitHub Pages Documentation](https://docs.github.com/en/pages)  
  [Jekyll Resources](https://jekyllrb.com/resources/)  
  [Jekyll Talk! forum](https://talk.jekyllrb.com/)  
  [Jekyll github](https://github.com/jekyll) and [github-metadata](https://github.com/jekyll/github-metadata/issues)  

**GitHub's [Default welcome page - Markup tutorial](Welcome)**  
**[W3C Link Checker](https://validator.w3.org/checklink)**  

[GitHub repository](https://github.com/blekenbleu/blekenbleu.github.io)
for this markdown  

[![Auction Sniper](https://www.gixen.com/images/gixenlink.gif)](https://www.gixen.com/index.php)
