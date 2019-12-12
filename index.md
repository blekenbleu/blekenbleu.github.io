1 November 2018  
## Signal Processing
- [Special Error Diffusion](ImageProcessing/sped.html)
- [Neighborhood Mask Dithered Interpolation](ImageProcessing/NMDI.html)

## USB-attached Logitech G29 pedals
- [STM32](pedals/STM32) - programmable USB can be configured as [HID gamepad](Windows/HID)
- [ESP8266](pedals/ESP8266) - CH340 USB appears *only* as COM port to Windows
  - **WeMos D1 UNO R1** AKA *ESPDuino* [background information](Arduino/ESPDuino)
    - functionally similar to [$3 D1 mini](https://www.ebay.com/p/2232496538) and  
 [NodeMCU](https://en.wikipedia.org/wiki/NodeMCU) - ([3 versions](https://frightanic.com/iot/comparison-of-esp8266-nodemcu-development-boards/));
  $5 @ [Amazon](https://www.amazon.com/dp/B07F61FG7V),
  $2 @ [eBay](https://www.ebay.com/itm/192777702474)
  - [Serial-Lab](Windows/SerialLab) *fork already working with D1 UNO ESP8266*
  - [VJoySerialFeeder](Arduino/VJoySerialFeeder) *least obsolete COM->HID filter*
  - [mi-360](Arduino/mi360) *HID Xiaomi Gamepad -> Xbox360 filter*
  - ESP8266 Arduino IDE Alternative: [Platformio](https://blog.squix.org/2016/01/esp8266-arduino-ide-alternative.html)
- [TH8A](pedals/TH8A/TH8A) Thrustmaster shifter mods

## [ab]using Microsoft Visual Studio Community 2017
* [shared installation](VSC2017)

## GitHub Pages Jekyll Installation How-To
*in order attempted*  
**[Windows 8.1](GitHubPages)**  with **HitHub Desktop** and **Git for Windows**  
**[Windows 10](GitHubW10)** with **GitHub Desktop**   
**[macOS](GitHubMac) High Sierra** with **MacPorts** and **SmartGit**  
**[Ubuntu on Windows (WSL)](GitHubWSL) (or NOT)** with **SmartGit**  and its `git-bash.exe`

*Notes:*
1. Unlike html pages, markdown pages (files ending with `.md`) get URLs *without* `.md`  
2. If no [`index.md`](/), then Jekyll uses `README.md` for landing page  
   **Workaround**:  
   Create `index.md`, which Jekyll will use instead  
3. Jekyll expects UTF-8 character encoding and fails badly if/when a BOM (Byte Order Mark) is encountered  
   This was especially problematic with Jekyll style gem files on WSL...  
   **Workaround** (using `vim`):  
```
   :set nobomb
   :wq
```
4. **IPv6** tends to be problematic, requiring Windows reboots  
   Suggested procedures [for disabling IPv6](https://help.my-private-network.co.uk/support/solutions/articles/6000158531-how-to-disable-ipv6-on-windows-10)

### [Vim and X-Mouse](VimTXmouse)
### [Line 6 JTV-89F guitar](JTV89F/Variax)
### [Installing Git-Cola from MacPorts](GitColaMacPorts)
### [FreshTomato and Linksys EA6500v2](FreshTomato)
### macOS local [gitolite](MacGit) server
### [Thorens TD 160 MK II](ThorensTD126MKII/README.md) with SME Series III
### [Audio-Technica AT-LP140XP](AT-LP140XP/index.htm) microphonics
### GitHub's [Default welcome page - Markup tutorial](Welcome)

[GitHub repository](https://github.com/blekenbleu/blekenbleu.github.io)
for this markdown
