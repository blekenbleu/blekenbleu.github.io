var reset = [0x7F];	// reset Arduino; initialize min[], tmax[]
reset[1] = 0x5E; reset[2] = np = $prop('Settings.np');	   // active PWM count
reset[3] = 0x5F; reset[4] = $prop('Settings.info');        // 3 == HEX trace
if (4 == reset[4])
  return String.fromCharCode.apply(null,reset);            // avoid LUT clutter
var l = reset.length;
reset[l] = 0x5F; reset[l+1] = 5; reset[l+2] = np;          // min LUT header
l = reset.length;
var min = [0];
for (var i = 0; i < np; i++) {
    min[i] = $prop('Settings.min'+i) * 1.8
    reset[l+i] = Math.round(126 >= min[i] ? min[i] : 126); // set minima
}
l = reset.length
reset[l] = 0x5F; reset[l+1] = 6; reset[l+2] = np;          // max LUT header
l = reset.length; 
for (var i = 0; i < np; i++) {
    var tmax = .01 * $prop('Settings.max'+i) * (180 - min[i]);
    reset[l+i] = Math.round(126 >= tmax ? tmax : 126);     // set maxima
}
return String.fromCharCode.apply(null,reset);
var st = String.fromCharCode.apply(null,reset);
var s = st.charCodeAt(0);
for(i=1;i<np;i++)
  s+=','+reset.charCodeAt(i)
return s;
