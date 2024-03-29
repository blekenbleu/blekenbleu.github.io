// left yaw change 0-100
var y = $prop('OrientationYaw');
const tc = 2;  // IIR smoothing factor
const noise = 0.01 // non-linear filter threshold

// initialize IIR filter history
if(null==root["yaw"]) {
   root["yaw"] = $prop('OrientationYaw');
   root["delta_y"] = 0.2;
}
if (null==root["Gyb4"])
  root["Gyb4"] = 0.5;

var dy = y - root["yaw"];       // change between sample intervals

// yaw flips at +/- 180
if (Math.abs(dy) > 180) {  // yaw went +/- 180
  if (Math.abs(root["yaw"]) > 150)
    dy = -(y + root["yaw"]);
}

root["yaw"] = y;
y = root["delta_y"];    // previous sample change

// mitigate delta spikes from missed samples
var my = 1;     // sample interval
if ((Math.abs(dy * y) > noise)
 && (Math.abs(dy) > Math.abs(1.8 * y)))
  dy /= (my = 2);

root["delta_y"] = dy;

// IIR low-pass filter
var Gyb4 = root["Gyb4"];        // lowpass IIR output
Gyb4 += my * (dy - Gyb4) / tc;
root["Gyb4"] = Gyb4;
return 100 * Gyb4;
