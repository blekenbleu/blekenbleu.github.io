---
---
### Jekyl on macOS High Sierra
POSIX at heart, macOS serves my LAN for SCP, HTTP and [git](MacGit).  

**Mojave** (macOS 10.14) does not support my MacBook, and new macOS releases typically break [MacPorts](https://www.macports.org/) for up to 6 months.   
By dropping 32-bit support, Mojave is likely to be [worse](https://trac.macports.org/wiki/MojaveProblems).

On Macs, [SmartGit looks for SSH key password in the Keychain](https://stackoverflow.com/a/41679549)

As usual, Jekyll for macOS depends on [Ruby](https://jekyllrb.com/docs/installation/macos/)  
[Jekyll on macOS using MacPorts](https://www.tinywp.com/jekyll-on-mac-using-mac-ports/)  
[Jekyll GitHub Pages on macOS](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/#platform-mac)  

...but macOS Ruby is/was another story...

macOS High Sierra `/user/bin/ruby` is version `2.3.7p456`  
Perhaps that should suffice, but mixing Jekyl gems with any for macOS seems messy,  
and MacPorts has ruby version `2.5.3p105` which installed as `/opt/local/bin/ruby2.5`

[HomeBrew](https://github.com/Homebrew/brew) is arguably a better fit for GitHub,  
but MacPorts has provided me packages since before HomeBrew launched.  
[This page](https://stackoverflow.com/questions/49987920/ruby-on-mac-osx-sierra-via-mac-ports)
describes setting `ruby25` as `ruby`:  
`$ sudo port select --set ruby ruby25`

<details>
<summary>click for `rbenv` digression</summary>
If that scrogs stuff depending on /user/bin/ruby behavior, then  
<br>another tool, `rbenv`, only affects shells with a modified `$PATH`,  
<br>which could be set in my `g` alias that goes to local GitHub Pages repository.
<ul compact>
<li> [MacPorts Ruby HowTo](https://trac.macports.org/wiki/howto/RubyOnRails)
<li> [GitHub rbenv](https://github.com/rbenv/rbenv#how-rbenv-hooks-into-your-shell)
<li> Options to avoid [`rbenv` openssl incompatibility](https://stackoverflow.com/questions/48061622/failing-to-build-ruby-2-5-0-with-rbenv-and-ruby-build-on-macos-sierra/48728800#48728800)  
<li> Examples of [rbenv [mis]usage](https://github.com/rbenv/rbenv/issues/1122)  
</ul>
</details>

###
###
#### MacPorts Ruby
**MacPorts** installs into `/opt/local/`, requiring `sudo` permission specifically for writing into `/opt/local/lib/ruby2.5/gems/2.5.0`  

Except for `sudo`, Jekyll installation proceeds as on Windows 10;  
see [that documentation](GitHubW10) for tricks and configuration details.

`$ which ruby`  
```
/usr/bin/ruby  
```
`$ sudo port select --set ruby ruby25`  
```
Password:  
Selecting 'ruby25' for 'ruby' succeeded. 'ruby25' is now active.  
```
`$ which ruby`  
```
/opt/local/bin/ruby  
```

`$ sudo gem install bundler`  
```
Fetching: bundler-1.17.1.gem (100%)  
Successfully installed bundler-1.17.1  
Parsing documentation for bundler-1.17.1  
Installing ri documentation for bundler-1.17.1  
Done installing documentation for bundler after 4 seconds  
1 gem installed  
```

`$ ruby -ropen-uri -e 'eval open("https://git.io/vQhWq").read'`  
`$ sudo gem update --system`  
```
...  
RubyGems installed the following executables:  
/opt/local/bin/gem2.5  
/opt/local/bin/bundle2.5  
...  
```

`$ sudo gem install jekyll`  
`$ cd`  
`$ cd ../Shared`  
`$ mkdir Git`  
`$ cd $Git`  
`$ sudo jekyll new Jekyl`  
`$ cd Jekyl/`  
`$ bundle exec jekyll build`  
`$ bundle exec jekyll serve`  

#### Install [SmartGit](https://www.syntevo.com/smartgit/download/)  
* reuse GitHub token generated for Jekyll  
* clone GitHub Pages repository  

`$ cd ~/Public/GitHub/blekenbleu.github.io/`  
`$ sudo bundle update`  
`$ bundle exec jekyll serve --incremental`

