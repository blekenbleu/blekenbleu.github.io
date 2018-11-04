---
title: Jekyll on Windows 8.1
---
24 October 2018

# [GitHub Pages](https://pages.github.com/) - too good to be true (really)

  Following [seemingly current **GitHub** documentation](https://jekyllrb.com/docs/installation/windows/)
 was for me doomed,
  provoking many false moves that needed undoing.

*Warning:*  I *think* **this** sequence is more nearly correct,
but is untested..

Debugging **Jekyll** page generation failures wants
a local PC copy of **GitHub** repository source
that eventually becomes **GitHub** Pages,  
and `jekyll new` insists on creating that **GitHub** Pages repository directory;
it may be simpler to configure using **Jekyll** on a local PC *first*.

Note: **Jekyll** is *NOT* separately installed; it gets installed using **Ruby**.   
Configuring `'github-pages'` in Gemfile enables **GitHub Pages** builds using `bundle exec jekyll build`  
and previewing pages locally using `bundle exec jekyll serve`.

## Optionally install [Git for Windows](https://gitforwindows.org/)
... which uses MINGW64 for **Git Bash**.  
Usefull `git.exe` and
Bash terminals are also available in **SmartGit** and Ruby's `msys64` folder.  
**Git for Windows**' Bash shell `$PATH` is unnecessarily cluttered.

### Install [Ruby](https://rubyinstaller.org/downloads/) **with** Dev toolchain
Many folks recommend using `rbenv` or `rvm` to install and configure Ruby,
but my intention is to *not change versions* once **Jekyll** works satisfactorily.  
[GitHub documentation](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
was unclear, but **Jekyll** [depends on nokogiri](https://pages.github.com/versions/), which has C extensions,
and `"MSYS2 is required to install gems with C extensions"`  
Pressed `Enter` for options 1,2,3; provoking many, many messages,  
including a final prompt that seemingly wanted to start over...??!!

FWIW, [this page](http://www.nokogiri.org/tutorials/installing_nokogiri.html) suggest that pre-compiled nokogiri binary
should be available..  
In which case, it may be possible to install a minimal **Ruby** *without* MSYS2 DevKit by downloading and selectively extracting from
a [7-ZIP ARCHIVE](https://rubyinstaller.org/downloads/).  
Since compiling embedded firmware is essential to the eventual goal, a massive MINGW64 is probably needed anyway...   

### Invoke commands from some Bash shell
Bash shell available in **GitHub Desktop**, **SmartGit**, and/or **Ruby**

### Launch Ruby's msys64\msys2_shell.cmd
```
Copying skeleton files.
These files are for the users to personalise their msys2 experience.

They will never be overwritten nor automatically updated.

'./.bashrc' -> '/home/bleke/.bashrc'
'./.bash_logout' -> '/home/bleke/.bash_logout'
'./.bash_profile' -> '/home/bleke/.bash_profile'
'./.inputrc' -> '/home/bleke/.inputrc'
'./.profile' -> '/home/bleke/.profile'
```
#### Generate a [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)
This is wanted for local **Jekyll** as well as **GitHub Desktop** and/or **SmartGit**
##### set Jekyll's environmental variable:
Added to `~/.bash_profile` :
```
# Ruby's msys2 Bash $PATH by default includes neither git nor vi
if [ -z "$RUBY" ] ; then
  export RUBY="/g/Ruby25-x64"
fi
if [ -d "${RUBY}/bin" ] ; then
  PATH="${PATH}:${RUBY}/bin"
fi

export JEKYLL_GITHUB_TOKEN=0123456789yourTokenHereabcdef98765432100
if [ -d /g/GitHub/blekenbleu.github.io ] ; then
  alias g="cd /g/GitHub/blekenbleu.github.io"
fi
alias serve="~/bin/serve"
# Ctrl+C leaves **Jekyll** server running..!
alias unserve="taskkill //IM ruby.exe //F"
```
`$ cat $HOME/bin/serve`
```
echo bundle exec jekyll serve --incremental
bundle exec jekyll serve --incremental
```
 
`$ gem install bundler`
- gem required firewall permissions

`$ ruby -ropen-uri -e 'eval open("https://git.io/vQhWq").read'`   
`$ gem update --system`  
#### create a simple **Jekyll** test folder
`$ cd /g/GitHub`   
`$ jekyll new blekenbleu.github.io`

<details>
<summary> click for details</summary>

```
Running bundle install in D:/GitHub/blekenbleu.github.io...
  Bundler: Fetching gem metadata from https://rubygems.org/...........
  Bundler: Fetching gem metadata from https://rubygems.org/.
  Bundler: Resolving dependencies...
  Bundler: Fetching public_suffix 3.0.3
  Bundler: Installing public_suffix 3.0.3
  Bundler: Using addressable 2.5.2
  Bundler: Using bundler 1.16.6
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
  Bundler: Fetching liquid 4.0.1
  Bundler: Installing liquid 4.0.1
  Bundler: Using mercenary 0.3.6
  Bundler: Using pathutil 0.16.1
  Bundler: Fetching rouge 3.3.0
  Bundler: Installing rouge 3.3.0
  Bundler: Using safe_yaml 1.0.4
  Bundler: Using jekyll 3.7.4
  Bundler: Fetching jekyll-feed 0.11.0
  Bundler: Installing jekyll-feed 0.11.0
  Bundler: Using jekyll-seo-tag 2.5.0
  Bundler: Using minima 2.5.0
  Bundler: Using thread_safe 0.3.6
  Bundler: Using tzinfo 1.2.5
  Bundler: Fetching tzinfo-data 1.2018.6
  Bundler: Installing tzinfo-data 1.2018.6
  Bundler: Fetching wdm 0.1.1
  Bundler: Installing wdm 0.1.1 with native extensions
  Bundler: Bundle complete! 5 Gemfile dependencies, 33 gems now installed.
  Bundler: Use `bundle info [gemname]` to see where a bundled gem is installed.
New jekyll site installed in D:/GitHub/blekenbleu.github.io.
```

</details>

###
###
#### serve simple test Jekyll
`$ cd blekenbleu.github.io/`   
`$ bundle exec jekyll serve`
```
Configuration file: D:/GitHub/blekenbleu.github.io/_config.yml
            Source: D:/GitHub/blekenbleu.github.io
       Destination: D:/GitHub/blekenbleu.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in 0.752 seconds.
 Auto-regeneration: enabled for 'D:/GitHub/blekenbleu.github.io'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
[2018-10-22 16:02:03] ERROR '/favicon.ico' not found.
```
#### Browse to [http://localhost:4000](http://localhost:4000) to review results

### Modify simple folder for **GitHub Pages**
`$ cd /e/blekenbleu.github.io`  
`$ cat _config.yml`   
```
{% include_relative _config.yml %}
```
`$ cat Gemfile`
```
{% include_relative Gemfile %}
```
#### Install gems to support **GitHub Pages**
`$ bundle install`
- NOTHING reported for a very long time..
then failed:
```
Retrying fetcher due to error (2/4): Bundler::HTTP
Error Could not fetch specs from https://rubygems.org/
```
.. but, after walking away for awhile, retried:   
`$ bundle install`  
- .. and it worked..!?  

<details>
<summary>click for installation messages</summary>

```
Warning: the running version of Bundler (1.16.6) is older than the version that created the lockfile (1.17.1). We suggest you upgrade to the latest version of Bundler by running `gem install bundler`.
Fetching gem metadata from http://rubygems.org/..............
Fetching gem metadata from http://rubygems.org/..
Resolving dependencies...
Using concurrent-ruby 1.0.5
Using i18n 0.9.5
Using minitest 5.11.3
Using thread_safe 0.3.6
Using tzinfo 1.2.5
Using activesupport 4.2.10
Using public_suffix 2.0.5
Using addressable 2.5.2
Using bundler 1.16.6
Using coffee-script-source 1.11.1
Using execjs 2.7.0
Using coffee-script 2.4.1
Using colorator 1.1.0
Using ruby-enum 0.7.2
Using commonmarker 0.17.13
Using dnsruby 1.61.2
Using eventmachine 1.2.7 (x64-mingw32)
Using http_parser.rb 0.6.0
Using em-websocket 0.5.1
Using ffi 1.9.25 (x64-mingw32)
Using ethon 0.11.0
Using multipart-post 2.0.0
Using faraday 0.15.3
Using forwardable-extended 2.6.0
Using gemoji 3.0.0
Using sawyer 0.8.1
Using octokit 4.13.0
Using typhoeus 1.3.0
Using github-pages-health-check 1.8.1
Using rb-fsevent 0.10.3
Using rb-inotify 0.9.10
Using sass-listen 4.0.0
Using sass 3.6.0
Using jekyll-sass-converter 1.5.2
Using ruby_dep 1.5.0
Using listen 3.1.5
Using jekyll-watch 2.1.2
Using kramdown 1.17.0
Using liquid 4.0.0
Using mercenary 0.3.6
Fetching pathutil 0.16.2
Installing pathutil 0.16.2
Using rouge 2.2.1
Using safe_yaml 1.0.4
Using jekyll 3.7.4
Using jekyll-avatar 0.6.0
Using jekyll-coffeescript 1.1.1
Using jekyll-commonmark 1.2.0
Using jekyll-commonmark-ghpages 0.1.5
Using jekyll-default-layout 0.1.4
Using jekyll-feed 0.10.0
Using jekyll-gist 1.5.0
Using jekyll-github-metadata 2.9.4
Using mini_portile2 2.3.0
Using nokogiri 1.8.5 (x64-mingw32)
Using html-pipeline 2.8.4
Using jekyll-mentions 1.4.1
Using jekyll-optional-front-matter 0.3.0
Using jekyll-paginate 1.1.0
Using jekyll-readme-index 0.2.0
Using jekyll-redirect-from 0.14.0
Using jekyll-relative-links 0.5.3
Using rubyzip 1.2.2
Using jekyll-remote-theme 0.3.1
Using jekyll-seo-tag 2.5.0
Using jekyll-sitemap 1.2.0
Using jekyll-swiss 0.4.0
Using jekyll-theme-architect 0.1.1
Using jekyll-theme-cayman 0.1.1
Using jekyll-theme-dinky 0.1.1
Using jekyll-theme-hacker 0.1.1
Using jekyll-theme-leap-day 0.1.1
Using jekyll-theme-merlot 0.1.1
Using jekyll-theme-midnight 0.1.1
Using jekyll-theme-minimal 0.1.1
Using jekyll-theme-modernist 0.1.1
Using jekyll-theme-primer 0.5.3
Using jekyll-theme-slate 0.1.1
Using jekyll-theme-tactile 0.1.1
Using jekyll-theme-time-machine 0.1.1
Using jekyll-titles-from-headings 0.5.1
Using jemoji 0.10.1
Using minima 2.5.0
Using unicode-display_width 1.4.0
Using terminal-table 1.8.0
Using github-pages 192
Using wdm 0.1.1
Bundle complete! 2 Gemfile dependencies, 86 gems now installed.
Use `bundle info [gemname]` to see where a bundled gem is installed.
```

</details>

###
###
[`rubygems.org`](https://rubygems.org/) is seeming overloaded, based on [subsequent misadventures](GitHubWSL).

Based on [this advice](https://github.com/mmistakes/minimal-mistakes/issues/1558)
... ignore this "*You must*" message:
```
Thank you for installing html-pipeline!
You must bundle Filter gem dependencies.
See html-pipeline README.md for more details.
https://github.com/jch/html-pipeline#dependencies
```

## Install [GitHub Desktop](https://help.github.com/desktop/guides/getting-started-with-github-desktop/) or [SmartGit](https://www.syntevo.com/smartgit/) - free for non-commercial use
**GitHub Desktop** is simpler, but **SmartGit** helpfully displays modified file diffs.   
File changes using Windows Explorer or Command window or GVIM
are not recognized instantly, but fairly soon...

**GitHub Desktop** Installation splash screen is half white with no border;
- Other (black "space" cartoon) half was so distracting (and pointless)
      that "Welcome" prompts were initially missed..
- [Clone a repository refuses to clone into an existing directory]
- Git "setup" (email) instruction is redundant
It took awhile (hours?) for **GitHub Desktop** to first sync with github.com repository...

### Commit your *working* **GitHub Page**[s] to master and Push to **GitHub**
