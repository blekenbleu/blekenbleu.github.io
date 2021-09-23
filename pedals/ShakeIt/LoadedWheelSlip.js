// left front loaded slip
var L = $prop('ShakeITBSV3Plugin.Export.proxyL.FrontLeft');
// apply left front load to conditioned corner slip
var s = $prop('GameRawData.Physics.WheelSlip01') * 80;
//return s;
if (null == s)
  s = $prop('ShakeITBSV3Plugin.Export.proxyS.FrontLeft');
return s *  L / 100;
