1 November 2018  
## Image Processing
- [Special Error Diffusion](ImageProcessing/sped.html)
- [Neighborhood Mask Dithered Interpolation](ImageProcessing/NMDI.html)

## USB-attached [Logitech G29 pedals - STM32](pedals/STM32)

### [WeMos D1 UNO R1 ESP8266](ESPDuino)

## GitHub Pages Jekyll Installation How-To
*in order attempted*  
**[Windows 8.1](GitHubPages)**  with **HitHub Desktop** and **Git for Windows**  
**[Windows 10](GitHubW10)** with **GitHub Desktop**   
**[macOS](GitHubMac) High Sierra** with **MacPorts** and **SmartGit**  
**[Ubuntu on Windows (WSL)](GitHubWSL)** with **SmartGit**  
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


### macOS local [gitolite](MacGit) server
### GitHub's [Default welcome page - Markup tutorial](Welcome)

[GitHub repository](https://github.com/blekenbleu/blekenbleu.github.io)
for this markdown
