// 4-bit tension LUT indices
if (!($prop('Settings.TestOffsets') || $prop('Settings.max_test'))) {
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
  // 4-bit indices for servo LUT
  tens = [Math.min(Math.round(left),15), 0x10 | Math.min(Math.round(right),15)];
  //return tens.toString()
  return String.fromCharCode.apply(null,tens);  // 7-bit characters with 4-bit LUT granularity
}
