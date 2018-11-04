---
title: GVim, True X-Mouse and Logitech Anywhere MX for R&D on Windows
---

### My process (roughly)
```
do {
  do {
    research()
    contemplate()
    copy()
    paste()
  } while (!credible())
  do {
    copy()
    past()
    edit()
    build()
    debug()
    log()
  } while (broken())
  do {
    test()
    evaluate()
    log()
  } while (failing())
} while (!presentable())
```
... where `log()` also involves `copy()` and `paste()`
Minimizing mouse actions and keystrokes for copy() and paste() saves time.

I am *so depressingly* old that my first PC was a [**Sinclair ZX80**](https://en.wikipedia.org/wiki/ZX80)  
and my second was an [IBM 5100](https://en.wikipedia.org/wiki/IBM_5100).  

From a user interface perspective, 
Unix peaked for me at [OpenWindows 3 - SunOS 4.1.4](http://toastytech.com/guis/ow3.html)  
The concept of a window manager saving and restoring the state and location of all client windows between logout and login by default seems to have been lost, along with **X11 mouse behavior**.   
X11 mouse behavior can still be at least approximated.

`~/_vimrc`
```
{% include_relative _vimrc %}  
```
**[X-Mouse Button Control](https://www.highrez.co.uk/downloads/xmousebuttoncontrol.htm)** may be better than **[True X-Mouse Gizmo](http://fy.chalmers.se/~appro/nt/TXMouse/)**,  
but the latter seemed simpler to adapt.  
Reserving middle button press for opening hyperlinks in new Chrome  browser tabs required a minor Registry hack,  
as does enabling focus following mouse auto-raise.

`TxMouse.reg`
```
{% include_relative TxMouse.reg %}  
```

A 3 button mouse is essential for efficient X11 usage, and separating that middle button from the scroll wheel reduces missed pastes.
Hyperscroll is worthwhile, and Logitech's *original* **Anywhere MX** had the most easily accessible power switch among hyperscroll 3-button mice.  Button switch durability is [problematic](https://www.ifixit.com/Guide/How+to+fix+Logitech+Anywhere+MX+Phantom+Double+Click/75780).
