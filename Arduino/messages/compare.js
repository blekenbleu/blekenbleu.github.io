// Initialize history
if(root["speed"]==null) {
   root["speed"] = $prop('SpeedMph');
   root["delta_s"] = 0.2;
}
if(root["yaw"]==null) {
   root["yaw"] = $prop('OrientationYaw');
   root["delta_y"] = 0.2;
}

var s = $prop('SpeedMph');
var y = $prop('OrientationYaw');
var ds = root["speed"] - s;		// negative of speed change
var dy = y - root["yaw"];

if (Math.abs(dy) > 180) {  // yaw went +/- 180
  if (Math.abs(root["yaw"]) > 150)
    dy = -(y + root["yaw"]);
}
var YawGain = 72;
var DecelGain = 178;
var Gy = YawGain * dy;
var Gs = DecelGain * ds;
var ms = 1;
var my = 1;  // sample interval factors

// check for delta spikes from missed samples
var t = 2;                                   // non-linear spike threshold
if (Math.abs(dy * root["delta_y"]) > t && Math.abs(dy) > Math.abs(1.8 * root["delta_y"]))
  Gy /= (my = 2);      // compensate sampling artifacts
if ((ds * root["delta_s"])  > t && ds > 1.8 * root["delta_s"])
  Gs /= (ms = 2);      // compensate sampling artifacts
  
// low-pass IIR filters
if (null==root["Gsb4"]) {
  root["Gsb4"] = DecelGain * 0.5;
  root["Gyb4"] = YawGain * 0.5;
}
var Gsb4 = root["Gsb4"], Gyb4 = root["Gyb4"];
var tc = 3;  // lowpass IIR
Gsb4 += ms * (Gs - Gsb4) / tc;
Gyb4 += my * (Gy - Gyb4) / tc;
root["Gsb4"] = Gsb4; root["Gyb4"] = Gyb4; // preserve lowpass IIR outputs for next samples

// store unfiltered values for next increment
root["speed"] = s;
root["yaw"] = y;
root["delta_y"] = dy;
root["delta_s"] = ds;

// SimHub
var accel = $prop('GlobalAccelerationG');
var acc01 = $prop('GameRawData.Physics.AccG01');
var acc02 = $prop('GameRawData.Physics.AccG02');
var acc03 = $prop('GameRawData.Physics.AccG03');
var acs = accel.toString();
var a1s = acc01.toString();
var a2s = acc02.toString();
var a3s = acc03.toString();
var dys = dy.toString();
var dss = ds.toString();
return dys.concat('\t',dss,'\t',acs,'\t',a1s,'\t',a2s,'\t',a3s,'\r\n');
