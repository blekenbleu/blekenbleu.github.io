
---
Mac git server
---
Apple dropped support for its git server [after Xcode 8](https://forums.developer.apple.com/thread/87617)  
Best replacement is probably [gitolite](http://gitolite.com/gitolite/overview.html):
- more secure than needed, but less fat than alternatives
- manual configuration, including manual ssh configuration
- decent [documentation](http://gitolite.com/gitolite/) and
[cookbook](http://gitolite.com/gitolite/cookbook.html]  
  - [Windows ssh issues](http://gitolite.com/gitolite/sts.html#windows-issues)
  - [not gitolite problems](http://gitolite.com/gitolite/emergencies.html#things-that-are-not-gitolite-problems)

From [git wiki](https://git.wiki.kernel.org/index.php/Interfaces,_frontends,_and_tools):  
```
gitolite (http://github.com/sitaramc/gitolite), by Sitaram Chamarty, (sitaramc at gmail),
is inspired by gitosis, plus an urgent need to manage per-branch permissions.
It is written entirely in Perl, and designed to be usable on any Unix machine that managed to install Git and Perl.
It does not require root access to install or use.
Other advantages: an "easy install" script + copious documentation to make things as painless as possible,
especially with the critical ssh pieces; simpler, yet more powerful config file syntax;
ability to split the config into parts and delegate authority to different people;
better logging helps figure out exactly what was allowed/denied and why; "personal" branch namespace for developers.
Also there's a version that allows "deny" in the access control list,
making it truly powerful for pretty much all sorts of access restriction needs
```

[GitHub source](https://github.com/sitaramc/gitolite#readme)  

[Example user guide](https://wiki.physik.uni-bonn.de/computing/UserGuides/index.php/Git_server)  

[User installation HowTo](https://lobotuerto.com/blog/how-to-setup-your-own-private-git-repositories-with-gitolite/)  

[Gitolite on Mac setup](http://automatica.com.au/2011/01/setup-git-server-on-mac-osx-server/)  

[SmartGit client](https://examples.javacodegeeks.com/software-development/git/best-git-clients-linux-windows/)
[works with gitolite](http://smartgit.3668570.n2.nabble.com/Gitolite-SmartGit-td6766776.html).

