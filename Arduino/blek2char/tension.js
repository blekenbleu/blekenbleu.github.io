// servo tensions from G-forces;  parms from sliders
var ns = $prop('Settings.np');		// PWM count
var t3=[[0],[0],[0],[0],[0]];
var neut = [0];			// precalculate run-time values
var tmax = [0];			
for (var i = 0; i < ns; i++) {
   t3[0][i] = $prop('Settings.neu'+i);	// pg = 2
   t3[1][i] = $prop('Settings.min'+i);	// pg = 3
   t3[2][i] = $prop('Settings.max'+i);	// pg = 4
   t3[3][i] = $prop('Settings.sca'+i);	// pg = 5
   // run-time values
   tmax[i] = Math.round(t3[2][i] * (100 - t3[1][i]) * 0.018);		// 180 / 10000
   neut[i] = Math.round((t3[0][i] * tmax[i] - t3[1][i] * 180) / 100);
}
/* other (unused here) settings:
   $prop('Settings.info')
   $prop('Settings.nf')
 */
if (null == root['t3']) {	// device connect message initialized Arduino minima
  var ft = [0];			// Set up data and reset IIR filters

  root['t3'] = t3;
  for (i = 0; i < ns; i++)
     ft[i] = 0;
  root['ft'] = ft;	// IIR
}
//return root['ft'].toString()

var wysiwyg = $prop('Settings.wysiwyg');
var pg = $prop('Settings.page') - 2;		// zero - based

var st = '';					// tension string:  watch this space
if (0 <= pg && wysiwyg) {			// changes enabled?
  var tr = root['t3'];
  var change = false;				// Only one page at a time
  var i;

  for (i = 0; i < ns; i++)
    if (tr[pg][i] != t3[pg][i]) {
      var d = 0;          // calculate tension to apply for test; d = 0 for min (page 3)
     
      change = true;
      tmax[i] = Math.round(t3[2][i] * (100 - t3[1][i]) * 0.018);	// % of 180 * (100 - min) /100
      if (2 == pg)			// max
        d = tmax[i];
      else if (0 == pg) 		// offset
	neut[i] = d = Math.round(t3[pg][i] * tmax[i] / 100);
      st += String.fromCharCode(0x40 + i | (0x40 & d)>>1, 0x3F & d); // tension for changed parm
    }
//  return st;

//return st.length;
//change = true;
  if (change) {
    if (1 <= pg) {					// table change?  update table, then tension
      var m = [0];					// for either 1 or 2 == pg
      var tp = pg + 4;					// Arduino table to update

      if (2 < pg)
	m = t3[pg];					// brain-dead table loading
      else if (1 == pg) {				// min: update both min and max
        for (i = 0; i < ns; i++)
          m[i] = Math.round(t3[pg][i] * 1.8);		// percentages to PWM min: 180 / 100
	st = String.fromCharCode(0x5F,tp,ns)+String.fromCharCode.apply(null,m)+st;
	tp = 6;  m = tmax;				// also update tmax
      }
      else m = tmax;
      st = String.fromCharCode(0x5F,tp,ns)+String.fromCharCode.apply(null,m)+st;
    }
    root['t3'][pg] = t3[pg];				// no change left unsaved!!
  }
}
//return st;

var e = 0.15;  // epsilon approximation to reduce imperceptible changes
var gain = $prop('Settings.gain_global') * 0.02;

// G-forces from SimHub properties ---------------
// longitudinal acceleration (positive is back)
var surge = $prop('AccelerationSurge') * gain;

if (surge < 0)
  surge *= $prop('Settings.gain_accel');
else
  surge *= $prop('Settings.gain_decel');
//return surge

// lateral acceleration (positive is right) (feels like yaw)
var sway  = $prop('AccelerationSway') * gain * $prop('Settings.gain_sway');

// vertical acceleration (positive is up)
var heave = $prop('AccelerationHeave') * gain * $prop('Settings.gain_heave');

// Combine forces
//
// convert speed and yaw changes to left and right tension values
var leftSurgeSway = Math.sqrt(surge*surge + sway*sway);
var rightSurgeSway = surge + surge - leftSurgeSway;
//return leftSurgeSway + ' ' + rightSurgeSway;

var monoSurgeSway = surge * 0.7 + Math.abs(sway) * 0.3;
var monoSurgeHeave = surge * 0.7 + Math.abs(heave) * 0.3;
var monoSwayHeave = heave * 0.7 + Math.abs(sway) * 0.3;
var frontHeave = heave * 0.7 + Math.max(surge * 0.3, 0);
var rearHeave = heave * 0.7 + Math.max(-surge * 0.3, 0);
// 100*((x/100)^(1/gamma))
var swayGamma = 10 * Math.pow(Math.abs(sway * .01),(1 / 0.7));
if (0 > sway)
  swayGamma *= -1;
//return swayGamma + ' ' + sway

var ts = [];					// Assign forces to servos
ts[0] = 0;					// left shoulder belt (leftSurgeSway)
ts[1] = 0;					// right shoulder belt (rightSurgeSway)
ts[2] = surge;					// upper back (neutral 25)
ts[3] = swayGamma;				// head cushion twist (neutral 50)
/*
ts[4] = sway;					// left side back
ts[5] = -sway;					// right side back
ts[5] = surge;					// lower back
ts[5] = monoSurgeHeave;				// mono lap belt
ts[5] = sway;					// left thigh
ts[5] = -sway;					// right thigh
ts[5] = monoSwayHeave;				// left lap belt
ts[5] = monoSwayHeave;				// right lap belt
ts[5] = monoSurgeSway;				// mono shoulder belt
ts[5] = frontHeave;				// front center seat
ts[5] = rearHeave;				// rear center seat
 */
//return ts.toString()

var tc = 1 - ($prop('Settings.smooth') * 0.2);
for (var i = 0; i < ns; i++) {
  var ft = root['ft'][i];					// Low-pass IIR filter

  ft += (ts[i] - ft) * tc;					// filtered tension

  if (i >= 90)							// debugging
    return [i,ns,ft,Math.abs(ft-root['ft'][i]),e].toString()

/* Skip change if current unfiltered tension differs from previous filtered tension
 ; by less than e or servo is being tested */
  var tension = Math.abs(ts[i] - root['ft'][i] > e && ! wysiwyg);
  root['ft'][i] = ft;
  if (tension) {
//  Center forces by (offset)
    ft += neut[i];
    if (0 > ft) ft = 0;						// below min 
    else if (ft > 127) ft = 127;				// 7 bit limit limit 
    st += String.fromCharCode(0x40 | i | ((0x40 & ft)>>1)); 	// set tension msb
    st += String.fromCharCode(0x3F & ft);			// 6 lsb
  }
}

//return st.length
if (0 < st.length) {
  //return st.length;    // 2 * ns
  return st;
}
if (990 < st.length) {
  var s = ' 0x'+(st.charCodeAt(0)).toString(16);
  for(i=1;i<st.length;i++)
    s+=',0x'+(st.charCodeAt(i)).toString(16);
  return s;
}
