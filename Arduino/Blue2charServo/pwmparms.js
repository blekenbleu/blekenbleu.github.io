// update per-servo parameters
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
var ts = [0];
var tm = [0];
var to = [0];
//return ns;
if (null == root['ts']) {
  for (i = 1; i <= ns; i++) {
     ts[i-1] = $prop('Settings.p'+i+'min');
     tm[i-1] = $prop('Settings.p'+i+'max');
     to[i-1] = $prop('Settings.p'+i+'off');
  }
  // first message initialized Arduino offsets
  root['ts'] = ts;
  root['tm'] = tm;
  root['to'] = to;
  root['temp'] = 0;
}

var wisiwyg = $prop('Settings.wisiwyg');
var st = $prop('Settings.test_servos');
var t1 = $prop('Settings.test_one') && 0 < st;
var pg = $prop('Settings.page');
var s = $prop('Settings.servo');

if (2 > pg || ! (wisiwyg || t1)) {
 /* undo some temporary test here
  if (0 < root['temp']) {
    s = root['temp'];
    pg = (s>>7);
    s &= 0x7F;
    // undo it
    root['temp'] = 0;
  }
  */
  return;
}

ts = root['ts'];
tm = root['tm'];
to = root['to'];
var str = '';
var os = '';		// offset string
var change = false;	// Only one page at a time
var i;

if (root['temp'] && t1 && s == (0x7F & root['temp']) && pg == (7 & (root['temp']>>7))) {
  if (pg == 2 && root['temp'] >> 10 == $prop('Settings.p'+s+'off')
   || pg == 3 && root['temp'] >> 10 == $prop('Settings.p'+s+'min')
   || pg == 4 && root['temp'] >> 10 == $prop('Settings.p'+s+'max'))
    return;  // no change in temporary test_one settings
}

for (i = 1; i <= ns; i++) {
  var d = 0;  // calculate tension to apply, based on test being done, in this case min (page 3)

  if (4 == pg) {		// max
    d = $prop('Settings.p'+i+'max') + $prop('Settings.p'+i+'off') - $prop('Settings.p'+i+'min');
    if (tm[i-1] != $prop('Settings.p'+i+'max')) {
      change = true;
      tm[i-1] = $prop('Settings.p'+i+'max');
    }
  }
  else if (2 == pg) {	// offset
    d = $prop('Settings.p'+i+'off') - $prop('Settings.p'+i+'min');
    if to[i-1] != $prop('Settings.p'+i+'off')) {
      change = true;
      var o = to[i-1] = $prop('Settings.p'+i+'off');
      os += String.fromCharCode((0x40 + i - i) | (0x40 & o)>>1, 0x3F & o) ;
    }
  }
  else if (3 == pg) {	//min
    if (ts[i-1] != $prop('Settings.p'+i+'min')) {
      change = true;
      ts[i-1] = $prop('Settings.p'+i+'min');
    }
  }
  t = String.fromCharCode(0x40 + ns + i - 1 | (0x40 & d) >>1, 0x3F & d);
 
  if (wisiwyg || (t1 && i == s))
    str += t;
}

if (change && 2 == pg)	// change to min table?
  str = String.fromCharCode.apply(null,ts) + str; // update min table, then tension

if ($prop('Settings.wisiwyg')) {
  if (3 == pg)
    root['ts'] = ts;
  else if (4 == pg)
    root['tm'] = tm;
  else if (2 == pg) {
    root['to'] = to;
}
else if (change && 2 == st) {
  // assumption: SimHub is fast enough that no more than 1 change at a time
  i = s - 1;
  if (3 == pg)
    root['ts'][i] = ts[i];
  else if (4 == pg)
    root['tm'][i] = tm[i];
  else if (2 == pg)
    root['to'][i] = to[i];
}
return str;

