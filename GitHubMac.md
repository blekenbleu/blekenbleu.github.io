---
title:  Jekyl on macOS High Sierra
---

With its POSIX heart, macOS runs my LAN services, including SSL, HTTP and [git](MacGit).  

Mojave (macOS 10.14) does not support my MacBook, and macOS releases typically break MacPorts for up to 6 months.   
By dropping 32-bit support, Mojave is likely to be [worse](https://trac.macports.org/wiki/MojaveProblems).

On Macs, [SmartGit looks for SSH key password in the Keychain](https://stackoverflow.com/a/41679549)

As usual, Jekyll depends on Ruby
https://jekyllrb.com/docs/installation/macos/
https://www.tinywp.com/jekyll-on-mac-using-mac-ports/
https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/#platform-mac

...but macOS Ruby is/was another story...

macOS `/user/bin/ruby` is version 2.3.7p456  
Perhaps I should be satisfied with that,
but mixing Jekyl gems with any for macOS seems messy,  
and MacPorts has ruby version 2.5.3p105
which installed as `/opt/local/bin/ruby2.5`

[This page](https://stackoverflow.com/questions/49987920/ruby-on-mac-osx-sierra-via-mac-ports)
describes using `$ sudo port select --set ruby ruby25` to set `ruby25` as `ruby`,  

If that scrogs stuff depending on /user/bin/ruby behavior, then  
another tool, `rbenv`, only affects shells with a modified $PATH,  
which could be set in my `g` alias that goes to local GitHub Pages repository.
- [MacPorts Ruby HowTo](https://trac.macports.org/wiki/howto/RubyOnRails)
- [GitHub rbenv](https://github.com/rbenv/rbenv#how-rbenv-hooks-into-your-shell)
- Options to avoid [`rbenv` openssl incompatibility](https://stackoverflow.com/questions/48061622/failing-to-build-ruby-2-5-0-with-rbenv-and-ruby-build-on-macos-sierra/48728800#48728800)  
- Examples of [rbenv [mis]usage](https://github.com/rbenv/rbenv/issues/1122)  

