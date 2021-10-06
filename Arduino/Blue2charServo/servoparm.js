// update per-servo parameters
var ns = $prop('Settings.ns');       // servo count
var t1 = $prop('Settings.test_one');
var st = $prop('Settings.test_servos');
var s = $prop('Settings.servo');
/*
$prop('Settings.accel_gain')
$prop('Settings.decel_gain')
$prop('Settings.force_gain')
$prop('Settings.heave_gain')
$prop('Settings.info')
$prop('Settings.nf')
$prop('Settings.page')
$prop('Settings.servo')
$prop('Settings.smooth')
$prop('Settings.test_one')
$prop('Settings.test_servos')
$prop('Settings.wisiwyg')
$prop('Settings.yaw_gain')
 */
var ts = [0];
var tm = [0];
var to = [0];
//return ns;
if (null == root["ts"]) {
  for (i = 1; i <= ns; i++) {
     ts[i-1] = $prop('Settings.p'+i+'min');
     tm[i-1] = $prop('Settings.p'+i+'max');
     to[i-1] = $prop('Settings.p'+i+'off');
  }
  // first message initialized Arduino offsets
  root["ts"] = ts;
  root["tm"] = tm;
  root["to"] = to;
}
ts = root["ts"];
tm = root["tm"];
to = root["to"];
var str = '';
var zs = '';
var os = '';
if (
var change = [false, false, false];
for (i = 1; i <= ns; i++) {
  var d;

  d = 0;  // calculate the tension to be applied, based on test being done, in this case min (page 3)
  if (4 == $prop('Settings.page'))	// max
    d = $prop('Settings.p'+i+'max') + $prop('Settings.p'+i+'off') - $prop('Settings.p'+i+'min');
  else if (2 == $prop('Settings.page')) // offset
    d = $prop('Settings.p'+i+'off') - $prop('Settings.p'+i+'min');
  t = String.fromCharCode(0x40 + ns + i - 1 | (0x40 & d) >>1, 0x3F & d);
 
  if (ts[i-1] != $prop('Settings.p'+i+'min')) {
    change[0] = true;
    ts[i-1] = $prop('Settings.p'+i+'min');
  }
  if (tm[i-1] != $prop('Settings.p'+i+'max')) {
    change[1] = true;
    tm[i-1] = $prop('Settings.p'+i+'max');
  }
  if to[i-1] != $prop('Settings.p'+i+'off')) {
    change[2] = true;
    var o = to[i-1] = $prop('Settings.p'+i+'off');
    os += String.fromCharCode((0x40 + i - i) | (0x40 & o)>>1, 0x3F & o) ;
  }
  if ($prop('Settings.wisiwyg'))
    str += t;
  else if ($prop('Settings.test_one') && i == $prop('Settings.servo'))
    str += t;
}

if (change[0])	// change to min table?
  str = String.fromCharCode.apply(null,ts) + str; // update min table, then tension

if ($prop('Settings.wisiwyg')) {
  if (change[0])
    root["ts"] = ts;
  else if (change[1])
    root["tm"] = tm;
  else if (change[2]) {
    root["to"] = to;
    str = str;
}
else if (2 == $prop('Settings.test_servos')) {
  // assumption: SimHub is fast enough that no more than 1 change at a time
  i = $prop('Settings.servo') - 1;
  if (change[0]
    root["ts"][i] = ts[i];
  else if (change[1]
    root["tm"][i] = tm[i];
  else if (change[2]
    root["to"][i] = to[i];
}
return str;

