---
---
## Jekyll for GitHub Pages on WSL Ubuntu
I gave up on [Fedora support](https://www.redhat.com/en/blog/monumental-day-open-source-and-red-hat) of
[Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/install),  
based on other IBM acquisitions (e.g. [Wunderground monetization](https://github.com/n0bel/PiClock/issues/103))

Jekyll on Windows without **WSL** involved multiple MINGW64 folders.  
On one hand,
#### MINGW64
- enabled some bash utilities in Windows Command,  
- works with "native" Windows GUIs
  such as **GitHub Desktop** and **SmartGit**, while
#### WSL
- running a "native" Windows XServer is
[not horrible](https://github.com/QMonkey/wsl-tutorial)  
  .. and not required, so long git repositores are on NTFS    
- runs more slowly than **MINGW64** implementations
- has some bugs that take awhile to resolve,  
  even after discovering solutions

### [SmartGit](https://www.syntevo.com/)
- versions for Windows, macOS and Linux,
- [seems a superior alternative](https://www.thewindowsclub.com/git-gui-clients-for-windows) to **GitHub Desktop**  
by supporting servers other than github.com

### Other interesting WSL projects  
- [Linuxizing Windows](https://cepa.io/2018/02/10/linuxizing-your-windows-pc-part1/)  
- [QTerminal for WSL](https://www.reddit.com/r/bashonubuntuonwindows/comments/82e1x5/qterminal_for_wsl/)  

#### WSL has plenty of bugs and is pretty large (1.2 GB):
```
$ cd /
$ du -s
3227    etc
44570   home
49480   lib
15372   sbin
298996  var
2368    boot
88      init
828482  usr
```
For comparison,  
**SmartGit** is 403 MB,  
**Git for Windows** v2.19.1 is 572 MB  
**GitHub Desktop** is 260 MB  
and **Ruby25-x64** is 930 MB  

#### Ubuntu 18.04 LTS
Since Ubuntu updates packages relatively slowly,  
using its newest **LTS** (Long Term Support) version seemed  
less likely to provoke incompatibilities or extra updates  
when installing Jekyll and dependencies.  
As it turns out. the **LTS** version of ruby was recent enough,  
but a wealth of bugs made implementing Jekyll on **WSL** problematic.

#### MSYS2 Ruby sharing
This **WSL** Windows 10 installation shares `G:` drive with Windows 8.1  
**SmartGit** was installed with a custom `%HOMEPATH%\.bash_profile` 
... adding a path to that Ruby installation:    

<details>
<summary>click here for custom <code>.bash_profile</code></summary>

```console
# Stripped-down for Git Bash
PATH=/mingw64/bin:/usr/bin:/bin:/c/WINDOWS/system32:/c/WINDOWS:/c/WINDOWS/System32/OpenSSH:/usr/bin/vendor_perl:/usr/bin/core_perl

# add Ruby for Jekyl
if ! hash ruby 2>>/dev/null ; then
  if [ -z "$RUBY" ] ; then
    export RUBY="/g/Ruby25-x64"
  fi
  if [ -d "${RUBY}/bin" ] ; then
    PATH="${PATH}:${RUBY}/bin"
  else
    echo "ruby not found!!"
  fi
fi
export JEKYLL_GITHUB_TOKEN=0123456789tokendejour0987654321abcdefg00
alias  path="echo '$PATH'"
if [ -d /g/Gateway/GitHub/blekenbleu.github.io ] ; then
  alias g="cd /g/Gateway/GitHub/blekenbleu.github.io"
fi
# Git Bash [Ctrl]+[C] kills Jekyl server
alias serve="${RUBY}/msys64/home/bleke/bin/serve"
```

</details>

###
###
for **Git Bash** AKA `"C:\Program Files (x86)\SmartGit\git\git-bash.exe"`  
![snapshot of Git Bash shortcut properties](/static/images/GitBash.gif "shortcut properties")  
### However, *if you insist*,
- then go [here](https://www.microsoft.com/en-us/search/explore?q=ubuntu) to install WSL

#### Background:
**WSL** AKA **Ubuntu from Microsoft Store**, along with [**VcXsrv**](https://github.com/Microsoft/WSL/issues/2855#issuecomment-358861903),  
was originally installed via **Windows Insider** program  
on fast Ring for **Windows 10 Insider Preview build 16190**  

<details>
<summary>click here for <b>WSL</b> update details</summary>

Updating that Windows 10 Home installation to 1803 17134.376, then  
launching %LOCALAPPDATA%\Microsoft\WindowsApps\ubuntu.exe
forced a **WSL** update.
```
$ cat /etc/os-release
NAME="Ubuntu"
VERSION="16.04.3 LTS (Xenial Xerus)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 16.04.3 LTS"
VERSION_ID="16.04"
HOME_URL="http://www.ubuntu.com/"
SUPPORT_URL="http://help.ubuntu.com/"
BUG_REPORT_URL="http://bugs.launchpad.net/ubuntu/"
VERSION_CODENAME=xenial
UBUNTU_CODENAME=xenial

$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 16.04.3 LTS
Release:        16.04
Codename:       xenial
```
</details>

###
###
### Ruby installation
**before starting**,
prioritizing IPv4  over IPv6 will probably reduce grief:
- [disable ipv6 or prefer ipv4](https://www.reddit.com/r/bashonubuntuonwindows/comments/7u1le5/comment/dtlnmzu/)
in `/etc/gai.config`
```
# un-comment this line
precedence ::ffff:0:0/96 100
```

<details>
<summary>click here for <em>more</em> WSL update details</summary>

[Ask Ubuntu recommended](https://devblogs.microsoft.com/commandline/upgrading-ubuntu/)
`$ sudo do-release-upgrade`

That takes awhile to complete..  
Results are logged here:  `/var/log/dist-upgrade`  

Ubuntu `do-release-upgraded` wanted to replace existing (client) `/etc/ssh/sshd_config` with a server config; declined...   
Both versions copied to ~/
```
Deprecated options /etc/ssh/sshd_config:
 line 16:  UsePrivilegeSeparation
 line 19:  KeyRegenerationInterval
 line 20:  ServerKeyBits
 line 31:  RSAAuthentication
 line 38:  RhostsRSAAuthentication

System upgrade is complete.
Restart required
To finish the upgrade, a restart is required.
If you select 'y' the system will be restarted.
Continue [yN] y

System has not been booted with systemd as init system (PID 1). Can't operate.
Failed to talk to init daemon.
=== Command terminated normally (Wed Oct 31 15:06:12 2018) ===
```
Restarted Windows...
```
$ cat /etc/os-release
NAME="Ubuntu"
VERSION="18.04.1 LTS (Bionic Beaver)"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu 18.04.1 LTS"
VERSION_ID="18.04"
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
VERSION_CODENAME=bionic
UBUNTU_CODENAME=bionic
```
</details>

###
###
### WSL tweaks (for MINGW64 compatibility)
```
$ ln -s /mnt/[cdeg] /
$ ls -l / | grep mnt
lrwxrwxrwx  1 root root     6 Oct 31 12:01 c -> /mnt/c
lrwxrwxrwx  1 root root     6 Oct 31 12:02 d -> /mnt/d
lrwxrwxrwx  1 root root     6 Oct 31 12:02 e -> /mnt/e
lrwxrwxrwx  1 root root     6 Oct 31 12:01 g -> /mnt/g
drwxr-xr-x  1 root root   512 Aug  5  2017 mnt
```
**WSL** root filesystem is at  
`$LOCALAPPDATA\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs`


##### Ubuntu default color scheme for vim is nearly illegible
```
http://vimcolors.com/
https://github.com/flazz/vim-colorschemes
```
As do others, **WSL** `git` wrongly reports modified status  
for a GitHub repository cloned using Windows **GitHub Desktop**:

<details>
<summary>click for details of <code>get status</code> failure</summary>

```
$ cd /g/Gateway/GitHub/blekenbleu.github.io/
$ git --version
git version 2.17.1
$ which git
/usr/bin/git
$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   .gitignore
        modified:   GitHubPages.md
        modified:   LICENSE
        modified:   README.md
        modified:   Welcome.md
        modified:   _config.yml
        modified:   pedals/STM32.md

no changes added to commit (use "git add" and/or "git commit -a")
```
</details>

###
###
#### How to convince WSL [git to  work with Windows repositories](https://github.com/Microsoft/WSL/issues/3046)  
`git config --global core.autocrlf true`

#### Install SmartGit, which includes a Git Bash and MINGW64
```
$ du -s /usr/bin /mingw64/bin
80461   /usr/bin
33004   /mingw64/bin
```
In fact, **SmartGit** for Windows includes **Git for Windows**
.. and a useful `git.exe`

**SmartGit** wants your GitHub token, as used for **Jekyll**.  
To more easily work with its mingw64 binaries,  
create an NTFS symbolic link without spaces:
```
C:\>mklink /d SmartGit "Program Files (x86)\SmartGit\git"
symbolic link created for SmartGit <<===>> Program Files (x86)\SmartGit\git
```
[Modify Windows user environment variables](https://helpdeskgeek.com/how-to/create-custom-environment-variables-in-windows/) for  
paths to SmartGit binaries, then logout & login again.
```
C:\Users\bleke>path
PATH=C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\System32\OpenSSH\;C:\Users\bleke\AppData\Local\Microsoft\WindowsApps;C:\SmartGit\usr\bin\;C:\SmartGit\mingw64\bin\;

C:\Users\bleke>which git
/mingw64/bin/git

C:\Users\bleke>G:

G:\>cd \Gateway\GitHub\blekenbleu.github.io

G:\Gateway\GitHub\blekenbleu.github.io>git status
On branch master
Your branch is up to date with 'origin/master'.
nothing to commit, working tree clean
```
According to [Solarian Programmer](https://solarianprogrammer.com/2018/09/22/install-ruby-macos-windows-ubuntu/#Windows-10-WSL),  
Ruby  installs on **WSL** as on native Ubuntu
```
$ sudo apt update
[sudo] password:
Hit:1 http://archive.ubuntu.com/ubuntu bionic InRelease
Get:2 http://archive.ubuntu.com/ubuntu bionic-updates InRelease [88.7 kB]
Get:3 http://security.ubuntu.com/ubuntu bionic-security InRelease [83.2 kB]
Get:4 http://archive.ubuntu.com/ubuntu bionic-backports InRelease [74.6 kB]
Get:5 http://archive.ubuntu.com/ubuntu bionic-updates/main amd64 Packages [416 kB]
Get:6 http://archive.ubuntu.com/ubuntu bionic-updates/universe amd64 Packages [571 kB]
Fetched 1233 kB in 12s (98.9 kB/s)
Reading package lists... Done
Building dependency tree
Reading state information... Done
All packages are up to date.

$ sudo apt upgrade
Reading package lists... Done
Building dependency tree
Reading state information... Done
Calculating upgrade... Done
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.

$ sudo apt install -y build-essential libssl-dev libreadline-dev zlib1g-dev

$ sudo apt install ruby-full
$ ruby --version
ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-linux-gnu]
```
This bogged down, with a long delay before any response, at:
```
$ sudo gem install bundler
ERROR:  Could not find a valid gem 'bundler' (>= 0), here is why:
          Unable to download data from https://rubygems.org/ - timed out (https://api.rubygems.org/specs.4.8.gz)
```
Rebooted the PC to eventually recover..
```
$ sudo gem install bundler
[sudo] password for bleke:
Fetching: bundler-1.17.1.gem (100%)
Successfully installed bundler-1.17.1
Parsing documentation for bundler-1.17.1
Installing ri documentation for bundler-1.17.1
Done installing documentation for bundler after 28 seconds
1 gem installed

$ ruby -ropen-uri -e 'eval open("https://git.io/vQhWq").read'
...
Hooray! This Ruby can connect to rubygems.org. You are all set to use Bundler and RubyGems.
(eval):136: warning: constant OpenSSL::SSL::SSLContext::METHODS is deprecated

$ sudo gem update --system
$ sudo gem install jekyll
...
Building native extensions. This could take a while...
...
Successfully installed ffi-1.9.25
ERROR:  While executing gem ... (Gem::RemoteFetcher::UnknownHostError)
    timed out (https://api.rubygems.org/quick/Marshal.4.8/rb-inotify-0.9.10.gemspec.rz)
```
Pings started failing again..  
At this point, discovered and applied the [IPv4 precedence change](https://www.reddit.com/r/bashonubuntuonwindows/comments/7u1le5/disable_ipv6_or_prefer_ipv4_first/)  
.. then restarted
```
$ sudo gem install jekyll
$ cd /g/Gateway/GitHub
$ sudo jekyll new Jekyll
$ cd Jekyll
$ bundle exec jekyll build
$ cd ../blekenbleu.github.io
$ bundle install
$ bundle exec jekyll build
$ bundle exec jekyll serve
with `_config.yml:theme: jekyll-theme-primer`
Configuration file: /mnt/g/Gateway/GitHub/blekenbleu.github.io/_config.yml
            Source: /mnt/g/Gateway/GitHub/blekenbleu.github.io
       Destination: /mnt/g/Gateway/GitHub/blekenbleu.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
  Conversion error: Jekyll::Converters::Scss encountered an error while converting 'assets/css/style.scss':
                    Invalid US-ASCII character "\xE2" on line 5
jekyll 3.7.4 | Error:  Invalid US-ASCII character "\xE2" on line 5
```
#### Jekyll style UTF-8 bugs
Eventually found assets in `/var/lib/gems/`  
`Scss` error seemed to be in:  
`/var/lib/gems/2.5.0/gems/jekyll-theme-primer-0.5.3/assets/css/style.scss`

.. but that had  only 4 lines...  Problems were *later* found by:  
`$ grep -R --color='always' -P -n "[\x80-\xFF]" /var/lib/gems/2.5.0/gems/jekyll-theme-primer-0.5.3`

### `sudo vi offending.md` for about 8 files..
success, *finally*:  
```
$ bundle exec jekyll serve
Configuration file: /mnt/g/Gateway/GitHub/blekenbleu.github.io/_config.yml
            Source: /mnt/g/Gateway/GitHub/blekenbleu.github.io
       Destination: /mnt/g/Gateway/GitHub/blekenbleu.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 2.436 seconds.
                    Auto-regeneration may not work on some Windows versions.
                    Please see: https://github.com/Microsoft/BashOnWindows/issues/216
                    If it does not work, please upgrade Bash on Windows or run Jekyll with --no-watch.
 Auto-regeneration: enabled for '/mnt/g/Gateway/GitHub/blekenbleu.github.io'
    Server address: http://127.0.0.1:4000
  Server running... press ctrl-c to stop
```

