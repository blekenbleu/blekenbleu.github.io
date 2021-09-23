// work in progress
return 15*$prop('Gear');	// for reference only

// rear left
var s = $prop('SpeedKmh');
var g = $prop('Gear');
const tc = 3;  // IIR smoothing factor

// initialize IIR filter history
if(null==root["lows"]) {
   root["lows"] = s;
   root["og"] = g;
}

// IIR low-pass filter
var lows = root["lows"];        // lowpass IIR output
var ds = s - lows;
if (g == root["og"])
  ds = 0;
root["og"] = g;
lows += (s - lows) / tc;
root["lows"] = lows;
return 10 * Math.abs(ds);  
