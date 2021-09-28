// special: 0 = reset; 1 = clip(F); 2 = echo (0-F); 3 = echo full hex
var s = 0x70 + $prop('Settings.special');
//return s
return String.fromCharCode(s);
