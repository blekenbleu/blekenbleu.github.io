// servo positions from properties; parms from settings
var np = $prop('Settings.np');       // PWM count
var pg = $prop('Settings.page') - 2; // zero - based
var wysiwyg = $prop('Settings.wysiwyg') && 0 <= pg;
var t5=[[0],[0],[0],[0],[0]];        // slider settings
var neut = [];                       // run-time parms
var tmax = [];
var i;

function t5load() {
  for (i = 0; i < np; i++) {
    t5[0][i] = $prop('Settings.neu'+i);        // pg = 2
    t5[1][i] = $prop('Settings.min'+i);        // pg = 3
    t5[2][i] = $prop('Settings.max'+i);        // pg = 4
    t5[3][i] = $prop('Settings.sca'+i);        // pg = 5
  }
}

/* other (unused here) settings:
   $prop('Settings.nf')
 */
if (null == root['t5']) {              // device connect message initialized 2 Arduino LUTs
  var ft = [0];                        // Set up data and reset IIR filters

  for (i = 0; i < np; i++)
     ft[i] = 0;
  root['ft'] = ft;                     // IIR
  t5load();
  root['t5'] = t5;
}
else if (wysiwyg)
  t5load();
else t5 = root['t5'];
for (i = 0; i < np; i++) { // run-time values
   tmax[i] = Math.round(t5[2][i] * (100 - t5[1][i]) * 0.018);  // 180 / 10000
   neut[i] = Math.round(t5[0][i] * tmax[i] * .01);
}
//return root['ft'].toString()

var st = '';                                        // tension string:  watch this space
if (wysiwyg) {                                      // changes enabled?
  var tr = root['t5'];
  var change = false;                               // Only one page at a time

  for (i = 0; i < np; i++)
    if (tr[pg][i] != t5[pg][i]) {
      var d = 0;                       // tension to apply for test; d = 0 for min (page 3)

      change = true;
      if (2 == pg)                                                   // max
        d = tmax[i];
      else if (0 == pg)                                              // offset
        d = neut[i];
      else if (1 == pg)                                              // send it twice, making it unique to SimHUb
        st += String.fromCharCode(0x40 + i | (0x40 & d)>>1, 0x3F & d); // tension for changed parm
      st += String.fromCharCode(0x40 + i | (0x40 & d)>>1, 0x3F & d); // tension for changed parm
    }
//return st;
//return st.length;
//change = true;
  if (change) {
    if (1 <= pg) {                                       // table change?  update table, then tension
      var tp = pg + 4;                                   // Arduino table to update

      if (2 < pg)
        st = String.fromCharCode(0x5F,tp,np)+String.fromCharCode.apply(null,t5[pg])+st; // brain-dead table loading
      else {
        if (1 == pg) {                                   // min: update both min and max
          var m = [];
          for (i = 0; i < np; i++)
            m[i] = Math.round(t5[pg][i] * 1.8);          // % to min: 180 / 100
          st = String.fromCharCode(0x5F,tp,np)+String.fromCharCode.apply(null,m)+st;
        }
        st = String.fromCharCode(0x5F,6,np)+String.fromCharCode.apply(null,tmax)+st;
      }
    }
    root['t5'][pg] = t5[pg];                             // no change left unsaved!!
  }
  return st;                                             // ignore telemetry during wysiwyg
  if (90 < st.length) {
    var s = ' 0x'+(st.charCodeAt(0)).toString(16);
    for(i = 1; i < st.length; i++)
      s += ',0x'+(st.charCodeAt(i)).toString(16);
    return s;
  } // else return 'zero length\n';
}

// G-forces from SimHub properties ---------------
var e = 0.15;  // epsilon approximation to reduce imperceptible changes
var gain = $prop('Settings.gain_global') * 0.02;

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
var surgeSway = surge * 0.7 + Math.abs(sway) * 0.3;
var reverseSurgeSway = -surge * 0.7 + Math.abs(sway) * 0.3;
var surgeHeave = surge * 0.7 + Math.abs(heave) * 0.3;
var swayHeave = heave * 0.7 + Math.abs(sway) * 0.3;
var frontHeave = heave * 0.7 + Math.max(surge * 0.3, 0);
var rearHeave = heave * 0.7 + Math.max(-surge * 0.3, 0);
// 100*((x/100)^(1/gamma))
var swayGamma = 60 * Math.pow(Math.abs(sway * .01),(1 / 0.7));
if (0 > sway)
  swayGamma = - swayGamma;
