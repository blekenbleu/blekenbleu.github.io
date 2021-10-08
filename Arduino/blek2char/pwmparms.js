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

if (null == root['t3']) {
  // device connect message initialized Arduino offsets; should initialize minima
  root['t3'] = t3;
  root['temp'] = 0;
}
var tr = root['t3'];
var wysiwyg = $prop('Settings.wysiwyg');
var t1 = $prop('Settings.test_one') && 0 < $prop('Settings.test_servos');
var pg = $prop('Settings.page') - 2;		// zero - based

if (0 > pg || ! (wysiwyg || t1))		// no changes enabled?
  return;

var s = $prop('Settings.servo');		// zero - based
var st = '';					// tension string:  watch this space
var ss = '';					// changed setting strings
var change = false;				// Only one page at a time
var i;

//return ' '+[s,ns,tr[pg][s],t3[pg][s],wysiwyg].toString()
if (wysiwyg)
  for (i = 0; i < ns; i++) {
    var d = 0;  // calculate tension to apply, based on test being done; d = 0 for min (page 3)
    var ci = false;

    if (tr[pg][i] != t3[pg][i])
      ci = change = true;
    if (2 == pg) 		// max
      d = Math.round(t3[pg][i] * 180 * (100 - t3[1][i]) / 10000); // % of 180 * (100 - min) /100
    else if (0 == pg)	// offset
      d = Math.round(t3[pg][i] * t3[2][i] * 180 * (100 - t3[1][i]) / 1000000);

    if (ci) {	// change in our time?
      st += String.fromCharCode(0x40 + i | (0x40 & d)>>1, 0x3F & d); // tension for changed parm
    }
  }
else if (tr[pg][s] != t3[pg][s]) {
  var d = 0;

  if (0 == pg)		// offset
    d = Math.round(t3[pg][s] * t3[2][s] * 180 * (100 - t3[1][s]) / 1000000); // % of max
  else if (2 == pg)          // max
    d = Math.round(t3[pg][s] * 180 * (100 - t3[1][s]) / 10000); // % of 180 * (100 - min) /100
  change = true;
  st += String.fromCharCode(0x40 + i | (0x40 & d)>>1, 0x3F & d);
/*
  offset is a % of max, which is a % of what remains of 180 * (100 - min) / 100
  var o = Math.round(t3[0][s] * t3[2][s] * 180 * (100 - t3[1][s]) / 1000000);
 */
}
//return[pg,tr[pg][s], t3[pg][s], change].toString()+''+st
//return st.length;
//return page+ '+[pg+2,s,t3[pg][0],tr[pg][0]].toString()+'\n'
//return t3[pg].toString()
//change = true;
if (change) {
  if (1 == pg) {	// min table change?  update min table, then tension
    var min = [0];
    for (i = 0; i < ns; i++)
       min[i] = Math.round(180 * t3[1][i] / 100); // convert percentages to servo
    st = String.fromCharCode(0x5E,ns)+String.fromCharCode.apply(null,min) + st;
  }
  if (wysiwyg)	// no change left unsaved!!
    root['t3'][pg] = t3[pg];
  else if (t1) // assumption: SimHub is fast enough that no more than 1 change at a time
    root['t3'][pg][s] = t3[pg][s];	// save a single parm;
  return ss+st;
}
