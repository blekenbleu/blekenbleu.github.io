var s = $prop('SpeedKmh');	// signal
const tc = 3;  // IIR smoothing factor

// initialize IIR filter value
if(null==root["lows"])
   root["lows"] = s;

// IIR low-pass filter
var lows = root["lows"];      	// lowpassed IIR value
lows += (s - lows) / tc;    	// lowpass filtering
root["lows"] = lows;	// update stored value
return Math.abs(lows);	// only non-negative values from ShakeIt formulae
