// oversteer
// front left slip
var s = - $prop('ShakeITBSV3Plugin.Export.proxyS.FrontLeft');
s = Math.max(0, s + $prop('ShakeITBSV3Plugin.Export.proxyS.RearLeft'));
// front right slip
var r = - $prop('ShakeITBSV3Plugin.Export.proxyS.FrontRight');
r = Math.max(0, r + $prop('ShakeITBSV3Plugin.Export.proxyS.RearRight'));
// correlate slip differences
return Math.sqrt(r*s) * $prop('ShakeITBSV3Plugin.Export.AbsAcc.Left') / 15;

// understeer
// front left slip
var s = $prop('ShakeITBSV3Plugin.Export.proxyS.FrontLeft');
s = Math.max(0, s - $prop('ShakeITBSV3Plugin.Export.proxyS.RearLeft'));
// front right slip
var r = $prop('ShakeITBSV3Plugin.Export.proxyS.FrontRight');
r = Math.max(0, r - $prop('ShakeITBSV3Plugin.Export.proxyS.RearRight'));
// correlate slip differences
return Math.sqrt(r*s) * $prop('ShakeITBSV3Plugin.Export.AbsAcc.Left') / 15;
