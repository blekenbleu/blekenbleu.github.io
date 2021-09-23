// left front loaded slip
L = $prop('ShakeITBSV3Plugin.Export.proxyL.FrontLeft');
var s = $prop('GameRawData.Physics.WheelSlip01') * 80;
//return s;
if (null == s)
  s = $prop('ShakeITBSV3Plugin.Export.proxyS.FrontLeft');
// apply left front load to conditioned corner slip
return s *  L / 100;
