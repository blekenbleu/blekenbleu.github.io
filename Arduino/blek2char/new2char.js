// servo positions from properties; parms from settings
var np = $prop('Settings.np');       // PWM count
var pg = $prop('Settings.page') - 2; // zero - based: 0==max; 1==min; 2==neut
var wysiwyg = $prop('Settings.wysiwyg') && 0 <= pg;
var t5=[[0],[0],[0],[0],[0]];        // slider settings
var ss = [1 - $prop('Settings.smooth0') * .2,
          1 - $prop('Settings.smooth1') * .2,
          1 - $prop('Settings.smooth2') * .2];
var neut = [];                       // run-time parms
var tmax = [];
var i;

function t5load() {
  for (i = 0; i < np; i++) {
    t5[0][i] = $prop('Settings.max'+i);        // pg = 0
    t5[1][i] = $prop('Settings.min'+i);        // pg = 1
    t5[2][i] = $prop('Settings.neu'+i);        // pg = 2
    t5[3][i] = $prop('Settings.sca'+i) * .02;  // pg = 3:  50 == unity gain
  }
  t5[4][0] = t5[4][1] = ss[0];                 // assign smoothing per channel
  t5[4][2] = t5[4][3] = ss[1];
  for ( i = 4; i < np; i++)
    t5[4][i] = ss[2];
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
  root['swft'] = 0;                    // sway IIR
}
else if (wysiwyg)
  t5load();
else t5 = root['t5'];
for (i = 0; i < np; i++) { // run-time values
   tmax[i] = Math.round(t5[0][i] * (100 - t5[1][i]) * 0.018);  // 180 / 10000
   neut[i] = Math.round(t5[2][i] * tmax[i] * .01);
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
      if (0 == pg)                                                   // max
        d = tmax[i];
      else if (2 == pg)                                              // offset
        d = neut[i];
      else if (1 == pg)                                              // send it twice, making it unique to SimHUb
        st += String.fromCharCode(0x40 + i | (0x40 & d)>>1, 0x3F & d); // tension for changed parm
      st += String.fromCharCode(0x40 + i | (0x40 & d)>>1, 0x3F & d); // tension for changed parm
    }