//return swayGamma + ' ' + sway

// convert speed and yaw changes to left and right tension values
var leftSurgeSway;
var rightSurgeSway;
var su03 = surge * .0023;
var sw03 = sway * .2;
if (surge < 0) {  // tension reductions during acceleration
  su03 *= $prop('Settings.gain_accel');
  // acceleration decreases harness tensions
  var s = sw03*sw03 - su03*su03;
  leftSurgeSway = Math.sqrt(Math.abs(s));
  if (s < 0)
    leftSurgeSway = - leftSurgeSway;
  if (0 > sw03) {
    rightSurgeSway = leftSurgeSway;
    leftSurgeSway = su03;
  }
  else rightSurgeSway = su03;
}
else {
  su03 *= $prop('Settings.gain_decel');
  leftSurgeSway = Math.sqrt(su03*su03 + sw03*sw03);
  rightSurgeSway = su03 + su03 - leftSurgeSway;
  if (1 > rightSurgeSway)
    rightSurgeSway = 1;                // reduce bogus clip warnings
  if (0 > sway) {
    var s = leftSurgeSway;
    leftSurgeSway = rightSurgeSway;
    rightSurgeSway = s;
  }
}
//return neut.toString();
//return format(su03,'0.00') + ' ' + format(sw03, '0.00') + ' ' + format(neut[0]+leftSurgeSway,'0.00') + ' ' + format(neut[1]+rightSurgeSway,'0.00') + '\n';

/** Assign forces to servos

leftSurgeSway     // left shoulder belt
rightSurgeSway    // right shoulder belt
surge             // upper back; lower back
sway              // left side back; left thigh
-sway             // right side back; right thigh
reverseSurgeSway  // mono both side back
swayGamma         // head cushion twist
swayHeave         // lap belt
surgeSway         // mono shoulder belt
frontHeave        // center front seat
rearHeave         // center rear seat

*/
var ts = [];
ts[0] = leftSurgeSway;
ts[1] = rightSurgeSway;
ts[2] = surge;
ts[3] = swayGamma;
ts[4] = reverseSurgeSway;
ts[5] = 0;
ts[6] = 0;
ts[7] = 0;
ts[8] = 0;
ts[9] = 0;
ts[10] = 0;
ts[11] = 0;
ts[12] = 0;
ts[13] = 0;
ts[14] = 0;

if (5 == $prop('Settings.info')) {    // gnuplot format
  st = format(surge,'0.00')+' '+format(sway,'0.00')+' '+format(heave,'0.00');
  for (i = 0; i  < np; i++)
    st += ' '+format(ts[i],'0.00');
  return st+'\n';
}

var tc = 1 - ($prop('Settings.smooth') * 0.2);
for (i = 0; i < np; i++) {
  var ft = root['ft'][i];                         // Low-pass IIR filter

  ft += (ts[i] - ft) * tc;                        // filtered tension

  if (i >= 90)                                    // debugging
    return [i,np,ft,Math.abs(ft-root['ft'][i]),e].toString()

// Skip change if it is smaller than e
  var tension = Math.abs(ft - root['ft'][i]) > e;
  root['ft'][i] = ft;
  if (tension) {
//  Center forces by (offset)
    ft = Math.round(ft + neut[i]);
    if (0 > ft) ft = 0;                                         // below min
    else if (ft > 126) ft = 126;                                // Arduino data limit
    st += String.fromCharCode(0x40 | i | ((0x40 & ft)>>1));     // set tension msb
    st += String.fromCharCode(0x3F & ft);                       // 6 lsb
  }
}

//return st.length
return st;
if (990 < st.length) {
  var s = ' 0x'+(st.charCodeAt(0)).toString(16);
  for(i=1;i<st.length;i++)
    s+=',0x'+(st.charCodeAt(i)).toString(16);
  return s;
}
