
---
Install Git_Cola using MacPorts
---

#### Background
**GitKraken** takes awhile to load  
 and seems to focussed on most recent commit  
 instead of current changes..  

**SmartGit** is scary for poor/missing documentation,  
e.g. merging  

#### 6 steps
1. `$ sudo port selfupdate`  
   `$ sudo port install git-cola`
```
git-cola has the following notes:
    If you want to use bash-completion for git-cola,
    you have to source the completion files from your ~/.bashrc
    as it extends the git command completion and cannot be loaded automatically:
         source /opt/local/share/bash-completion/completions/git
         source /opt/local/share/bash-completion/completions/git-cola

  libomp has the following notes:
    To use this OpenMP library:
     * For clang-3.8+, or clang-3.7 with +openmp variant:
        add "-fopenmp" during compilation / linking.
     * For clang-3.7 without +openmp variant, use:
        "-I/opt/local/include/libomp -L/opt/local/lib/libomp -fopenmp"

  py36-qtpy has the following notes:
    QtPy will work with one of the following backends: pyqt5, pyqt4, pyside2, and pyside.
    If multiple backends are available on your system, pyqt5 will be used
     unless you set the QT_API environment variable.

  py36-sphinx has the following notes:
    To make the Python 3.6 version of Sphinx the one that is run
     when you execute the commands without a version suffix, e.g. 'sphinx-build', run:
         port select --set sphinx py36-sphinx

 A startup item has been generated that will aid in starting rsync with launchd.
  It is disabled by default. Execute the following command to start it,
  and to cause it to launch at startup:
        sudo port load rsync
```

**MacPorts** installed shell script `/opt/local/bin/git-cola`  
.. that launches a Python GUI,  
   which cannot be usefully added to the Dock

##### [Instructions for installing git-cola.app](https://github.com/git-cola/git-cola)
... modified to work with **MacPorts** git-cola:

2. `$ sudo port install py36-pyside`
```
The following dependencies will be installed:
 py36-shiboken
 sparsehash
Continue? [Y/n]:
```
3. `$ sudo port select --set sphinx py36-sphinx`
```
Password:
Selecting 'py36-sphinx' for 'sphinx' succeeded. 'py36-sphinx' is now active.
```
`$ which sphinx-build`
```
/opt/local/bin/sphinx-build
```

4. Clone git-cola:  
`git clone git://github.com/git-cola/git-cola.git && cd git-cola`

5. Build the git-cola.app application bundle:  
`make PYTHON=/opt/local/bin/python3.6 \
    PYTHON_CONFIG=/opt/local/bin/python3.6-config \
    SPHINXBUILD=/opt/local/bin/sphinx-build git-cola.app`

6. Copy it to Applications  
`cp -r git-cola.app ~/Applications`

