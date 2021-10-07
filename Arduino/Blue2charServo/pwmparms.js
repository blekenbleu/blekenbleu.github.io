// pwmparms.js update per-channel parameters
var ns = $prop('Settings.ns');		// servo count
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
for (i = 1; i <= ns; i++) {
   t3[0][i-1] = $prop('Settings.p'+i+'off');	// pg = 2
   t3[1][i-1] = $prop('Settings.p'+i+'min');	// pg = 3
   t3[2][i-1] = $prop('Settings.p'+i+'max');	// pg = 4
}

if (null == root['t3']) {
  // first message initialized Arduino offsets
  root['t3'] = t3;
  root['temp'] = 0;
}

var wysiwyg = $prop('Settings.wysiwyg');
var ts = $prop('Settings.test_servos');
var t1 = $prop('Settings.test_one') && 0 < ts;
var pg = $prop('Settings.page');
var s = $prop('Settings.servo');
var str = '';		// watch this space
var os = '';		// offset string

var temp; // used by undo()
var tp;
var ss;
var tr = root['t3'];

function undo() { // undo changes
  t3[tp-1][ss-1] = temp;

  var d = 0;  // calculate tension to apply, based on test being done
  if (tp == 4)		// Arduino is not yet aware of max tension limits
    d = tr[2][ss-1] + tr[0][ss-1] - tr[1][ss-1];
  else if (tp == 2) {	// restore Arduino offset
    str += String.fromCharCode(0x40 + ss-1 | (0x40 & temp) >>1, 0x3F & temp);
    d = tr[0][ss-1] - tr[1][ss-1];
  }
  else			// tp == 2:  restore min table
    os += String.fromCharCode(0x5E,ns)+String.fromCharCode.apply(null,t3[1]);

  // include data so that Arduino will set servo position with restored offset
  str += String.fromCharCode(0x40 + ns + ss-1 | (0x40 & d) >>1, 0x3F & d);
  root['temp'] = 0;
};
//undo();

if (2 > pg || ! (wysiwyg || t1)) { // nothing new to change
  if (0 < root['temp']) {	// temporary test to undo?
    temp = root['temp'];
    tp = 7 & (temp>>7);
    ss = temp & 0x7F;
    temp = temp >> 10;
    pg = 2; // force min table update
    undo();
    root['t3'][tp-1][ss-1] = temp;
    return os+str;
  }
  else return;
}
//return os.length

var change = false;	// Only one page at a time
var i;

var prev;		// store previous value, potentially for root['temp']
if (root['temp']) {
  temp = root['temp'];
  tp = 7 & (temp>>7);
  ss = 0x7F & temp ;
  prev = temp >> 10;
  if (t1 && 1 == ts && s == ss && pg == tp) {
    if (prev == tr[pg-2][ss-1])
      return;  // no change in temporary test_one parm
  // otherwise, fall thru and replace that parm value
  }
  else undo();  // restore that parm value; another parm will be changed.
}

for (i = 0; i < ns; i++) {
  var d = 0;  // calculate tension to apply, based on test being done; d = 0 for min (page 3)
  var ci = false;

  if (tr[pg-2][i] != t3[pg-2][i]) {
    if(0 == root['temp'])
      prev = tr[pg-2][i];
    ci = change = true;
    tr[pg-2][i] = t3[pg-2][i];
  }
  if (4 == pg) 		// max
    d = t3[2][i] + t3[0][i] - t3[1][i];
  else if (2 == pg) {	// offset
    d = t3[0][i] - t3[1][i];
    if (ci) {
      o = t3[1][i];
      os += String.fromCharCode((0x40 + i-1) | (0x40 & o)>>1, 0x3F & o);
    }
  }

  if (wysiwyg || (t1 && i == s))
    str += String.fromCharCode(0x40 + ns + i-1 | (0x40 & d) >>1, 0x3F & d);
}

//return str.length;
//return [pg,s,t3[0][0],tr[0][0]].toString()+'\n'
//return t3[1].toString()
//change = true;
if (change) {
  if (3 == pg)	// change to min table?  update min table, then tension
    str = String.fromCharCode(0x5E,ns)+String.fromCharCode.apply(null,t3[1]) + str;

  if ($prop('Settings.wysiwyg')) {	// no change left unsaved!!
    root['t3'][pg-2] = t3[pg-2];
    root['temp'] = 0;
  }
  else { // assumption: SimHub is fast enough that no more than 1 change at a time
    if (2 == ts) {	// save a single parm;
      root['t3'][pg-2][s-1] = t3[pg-2[s-1];
      root['temp'] = 0;
    }
    else root['temp'] = (prev << 10) | (pg << 7) | s;
  }
  return str;
}
