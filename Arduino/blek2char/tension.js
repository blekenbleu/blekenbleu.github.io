// Calculate servo tensions from G-forces
var ns = $prop('Settings.np');		// PWM count
var t3=[[0],[0],[0]];
var neut = [0];			// precalculate run-time values
var tmax = [0];			
for (i = 0; i < ns; i++) {
   t3[0][i] = $prop('Settings.neu'+i);	// pg = 2
   t3[1][i] = $prop('Settings.min'+i);	// pg = 3
   t3[2][i] = $prop('Settings.max'+i);	// pg = 4
   t3[3][i] = $prop('Settings.sca'+i);	// pg = 5
   // run-time values
   tmax[i] = Math.round(t3[2][i] * 180 * (100 - t3[1][i]) / 10000);
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
      
      tmax[i] = Math.round(t3[2][i] * 180 * (100 - t3[1][i]) / 10000);	// % of 180 * (100 - min) /100
      if (2 == pg)		// max
        d = tmax[i];
      else if (0 == pg) {		// offset
        d = Math.round(t3[pg][i] * tmax[i] / 100);
	neut[i] = d - Math.round(t3[1][i] * 180 / 100);
      }
      st += String.fromCharCode(0x40 + i | (0x40 & d)>>1, 0x3F & d); // tension for changed parm
    }
//  return st;

//return st.length;
//change = true;
  if (change) {
    if (1 <= pg) {					// table change?  update table, then tension
      var m = [0];
      if (1 == pg)					// min
        for (i = 0; i < ns; i++)
          m[i] = Math.round(180 * t3[pg][i] / 100);	// convert percentages to PWM min
      else if (2 == pg)					// max
        m = tmax;
      else for (i = 0; i < ns; i++)
        m[i] = t3[pg][i];				// brain-dead table loading
      st = String.fromCharCode(0x5F,4+pg,ns)+String.fromCharCode.apply(null,m)+st;
    }
    root['t3'][pg] = t3[pg];				// no change left unsaved!!
  }
}
//return st;

var e = 3;  // epsilon approximation to reduce imperceptible changes
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

var monoSurgeSway = surge * 0.8 + Math.abs(sway) * 0.2;
var monoSwayHeave = heave * 0.8 + Math.abs(sway) * 0.2;
var frontHeave = heave * 0.8 + Math.max(surge * 0.2, 0);
var rearHeave = heave * 0.8 + Math.max(-surge * 0.2, 0);

							// Assign forces to servos
var ts = [Math.max(leftSurgeSway, 0)];			// left shoulder belt
ts[1] = Math.max(rightSurgeSway, 0);			// right shoulder belt
ts[2] = Math.max(rightSurgeSway + 20, 0);		// left head
ts[3] = Math.max(leftSurgeSway + 20, 0);		// right head
ts[4] = Math.max(surge + 40, 0);			// upper back
ts[5] = Math.max(monoSurgeSway + 5, 0);			// mono shoulder belt
/*
ts[5] = Math.max(surge + 10, 0);			// lower back
ts[6] = Math.max(rightSurgeSway + 10, 0);		// left side back
ts[7] = Math.max(leftSurgeSway + 10, 0);		// right side back
ts[8] = Math.max(sway + 10, 0);				// left thigh
ts[7] = Math.max(-sway + 10, 0);			// right thigh
ts[8] = Math.max(monoSwayHeave + 10, 0);		// left lap belt
ts[9] = Math.max(monoSwayHeave + 10, 0);		// right lap belt
ts[12] = Math.max(frontHeave + 10, 0);			// front seat
ts[13] = Math.max(rearHeave + 10, 0);			// rear seat
 */
//return ts.toString()

var tc = 1 - ($prop('Settings.smooth') * 0.2);
for (var i = 0; i < ns; i++) {
  var max = tmax[i];
  var ft = root['ft'][i];					// Low-pass IIR filter

  ft += (ts[i] - ft) * tc;					// filtered tension
  if (ft > max) ft = max;					// limit tension

  if (i >= 90)							// debugging
    return [i,ns,max,ft,Math.abs(ft-root['ft'][i]),e].toString()

// Skip change if it is smaller than e or servo is being tested
  var tension = Math.abs(ft - root['ft'][i] > e && ! wysiwyg);
  root['ft'][i] = ft;
  if (tension) {
//  Set neutral or center point of forces
    ft += neut[i];
    if (0 > ft) ft = 0;						// below min 
    else if (ft > max) ft = max;				// limit tension
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
