// adjust range of servo movements
var lo = $prop('Settings.LeftOffset');
var ro = $prop('Settings.RightOffset');
// send test tension values after setting offsets
var lt = 2;		// most slack left tension value
if ($prop('Settings.max_test'))
  lt = 126 & $prop('Settings.tmax'); // most tense 
var code = [0,lo,1,ro,lt,1+lt];
return String.fromCharCode.apply(null,code);
