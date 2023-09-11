---
---
### GitHub Pages on Windows
*10 Sep 2023* &nbsp; **Jekyll on Windows (8.1)**

## [GitHub Pages](https://pages.github.com/) - too good to be true (literally)

  [**Jekyll on Windows**](https://jekyllrb.com/docs/installation/windows/) *24 October 2018* documentation
 was for me doomed,  
  provoking many false moves that needed undoing.  
10 Sep 2023 [instructions](https://jekyllrb.com/docs/installation/windows/) seem OK,
so far as it goes (not nearly far enough)...   

Debugging **Jekyll** page generation wants
a **GitHub** Pages repository [local copy](html.html),  
but `jekyll new` creates a **GitHub** Pages for *blogging*;  
**Jekyll** for *pages* is configured rather differently.

Two files control Jekyll page generation: `Gemfile` and `_config.yml`.  
- `Gemfile` identifies Ruby Gems for Jekyll to format according to ``_config.yml`.  
- Jekyll uses `bundle` to manage resources;  instead of directly invoking `jekyll`,  
one invokes e.g.  
 `bundle exec jekyll serve --incremental --trace --baseurl=""`  


### Jekyll is a [Ruby `gem`](https://www.rubyguides.com/2018/09/ruby-gems-gemfiles-bundler/)
Jekyll depends on many other gems via [Bundler](https://bundler.io/guides/using_bundler_in_applications.html), yet another gem.  
The first 2 steps in **GitHub Pages** generation involves installing a **Ruby+Devkit**.  
For Windows, do this using [**RubyInstaller**](https://rubyinstaller.org/downloads/), because:  
-  [**RubyInstaller**](https://rubyinstaller.org/downloads/) is the least hassle way to get a newer version.  
- Jekyll infrastructures eventually require updating,
e.g. for [`nokogiri` vulnerabilities](https://nvd.nist.gov/vuln/search/results?form_type=Basic&results_type=overview&query=nokogiri&queryType=phrase&search_type=all&isCpeNameSearch=false)  
- Older Ruby versions sooner than later fail to support updates of e.g. `nokogiri`.  
- GitHub will refuse to deploy Pages updates until security vulnerabilites are resolved.  
- Ruby and its gems are liable to breaking changes, requiring a new Ruby version.  

Here is a worthwhile Jekyll `Gemfile` for GitHub Pages, not a blog:  
```
source 'http://rubygems.org'
gem 'wdm', '>= 0.1.0' if Gem.win_platform?
gem 'github-pages', group: :jekyll_plugins

gem "webrick", "~> 1.8"

gem "faraday-retry", "~> 2.2"

group :jekyll_plugins do
  gem 'jekyll-commonmark-ghpages'
end 
```
- `group: :jekyll_plugins` is key to matching GitHub Page's appearance. 
- `gem 'jekyll-commonmark-ghpages'` approximates GitHub Page's page generator.  

Here is a working example Jekyll `_config.yml` for GitHub Pages:  
```
theme: jekyll-theme-tactile
repository: blekenbleu/blekenbleu.github.io
github: [metadata]
markdown: CommonMarkGhPages
url: 'https://blekenbleu.github.io/'
```

## Install [GitHub Desktop](https://desktop.github.com/)
- includes `git.exe` useful with Ruby `msys64` Bash console.    
- free for non-commercial use
- [Clone a repository refuses to clone into an existing directory]

### Install [Ruby](https://rubyinstaller.org/downloads/) **with** Dev toolchain
Installing *without* admin permissions works for me...   
[GitHub documentation](https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/)
was unclear, but **Jekyll** [depends on nokogiri](https://pages.github.com/versions/), which has C extensions,
and `"MSYS2 is required to install gems with C extensions"`  

### Invoke commands from some Bash shell
- Launch Ruby's `msys64\ucrt64.exe` Bash console. 
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
This is wanted for local **Jekyll** as well as **GitHub Desktop**
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
echo bundle exec jekyll serve --incremental --trace --baseurl=""
bundle exec jekyll serve --incremental --trace --baseurl=""
```
 
`$ gem install bundler`
- `gem` required firewall permissions

###
###
### Modify folder for **GitHub Pages**
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

#### serve simple test Jekyll
`$ cd blekenbleu.github.io/`   
`$ serve`
```
Configuration file: D:/GitHub/blekenbleu.github.io/_config.yml
            Source: D:/GitHub/blekenbleu.github.io
       Destination: D:/GitHub/blekenbleu.github.io/_site
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in 0.752 seconds.
 Auto-regeneration: enabled for 'D:/GitHub/blekenbleu.github.io'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
[2018-10-22 16:02:03] ERROR '/favicon.ico' not found.
```
#### Browse to [http://localhost:4000](http://localhost:4000) to review results


###
###

Based on [this advice](https://github.com/mmistakes/minimal-mistakes/issues/1558)
... ignore this "*You must*" message:
```
Thank you for installing html-pipeline!
You must bundle Filter gem dependencies.
See html-pipeline README.md for more details.
https://github.com/jch/html-pipeline#dependencies
```

### Commit your *working* **GitHub Page**[s] to master and Push to **GitHub**

## Best practices
Once pages are working, these steps minimize update hassles. 
- *Before* changing markdown in GitHub Pages repository, update infrastructure:
   - `gem update --system`
- In repository, grab latest Jekyll gems:
   - `bundle update`
- Check infrastructure *before* making changes; generatng fresh HTML:
   - `bundle exec jekyll clear`
   - `bundle exec jekyll serve --incremental --trace --baseurl=""`
- **Now**, make changes.  If other than trivial, better to repeat above 2 steps.
   - if changing `Gemfile` or `_config.yml`, [should then](https://stackoverflow.com/questions/13101945/how-to-re-sync-gemfile-lock-on-changes-to-gemfile)  
     (before `bundle exec jekyll`):  
     `bundle install` 
