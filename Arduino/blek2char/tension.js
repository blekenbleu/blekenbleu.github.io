// Calculate servo tensions from G-forces
var ns = $prop('Settings.np');       // PWM count
var t3=[[0],[0],[0]];
for (var i = 0; i < ns; i++) {
   t3[0][i] = $prop('Settings.neu'+i);  // pg = 2
   t3[1][i] = $prop('Settings.min'+i);  // pg = 3
   t3[2][i] = $prop('Settings.max'+i);  // pg = 4
}
//return t3[1].toString()
// Set up data and reset IIR filters
if (null == root['ft']) {
  var ft = [0];
  for (i = 0; i < ns; i++)
     ft[i] = 0;
  // first message initializes Arduino min table
  root['ft'] = ft;  // IIR
}
//return root['ft'].toString()
var e = 3;  // epsilon approximation to reduce imperceptible changes
var gain = $prop('Settings.gain_global') * 0.02;

// G-forces from SimHub properties ---------------
// longitudinal acceleration (positive is back)
var surge = $prop('AccelerationSurge') * gain;

if (surge < 0)
  surge *= $prop('Settings.gain_accel');
else
  surge *= $prop('Settings.gain_decel');
//return surge
// lateral acceleration (positive is right) (feels like yaw)
var sway  = $prop('AccelerationSway') * gain;
sway  *= $prop('Settings.gain_sway');

// vertical acceleration (positive is up)
var heave = $prop('AccelerationHeave') * gain;
heave *= $prop('Settings.gain_heave');

// Combine forces
//
// convert speed and yaw changes to left and right tension values
var leftSurgeSway = Math.sqrt(surge*surge + sway*sway);
var rightSurgeSway = surge + surge - leftSurgeSway;
//return leftSurgeSway + ' ' + rightSurgeSway;

var monoSurgeSway = surge * 0.8 + Math.abs(sway) * 0.2;
var monoSwayHeave = heave * 0.8 + Math.abs(sway) * 0.2;
var frontHeave = heave * 0.8 + Math.max(surge * 0.2, 0);
var rearHeave = heave * 0.8 + Math.max(-surge * 0.2, 0);

// Assign forces to servos
//
// use offset to set center point of forces
//
var ts = [Math.max(leftSurgeSway, 0)];                  // left shoulder belt
ts[1] = Math.max(rightSurgeSway, 0);                    // right shoulder belt
ts[2] = Math.max(rightSurgeSway + 20, 0);               // left head
ts[3] = Math.max(leftSurgeSway + 20, 0);                // right head
ts[4] = Math.max(surge + 40, 0);                        // upper back
ts[5] = Math.max(monoSurgeSway + 5, 0);                 // mono shoulder belt
//return ts.toString()
/*
ts[5] = Math.max(surge + 10, 0);                        // lower back
ts[6] = Math.max(rightSurgeSway + 10, 0);               // left side back
ts[7] = Math.max(leftSurgeSway + 10, 0);                // right side back
ts[8] = Math.max(sway + 10, 0);                         // left thigh
ts[7] = Math.max(-sway + 10, 0);                        // right thigh
ts[8] = Math.max(monoSwayHeave + 10, 0);                // left lap belt
ts[9] = Math.max(monoSwayHeave + 10, 0);                // right lap belt
ts[12] = Math.max(frontHeave + 10, 0);                  // front seat
ts[13] = Math.max(rearHeave + 10, 0);                   // rear seat
 */

var tc = 1 - ($prop('Settings.smooth') * 0.2);
var wysiwyg = $prop('Settings.wysiwyg');
var str = '';

for (var i = 0; i < ns; i++) {
  var max = Math.round(t3[2][i] * 180 * (100 - t3[1][i]) / 10000);
  var ft = root['ft'][i];       // Low-pass IIR filter

  ft += (ts[i] - ft) * tc;      // filtered tension
  if (ft > max) ft = max;       // limit tension

  // wysiwyg = false
  if (i >= 90)
    return [i,ns,max,ft,Math.abs(ft-root['ft'][i]),e].toString()
  // skip change if it is smaller than e or servo is being tested
  if (Math.abs(ft - root['ft'][i]) > e && ! wysiwyg) {
    root['ft'][i] = ft;
    // add difference between min and offset to ft
    ft += Math.round(t3[0][i] * t3[2][i] * 180 * (100 - t3[1][i]) / 1000000);
    if (0 > ft)
      ft = 0;		// below min 
    str += String.fromCharCode(0x40 | i | ((0x40 & ft)>>1));  // set tension msb
    str += String.fromCharCode(0x3F & ft);                           // 6 lsb
  }
  else root['ft'][i] = ft;
}
//return str.length
if (0 < str.length) {
  //return str.length;    // 2 * ns
  return str;
}
//return s
