// pwmparms.js update per-channel parameters
var ns = $prop('Settings.np');          // servo count
/* other (unused here) settings:
   $prop('Settings.accel_gain')
   $prop('Settings.decel_gain')
   $prop('Settings.force_gain')
   $prop('Settings.heave_gain')
   $prop('Settings.info')
   $prop('Settings.nf')
   $prop('Settings.smooth')
   $prop('Settings.yaw_gain')
 */
var t3=[[0],[0],[0]];
//return ns;
for (i = 0; i < ns; i++) {
   t3[0][i] = $prop('Settings.neu'+i);	// pg = 2
   t3[1][i] = $prop('Settings.min'+i);	// pg = 3
   t3[2][i] = $prop('Settings.max'+i);	// pg = 4
}

if (null == root['t3'])		// device connect message initialized Arduino minima
  root['t3'] = t3;

var tr = root['t3'];
var wysiwyg = $prop('Settings.wysiwyg');
var pg = $prop('Settings.page') - 2;		// zero - based

if (0 > pg || ! wysiwyg)			// no changes enabled?
  return;

var st = '';					// tension string:  watch this space
var ss = '';					// changed setting strings
var change = false;				// Only one page at a time
var i;


for (i = 0; i < ns; i++) {
  var d = 0;		// calculate test tension to apply; d = 0 for min (page 3)
  var ci = false;

  if (tr[pg][i] != t3[pg][i])
//  return ' '+[pg,i,ns,tr[pg][i],t3[pg][i],wysiwyg].toString()
    ci = change = true;
  if (2 == pg) 							// max
    d = Math.round(t3[pg][i] * 180 * (100 - t3[1][i]) / 10000); // % of 180 * (100 - min) /100
  else if (0 == pg)						// offset
    d = Math.round(t3[pg][i] * t3[2][i] * 180 * (100 - t3[1][i]) / 1000000);

  if (ci) {	// change in our time?
//  st += ' '+[ns,pg,s,tr[pg][s],t3[pg][s],wysiwyg,t1].toString()+' '+d+'; '
    st += String.fromCharCode(0x40 + i | (0x40 & d)>>1, 0x3F & d); // tension for changed parm
  }
}

//return st.length;
//change = true;
if (change) {
  if (1 == pg) {	// min table change?  update min table, then tension
    var min = [0];
    for (i = 0; i < ns; i++)
       min[i] = Math.round(180 * t3[1][i] / 100); // convert percentages to servo
    st = String.fromCharCode(0x5F,5,ns)+String.fromCharCode.apply(null,min) + st;
  }
  root['t3'][pg] = t3[pg];	// no change left unsaved!!
  return ss+st;
}
