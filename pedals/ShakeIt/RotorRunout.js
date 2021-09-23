// 5-20% pedal rotor runout
var b = $prop('Brake');
return (b > 3 && b < 20) ? 90 : 0;
