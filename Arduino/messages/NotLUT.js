// convert 20 experimental just noticeable tension increments (21 steps) to new Arduino LUT
// maximum total (offset + max tension) Arduino value is 182 for 270 degree servo
// useful range (max tension) is 88 for inline belt tension configuration
var jndx = [2,9,13,16,19,22,25,28,31,34,37,41,44,48,52,57,62,67,74,82,90];
var n = jndx.length - 1;
var base = jndx[0];
function tweak(value) {
  return value - base;
}
var jnd = jndx.map(tweak);
//return jnd.toString();

var step = [0x7F];	// warn Arduino of LUT load
step[1] = $prop('Settings.LeftOffset');
step[2] = $prop('Settings.RightOffset');
var m = ($prop('Settings.tmax') - base) / jnd[n];	// max tension rescale factor

// Bresenham thru jnd increments to steps
step[17] = Math.round(m * jnd[n]);			// rescale last step
var l = 0;
for (i = 3; i < 17; i++) {
  l += n;
  var j = l / 15;				// location in jnd[] corresponding to step[i]
  var a = Math.floor(j);		// linear interpolation: index into jnd[]
  var b = jnd[a + 1] - jnd[a];	// servo steps
  var f = j - a;				// jnd[] fraction
  step[i] = Math.round(m * (jnd[a] + f * b));
}
//return step[3]				// goes to LUT[1] (Lut[0] == 0)
//return step.toString();

var l = 0;		// left most slack control index
var r = 16;		// right most slack control index
if ($prop('Settings.max_test')) {
  l += 15; // most tense control indices
  r += 15;
}
step[18] = l;
step[19] = r;
// send calibration table, then update servo positions using that table
//return step.toString();
var str = String.fromCharCode.apply(null,step);
//return str.length;	// 20
// send servo step LUT, then left and right servo position indices using that LUT
return str;