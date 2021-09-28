var l = [$prop('Settings.LeftOffset')];
var r = [$prop('Settings.RightOffset')];
const zero = [0];
const one = [1];
const os = String.fromCharCode(one);
const zs = String.fromCharCode(zero);
var ls = String.fromCharCode.apply(String, l);
var rs = String.fromCharCode.apply(String, r);
return zs.concat(ls,os,rs);
