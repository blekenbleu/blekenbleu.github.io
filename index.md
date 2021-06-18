26 January 2021  
## Signal Processing
  - [Special Error Diffusion](ImageProcessing/sped.html)
  - [Neighborhood Mask Dithered Interpolation](ImageProcessing/NMDI.html)

## [Sim driving](pedals/index.htm)
- [ Samsung Odyssey+ for Assetto Corsa ](pedals/index.htm#hmd) Windows Mixed Reality and SteamVR
- [TH8A](pedals/index.htm#TH8A) Thrustmaster shifter mods
- Logitech [G29 pedal mods](pedals/index.htm#pedals)
  - [STM32](pedals/STM32) - programmable USB can be configured as [HID gamepad](Windows/HID)
  - [ESP8266](pedals/ESP8266) - CH340 USB appears *only* as COM port to Windows
  - **actually ended up keeping pedals [analog](pedals/index.htm#pedals)** plugged into [SimXperience AccuForce controller](pedals/index.htm#analog)  
- USB-attached harness tensioning servos
  - [Arduino for custom USB devices](Arduino/)
    - e.g. STM32 Black or Blue Pills and ESP8266 **WeMos D1 UNO R1** or similar  [background](Arduino/ESPDuino)  
    - COM ports are good for driving outputs from SimHub, but games e.g. Assetto Corsa expect HID I/O
      - SimHub *directly* supports *real* Arduinos,  but any serial device by Custom Serial devices
  - ESP8266 / STM32 Arduino IDE Alternatives: [Platformio](https://blog.squix.org/2016/01/esp8266-arduino-ide-alternative.html) or [**Visual Micro**](https://www.visualmicro.com/)

## [ab]using Microsoft Visual Studio Community 2017
* [shared installation](VSC2017)

## GitHub Pages Jekyll Installation How-To
*in order attempted*  
**[Windows 8.1](GitHubPages)**  with **GitHub Desktop** and **Git for Windows**  
**[Windows 10](GitHubW10)** with **GitHub Desktop**   
**[macOS](GitHubMac) High Sierra** with **MacPorts** and **SmartGit**  
**[Ubuntu on Windows (WSL)](GitHubWSL) (or NOT)** with **SmartGit**  and its `git-bash.exe`

*Notes:*
1. Far easier to *instead* install [Chrome extension **Markdown Viewer**](https://chrome.google.com/webstore/detail/markdown-viewer/ckkdlimhmcjmikdlpkmbgfkaikojcbjk?hl=en)
2. Unlike html pages, markdown pages (files ending with `.md`) get URLs *without* `.md`  
3. If no [`index.md`](/), then Jekyll uses `README.md` for landing page  
   **Workaround**:  
   Create `index.md`, which Jekyll will use instead  
4. Jekyll expects UTF-8 character encoding and fails badly if/when a BOM (Byte Order Mark) is encountered  
   This was especially problematic with Jekyll style gem files on WSL...  
   **Workaround** (using `vim`):  
```
   :set nobomb
   :wq
```
4. **IPv6** tends to be problematic, requiring Windows reboots  
   Suggested procedures [for disabling IPv6](https://help.my-private-network.co.uk/support/solutions/articles/6000158531-how-to-disable-ipv6-on-windows-10)

### [COVID-19 plots](covid)
### [Vim and X-Mouse](VimTXmouse)
### [Installing Git-Cola from MacPorts](GitColaMacPorts)
### macOS local [gitolite](MacGit) server
### [FreshTomato and Linksys EA6500v2](FreshTomato)
### [Line 6 JTV-89F guitar](JTV89F/Variax)
### [Thorens TD 160 MK II](ThorensTD126MKII/README.md) with SME Series III
### [Audio-Technica AT-LP140XP](AT-LP140XP/index.htm) microphonics
### [Reichert/American Optical microscopes](microscope/index.html)
### GitHub's [Default welcome page - Markup tutorial](Welcome)

[GitHub repository](https://github.com/blekenbleu/blekenbleu.github.io)
for this markdown
