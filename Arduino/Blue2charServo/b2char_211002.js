// Calculate servo tensions from G-forces
var ns = $prop('Settings.ns');       // servo count
var ts = [0];
//return ns;
// Set up data and reset IIR filters
if (null == root["t1"] || $prop('Settings.test_tmax') || $prop('Settings.test_offsets')) {
  for (i = 1; i < ns; i++)
     ts[i] = 0;
  // first message will output changes
  root["t1"] = ts;  // T-1
//root["t2"] = ts;  // T-2
}

var tmax = $prop('Settings.tmax');  // max servo tension
var e = 3;  // epsilon approximation to reduce imperceptible changes
var gain = $prop('Settings.force_gain') * 0.02

// G-forces from SimHub properties
var surge = $prop('AccelerationSurge') * gain;  // longitudinal acceleration
var sway  = $prop('AccelerationSway') * gain;   // lateral acceleration (feels like yaw)
var heave = $prop('AccelerationHeave') * gain;  // vertical acceleration
if (surge < 0)
  surge *= $prop('Settings.accel_gain');
else 
  surge *= $prop('Settings.decel_gain');
sway  *= $prop('Settings.yaw_gain');
heave *= $prop('Settings.heave_gain');
//return surge + ' ' + sway + ' ' + heave;

// neutral position test
if ($prop('Settings.test_neutral')) {
  surge = sway = heave = 0;
}

//if (tmax < surge)
//  $prop('Settings.decel_gain') *= Math.round(tmax/surge - 0.5);	// unsupported...

// convert speed and yaw changes to left and right tension values
var leftSurgeSway = Math.sqrt(surge*surge + sway*sway);
var rightSurgeSway = surge + surge - leftSurgeSway;
//return leftSurgeSway + ' ' + rightSurgeSway


// Assign forces to servos
//
ts[0] = Math.max(leftSurgeSway, 0)			// left shoulder belt
ts[1] = Math.max(rightSurgeSway, 0)			// right shoulder belt
ts[2] = Math.max(leftSurgeSway, -20)		// left head
ts[3] = Math.max(rightSurgeSway, -20)		// right head
/*
ts[4] = Math.max(leftSurgeSway, -20)		// left side back
ts[5] = Math.max(rightSurgeSway, -20)		// right side back
ts[6] = Math.max(leftSurgeSway, -20)		// left thigh
ts[7] = Math.max(rightSurgeSway, -20)		// right thigh
ts[8] = Math.max(leftSurgeSway, -20)		// left lap belt
ts[9] = Math.max(rightSurgeSway, -20)		// right lap belt
ts[10] = Math.max(leftSurgeSway, -20)		// upper back
ts[11] = Math.max(rightSurgeSway, -20)		// lower back
ts[12] = Math.max(leftSurgeSway, -20)		// front seat
ts[13] = Math.max(rightSurgeSway, -20)		// rear seat
//*/


var tc = 1 - ($prop('Settings.smooth') * 0.2);
var step = [];
var i;
// max / min tension test
if ($prop('Settings.test_tmax') || $prop('Settings.test_offsets')) {
  var t = $prop('Settings.test_tmax') ? tmax : 0;  // max : min tension
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
