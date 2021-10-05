// update servo positions from telemetry or test & set
var a = $prop('Settings.tmax_a');
var b = $prop('Settings.tmax_b');

var ns = $prop('Settings.ns');  // number of supported servos
if (null == root['offsets']) {	// servo untensioned positions
  // offset values here get updated by adjusting sliders
  root['offsets'] = [61, 62, 63, 64, 65, 66, 66, 68, 69, 70, 71, 72, 73, 73];
  root['t1'] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];	// IIR for servos
  root['tmaxs'] = [a, b, a, b, a, b, a, b, a, b, a, b, a, b];
}

var no = root['offsets'].length;
for (var i = no; i < ns; i++) {	// extend arrays as needed
  root['offsets'][i] = 61 + i;
  root['t1'][i] = 0;
  root['tmaxs'] = (1 & i) ? b : a;
}
//return root['offsets'].length;

a = $prop('Settings.servo_a');
a = (ns < a) ? -1 : a - 1;
b = $prop('Settings.servo_b');
b = (ns < b) ? -1 : b - 1;
//return b;
var ts = '';	// initialize string to send
var o;
if (0 <= a && root['offsets'][a] != (o = $prop('Settings.offset_a'))) {
  ts += String.fromCharCode(0x40 + a | (0x40 & o)>>1);		// set offsets
  ts += String.fromCharCode(0x3F & o);					// 6 lsb
  root['offsets'][a] = o;
}
if (0 <= b && root['offsets'][b] != (o = $prop('Settings.offset_b')) && b != a) {
  ts += String.fromCharCode(0x40 + b | (0x40 & o)>>1);		// set offsets
  ts += String.fromCharCode(0x3F & o);					// 6 lsb
  root['offsets'][b] = o;
}
//return root['offsets'].toString();
//return ts.charCodeAt(0);
//return ts.split('').toString();

// update servo positions from telemetry
// Set up data and reset IIR filters
// G-forces from SimHub properties
var Gsway  = - $prop('AccelerationSway');	// lateral acceleration (feels like yaw)
var Gsurge = - $prop('AccelerationSurge');	// deceleration
Gsway  *= $prop('Settings.yaw_gain');
Gsurge *= $prop('Settings.decel_gain');
if (0 > Gsurge)
  Gsurge = 0;    // non-negative deceleration

// convert speed and yaw changes to left and right tension values
// turning right should increase right harness tension (body pushed left)
var r = Math.sqrt(Gsurge*Gsurge + Gsway*Gsway)
var l = Gsurge + Gsurge - r
if (0 > Gsway) {
  var n = r;	// negative Gsway increases left tension
  r = l;
  l = n;
}

var tc = 1 - ($prop('Settings.smooth') * 0.2);
var test = $prop('Settings.test_tmax');
// update Arduino tmax table?
var tt = 0;	// min tension test
if (test && ((0 <= a && root['tmaxs'][a] != $prop('Settings.tmax_a'))
         || (0 <= b && root['tmaxs'][b] != $prop('Settings.tmax_b' && b != a)))) {
  tt = 1;  // max tension test
  if (0 <= a)
    root['tmaxs'][a] = $prop('Settings.tmax_a');
  if (0 <= b && b != a)
    root['tmaxs'][b] = $prop('Settings.tmax_b');
  // add special 5 command for ns tmax entries
  ts +=  String.fromCharCode(0x5F,5,ns)+String.fromCharCode.apply(null, root['tmaxs'].slice(0,ns));
}
test = test || $prop('Settings.test_offsets');	// max / min tension test
//return root['tmaxs'].toString();
var tmax = root['tmaxs'];

var e = 3;	// epsilon for perceptible change threshold
var t1 = [0];	// array of tensions from telemetry
for (var i = 0; i < ns; i++) {
  t1[i] = (1 & i) ? r : l;	// only for test purposes
  // Low-pass IIR filter
  var ft = root['t1'][i];
  ft += (t1[i] - ft) * tc;   // filtered tension
  if (ft > tmax[i]) ft = tmax[i];  // limit tension to tmax

  if ((i == a || i == b) && test ) {	// override telemetry for limit tests
    var tab = tmax[i] * tt;
    ts += String.fromCharCode(0x40 | (ns + i) | ((0x40 & tab)>>1));
    ts += String.fromCharCode(0x3F & tab);
  }
  // skip change if it is smaller than e
  else if (Math.abs(ft - root['t1'][i]) > e) {
    ts += String.fromCharCode(0x40 | (ns + i) | ((0x40 & ft)>>1));  // set tension
    ts += String.fromCharCode(0x3F & ft);                           // 6 lsb
  }
  root['t1'][i] = ft;
}
//return ts.length;
if (0 & ts.length) {
  var s = '; '+ts.charCodeAt(0);
  for (i = 1; i < ts.length; i++)
    s += ','+ts.charCodeAt(i);
  return s;
}
//return ts.split('').toString();
return ts;
