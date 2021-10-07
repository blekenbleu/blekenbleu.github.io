// Calculate servo tensions from G-forces
var np = $prop('Settings.np');       // PWM count
var tm = [0];
// Set up data and reset IIR filters
if (null == root['ft']) {
  var ft = [0];
  for (i = 1; i <= np; i++) {
     tm[i-1] = $prop('Settings.p'+i+'max');
     ft[i-1] = 0;
  }
  // first message initializes Arduino offsets
  root['ft'] = ft;  // IIR
  root["tm"] = tm;
}
tm = root["tm"];

var e = 3;  // epsilon approximation to reduce imperceptible changes
var gain = $prop('Settings.force_gain') * 0.02;

// G-forces from SimHub properties ---------------
// longitudinal acceleration (positive is back)
var surge = $prop('AccelerationSurge') * gain;
if (surge < 0)
  surge *= $prop('Settings.accel_gain');
else
  surge *= $prop('Settings.decel_gain');

// lateral acceleration (positive is right) (feels like yaw)
var sway  = $prop('AccelerationSway') * gain;
sway  *= $prop('Settings.yaw_gain');

// vertical acceleration (positive is up)
var heave = $prop('AccelerationHeave') * gain;
heave *= $prop('Settings.heave_gain');

// neutral position test
if ($prop('Settings.test_servos') === 2) {
  surge = sway = heave = 0;
}

//return surge + ' ' + sway + ' ' + heave;

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
//*/

var tc = 1 - ($prop('Settings.smooth') * 0.2);
var str = '';
var tt = 99;    // no such servo
if ($prop('Settings.page') > 1 && 0 < $prop('Settings.test_servos'))
  tt = $prop('Settings.servo') - 1;
for (var i = 0; i < np; i++) {
  // Low-pass IIR filter
  var ft = root['ft'][i];
  ft += (ts[i] - ft) * tc;   // filtered tension
  if (ft > tm[i]) ft = tm[i];  // limit tension

  // skip change if it is smaller than e or servo is being tested
  if (Math.abs(ft - root['ft'][i]) > e && i != tt) {
    str += String.fromCharCode(0x40 | (np + i) | ((0x40 & ft)>>1));  // set tension
    str += String.fromCharCode(0x3F & ft);                           // 6 lsb
  }
  root['ft'][i] = ft;
}
if (0 < str.length) {
  //return str.length;    // 2 * np
  return str;
}
//return tt
