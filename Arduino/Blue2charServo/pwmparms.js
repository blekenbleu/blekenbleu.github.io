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
var tn = [0];
var tm = [0];
var to = [0];
//return ns;

if (null == root['tn']) {
  for (i = 1; i <= ns; i++) {
     tn[i-1] = $prop('Settings.p'+i+'min');
     tm[i-1] = $prop('Settings.p'+i+'max');
     to[i-1] = $prop('Settings.p'+i+'off');
  }
  // first message initialized Arduino offsets
  root['tn'] = tn;
  root['tm'] = tm;
  root['to'] = to;
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

function undo() { // undo changes
  var d = 0;  // calculate tension to apply, based on test being done

  if (tp == 4) {	// Arduino is not yet aware of max tension limits
    tm[ss - 1] = temp;
    d = $prop('Settings.p'+ss+'max') + $prop('Settings.p'+ss+'off') - $prop('Settings.p'+ss+'min');
  }
  else if (tp == 2) {
    to[ss - 1] = temp;
    // restore Arduino offset
    str += String.fromCharCode(0x40 + ss - 1 | (0x40 & temp) >>1, 0x3F & temp);
    d = $prop('Settings.p'+ss+'off') - $prop('Settings.p'+ss+'min');
  }
  else {  // restore min table
    tn[ss - 1] = temp;
    if (3 != pg)
      os += String.fromCharCode(0x5E,ns)+String.fromCharCode.apply(null,tn);
  }
  // include data so that Arduino will set servo position with restored offset
  str += String.fromCharCode(0x40 + ns + ss - 1 | (0x40 & d) >>1, 0x3F & d);
  root['temp'] = 0;
};
//undo();

if (2 > pg || ! (wysiwyg || t1)) { // nothing new to change
  if (0 < root['temp']) { // temporary test to undo?
    temp = root['temp'];
    tp = 7 & (temp>>7);
    ss = temp & 0x7F;
    temp = temp >> 10;
    pg = 2; // force min table update
    undo();
    return os+str;
  }
  else return;
}
//return os.length

tn = root['tn'];
tm = root['tm'];
to = root['to'];
var change = false;	// Only one page at a time
var i;

var prev;		// store previous value, potentially for root['temp']
if (root['temp']) {
  temp = root['temp'];
  tp = 7 & (temp>>7);
  ss = 0x7F & temp ;
  prev = temp >> 10;
  if (t1 && 1 == ts && s == ss && pg == tp) {
    if ((pg == 2 && prev == $prop('Settings.p'+ss+'off'))
     || (pg == 3 && prev == $prop('Settings.p'+ss+'min'))
     || (pg == 4 && prev == $prop('Settings.p'+ss+'max')))
      return;  // no change in temporary test_one parm
  // otherwise, fall thru and replace that parm value
  }
  else undo();  // restore that parm value; another parm will be changed.
}

for (i = 1; i <= ns; i++) {
  var d = 0;  // calculate tension to apply, based on test being done; d = 0 for min (page 3)

  if (4 == pg) {		// max
    d = $prop('Settings.p'+i+'max') + $prop('Settings.p'+i+'off') - $prop('Settings.p'+i+'min');
    if (tm[i-1] != $prop('Settings.p'+i+'max')) {
      if(0 == root['temp'])
        prev = tm[i-1];
      change = true;
      tm[i-1] = $prop('Settings.p'+i+'max');
    }
  }
  else if (2 == pg) {	// offset
    d = $prop('Settings.p'+i+'off') - $prop('Settings.p'+i+'min');
    if (to[i-1] != $prop('Settings.p'+i+'off')) {
      if(0 == root['temp'])
        prev = to[i-1];
      change = true;
      var o = to[i-1] = $prop('Settings.p'+i+'off');
      os += String.fromCharCode((0x40 + i - 1) | (0x40 & o)>>1, 0x3F & o);
    }
  }
  else if (3 == pg) {	//min
    if (tn[i-1] != $prop('Settings.p'+i+'min')) {
      if(0 == root['temp'])
        prev = tn[i-1];
      change = true;
      tn[i-1] = $prop('Settings.p'+i+'min');
    }
  }
  t = String.fromCharCode(0x40 + ns + i - 1 | (0x40 & d) >>1, 0x3F & d);

  if (wysiwyg || (t1 && i == s))
    str += t;
}

//return str.length;
//return [pg,s,root['to'][0],$prop('Settings.p'+1+'off')].toString()+'\n'
//return tn.toString()
//change = true;
if (change) {
  if (3 == pg)	// change to min table?  update min table, then tension
    str = String.fromCharCode(0x5E,ns)+String.fromCharCode.apply(null,tn) + str;

  if ($prop('Settings.wysiwyg')) {	// no change left unsaved!!
    if (3 == pg)
      root['tn'] = tn;
    else if (4 == pg)
      root['tm'] = tm;
    else if (2 == pg)
      root['to'] = to;
    root['temp'] = 0;
  }
  else { // assumption: SimHub is fast enough that no more than 1 change at a time
    i = s - 1;
    if (2 == ts) {	// save a single parm;
      if (3 == pg)
        root['tn'][i] = tn[i];
      else if (4 == pg)
        root['tm'][i] = tm[i];
      else root['to'][i] = to[i];
      root['temp'] = 0;
    }
    else root['temp'] = (prev << 10) | (pg << 7) | s;
  }
  return str;
}
