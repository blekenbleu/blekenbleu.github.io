// unloaded rear slip 0 to 100
var L = 90 - $prop('ShakeITBSV3Plugin.Export.proxyL.RearRight');
L += (90 - $prop('ShakeITBSV3Plugin.Export.proxyL.RearLeft'));
// rear corner slips potentially total 200
var s = $prop('ShakeITBSV3Plugin.Export.proxyS.RearLeft');
s += $prop('ShakeITBSV3Plugin.Export.proxyS.RearRight');
return L * s / 100;  
