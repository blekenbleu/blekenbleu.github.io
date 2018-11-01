---
title: Jekyll on Windows 8.1
---
24 October 2018

# [GitHub Pages](https://pages.github.com/) - too good to be true (really)

  Following [seemingly current GitHub documentation](https://jekyllrb.com/docs/installation/windows/)
 was for me doomed,
  provoking many false moves that needed undoing.

*Warning:*  I *think* **this** sequence is more nearly correct,
but is untested..

Debugging Jekyll page generation failures wants
a local PC copy of GitHub repository source
that eventually becomes GitHub Pages,  
and `jekyll new` insists on creating that GitHub Pages repository directory;
it may be simpler to configure using Jekyll on a local PC *first*.

Note: Jekyll is *NOT* separately installed; it gets installed using Ruby.   
Configuring `'github-pages'` in Gemfile enables GitHub Pages builds using `bundle exec jekyll build`  
and previewing pages locally using `bundle exec jekyll serve`.

README.md becomes the GitHub Pages landing page by default.
Unfortunately, relative URLs  
(which would work both locally for `bundle exec jekyll serve`
as well as at github.io GitHub Pages URL)  
would be broken in README.md displayed at the bottom pf https://github.com/ repository page URL

## Optionally install [Git for Windows](https://gitforwindows.org/)
... which uses MINGW64 for Git bash.  
Usefull `git.exe` and
bash terminals are also available in **GitHub Desktop**,
**SmartGit** and Ruby's `msys64` folder.  

### Install [Ruby](https://rubyinstaller.org/downloads/) **with** Dev toolchain
Many folks recommend using `rbenv` or `rvm` to install and configure Ruby, but my intention is to *not change versions* once Jekyll works satisfactorily.
[GitHub documentation](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
was unclear, but `"MSYS2 is required to install gems with C extensions"`  
Pressed `Enter` for options 1,2,3; provoking many, many messages,  
including a final prompt that seemingly wanted to start over...??!!

### Invoke commands from some Bash shell
Available in GitHub Desktop, SmartGit 
`$ gem install bundler`
- gem required firewall permissions

`$ ruby -ropen-uri -e 'eval open("https://git.io/vQhWq").read'`   
`$ gem update --system`  
#### create simple test document folder
`$ jekyll new blekenbleu.github.io`

<details>
<summary> click for details</summary>
Running bundle install in D:/GitHub/blekenbleu/blekenbleu.github.io...
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
New jekyll site installed in D:/GitHub/blekenbleu/blekenbleu.github.io.
</details>

#### build and server simple test
`$ cd blekenbleu.github.io/`   
`$ cat _config.yml`   
```
{% include_relative _config.yml %}
```
`$ cat Gemfile`
```
{% include_relative Gemfile %}
```

`$ bundle exec jekyll serve`
```
Configuration file: D:/GitHub/blekenbleu/blekenbleu.github.io/_config.yml
            Source: D:/GitHub/blekenbleu/blekenbleu.github.io
       Destination: D:/GitHub/blekenbleu/blekenbleu.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in 0.752 seconds.
 Auto-regeneration: enabled for 'D:/GitHub/blekenbleu/blekenbleu.github.io'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
[2018-10-22 16:02:03] ERROR '/favicon.ico' not found.
```
#### Browse to [http://localhost:4000](http://localhost:4000) to review results

### Modify simple folder for GitHub Pages
`$ cd /e/blekenbleu/blekenbleu.github.io`  
#### Configure Jekyll for GitHub Pages
`$ cat _config.yml`
```
# Does not tactile support <details>?
# theme: jekyll-theme-tactile
theme: jekyll-theme-primer
repository: blekenbleu/blekenbleu.github.io
github: [metadata]
title: blekenbleu documentation
# Kramdown does not support <details>
markdown: CommonMarkGhPages
```
`$ cat Gemfile`
```
source 'http://rubygems.org'
gem 'wdm', '>= 0.1.0' if Gem.win_platform?
gem 'github-pages', group: :jekyll_plugins
```
#### Generate a [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) and set its environmental variable:

`$ cat $HOME/.bash_profile`
```
export JEKYLL_GITHUB_TOKEN=12345yourtokenhere6789
alias g="cd /d/GitHub/blekenbleu/blekenbleu.github.io"
alias serve="/c/Users/blekenbleu/bin/serve"
```
`$ cat $HOME/bin/serve`
```
echo bundle exec jekyll serve --incremental
bundle exec jekyll serve --incremental
```

#### Install GitHub Pages gems
`$ bundle install`
- NOTHING reported for a very long time..
then failed:
```
Retrying fetcher due to error (2/4): Bundler::HTTP
Error Could not fetch specs from https://rubygems.org/
```
.. but, after walking away for awhile, retried  
`$ bundle install`
- .. and it worked..!?  
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
It took awhile (hours?) for GitHub Desktop to first sync with github.com repository...

### Commit your *working* GitHub Page[s] to master and Push to GitHub
*Note:* Markdown pages (files ending with `.md`) get URLs *without* `.md`
