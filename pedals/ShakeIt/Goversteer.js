// unloaded rear slip 0 to 100
// deceleration load 0 to 200
var d = 100 + $prop('ShakeITBSV3Plugin.Export.proxy_G.FrontRight')
d -= $prop('ShakeITBSV3Plugin.Export.proxy_G.RearRight');
// rear corner slips potentially total 200
var s = $prop('ShakeITBSV3Plugin.Export.proxyS.RearLeft');
s += $prop('ShakeITBSV3Plugin.Export.proxyS.RearRight');
return d * s / 100;
