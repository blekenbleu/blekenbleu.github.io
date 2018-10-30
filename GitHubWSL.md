---
title: Jekyll  for GitHub Pages on WSL Ubuntu
---
I had been hoping/waiting for Fedora support on
[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10),  
but given other IBM acquisition debacles (e.g. [Wunderground monetization](https://github.com/n0bel/PiClock/issues/103)),
[no more](https://www.redhat.com/en/blog/monumental-day-open-source-and-red-hat)  

Installing Jekyll on Windows without WSL involved multiple MINGW64 installations.  
On one hand, that enabled some bash utilities in Windows Command,  
and offered a "native" Windows GUI i**GitHub Desktop**,  
but running a "native" Windows XServer is
[not horrible](https://github.com/QMonkey/wsl-tutorial)  
.. and should not be required, so long as the GitHub Pages documentation  
to be served by Jekyll under WSL is on a filesystem also accessible to  
Windows Explorer and GitHub Desktop (which still involves some redundant MINGW64)  

...and,
although it [has worked](http://nathanielstory.com/2013/12/28/jekyll-on-windows-with-cygwin.html),
 forget about installing Jekyll on
[Cygwin, another Red Hat product](https://news.ycombinator.com/item?id=18321884)  

[SmartGit](https://www.syntevo.com/),
with versions for Windows, macOS and Linux,
[seems a superior alternative](https://www.thewindowsclub.com/git-gui-clients-for-windows) to **GitHub Desktop**  
by supporting servers other than github.com

Other interesting WSL projects  
[Linuxizing Windows](https://cepa.io/2018/02/10/linuxizing-your-windows-pc-part1/)  
[QTerminal for WSL](https://www.reddit.com/r/bashonubuntuonwindows/comments/82e1x5/qterminal_for_wsl/)  

Good [example](https://github.com/aws-amplify/aws-amplify.github.io) of GitHub Pages implementation

