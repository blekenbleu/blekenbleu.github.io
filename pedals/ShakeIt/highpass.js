var s = $prop('SpeedKmh');	// signal
const tc = 3;  // IIR smoothing factor

// initialize IIR filter value
if(null==root["lows"])
   root["lows"] = s;

// IIR low-pass filter
var lows = root["lows"];      // lowpassed IIR value
s -= lows;           // highpass = current - lowpassed
lows += s / tc;    // lowpass filtering
root["lows"] = lows;	// update stored value
return Math.abs(s);	// only non-negative values from ShakeIt formulae
