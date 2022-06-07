  *[back](index.html)*
### focus stacking
Some images, including highly magnified, want more depth of focus.  
Other than by retaking with smaller aperture  
(which is liable to increasing noise, motion blur and/or diffraction),  
combining sharper parts of multiple images of a scene   
captured at overlapping focus distance increments  
is called *focus stacking* and involves two parts:
* capturing those images (AKA focus bracketing)
* combining them

Some cameras support focus bracketing  
using so-called autofocus lenses which include mechanisms    
by which cameras can change their focus.

An alternative for focus bracketing is by mechanically incrementing  
distance from camera and lens to scene object[s].   
Macro rails do this, as can microscope focus knobs.    
[WeMacro](https://www.wemacro.com) offers automation for both  
a focus [dial](https://www.wemacro.com/?product=micromate-bracket-only):  
![MicroMate bracket](https://www.wemacro.com/wp-content/uploads/2017/06/mm-working-1.jpg)  
... and [rack](https://www.wemacro.com/?product=wemacro-rail):  
![WeMacro rail](https://www.photoinfos.com/Fototechnik/Zubehoer/Einstellschlitten/Wemacro/Canon-100mm-macro-is-usm-14.jpg)  

### Focus stacking software  
Two well-regarded commercial image stacking software offerings are  
[Helicon](https://www.heliconsoft.com/heliconsoft-products/helicon-focus/)
and [Zerene](https://zerenesystems.com/cms/stacker),    
where Helicon favors those wanting a completely automated approach,  
with Zerene supporting more tweaking and touching up stacked images.  

[2014 comparison of CombineZP, Auto-Montage, Heli-con Focus and Zerene Stacker](https://www.researchgate.net/publication/269630893_Focus_stacking_Comparing_commercial_top-end_set-ups_with_a_semi-automatic_low_budget_approach_A_possible_solution_for_mass_digitization_of_type_specimens)  

Free solutions includes [Canon's DPP 4](https://www.canon-europe.com/support/consumer_products/software/digital-photo-professional.html?language=en&os=windows%2010%20(64-bit)&productid=tcm:13-1870570),
which works only for their lenses and cameras with focus bracketing support,  
CombineZP, which does not support 16-bit images,  
Picolay, ImageJ, [TuFuse](https://tawbaware.com/tufusepro_help/tufusepro_help.htm),  
[Chasys Draw IES](https://www.jpchacha.com/chasysdraw) supports CR2/3 and [Focus Stacking](https://www.jpchacha.com/chasysdraw/help.php?file=artist_process_stack_focus.htm),  
which seemingly does not involve alignment, which is used when stacking for [image averaging](https://www.jpchacha.com/chasysdraw/help.php?file=artist_tutorials_stacking.htm).  

### [5 Open Source Focus Stacking Software(+ 2 Paid Options)](https://chasingheartbeats.com/open-source-focus-stacking-software/)

### [PICOLAY](http://www.picolay.de)  
Works internally on bitmaps;  loads but cannot save TIFFs.  

### [ON1 Photo RAW 2022](https://www.on1.com/products/photo-raw)  - free trial  
focus stacking is on the right corner of the photo editing toolbar.  
Good [stacking parameter documentation](http://www.picolay.de/workshop/Understanding_Stacking-Parameters.pdf)  
Moving GIFs with perspective shift(?!)  


### ImageJ
- [Extended Depth of Field](http://bigwww.epfl.ch/demo/edf)  
- [Stack Focuser](https://imagej.nih.gov/ij/plugins/stack-focuser.html)  
- [Fiji/ImageJ](https://fiji.sc)  
  [Discussions thread](https://www.dpreview.com/forums/post/50059191)  
- [Auto Montage / MagicMontage](http://wsr.imagej.net/macros/toolsets/MagicMontage.pdf)  
  [source](https://github.com/imagej/ij1-installer/blob/master/app/macros/toolsets/Magic%20Montage.txt)  

### DPP4 Depth Compositing tool (Focus Stacking) [Comments / Observations](https://community.usa.canon.com/t5/Camera-Software/DPP4-Depth-Compositing-tool-Focus-Stacking-Comments-Observations/td-p/309489)  
- [What is it, Officially Supported lenses, examples](https://www.the-digital-picture.com/Canon-Cameras/Canon-Focus-Bracketing.aspx)  
- [simpler tutorial](https://snapshot.canon-asia.com/in/article/eng/focus-stacking-a-pro-technique-made-simpler-with-focus-bracketing)  
- hack EXIF to fake other lenses support?
  - [ExifTool by Phil Harvey](https://www.exiftool.org) [on SourceForge](https://www.exiftool.org)  
    [Everything You Ever Wanted to Know about ExifTool](https://adamtheautomator.com/exiftool)  
    [ExifToolGUI for Windows v5.xx](https://exiftool.org/gui/)  
- [Focus Stacking with Hugin and Enfuse](https://www.youtube.com/watch?v=FMKABaISlXg) - YouTube - **hugin now incorporates enfuse**  
  - [Using Hugin for focus stacking](https://macrocam.blogspot.com/2013/09/using-hugin-for-focus-stacking.html)  
  - [Focus stacking from the command line](https://estar.photography/tag/focus-stacking-hugin) - *[discussion](https://groups.google.com/g/hugin-ptx/c/dZ2kL4hjbnE?pli=1)*
- [Focus Stacking Macro Photos with Enfuse](https://patdavid.net/2013/01/focus-stacking-macro-photos-enfuse)  
- [Enfuse can also be used to build extended DOF images, by blending a focus stack](https://wiki.panotools.org/Enfuse)  
