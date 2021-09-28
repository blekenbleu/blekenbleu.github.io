// simple low pass IIR filters
var t = 2;                                   // non-linear spike threshold
var tcs = $prop('Settings.ds_smooth'), tcy = $prop('Settings.dy_smooth');  // lowpass IIR

// Initialize history
if(root["speed"]==null) {
   root["speed"] = $prop('SpeedMph');
   root["delta_s"] = 0.2;
}
if(root["yaw"]==null) {
   root["yaw"] = $prop('OrientationYaw');
   root["delta_y"] = 0.2;
}
if (null==root["Gsb4"])
  root["Gsb4"] = $prop('Settings.decel_gain') * 0.5;
if (null==root["Gyb4"])
  root["Gyb4"] = $prop('Settings.yaw_gain') * 0.5;
var Gsb4 = root["Gsb4"], Gyb4 = root["Gyb4"];       // lowpass IIR outputs

var s = $prop('SpeedMph');
var y = $prop('OrientationYaw');
var ds = s - root["speed"];
var dy = y - root["yaw"];

if (ds > 0)     // we are only interested in deceleration
     ds = 0;
else ds = - ds; // positive deceleration

if (Math.abs(dy) > 180) {  // yaw went +/- 180
  if (Math.abs(root["yaw"]) > 150)
    dy = -(y + root["yaw"]);
}

var Gy = $prop('Settings.yaw_gain') * dy;
var Gs = $prop('Settings.decel_gain') * ds;
var ms = 1, my = 1;  // sample interval factors

// check for delta spikes from missed samples
if (Math.abs(dy * root["delta_y"]) > t && Math.abs(dy) > Math.abs(1.8 * root["delta_y"]))
  Gy /= (my = 2);      // compensate sampling artifacts
if ((ds * root["delta_s"])  > t && ds > 1.8 * root["delta_s"])
  Gs /= (ms = 2);      // compensate sampling artifacts
  
// optional low-pass filters here
Gsb4 += ms * (Gs - Gsb4) / tcs;
Gyb4 += my * (Gy - Gyb4) / tcy;
root["Gsb4"] = Gsb4; root["Gyb4"] = Gyb4; // preserve lowpass IIR outputs for next samples

// store unfiltered values for next increment
root["speed"] = s;
root["yaw"] = y;
root["delta_y"] = dy;
root["delta_s"] = ds;

// convert from braking and delta yaw to left and right tension control values
var l = Math.round(Gsb4 - Gyb4);
var r = Math.round(Gsb4 + Gyb4);
if (l > 126)
  l = 126;
else if (l < 2)
  l = 2;
l &= 0x7E;      // left lsb is 0
if (r > 127)
  r = 127;
else if (r < 3)
  r = 3;
r |= 1;         // right lsb is 1

var ls = String.fromCharCode.apply(l);	// tension control characters
var rs = String.fromCharCode.apply(r);
/*
var ls = l.toString();	// to debug, e.g. substitute s,y or ds,dy or Gs,Gy for l,r
var rs = r.toString();
var ss = s.toString();
var ys = y.toString();
var dys = Gyb4.toString();
var dss = Gsb4.toString();
*/
if ($prop('Settings.TestOffsets')) {
  root["delta_s"] = 0.2;  // re-initialize
  root["delta_y"] = 0.2;
  root["Gyb4"] = $prop('Settings.yaw_gain') * 0.5;
  root["Gsb4"] = $prop('Settings.decel_gain') * 0.5;
  ls = String.fromCharCode.apply(126);
  rs = String.fromCharCode.apply(127);
}
return ls.concat(rs);
//else 
//  return ls.concat(' ',rs,' ',ss,' ',ys,' ',dss,' ',dys,'\r\n');	// gnuplot columns for debugging
