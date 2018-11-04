---
title: Jekyll on Windows 10
---
4 November 2018  

This was written *after* first Windows 10 installation,  
which followed Windows 8.1 installation.  
Having multiple Windows PCs enables discovering multiple ways to fail  
without the overhead of virtual machines.

**The short version**: [installation using Windows Subsystem for Linux](GitHubWSL)  
...which should basically be an [Ubuntu Installation](https://jekyllrb.com/docs/installation/ubuntu/)    
was disappointing.  FWIW, a Fedora distro on WSL would be preferred,  
but is as yet unsupported and problematic even for [better hackers](https://github.com/RoliSoft/WSL-Distribution-Switcher)  

#### Jekyll requires Ruby.    
Downloaded [Ruby WITHOUT Dev toolchain](https://github.com/oneclick/rubyinstaller2),  
.. but that installer anyway ran `ridk.cmd`,  
which prompted for Dev toolchain, to which `Enter` was pressed..  
FWIW, `ridk.cmd` is a Windows script  
that will not run from within a bash shell.  

MINGW64 in Ruby is much larger than in **Git for Windows** or **GitHub Desktop**:  
#### Git for Windows:
```
$ du -s /bin /usr
86818   /bin
74850   /usr
```

#### GitHub Desktop:
```
$ du -s $GPATH/mingw64/bin $GPATH/usr
21429   /c/Users/bleke/AppData/Local/GitHubDesktop/app-1.4.3/resources/app/git/mingw64/bin
21254   /c/Users/bleke/AppData/Local/GitHubDesktop/app-1.4.3/resources/app/git/usr
```

#### Ruby:
```
$ du -s /bin /usr
166562  /bin
257421  /usr
```
**GitHub Desktop** and **SmartGit** include a usable `git.exe`  
**Git for Windows** seems redundant...   

#### Ruby Bash
Ruby MINGW64 installation includes `D:\msys64\msys2_shell.cmd`  
of which I made a shortcut named **Ruby Bash**,  
![snapshot of Ruby Bash shortcut properties](RubyBash.gif "shortcut properties")  
which launches a useful MSYS2 terminal.  

**Git Bash** set `$HOME = /c/Users/bleke` and extended Windows' huge $PATH, while  
**Ruby Bash** sets `$HOME = /home/bleke`, AKA `/d/msys64/home/bleke`,  
and prunes Windows' $PATH before adding its bin/ directories.  
Although **Git for Windows**' **Git Bash** seemed nicer than **Ruby Bash**,  
**Ruby Bash** has more and different things on its path than did **Git Bash**  
and better isolates git / ruby / jekyll bash stuff from Windows..  

**Ruby Bash** was eventually replaced by **Git Bash**
from within [SmartGit](https://www.syntevo.com/smartgit/)   

`$ gem install bundler`
```
Successfully installed bundler-1.17.1
Parsing documentation for bundler-1.17.1
Installing ri documentation for bundler-1.17.1
Done installing documentation for bundler after 9 seconds
1 gem installed
```
#### Verify Ruby SSL:
`$ ruby -ropen-uri -e 'eval open("https://git.io/vQhWq").read'`
```
(eval):136: warning: constant OpenSSL::SSL::SSLContext::METHODS is deprecated
Here's your Ruby and OpenSSL environment:

Ruby:           2.5.3p105 (2018-10-18 revision 65156) [x64-mingw32]
RubyGems:       2.7.6
Bundler:        1.17.1
Compiled with:  OpenSSL 1.1.1  11 Sep 2018
Loaded version: OpenSSL 1.1.1  11 Sep 2018
SSL_CERT_FILE:  D:/Ruby25-x64/ssl/cert.pem
SSL_CERT_DIR:   D:/Ruby25-x64/ssl/certs

With that out of the way, let's see if you can connect to rubygems.org...

Bundler connection to rubygems.org:       success ?
RubyGems connection to rubygems.org:      success ?
Ruby net/http connection to rubygems.org: success ?

Hooray! This Ruby can connect to rubygems.org. You are all set to use Bundler and RubyGems.
```

`$ gem update --system`  
<details>
<summary>click for details</summary>

```
Updating rubygems-update
Successfully installed rubygems-update-2.7.7
Parsing documentation for rubygems-update-2.7.7
Installing ri documentation for rubygems-update-2.7.7
Installing darkfish documentation for rubygems-update-2.7.7
Bundler 1.16.2 installed
RubyGems 2.7.7 installed
Regenerating binstubs
Parsing documentation for rubygems-2.7.7
Installing ri documentation for rubygems-2.7.7

=== 2.7.7 / 2018-05-08

Minor enhancements:

* [RequestSet] Only suggest a gem version with an installable platform.
  Pull request #2175 by Samuel Giddins.
* Fixed no assignment variables about default gems installation. Pull
  request #2181 by SHIBATA Hiroshi.
* Backport improvements for test-case from Ruby core. Pull request #2189
  by SHIBATA Hiroshi.
* Fix ruby warnings in test suite. Pull request #2205 by Colby Swandale.
* To use Gem::Specification#bindir of bundler instead of hard coded path.
  Pull request #2208 by SHIBATA Hiroshi.
* Update gem push --help description. Pull request #2215 by Luis
  Sagastume.
* Backport ruby core commits. Pull request #2264 by SHIBATA Hiroshi.

Bug fixes:

* Frozen string fix - lib/rubygems/bundler_version_finder.rb. Pull request
  #2115 by MSP-Greg.
* Fixed tempfile leak for RubyGems 2.7.6. Pull request #2194 by SHIBATA
  Hiroshi.
* Add missing requires. Pull request #2196 by David Rodriguez.
* Fix Gem::Version.correct?. Pull request #2203 by Masato Nakamura.
* Fix verify_entry regex for metadata. Pull request #2212 by Luis
  Sagastume.
* Fix path checks for case insensitive filesystem. Pull request #2211 by
  Lars Kanis.

Compatibility changes:

* Deprecate unused code before removing them at #1524. Pull request #2197
  by SHIBATA Hiroshi.
* Deprecate for rubygems 3. Pull request #2214 by SHIBATA Hiroshi.
* Mark deprecation to `ubygems.rb` for RubyGems 4. Pull request #2269 by
  SHIBATA Hiroshi.
* Update bundler-1.16.2. Pull request #2291 by SHIBATA Hiroshi.

=== 2.7.6 / 2018-02-16

Security fixes:

* Prevent path traversal when writing to a symlinked basedir outside of the root.
  Discovered by nmalkin, fixed by Jonathan Claudius and Samuel Giddins.
* Fix possible Unsafe Object Deserialization Vulnerability in gem owner.
  Fixed by Jonathan Claudius.
* Strictly interpret octal fields in tar headers.
  Discoved by plover, fixed by Samuel Giddins.
* Raise a security error when there are duplicate files in a package.
  Discovered by plover, fixed by Samuel Giddins.
* Enforce URL validation on spec homepage attribute.
  Discovered by Yasin Soliman, fixed by Jonathan Claudius.
* Mitigate XSS vulnerability in homepage attribute when displayed via `gem server`.
  Discovered by Yasin Soliman, fixed by Jonathan Claudius.
* Prevent Path Traversal issue during gem installation.
  Discovered by nmalkin.

=== 2.7.5

Bug fixes:

* To use bundler-1.16.1 #2121 by SHIBATA Hiroshi.
* Fixed leaked FDs. Pull request #2127 by Nobuyoshi Nakada.
* Support option for `--destdir` with upgrade installer. #2169 by Thibault Jouan.
* Remove PID from gem index directory. #2155 by SHIBATA Hiroshi.
* Avoid a #mkdir race condition #2148 by Samuel Giddins.
* Gem::Util.traverse_parents should not crash on permissions error #2147 by Robert Ulejczyk.
* Use `File.open` instead of `open`. #2142 by SHIBATA Hiroshi.
* Set whether bundler is used for gemdeps with an environmental variable #2126 by SHIBATA Hiroshi.
* Fix undefined method error when printing alert #1884 by Robert Ross.

=== 2.7.4

Bug fixes:

* Fixed leaked FDs. Pull request #2127 by Nobuyoshi Nakada.
* Avoid to warnings about gemspec loadings in rubygems tests. Pull request
  #2125 by SHIBATA Hiroshi.
* Fix updater with rubygems-2.7.3 Pull request #2124 by SHIBATA Hiroshi.
* Handle environment that does not have `flock` system call. Pull request
  #2107 by SHIBATA Hiroshi.

=== 2.7.3

Minor enhancements:

* Removed needless version lock. Pull request #2074 by SHIBATA Hiroshi.
* Add --[no-]check-development option to cleanup command. Pull request
  #2061 by Lin Jen-Shin (godfat).
* Merge glob pattern using braces. Pull request #2072 by Kazuhiro
  NISHIYAMA.
* Removed warnings of unused variables. Pull request #2084 by SHIBATA
  Hiroshi.
* Call SPDX.org using HTTPS. Pull request #2102 by Olle Jonsson.
* Remove multi load warning from plugins documentation. Pull request #2103
  by Thibault Jouan.

Bug fixes:

* Fix test failure on Alpine Linux. Pull request #2079 by Ellen Marie
  Dash.
* Avoid encoding issues by using binread in setup. Pull request #2089 by
  Mauro Morales.
* Fix rake install_test_deps once the rake clean_env does not exist. Pull
  request #2090 by Lucas Oliveira.
* Prevent to delete to "bundler-" prefix gem like bundler-audit. Pull
  request #2086 by SHIBATA Hiroshi.
* Generate .bat files on Windows platform. Pull request #2094 by SHIBATA
  Hiroshi.
* Workaround common options mutation in Gem::Command test. Pull request
  #2098 by Thibault Jouan.
* Check gems dir existence before removing bundler. Pull request #2104 by
  Thibault Jouan.
* Use setup command --regenerate-binstubs option flag. Pull request #2099
  by Thibault Jouan.

=== 2.7.2

Bug fixes:

* Added template files to vendoerd bundler. Pull request #2065 by SHIBATA
  Hiroshi.
* Added workaround for non-git environment. Pull request #2066 by SHIBATA
  Hiroshi.

=== 2.7.1 (2017-11-03)

Bug fixes:

* Fix `gem update --system` with RubyGems 2.7+. Pull request #2054 by
  Samuel Giddins.

=== 2.7.0 (2017-11-02)

Major enhancements:

* Update vendored bundler-1.16.0. Pull request #2051 by Samuel Giddins.
* Use Bundler for Gem.use_gemdeps. Pull request #1674 by Samuel Giddins.
* Add command `signin` to `gem` CLI. Pull request #1944 by Shiva Bhusal.
* Add Logout feature to CLI. Pull request #1938 by Shiva Bhusal.

Minor enhancements:

* Added message to uninstall command for gem that is not installed. Pull
  request #1979 by anant anil kolvankar.
* Add --trust-policy option to unpack command. Pull request #1718 by
  Nobuyoshi Nakada.
* Show default gems for all platforms. Pull request #1685 by Konstantin
  Shabanov.
* Add Travis and Appveyor build status to README. Pull request #1918 by
  Jun Aruga.
* Remove warning `no email specified` when no email. Pull request #1675 by
  Leigh McCulloch.
* Improve -rubygems performance. Pull request #1801 by Samuel Giddins.
* Improve the performance of Kernel#require. Pull request #1678 by Samuel
  Giddins.
* Improve user-facing messages by consistent casing of Ruby/RubyGems. Pull
  request #1771 by John Labovitz.
* Improve error message when Gem::RuntimeRequirementNotMetError is raised.
  Pull request #1789 by Luis Sagastume.
* Code Improvement: Inheritance corrected. Pull request #1942 by Shiva
  Bhusal.
* [Source] Autoload fileutils. Pull request #1906 by Samuel Giddins.
* Use Hash#fetch instead of if/else in Gem::ConfigFile. Pull request #1824
  by Daniel Berger.
* Require digest when it is used. Pull request #2006 by Samuel Giddins.
* Do not index the doc folder in the `update_manifest` task. Pull request
  #2031 by Colby Swandale.
* Don't use two postfix conditionals on one line. Pull request #2038 by
  Ellen Marie Dash.
* [SafeYAML] Avoid warning when Gem::Deprecate.skip is set. Pull request
  #2034 by Samuel Giddins.
* Update gem yank description. Pull request #2009 by David Radcliffe.
* Fix formatting of installation instructions in README. Pull request
  #2018 by Jordan Danford.
* Do not use #quick_spec internally. Pull request #1733 by Jon Moss.
* Switch from docs to guides reference. Pull request #1886 by Jonathan
  Claudius.
* Happier message when latest version is already installed. Pull request
  #1956 by Jared Beck.
* Update specification reference docs. Pull request #1960 by Grey Baker.
* Allow Gem.finish_resolve to respect already-activated specs. Pull
  request #1910 by Samuel Giddins.
* Update cryptography for Gem::Security. Pull request #1691 by Sylvain
  Daubert.
* Don't output mkmf.log message if compilation didn't fail. Pull request
  #1808 by Jeremy Evans.
* Matches_for_glob - remove root path. Pull request #2010 by ahorek.
* Gem::Resolver#search_for update for reliable searching/sorting. Pull
  request #1993 by MSP-Greg.
* Allow local installs with transitive prerelease requirements. Pull
  request #1990 by Samuel Giddins.
* Small style fixes to Installer Set. Pull request #1985 by Arthur
  Marzinkovskiy.
* Setup cmd: Avoid terminating option string w/ dot. Pull request #1825 by
  Olle Jonsson.
* Warn when no files are set. Pull request #1773 by Aidan Coyle.
* Ensure `to_spec` falls back on prerelease specs. Pull request #1755 by
  Andre Arko.
* [Specification] Eval setting default attributes in #initialize. Pull
  request #1739 by Samuel Giddins.
* Sort ordering of sources is preserved. Pull request #1633 by Nathan
  Ladd.
* Retry with :prerelease when no suggestions are found. Pull request #1696
  by Aditya Prakash.
* [Rakefile] Run `git submodule update --init` in `rake newb`. Pull
  request #1694 by Samuel Giddins.
* [TestCase] Address comments around ui changes. Pull request #1677 by
  Samuel Giddins.
* Eagerly resolve in activate_bin_path. Pull request #1666 by Samuel
  Giddins.
* [Version] Make hash based upon canonical segments. Pull request #1659 by
  Samuel Giddins.
* Add Ruby Together CTA, rearrange README a bit. Pull request #1775 by
  Michael Bernstein.
* Update Contributing.rdoc with new label usage. Pull request #1716 by
  Lynn Cyrin.
* Add --host sample to help. Pull request #1709 by Code Ahss.
* Add a helpful suggestion when `gem install` fails due to required_ruby.
  Pull request #1697 by Samuel Giddins.
* Add cert expiration length flag. Pull request #1725 by Luis Sagastume.
* Add submodule instructions to manual install. Pull request #1727 by
  Joseph Frazier.
* Allow usage of multiple `--version` operators. Pull request #1546 by
  James Wen.
* Warn when requiring deprecated files. Pull request #1939 by Ellen Marie
  Dash.

Compatibility changes:

* Use `-rrubygems` instead of `-rubygems.rb`. Because ubygems.rb is
  unavailable on Ruby 2.5. Pull request #2028 #2027 #2029
  by SHIBATA Hiroshi.
* Deprecate Gem::InstallerTestCase#util_gem_bindir and
  Gem::InstallerTestCase#util_gem_dir. Pull request #1729 by Jon Moss.
* Deprecate passing options to Gem::GemRunner. Pull request #1730 by Jon
  Moss.
* Add deprecation for Gem#datadir. Pull request #1732 by Jon Moss.
* Add deprecation warning for Gem::DependencyInstaller#gems_to_install.
  Pull request #1731 by Jon Moss.
* Update Code of Conduct to Contributor Covenant v1.4.0. Pull request
  #1796 by Matej.

Bug fixes:

* Fix issue for MinGW / MSYS2 builds and testing. Pull request #1876 by
  MSP-Greg.
* Fixed broken links and overzealous URL encoding in gem server. Pull
  request #1809 by Nicole Orchard.
* Fix a typo. Pull request #1722 by Koichi ITO.
* Fix error message Gem::Security::Policy. Pull request #1724 by Nobuyoshi
  Nakada.
* Fixing links markdown formatting in README. Pull request #1791 by Piotr
  Kuczynski.
* Fix failing Bundler 1.8.7 CI builds. Pull request #1820 by Samuel
  Giddins.
* Fixed test broken on ruby-head . Pull request #1842 by SHIBATA Hiroshi.
* Fix typos with misspell. Pull request #1846 by SHIBATA Hiroshi.
* Fix gem open to open highest version number rather than lowest. Pull
  request #1877 by Tim Pope.
* Fix test_self_find_files_with_gemfile to sort expected files. Pull
  request #1878 by Kazuaki Matsuo.
* Fix typos in CONTRIBUTING.rdoc. Pull request #1909 by Mark Sayson.
* Fix some small documentation issues in installer. Pull request #1972 by
  Colby Swandale.
* Fix links in Policies document. Pull request #1964 by Alyssa Ross.
* Fix NoMethodError on bundler/inline environment. Pull request #2042 by
  SHIBATA Hiroshi.
* Correct comments for Gem::InstallerTestCase#setup. Pull request #1741 by
  MSP-Greg.
* Use File.expand_path for certification and key location. Pull request
  #1987 by SHIBATA Hiroshi.
* Rescue EROFS. Pull request #1417 by Nobuyoshi Nakada.
* Fix spelling of 'vulnerability'. Pull request #2022 by Philip Arndt.
* Fix metadata link key names. Pull request #1896 by Aditya Prakash.
* Fix a typo in uninstall_command.rb. Pull request #1934 by Yasuhiro
  Horimoto.
* Gem::Requirement.create treat arguments as variable-length. Pull request
  #1830 by Toru YAGI.
* Display an explanation when rake encounters an ontological problem. Pull
  request #1982 by Wilson Bilkovich.
* [Server] Handle gems with names ending in `-\d`. Pull request #1926 by
  Samuel Giddins.
* [InstallerSet] Avoid reloading _all_ local gems multiple times during
  dependency resolution. Pull request #1925 by Samuel Giddins.
* Modify the return value of Gem::Version.correct?. Pull request #1916 by
  Tsukuru Tanimichi.
* Validate metadata link keys. Pull request #1834 by Aditya Prakash.
* Add changelog to metadata validation. Pull request #1885 by Aditya
  Prakash.
* Replace socket error text message. Pull request #1823 by Daniel Berger.
* Raise error if the email is invalid when building cert. Pull request
  #1779 by Luis Sagastume.
* [StubSpecification] Don't iterate through all loaded specs in #to_spec.
  Pull request #1738 by Samuel Giddins.


------------------------------------------------------------------------------

RubyGems installed the following executables:
        D:/Ruby25-x64/bin/gem
        D:/Ruby25-x64/bin/bundle

Ruby Interactive (ri) documentation was installed. ri is kind of like man
pages for Ruby libraries. You may access it like this:
  ri Classname
  ri Classname.class_method
  ri Classname#instance_method
If you do not wish to install this documentation in the future, use the
--no-document flag, or set it as the default in your ~/.gemrc file. See
'gem help env' for details.

Done installing documentation for rubygems-update after 25 seconds
Parsing documentation for rubygems-update-2.7.7
Done installing documentation for rubygems-update after 0 seconds
Installing RubyGems 2.7.7
RubyGems system software updated
```

</details>

###   
###   
#### Modify bash shell environment for Jekyll and (optionally) GitHub Desktop
<details>
<summary>click for <em>working</em> example files</summary>

`$ cat .bash_profile`
```
# To the extent possible under law, the author(s) have dedicated all
# copyright and related and neighboring rights to this software to the
# public domain worldwide. This software is distributed without any warranty.
# You should have received a copy of the CC0 Public Domain Dedication along
# with this software.
# If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.

# ~/.bash_profile: executed by bash(1) for login shells.

# The copy in your home directory (~/.bash_profile) is yours, please
# feel free to customise it to create a shell
# environment to your liking.  If you feel a change
# would be benificial to all, please feel free to send
# a patch to the msys2 mailing list.

# User dependent .bash_profile file

# source the users bashrc if it exists
if [ -f "${HOME}/.bashrc" ] ; then
  source "${HOME}/.bashrc"
fi

# Set PATH to include Ruby bin/ if it exists
if [ -d "/d/Ruby25-x64/bin" ] ; then
  PATH="/d/Ruby25-x64/bin:${PATH}"
# 10/26/2018 possibly required by pacman
  export DEV=/d
fi

# Set PATH so it includes user's private bin if it exists
if [ -d "${HOME}/bin" ] ; then
  PATH="${HOME}/bin:${PATH}"
fi

if [ -d "/c/WINDOWS/System32/OpenSSH" ] ; then
  PATH="${PATH}:/c/WINDOWS/System32/OpenSSH"
fi

# GitHub Desktop has git.exe in $GPATH/mingw64/bin/
GPATH=${ORIGINAL_TEMP%/Temp}
GPATH="${GPATH}/GitHubDesktop/app-1.4.3/resources/app/git"

# Set MANPATH so it includes users' private man if it exists
# if [ -d "${HOME}/man" ]; then
#   MANPATH="${HOME}/man:${MANPATH}"
# fi

# Set INFOPATH so it includes users' private info if it exists
# if [ -d "${HOME}/info" ]; then
#   INFOPATH="${HOME}/info:${INFOPATH}"
# fi

# 10/26/2018
# GitHub Pages Jekyll helpers
export JEKYLL_GITHUB_TOKEN=123456789your_token_here0987654321abcdef
alias g="cd /d/Git/blekenbleu.github.io"
alias serve="${HOME}/bin/serve"
alias unserve="taskkill //IM ruby.exe //F"
# remove vim debris
alias rmv="rm *~ .[._a-Z]*~"

# Windows command compatibility
alias path="echo $PATH"
```
`$ cat ~/bin/serve`  
```
echo bundle exec jekyll serve --incremental  
bundle exec jekyll serve --incremental  
```

`$ exit`, then re-launch **Ruby Bash**
</details>

###   
###   
### Jekyll
`$ gem install jekyll`
<details>
<summary>click for details</summary>

```
Successfully installed public_suffix-3.0.3
Successfully installed addressable-2.5.2
Successfully installed colorator-1.1.0
Temporarily enhancing PATH for MSYS/MINGW...
Building native extensions. This could take a while...
Successfully installed http_parser.rb-0.6.0
Successfully installed eventmachine-1.2.7-x64-mingw32
Successfully installed em-websocket-0.5.1
Successfully installed concurrent-ruby-1.0.5
Successfully installed i18n-0.9.5
Successfully installed rb-fsevent-0.10.3
Successfully installed ffi-1.9.25-x64-mingw32
Successfully installed rb-inotify-0.9.10
Successfully installed sass-listen-4.0.0

Ruby Sass is deprecated and will be unmaintained as of 26 March 2019.

* If you use Sass as a command-line tool, we recommend using Dart Sass, the new
  primary implementation: https://sass-lang.com/install

* If you use Sass as a plug-in for a Ruby web framework, we recommend using the
  sassc gem: https://github.com/sass/sassc-ruby#readme

* For more details, please refer to the Sass blog:
  http://sass.logdown.com/posts/7081811

Successfully installed sass-3.6.0
Successfully installed jekyll-sass-converter-1.5.2
Successfully installed ruby_dep-1.5.0
Successfully installed listen-3.1.5
Successfully installed jekyll-watch-2.1.2
Successfully installed kramdown-1.17.0
Successfully installed liquid-4.0.1
Successfully installed mercenary-0.3.6
Successfully installed forwardable-extended-2.6.0
Successfully installed pathutil-0.16.1
Successfully installed rouge-3.3.0
Successfully installed safe_yaml-1.0.4
Successfully installed jekyll-3.8.4
Parsing documentation for public_suffix-3.0.3
Installing ri documentation for public_suffix-3.0.3
Parsing documentation for addressable-2.5.2
Installing ri documentation for addressable-2.5.2
Parsing documentation for colorator-1.1.0
Installing ri documentation for colorator-1.1.0
Parsing documentation for http_parser.rb-0.6.0
Installing ri documentation for http_parser.rb-0.6.0
Parsing documentation for eventmachine-1.2.7-x64-mingw32
Installing ri documentation for eventmachine-1.2.7-x64-mingw32
Parsing documentation for em-websocket-0.5.1
Installing ri documentation for em-websocket-0.5.1
Parsing documentation for concurrent-ruby-1.0.5
Installing ri documentation for concurrent-ruby-1.0.5
Parsing documentation for i18n-0.9.5
Installing ri documentation for i18n-0.9.5
Parsing documentation for rb-fsevent-0.10.3
Installing ri documentation for rb-fsevent-0.10.3
Parsing documentation for ffi-1.9.25-x64-mingw32
Installing ri documentation for ffi-1.9.25-x64-mingw32
Parsing documentation for rb-inotify-0.9.10
Installing ri documentation for rb-inotify-0.9.10
Parsing documentation for sass-listen-4.0.0
Installing ri documentation for sass-listen-4.0.0
Parsing documentation for sass-3.6.0
Installing ri documentation for sass-3.6.0
Parsing documentation for jekyll-sass-converter-1.5.2
Installing ri documentation for jekyll-sass-converter-1.5.2
Parsing documentation for ruby_dep-1.5.0
Installing ri documentation for ruby_dep-1.5.0
Parsing documentation for listen-3.1.5
Installing ri documentation for listen-3.1.5
Parsing documentation for jekyll-watch-2.1.2
Installing ri documentation for jekyll-watch-2.1.2
Parsing documentation for kramdown-1.17.0
Installing ri documentation for kramdown-1.17.0
Parsing documentation for liquid-4.0.1
Installing ri documentation for liquid-4.0.1
Parsing documentation for mercenary-0.3.6
Installing ri documentation for mercenary-0.3.6
Parsing documentation for forwardable-extended-2.6.0
Installing ri documentation for forwardable-extended-2.6.0
Parsing documentation for pathutil-0.16.1
Installing ri documentation for pathutil-0.16.1
Parsing documentation for rouge-3.3.0
Installing ri documentation for rouge-3.3.0
Parsing documentation for safe_yaml-1.0.4
Installing ri documentation for safe_yaml-1.0.4
Parsing documentation for jekyll-3.8.4
Installing ri documentation for jekyll-3.8.4
Done installing documentation for public_suffix, addressable, colorator, http_parser.rb, eventmachine, em-websocket, concurrent-ruby, i18n, rb-fsevent, ffi, rb-inotify, sass-listen, sass, jekyll-sass-converter, ruby_dep, listen, jekyll-watch, kramdown, liquid, mercenary, forwardable-extended, pathutil, rouge, safe_yaml, jekyll after 36 seconds
25 gems installed
```

</details>

###   
###   
#### Installing a dummy Jekyll home page
Since github.com already has a GitHub Pages repository for blekenbleu  
Jekyll for Windows 10 was tested on a different drive:  
`$ cd /d/Git/blekenbleu`  
`$ jekyll new blekenbleu.github.io`
<details>
<summary>click for details</summary>

```
Running bundle install in D:/Git/blekenbleu.github.io...
  Bundler: Fetching gem metadata from https://rubygems.org/...........
  Bundler: Fetching gem metadata from https://rubygems.org/.
  Bundler: Resolving dependencies...
  Bundler: Using public_suffix 3.0.3
  Bundler: Using addressable 2.5.2
  Bundler: Using bundler 1.17.1
  Bundler: Using colorator 1.1.0
  Bundler: Using concurrent-ruby 1.0.5
  Bundler: Using eventmachine 1.2.7 (x64-mingw32)
  Bundler: Using http_parser.rb 0.6.0
  Bundler: Using em-websocket 0.5.1
  Bundler: Using ffi 1.9.25 (x64-mingw32)
  Bundler: Using forwardable-extended 2.6.0
  Bundler: Using i18n 0.9.5
  Bundler: Using rb-fsevent 0.10.3
  Bundler: Using rb-inotify 0.9.10
  Bundler: Using sass-listen 4.0.0
  Bundler: Using sass 3.6.0
  Bundler: Using jekyll-sass-converter 1.5.2
  Bundler: Using ruby_dep 1.5.0
  Bundler: Using listen 3.1.5
  Bundler: Using jekyll-watch 2.1.2
  Bundler: Using kramdown 1.17.0
  Bundler: Using liquid 4.0.1
  Bundler: Using mercenary 0.3.6
  Bundler: Using pathutil 0.16.1
  Bundler: Using rouge 3.3.0
  Bundler: Using safe_yaml 1.0.4
  Bundler: Using jekyll 3.8.4
  Bundler: Fetching jekyll-feed 0.11.0
  Bundler: Installing jekyll-feed 0.11.0
  Bundler: Fetching jekyll-seo-tag 2.5.0
  Bundler: Installing jekyll-seo-tag 2.5.0
  Bundler: Fetching minima 2.5.0
  Bundler: Installing minima 2.5.0
  Bundler: Fetching thread_safe 0.3.6
  Bundler: Installing thread_safe 0.3.6
  Bundler: Fetching tzinfo 1.2.5
  Bundler: Installing tzinfo 1.2.5
  Bundler: Fetching tzinfo-data 1.2018.6
  Bundler: Installing tzinfo-data 1.2018.6
  Bundler: Fetching wdm 0.1.1
  Bundler: Installing wdm 0.1.1 with native extensions
  Bundler: Bundle complete! 5 Gemfile dependencies, 33 gems now installed.
  Bundler: Use `bundle info [gemname]` to see where a bundled gem is installed.
New jekyll site installed in D:/Git/blekenbleu.github.io.
```

</details>

###   
###   
##### Lauch local Jekyl test page

`$ cd /d/Git/blekenbleu.github.io`  
`$ serve`
```
bundle exec jekyll serve --incremental
Configuration file: D:/Git/blekenbleu.github.io/_config.yml
            Source: D:/Git/blekenbleu.github.io
       Destination: D:/Git/blekenbleu.github.io/_site
 Incremental build: enabled
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in 0.638 seconds.
 Auto-regeneration: enabled for 'D:/Git/blekenbleu.github.io'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
[2018-10-26 09:54:23] ERROR `/favicon.ico' not found.
```

#### Optionally Install [GitHub Desktop](https://desktop.github.com/)
I standardized on [SmartGit](https://www.syntevo.com/)

<details>
<summary>click for <b>GitHub Desktop</b> details</summary>

If **GitHub Desktop**, then add to [Windows User Path](https://www.architectryan.com/2018/03/17/add-to-the-path-on-windows-10/):  
`%LOCALAPPDATA%\GitHubDesktop\app-1.4.3\resources\app\git\mingw64\bin`  

...so that **GitHub Desktop** finds `git.exe`

FWIW, **GitHub Desktop** installs many command-line biinaries in  
`%LOCALAPPDATA%\GitHubDesktop\app-1.4.3\resources\app\git\mingw64\bin\` and  
`%LOCALAPPDATA%\GitHubDesktop\app-1.4.3\resources\app\git\usr\bin\`  
.. but does not by default use them.

Also FWIW, **GitHub Desktop** has a menu item for opening an external editor,  
but seemingly only [Atom](https://atom.io/) actually works on Windows..

</details>

###   
###   
### Clone GitHub Pages repository
  .. if already created, else:
### Configure Jekyll for GitHub Pages
Enable `bundle exec jekyll serve` for documentation repository from github.com  
`$ cd /d/Git/blekenbleu.github.io`  
`$ cat _config.yml`   
```
{% include_relative _config.yml %}
```
`$ cat Gemfile`
```
{% include_relative Gemfile %}
```
`$ bundle install`
<details>
<summary>click for details</summary>

```
Fetching gem metadata from http://rubygems.org/...........
Using concurrent-ruby 1.0.5
Using i18n 0.9.5
Fetching minitest 5.11.3
Installing minitest 5.11.3
Using thread_safe 0.3.6
Using tzinfo 1.2.5
Fetching activesupport 4.2.10
Installing activesupport 4.2.10
Fetching public_suffix 2.0.5
Installing public_suffix 2.0.5
Using addressable 2.5.2
Using bundler 1.17.1
Fetching coffee-script-source 1.11.1
Installing coffee-script-source 1.11.1
Fetching execjs 2.7.0
Installing execjs 2.7.0
Fetching coffee-script 2.4.1
Installing coffee-script 2.4.1
Using colorator 1.1.0
Fetching ruby-enum 0.7.2
Installing ruby-enum 0.7.2
Fetching commonmarker 0.17.13
Installing commonmarker 0.17.13 with native extensions
Fetching dnsruby 1.61.2
Installing dnsruby 1.61.2
Using eventmachine 1.2.7 (x64-mingw32)
Using http_parser.rb 0.6.0
Using em-websocket 0.5.1
Using ffi 1.9.25 (x64-mingw32)
Fetching ethon 0.11.0
Installing ethon 0.11.0
Fetching multipart-post 2.0.0
Installing multipart-post 2.0.0
Fetching faraday 0.15.3
Installing faraday 0.15.3
Using forwardable-extended 2.6.0
Fetching gemoji 3.0.0
Installing gemoji 3.0.0
Fetching sawyer 0.8.1
Installing sawyer 0.8.1
Fetching octokit 4.13.0
Installing octokit 4.13.0
Fetching typhoeus 1.3.0
Installing typhoeus 1.3.0
Fetching github-pages-health-check 1.8.1
Installing github-pages-health-check 1.8.1
Using rb-fsevent 0.10.3
Using rb-inotify 0.9.10
Using sass-listen 4.0.0
Using sass 3.6.0
Using jekyll-sass-converter 1.5.2
Using ruby_dep 1.5.0
Using listen 3.1.5
Using jekyll-watch 2.1.2
Using kramdown 1.17.0
Fetching liquid 4.0.0
Installing liquid 4.0.0
Using mercenary 0.3.6
Using pathutil 0.16.1
Fetching rouge 2.2.1
Installing rouge 2.2.1
Using safe_yaml 1.0.4
Fetching jekyll 3.7.4
Installing jekyll 3.7.4
Fetching jekyll-avatar 0.6.0
Installing jekyll-avatar 0.6.0
Fetching jekyll-coffeescript 1.1.1
Installing jekyll-coffeescript 1.1.1
Fetching jekyll-commonmark 1.2.0
Installing jekyll-commonmark 1.2.0
Fetching jekyll-commonmark-ghpages 0.1.5
Installing jekyll-commonmark-ghpages 0.1.5
Fetching jekyll-default-layout 0.1.4
Installing jekyll-default-layout 0.1.4
Fetching jekyll-feed 0.10.0
Installing jekyll-feed 0.10.0
Fetching jekyll-gist 1.5.0
Installing jekyll-gist 1.5.0
Fetching jekyll-github-metadata 2.9.4
Installing jekyll-github-metadata 2.9.4
Fetching mini_portile2 2.3.0
Installing mini_portile2 2.3.0
Fetching nokogiri 1.8.5 (x64-mingw32)
Installing nokogiri 1.8.5 (x64-mingw32)
Fetching html-pipeline 2.8.4
Installing html-pipeline 2.8.4
Fetching jekyll-mentions 1.4.1
Installing jekyll-mentions 1.4.1
Fetching jekyll-optional-front-matter 0.3.0
Installing jekyll-optional-front-matter 0.3.0
Fetching jekyll-paginate 1.1.0
Installing jekyll-paginate 1.1.0
Fetching jekyll-readme-index 0.2.0
Installing jekyll-readme-index 0.2.0
Fetching jekyll-redirect-from 0.14.0
Installing jekyll-redirect-from 0.14.0
Fetching jekyll-relative-links 0.5.3
Installing jekyll-relative-links 0.5.3
Fetching rubyzip 1.2.2
Installing rubyzip 1.2.2
Fetching jekyll-remote-theme 0.3.1
Installing jekyll-remote-theme 0.3.1
Using jekyll-seo-tag 2.5.0
Fetching jekyll-sitemap 1.2.0
Installing jekyll-sitemap 1.2.0
Fetching jekyll-swiss 0.4.0
Installing jekyll-swiss 0.4.0
Fetching jekyll-theme-architect 0.1.1
Installing jekyll-theme-architect 0.1.1
Fetching jekyll-theme-cayman 0.1.1
Installing jekyll-theme-cayman 0.1.1
Fetching jekyll-theme-dinky 0.1.1
Installing jekyll-theme-dinky 0.1.1
Fetching jekyll-theme-hacker 0.1.1
Installing jekyll-theme-hacker 0.1.1
Fetching jekyll-theme-leap-day 0.1.1
Installing jekyll-theme-leap-day 0.1.1
Fetching jekyll-theme-merlot 0.1.1
Installing jekyll-theme-merlot 0.1.1
Fetching jekyll-theme-midnight 0.1.1
Installing jekyll-theme-midnight 0.1.1
Fetching jekyll-theme-minimal 0.1.1
Installing jekyll-theme-minimal 0.1.1
Fetching jekyll-theme-modernist 0.1.1
Installing jekyll-theme-modernist 0.1.1
Fetching jekyll-theme-primer 0.5.3
Installing jekyll-theme-primer 0.5.3
Fetching jekyll-theme-slate 0.1.1
Installing jekyll-theme-slate 0.1.1
Fetching jekyll-theme-tactile 0.1.1
Installing jekyll-theme-tactile 0.1.1
Fetching jekyll-theme-time-machine 0.1.1
Installing jekyll-theme-time-machine 0.1.1
Fetching jekyll-titles-from-headings 0.5.1
Installing jekyll-titles-from-headings 0.5.1
Fetching jemoji 0.10.1
Installing jemoji 0.10.1
Using minima 2.5.0
Fetching unicode-display_width 1.4.0
Installing unicode-display_width 1.4.0
Fetching terminal-table 1.8.0
Installing terminal-table 1.8.0
Fetching github-pages 192
Installing github-pages 192
Using wdm 0.1.1
Bundle complete! 2 Gemfile dependencies, 86 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
Post-install message from dnsruby:
Installing dnsruby...
  For issues and source code: https://github.com/alexdalitz/dnsruby
  For general discussion (please tell us how you use dnsruby): https://groups.google.com/forum/#!forum/dnsruby
Post-install message from nokogiri:
Nokogiri is built with the packaged libraries: libxml2-2.9.8, libxslt-1.1.32, zlib-1.2.11, libiconv-1.15.
Post-install message from html-pipeline:
-------------------------------------------------
Thank you for installing html-pipeline!
You must bundle Filter gem dependencies.
See html-pipeline README.md for more details.
https://github.com/jch/html-pipeline#dependencies
-------------------------------------------------
```

</details>

###   
###   
### Launch GitHub Pages locally
Using my alias and/or script:  
`$ serve`
```
bundle exec jekyll serve --incremental
Configuration file: D:/Git/blekenbleu.github.io/_config.yml
            Source: D:/Git/blekenbleu.github.io
       Destination: D:/Git/blekenbleu.github.io/_site
 Incremental build: enabled
      Generating...
                    done in 0.718 seconds.
 Auto-regeneration: enabled for 'D:/Git/blekenbleu.github.io'
    Server address: http://127.0.0.1:4000  
  Server running... press ctrl-c to stop.
```

### Problem workarounds
* jekyll serve `-- incremental` option can be occasionally problematic  
  Workaround: `$ bundle exec jekyll serve` (without `-- incremental`)  
* Ruby `git.exe` installed by `pacman` reported files in cloned repository as `modified`.  
  Workaround:  
  * *Do NOT* install git by `pacman`.
  * Instead, link **SmartGit** or **GitHub Desktop**'s mingw64/bin to `/usr/bin/local`, e.g.:  
  `$ ln -s $GPATH/mingw64/bin /usr/local/`
* jekyll build `Error: invalid byte sequence in UTF-8`  
  Workaround: find offending characters to be editted out:    
  `$ grep -axv '.*' badfile.md | less`
* In Ruby Bash window, Ctrl+C to `bundle exec jekyll serve` does NOT stop port 4000 service  
  It does allows window reuse for other purposes...
  Workaround:
  To kill HTTP service:
  ```
  $ grep unserve ~/.bash_profile
  alias unserve="taskkill //IM ruby.exe //F"
  ```
