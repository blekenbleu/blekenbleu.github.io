// Calculate servo tensions from G-forces
var ns = $prop('Settings.ns');       // servo count
var ts = [0];
//return ns;
// Set up data and reset IIR filters
if (null == root["t1"] || $prop('Settings.test_servos') & 1) {
  for (i = 1; i < ns; i++)
     ts[i] = 0;
  // first message will output changes
  root["t1"] = ts;  // T-1
//root["t2"] = ts;  // T-2
}

var tmax = $prop('Settings.tmax');  // max servo tension
var e = 3;  // epsilon approximation to reduce imperceptible changes
var gain = $prop('Settings.force_gain') * 0.02;

// G-forces from SimHub properties

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

// unsupported...
//if (tmax < surge)
//  $prop('Settings.decel_gain') *= Math.round(tmax/surge - 0.5);

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
// use offset to incorporate negative forces and set center point
//
//ts[0] = Math.max(leftSurgeSway, 0);			// left shoulder belt
//ts[1] = Math.max(rightSurgeSway, 0);			// right shoulder belt
ts[1] = Math.max(monoSurgeSway + 5, 0);		// mono shoulder belt
ts[2] = Math.max(rightSurgeSway + 20, 0);		// left head
ts[3] = Math.max(leftSurgeSway + 20, 0);		// right head
ts[4] = Math.max(surge + 40, 0);				// upper back
/*
ts[5] = Math.max(surge + 10, 0);				// lower back
ts[6] = Math.max(rightSurgeSway + 10, 0);		// left side back
ts[7] = Math.max(leftSurgeSway + 10, 0);		// right side back
ts[8] = Math.max(sway + 10, 0);					// left thigh
ts[7] = Math.max(-sway + 10, 0);				// right thigh
ts[8] = Math.max(monoSwayHeave + 10, 0);		// left lap belt
ts[9] = Math.max(monoSwayHeave + 10, 0);		// right lap belt
ts[12] = Math.max(frontHeave + 10, 0);			// front seat
ts[13] = Math.max(rearHeave + 10, 0);			// rear seat
//*/


var tc = 1 - ($prop('Settings.smooth') * 0.2);
var step = [];
var i;
// max / min tension test
if ($prop('Settings.test_servos') & 1) {
  var t = $prop('Settings.test_servos') === 3 ? tmax : 0;  // max : min tension
  for (i = 0; i < ns; i++) {
    step[i+i] = (0x40 | (ns + ns - (i + 1)) | ((0x40 & t)>>1));
    step[1+i+i] = 0x3F & t;
  }
}
else for (i = 0; i < ns; i++) {
  //ts[i] = (1 & i) ? r : l;	// only for test purposes
  // Low-pass IIR filter
  var ft = root["t1"][i];
  ft += (ts[i] - ft) * tc;   // filtered tension
  if (ft > tmax) ft = tmax;  // limit tension to tmax
  
  // skip change if it is smaller than e
  if (Math.abs(ft - root["t1"][i]) > e) {
    step.push(0x40 | (ns + i) | ((0x40 & ft)>>1));  // set tension
    step.push(0x3F & ft);                           // 6 lsb
  }
  root["t1"][i] = ft;
}
//return ts.length
//return step.length;
if (0 < step.length) {
  var str = String.fromCharCode.apply(null,step)
  //return str.length;    // 2
  return str;
}