//return st;
//return st.length;
//change = true;
  if (change) {
    if (2 != pg) {                                       // table change?  update table, then tension
      var tp = pg + 4;                                   // Arduino table to update; ignored for tmax, which is 6

      if (2 < pg)
        st = String.fromCharCode(0x5F,tp,np)+String.fromCharCode.apply(null,t5[pg])+st; // brain-dead table loading
      else {
        if (1 == pg) {                                   // min: update both min and max
          var m = [];
          for (i = 0; i < np; i++)
            m[i] = Math.round(t5[pg][i] * 1.8);          // % to min: 180 / 100
          st = String.fromCharCode(0x5F,tp,np)+String.fromCharCode.apply(null,m)+st;    // min LUT
        }
        st = String.fromCharCode(0x5F,6,np)+String.fromCharCode.apply(null,tmax)+st;    // max LUT
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
var gain = $prop('Settings.gain_global') * 0.08;


// longitudinal acceleration (positive is back)
var surge = $prop('ShakeITBSV3Plugin.Export.blek2decel.Front') * gain;
if (0 == surge)
  surge = - $prop('ShakeITBSV3Plugin.Export.blek2accel.Rear');
//return surge


// lateral acceleration (positive is right) (feels like yaw)
var sway  = $prop('ShakeITBSV3Plugin.Export.blek2sway.Right') * gain
var swft = root['swft'];     // Low-pass IIR filter
if (0 == sway)
  sway = - $prop('ShakeITBSV3Plugin.Export.blek2sway.Left') * gain;  
swft += (sway - swft) * .7;  // filtered sway
root['swft'] = swft;
//return sway+' '+swft


// vertical acceleration (positive is up)
var heave = $prop('ShakeITBSV3Plugin.Export.blek2heave.Front') * gain;
if (0 == heave)
  heave = - $prop('ShakeITBSV3Plugin.Export.blek2heave.Rear') * gain;


// Combined forces
//
var heaveSurge =  heave * 0.7 - surge * 0.3;
var surgeSway  =  surge * 0.7 + Math.abs(sway) * 0.3;
var rSurgeSway = -surge * 1.2 + Math.abs(sway) * 0.5;
var surgeHeave =  surge * 0.7 + Math.abs(heave) * 0.3;
var swayHeave  =  sway * 0.7 + heave * 0.3;
var rSwayHeave = -sway * 0.7 + heave * 0.3;
var swayRSurge =  sway * 0.7 - surge * 0.3;
var rSwayRSurge = -sway * 0.7 - surge * 0.3;


// convert speed and yaw changes to left and right tension values
var leftSurgeSway;
var rightSurgeSway;
if (surge < 0) {  // tension reductions during acceleration
  // acceleration decreases harness tensions
  var s = sway*sway - surge*surge;
  leftSurgeSway = Math.sqrt(Math.abs(s));
  if (s < 0)
    leftSurgeSway = - leftSurgeSway;
  if (0 > sway) {
    rightSurgeSway = leftSurgeSway;
    leftSurgeSway = surge;
  }
  else rightSurgeSway = surge;
}
else {
  leftSurgeSway = Math.sqrt(surge*surge + sway*sway);
  rightSurgeSway = surge + surge - leftSurgeSway;
  if (1 > rightSurgeSway)
    rightSurgeSway = 1;                // reduce bogus clip warnings
  if (0 > sway) {
    var s = leftSurgeSway;
    leftSurgeSway = rightSurgeSway;
    rightSurgeSway = s;
  }
}
//return neut.toString();
//return format(surge,'0.00') + ' ' + format(sway, '0.00') + ' ' + format(neut[0]+leftSurgeSway,'0.00') + ' ' + format(neut[1]+rightSurgeSway,'0.00') + '\n';
//return leftSurgeSway + '  ' + rightSurgeSway + '  ' + surge


/** Assign forces to servos

leftSurgeSway     // left shoulder belt
rightSurgeSway    // right shoulder belt
surgeSway         // mono shoulder belt
-surge            // middle upper back
surge             // both side lower back
rSurgeSway        // both side upper back
rightSurgeSway    // left side lower back (swapped compared to belts)
leftSurgeSway     // right side lower back ("")
swayRSurge        // left side upper back
rSwayRSurge       // right side upper back
swayHeave         // left seat
rSwayHeave        // right seat
heaveSurge        // center/back seat
-surge*0.4        // lap belt
sway*0.1          // head cushion sway

*/
var ts = [];
ts[0] = leftSurgeSway;
ts[1] = rightSurgeSway;
ts[2] = surge;
ts[3] = rSurgeSway;
ts[4] = 0;//sway;
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

for (i = 0; i < np; i++) {
  var ft = root['ft'][i];                         // Low-pass IIR filter

  ft += (ts[i] - ft) * t5[4][i];                        // filtered tension

//return [i,np,ft,Math.abs(ft-root['ft'][i]),e].toString();

  
  root['ft'][i] = ft;

  ft = Math.round(neut[i] + t5[3][i]*ft);                     // scale and offset
  if (0 > ft) ft = 0;                                         // below min
  else if (ft > 126) ft = 126;                                // Arduino data limit
  st += String.fromCharCode(0x40 | i | ((0x40 & ft)>>1));     // set tension msb
  st += String.fromCharCode(0x3F & ft);                       // 6 lsb
}

//return st.length
return st;
if (990 < st.length) {
  var s = ' 0x'+(st.charCodeAt(0)).toString(16);
  for(i=1;i<st.length;i++)
    s+=',0x'+(st.charCodeAt(i)).toString(16);
  return s;
}
