# CSShtmlMenus

Contents of interest:  [MenuTree.html](https://blekenbleu.github.io/HTML/MenuTree.html) and [help.htm](https://blekenbleu.github.io/HTML/help.htm)

See [CSS3 Family Tree](http://thecodeplayer.com/walkthrough/css3-family-tree) for vertical tree using CSS and html (mostly unordered list) without Javascript

See more complex [CSS Horizontal Family Tree](https://codepen.io/P233/pen/Kzbsi) for horizontal tree (more appropriate for menus) but with some JavaScript.

Not understanding CSS and disliking JavaScript, started with css3-familty-tree source..

Menu text without href is not boxed.  
Paired boxes in one list item should be immediately adjacent, no white space.  
If first text of href pair is shorter, path from parent does not split them.  
Changing `<a href="#">..</a>` to `<p>..</p>` did not break anything..

Siblings appear the same, whether one list item is embedded in another or concatenated after in the same unordered list.  

Hover partly fails if not all entries inside one ul.

Copied and git-ignored css3tree.html, HorizontalTree.htm; created HtreeUL.html;  
removed tabs in css3tree.html for easier comparison to HorizontalTree.htm.  
* CSS tree diagram learning experiments  
 - HorizontalTree.htm generates nearly desired results,  
   but CSS requires complex html.  
 - css3tree.html CSS generates vertical tree using simpler html  
 - HtreeUL.html attempted to apply css3tree.html CSS to HorizontalTree.htm  
 - MenuTree.html borrows HtreeUL.html CSS and learning  
 to convert css3tree.html from vertical to horizontal.    
* commented out style entries to detect effects  
* added comments to describe those effects  

Associating vertical branches with `<ul>` fails:  
* vertical branch line extends the full height of all embedded content,  
  while brand only among first generation `<li>` children is wanted.  

Simplified CSS by settling for square joins between all branches and leaf stems.  
Hardest for me was sorting out parent pairings.  

Tool tips:
* Use [HTML title Attribute](https://www.w3schools.com/tags/att_global_title.asp) in menu element `<p>` tags, e.g. `<p title="your tool tip here">Menu element</p>`
