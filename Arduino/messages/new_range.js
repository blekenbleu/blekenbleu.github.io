// adjust range of servo movements
var l = [$prop('Settings.LeftOffset')];
var r = [$prop('Settings.RightOffset')];
const zero = [0];	// offset adjust control codes
const one = [1];
var two = [2];		// most slack control values
var three = [3];
if ($prop('Settings.max_test')) {
  two = 126 & $prop('Settings.tmax'); // most tense control values
  three = 1 + two;
}  
const right = String.fromCharCode(one);
const left = String.fromCharCode(zero);
var s2 = String.fromCharCode(two); // send tension control characters after setting new offsets
var s3 = String.fromCharCode(three);
var sl = String.fromCharCode.apply(String, l);
var sr = String.fromCharCode.apply(String, r);
// send updated offsets, then servo positions
return left.concat(sl,right,sr,s2,s3);
