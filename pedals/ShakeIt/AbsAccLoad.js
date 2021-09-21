// front left load
d = $prop('ShakeITBSV3Plugin.Export.AbsAcc.Right')
d = (0<$prop('AccelerationSurge')) ? d : -d;
// left load (turning right)
var L = $prop('ShakeITBSV3Plugin.Export.AbsAcc.Left')
L = (0>$prop('AccelerationSway')) ? L : -L;
//return d;
// d, L range -100 to 100; max magnitude 100*sqrt(2)
// if G are 0, then no load shift and each corner gets 0.25 G
L = 25 + 25 * L / 100;	// left-right load distribution
L += (L * d / 100);		// fore-aft load distribution
return L;
