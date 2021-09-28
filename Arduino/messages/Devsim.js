// simulate 4-bit LUT
var tmax = $prop('Settings.tmax');				// max tension
// 20 experimental just noticeable tension increments (21 steps)
var jndx = [2,9,13,16,19,22,25,28,31,34,37,41,44,48,52,57,62,67,74,82,90];
// 21 linear steps for quantization evaluations
jndx =[2,6.4,10.8,15.2,19.6,24,28.4,32.8,37.2,41.6,46,50.4,54.8,59.2,63.6,68,72.4,76.8,81.2,85.6,90];
var base = jndx[0];
if (null == root["tmax"]) {
  root["tmax"] = tmax;
}
if (tmax != root["tmax"] || null == root["LUT"]) {
  root["tmax"] = tmax;
  var n = jndx.length - 1;
  function tweak(value) {
    return value - base;
  }
  var jnd = jndx.map(tweak);
  //return jnd.toString();
  var m = ($prop('Settings.tmax') - base) / jnd[n];	// max tension rescale factor
  // Bresenham thru jnd increments to steps
  var step = [base];
  step[15] = base + Math.round(m * jnd[n]);			// rescale last step
  var l = 0;
  for (i = 1; i < 15; i++) {
    l += n;
    var j = l / 15;				// location in jnd[] corresponding to step[i]
    var a = Math.floor(j);		// linear interpolation: index into jnd[]
    var b = jnd[a + 1] - jnd[a];	// servo steps
    var f = j - a;				// jnd[] fraction
    step[i] = base + Math.round(m * (jnd[a] + f * b));
  }
  
  root["LUT"] = step;
}

var LUT = root["LUT"];
var tens = [0x7E & LUT[0], 1 | LUT[0]];
var lin = [2,3];
if ($prop('Settings.max_test'))
  tens = [0x7E & LUT[15], 1 | LUT[15]];
else if (!$prop('Settings.TestOffsets')) {
  var surge = Math.max(-$prop('AccelerationSurge'),0) * $prop('Settings.decel_gain') / 33;
  var sway = $prop('AccelerationSway') * $prop('Settings.yaw_gain') / 33;
//  sway = 0.7;
//  surge = 0.7;
  var right;
  var left = Math.sqrt(surge*surge + sway*sway);	// increase tension
  if (0 < sway)
    right = Math.max(surge + surge - left,0);
  else {	// negative sway: increase right tension
    right = left;
    left = Math.max(surge + surge - right,0);
  }  
  // left is constrained to even values, right to odd
  // 4-bit indices into servo LUT
  tens = [0x7E & LUT[Math.min(Math.round(left),15)], 1 | LUT[Math.min(Math.round(right),15)]];
// full 7-bit precision servo values
  lin = [0x7E & Math.min(tmax,Math.round(base + left*5.7)), 1 | Math.min(tmax,Math.round(base + right*5.7))];
}
//return surge.toString()+','+sway.toString();
//return tens.toString();//+' '+lin.toString();	// ASCII decimal values
//return String.fromCharCode.apply(null,tens); // 7-bit character values from 4-bit LUT
return String.fromCharCode.apply(null,lin);  // 7-bit character values with 7-bit granularity

