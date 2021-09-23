// understeer
// left front - rear slip
var s = $prop('ShakeITBSV3Plugin.Export.proxyS.FrontLeft');
s = Math.max(0, s - $prop('ShakeITBSV3Plugin.Export.proxyS.RearLeft'));
// right front - rear slip
var r = $prop('ShakeITBSV3Plugin.Export.proxyS.FrontRight');
r = Math.max(0, r - $prop('ShakeITBSV3Plugin.Export.proxyS.RearRight'));
// how much front is unloaded
var acc = (0 < $prop('GlobalAccelerationG')) ? $prop('ShakeITBSV3Plugin.Export.AbsAcc.Right') : 0;
// unloaded correlated right & left front - rear slip differences
return Math.sqrt(r*s) * acc / 15;
