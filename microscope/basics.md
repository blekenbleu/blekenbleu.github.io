 *[back](./)*
## microscope basics - finite vs infinity-corrected objectives  
![Finite-conjugate microscope system with standardised tube length and infinite-conjugate microscope system with standardised tube lens](https://www.researchgate.net/publication/333091817/figure/fig4/AS:769795272220674@1560544903396/Finite-conjugate-microscope-system-with-standardised-tube-length-and-infinite-conjugate.png)  
*Finite-conjugate microscope system vs. infinite-conjugate microscope system with tube lens.*  
from:  [Systematic design of microscope objectives](https://www.researchgate.net/publication/333091817_Systematic_design_of_microscope_objectives_Part_I_System_review_and_analysis)  
The vertical dotted line where rays cross at right end of tube length is called the objective's *rear conjugate*.  
To the extent that it is, a finite objective's correction is designed for that tube length,  
keeping in mind than many objectives also depend on both slide cover glass and eyepiece for correction.  

### simple lens formulae:
- `1/f = 1/do + 1/di`	{1} `di` *becomes* `f` *for infinite* `do`   
- `m = di/do`	{2} *zero magnification for lens focused @ infinity*  

### lens focused at 2 distances
- `f = (d2 - d1)/(m2 - m1)`; {3}  *alternatively:*  
- `d2 = d1 + f*(m2 - m1)`  
- `m2 = m1 + (d2 - d1)/f`  *change magnification by changing focus distance*  

### Classic (RMS) compound microscope magnification: `m = (L/fo)*(D/fe)`, where:  
- `m` = magnification    
- `L` = tube length (160mm)  
- `D` = normal vision relaxed distance (250mm)  
- `f` = focal length  
- `fo` = objective focal length  
- `fe` = eyepiece focal length  
- `di` = lens to image distance
- `do` = lens to object distance

For 160mm tube length, a 10x objective has 16mm focal length  
and a 10x eyepiece has 25mm focal length.  
For infinity scopes, substitute "tube lens focal length" for "tube length".  
Olympus infinity objectives expect 180mm tube lens focal length;  
Nikon Optiphot BD objectives expect 210mm tube length.  

### N.A. vs aperture : `N.A. = 1/(2 * f/#)`  
| f/# |  1.2  |  1.4 |  1.8 |  2  |  2.8  |   4  |  5.6  |   8   |  11  |   16   |  
| --- | ----- | ---- | ---- | --- | ----- | ---- | ----- | ----- | ---- | ------ |  
| N.A.| .4167 | .357 | .417 | .25 | .1786 | .125 | .0893 | .0625 | .045 | .03125 |  

### [Zerene macro step size tables](https://zerenesystems.com/cms/stacker/docs/tables/macromicrodof): magnification vs frame width, magnification vs aperture  
- magnification `m = sensor width / frame width`  
- DoF (mm) = `0.0022*(((m+1)*f/#)/m)**2`  
- DoF (mm) = `0.00055/(N.A.**2)`  

### [Zerene landscape focus tables](https://zerenesystems.com/cms/stacker/docs/tables/landscapes)  
### [*effective* aperture](https://www.photomacrography.net/forum/viewtopic.php?f=29&t=44327)  
- Coupled lenses, stopped in the front, with the rear lens focused at infinity: `m * lens aperture`  
- Single lens, focused by extension: `(m+1) * lens aperture`  
- Teleconverter factor x inserted between camera and all other optics: `x * lens aperture`  
- Microscope objectives used as designed: `m / (2 * N.A.)`  

### ["pupil ratio"](https://www.photomacrography.net/forum/viewtopic.php?f=29&t=8895) compensates effective aperture for adding extension
### [1:4 to 8:1 magnification FAQ](https://www.photomacrography.net/forum/viewtopic.php?f=29&t=24891)
### [Depth-of-Focus scaling](https://www.photomacrography.net/forum/viewtopic.php?f=8&t=19755)  
- `DoF2 = DoF1 * (f/#2/f/#1) * (m1/m2)**2`