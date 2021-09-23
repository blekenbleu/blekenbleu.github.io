// left front wheel load
var L = $prop('GameRawData.Physics.WheelLoad01')/90;
if (null != L)
  return L;
// convert unsigned lateral Gs to signed left G
L = $prop('ShakeITBSV3Plugin.Export.proxy_G.FrontLeft');
L -= $prop('ShakeITBSV3Plugin.Export.proxy_G.RearLeft');
// convert lateral G to left load
L = 25 + 25 * L / 100;
// convert unsigned accelerations to signed deceleration
var d = $prop('ShakeITBSV3Plugin.Export.proxy_G.FrontRight')
d -= $prop('ShakeITBSV3Plugin.Export.proxy_G.RearRight');
// apply deceleration to left load
L += L * d/100;
return L;	// estimated wheel load property
