// condition wheel slip property
var s = $prop('GameRawData.Physics.WheelSlip01');	// signal
return 6 * Math.pow(s, 1/3) - 2;
