24 October 2018

# [GitHub Pages](https://pages.github.com/) - too good to be true

  Following seemingly current GitHub documentation was doomed,
  provoking many false moves that needed undoing.

*Warning:*  I *think* this sequence is more nearly correct,
but is untested..

Debugging generated page failures wants
a local PC copy of the GitHub repository
that will become your GitHub Pages home page,
and Jekyll insists on creating that repository directory,
so first install Jekyll on a local PC.



## Install [GitHub Desktop](https://help.github.com/desktop/guides/getting-started-with-github-desktop/)
   Installation splash screen is half white with no border;
- Other (black "space" cartoon) half was so distracting (and pointless)
      that "Welcome" prompts were initially missed..
- [Clone a repository refuses to clone into an existing directory]
- Git "setup" (email) instruction is redundant
It took awhile (hours?) for GitHub Desktop to sync from github.com repository...

File changes using Windows Explorer or Command window or GVIM
are not recognized instantly, but fairly soon...

## Install [Git for Windows](https://gitforwindows.org/)
... which uses MINGW64 for Git Bash

### Install [Ruby](https://rubyinstaller.org/downloads/) with Dev toolchain;
GitHub was totally unclear about that, but
"MSYS2 is required to install gems with C extensions"
Pressed Enter for options 1,2,3; get many, many messages,
including a final prompt that seemingly wanted to start over...??!!

### Invoke commands from Git Bash
`$ gem install bundler`
- required firewall permission

`$ bundle install`
- NOTHING reported for a very long time..
then failed:
```
Retrying fetcher due to error (2/4): Bundler::HTTP
Error Could not fetch specs from https://rubygems.org/
```
.. but, after walking away for awhile, retried `$ bundle install`
- .. and it worked..!?

Based on [this](https://github.com/mmistakes/minimal-mistakes/issues/1558)
... ignoring message:
```
-------------------------------------------------
Thank you for installing html-pipeline!
You must bundle Filter gem dependencies.
See html-pipeline README.md for more details.
https://github.com/jch/html-pipeline#dependencies
-------------------------------------------------
```

`$ jekyll new userid.github.io`
```
Running bundle install in D:/GitHub/userid/userid.github.io...
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
New jekyll site installed in D:/GitHub/userid.github.io/userid.github.io.
```

`$ cd userid.github.io/`

`$ bundle exec jekyll serve`
```
Configuration file: D:/GitHub/userid/userid.github.io/_config.yml
            Source: D:/GitHub/userid/userid.github.io
       Destination: D:/GitHub/userid/userid.github.io/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in 0.752 seconds.
 Auto-regeneration: enabled for 'D:/GitHub/userid/userid.github.io'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
[2018-10-22 16:02:03] ERROR '/favicon.ico' not found.
```
Browse succeeded to [http://localhost:4000](http://localhost:4000)

### Applying Jekyll for GitHub Pages
`$ cat _config.yml`
```
{% include_relative _config.yml %}
```
`$ cat Gemfile`
```
{% include_relative Gemfile %}
```
Generate a [personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/), then set up the environmental variable:

`$ cat $HOME/.bash_profile`
```
export JEKYLL_GITHUB_TOKEN=12345yourtokenhere6789
alias g="cd /d/GitHub/userid/userid.github.io"
alias serve="/c/Users/userid/bin/serve"
```
`$ cat $HOME/bin/serve`
```
echo bundle exec jekyll serve --incremental
bundle exec jekyll serve --incremental
```

### Use GitHub Desktop to commit to master and Push to GitHub
*Note:* Markdown pages (files ending with `.md`) get URLs *without* `.md`
