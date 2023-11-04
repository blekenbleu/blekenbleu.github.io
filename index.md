---
---
*11 Sep 2023*  

## Signal Processing
  - [DeltaWave vs Wave Corrector](/static/ImageProcessing/DeltaWave_WaveCorrector.html)
  - [dimg - visual difference utility](/static/ImageProcessing/dimg.html)
  - [Hugin image alignment](microscope/objectives/Hugin.htm)  
  - [Special Error Diffusion](/static/ImageProcessing/sped.html)
  - [Neighborhood Mask Dithered Interpolation](/static/ImageProcessing/NMDI.html)
  - [Harry Niquist was not wrong but is misunderstood](/static/ImageProcessing/Nyquist.html)
  - [dither:&nbsp; noise is not always bad](/static/ImageProcessing/dither.html)
  - [TinyML:&nbsp; TensorFlow Lite on Arduino, STM32 and ESP32](/static/ImageProcessing/TinyML.htm)  
  - [LED color rendering meta-analaysis](/static/ColorRendering/)  

### [Arduino custom USB sketches](Arduino/)
- e.g. for harness tensioning servos
    - ESP8266 **WeMos D1 UNO R1** [(*background*)](Arduino/ESPDuino) is a COM device  
    - COM ports work from SimHub, but most sim games expect <a href="Windows/HID/#DI">DirectInput</a>
      - SimHub *directly* supports *real* Arduinos,  
        but can drive *any* COM port by **SimHub Custom Serial devices**  
        Some ESP32 / STM32 may be programmed to appear as Arduino USB COM ports
- SimHub USB-attached [PWM PC fans](Arduino/SimHubPWMfans/)

  - **Arduino IDE Alternatives**
    - There are [*many*](https://www.javacodegeeks.com/2018/08/10-arduino-ide-alternative.html).
    - [**Visual Micro**](https://www.visualmicro.com/) supports debugging in Visual Studio  
      (which I use e.g. for [**SimHub plugins**](/static/SimHub/))
      - in [VisualStudio **Marketplace**](https://www.visualmicro.com/)  
      - [*reviewed*](https://maker.pro/arduino/tutorial/how-to-use-visual-studio-for-arduino-development)  
      - Options using Visual Studio **Code**, *a confusingly named editor*, are discounted;&nbsp; I prefer GVim
    - [Arduino Command Line Interface (*Arduino-cli*)](https://arduino.github.io/arduino-cli/0.31/)
      - interesting, because [configuration file options per folder or root folder](https://arduino.github.io/arduino-cli/0.31/commands/arduino-cli_config_init/)
  - [**STM32 Black Pill** for *more capable* custom USB Arduino devices](Arduino/black)
  - [**ESP32-S[2-3]**](/static/ESP32/) for **composite USB** and wireless Arduino devices  

## Audio  
 &nbsp; [**Audio-Technica AT-LP140XP**](/static/AT-LP140XP/) microphonics  
 &nbsp; [**Altec Model 19**](/static/altec/)  
 &nbsp; [Blu-Ray movies on Windows PC](WinBluRay)  
 &nbsp; [**Carver AL-III**](/static/Carver/)  
 &nbsp; [Line 6 JTV-89F guitar](JTV89F/Variax)  
 &nbsp; [**Technics SL-7** direct drive linear tracking turntable](/static/SL-7/)  
 &nbsp; [**Thorens TD 160 MK II**](ThorensTD126MKII/README) with SME Series III  
  
### [Cameras &amp; lenses (Canon)](/static/Canon/)

### [Chromebook](ChromeBook/)

## [Microscopes and photomicography](microscope/)  
 &nbsp; **American Optical** [Series 10](microscope/#AO) / [Series 120](microscope/AO/) / [Reichert EPIStar](microscope/#EPIStar)  
 &nbsp; **Nikon** [Optiphot 66](microscope/Nikon/) / [Optiphot 1](microscope/Nikon/Optiphot/) [Metaphot](microscope/Nikon/Metaphot/)  

## [MIDI](MIDI/) wireless, *including Android app* - [**SimHub plugin**](MIDI/plugin/)
 &nbsp; [Node.js **WebSocket MIDI server**](MIDI/midisrv)

## [Sim driving](pedals/)
- [TH8A](pedals/#TH8A) Thrustmaster shifter mods
- Logitech [G29 pedal mods](pedals/#pedals)
  - [STM32](pedals/STM32) - programmable USB dongle can be configured as [HID gamepad](Windows/HID/)
  - [ESP8266](pedals/ESP8266) - CH340 USB chip can appear *only* as a COM port to Windows
  - [**analog pedals**](pedals/#pedals) plugged into [SimXperience AccuForce controller](pedals/#analog)  
- [wheels for GT racing in VR](pedals/steering.htm)  

## [Virtual Reality (VR) and Mixed Reality (MR)](XR/)  
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
  - [added to SimHub **MIDIio plugin**](MIDI/plugin)
  - [Windows Joystick HID](Windows/HID/) shared with SimHub
  - [Windows 10 vJoy installation](pedals/vJoy/)
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
  - [Buffalo LinkStation 210](/static/network/LinkStation.htm)  
  - [Sagemcom F@st 5260, FreshTomato and Linksys EA6500v2](/static/network/FreshTomato.htm)  
  - [Spectrum modem and router regressions](/static/network/Spectrum.htm)  
  - [**Synology DiskStation DS920+**](/static/network/DS920.htm)  
- [RTX3090](Windows/RTX3090)  
- [Sound and VoiceMeeter](Windows/WinAudio.htm)  
- Storage shortage:&nbsp;  [Dell Inspiron 13 7000 2-in-1 Windows 10 NVMe SSD](Windows/NVMe/Inspiron13.htm)  
- [Vim and X-Mouse](VimTXmouse)
- Visual Studio Community 2017 *abuse*:&nbsp; [shared installation](VSC2017)
- [Windows 10 boot from NVMe on PCIe PCs without NVMe BIOS](Windows/NVMe/)  


---

#### [COVID-19 plots](/static/covid)

---

## GitHub Pages:&nbsp; Jekyll Installation How-(not)-To
**[Windows](GitHubPages)** with **GitHub Desktop**  
**[Windows 10](GitHubW10)**  
**[Windows 11](/static/GitHubW11/)**  
**[Ubuntu on Windows (WSL)](GitHubWSL) (or NOT)** with **SmartGit**  and its `git-bash.exe`  
**[macOS](GitHubMac) High Sierra** with **MacPorts** and **SmartGit**
 - [**Git-Cola installed from MacPorts**](GitColaMacPorts)
 - **macOS local [gitolite](MacGit) server**

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
  [GitHub Pages Documentation](https://docs.github.com/en/pages) &nbsp; Jekyll is only one way to generate GitHub Pages... 
  [GitHub Pages community](https://github.com/orgs/community/discussions/categories/pages)  
  [Jekyll Resources](https://jekyllrb.com/resources/)  
  [Jekyll Talk! forum](https://talk.jekyllrb.com/)  
  [Jekyll github](https://github.com/jekyll) and [github-metadata](https://github.com/jekyll/github-metadata/issues)  
7. [Site Map](SiteMap.htm)  

**GitHub's [Default welcome page - Markup tutorial](Welcome)**  
**[W3C Link Checker](https://validator.w3.org/checklink)**  

[GitHub repository](https://github.com/blekenbleu/blekenbleu.github.io)
for this markdown  

[![Auction Sniper](https://www.gixen.com/images/gixenlink.gif)](https://www.gixen.com/index.php)
