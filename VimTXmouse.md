---
---
## R&D, Vim, X-Mouse and Logitech Anywhere MX
*25 Feb 2019*  

### My R&D process (roughly)
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
    paste()
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
... where `log()` also involves `copy()` and `paste()`.  
Fewer actions for copy() and paste() save time and aggravation.

I am *so depressingly* old; my first PC was a [**Sinclair ZX80**](https://en.wikipedia.org/wiki/ZX80)  
and my second was an [IBM 5100](https://en.wikipedia.org/wiki/IBM_5100).  
From a user interface perspective,  
**Unix** peaked for me at [OpenWindows 3 - SunOS 4.1.4](http://toastytech.com/guis/ow3.html)  
The ability to save state and position of each client window at logout   
and restore at login seems to be lost, along with **X mouse** behavior.   
X mouse behavior can still be at least approximated on **macOS** and **Windows**.  

### X mouse and macOS
**X mouse copy/paste for macOS** *is* useful and [not too hard to implement](https://github.com/blekenbleu/macXcopy),  
but wants [focus-follows-pointer](https://en.wikipedia.org/wiki/Focus_(computing)#Focus_follows_pointer), and I prefer autoraise.  
Given Apple's [Aqua](https://en.wikipedia.org/wiki/Aqua_(user_interface)) [Desktop](https://support.apple.com/en-us/HT201956) with *detached top menu bars*,  
X mouse autoraise is [unpopular](http://steve-yegge.blogspot.com/2008/04/settling-osx-focus-follows-mouse-debate.html),  
but see [dwell](http://xahlee.info/kbd/macos_hover_switch_window.html) and [Creating Panels for Switch Control and Dwell Control](https://mcmw.abilitynet.org.uk/macos-1013-high-sierra-creating-panels-switch-control-and-dwell-control).  
In my experience, while Accessibility Keyboard nicely implements autoraise among windows,  
it also simulates left-button for any GUI elements over which the pointer hovers.

### X mouse and Windows
**Gvim 8.1 installation**

![snapshot of Vim installation settings](/static/images/Vim.gif "installation settings")

`~/_vimrc`
```
{% include_relative _vimrc %}  
```
**[X-Mouse Button Control](https://www.highrez.co.uk/downloads/xmousebuttoncontrol.htm)** may be better than **[True X-Mouse Gizmo](http://fy.chalmers.se/~appro/nt/TXMouse/)**,  
but the latter seemed [simpler to adapt](http://articleworthreading.blogspot.com/2016/03/true-x-mouse-gizmo-courtesy.html).  
Reserving middle button press for opening hyperlinks in new Chrome  browser tabs  
required a minor Registry hack, as does enabling focus-follows-pointer autoraise.

`TxMouse.reg`
```
{% include_relative TxMouse.reg %}  
```

A 3 button mouse is essential for efficient X mouse usage,  
and middle button separate from scroll wheel reduces missed pastes.
Hyperscroll is worthwhile,  
and Logitech's *original* [Anywhere MX](https://www.amazon.com/dp/B007PJ4Q4A)
 hyperscroll mouse with separate middle button has the best power switch,  
but button switches have been [problematic](https://www.ifixit.com/Guide/How+to+fix+Logitech+Anywhere+MX+Phantom+Double+Click/75780).
