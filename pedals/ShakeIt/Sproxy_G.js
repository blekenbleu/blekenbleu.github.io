// deceleration proxy 0 - 100
var s = $prop('SpeedKmh');
const tc = 3;  // IIR smoothing factor
const noise = 0.01 // non-linear filter threshold

// initialize IIR filter history
if(null==root["speed"]) {
   root["speed"] = $prop('SpeedKmh');
   root["delta_s"] = 0.2;       // for missed sample
}
if (null==root["Gsb4"])
  root["Gsb4"] = 0.5;

var ds = root["speed"] - s;       // negative change between sample intervals
root["speed"] = s;
s = root["delta_s"];    // previous sample change

// mitigate delta spikes from missed samples
var ms = 1;     // sample interval
if ((Math.abs(ds * s) > noise)
 && (Math.abs(ds) > Math.abs(1.8 * s)))
  ds /= (ms = 2);

root["delta_s"] = ds;

// IIR low-pass filter
var Gsb4 = root["Gsb4"];        // lowpass IIR output
Gsb4 += ms * (ds - Gsb4) / tc;
root["Gsb4"] = Gsb4;
return 100 * Gsb4;
