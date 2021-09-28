// Repurpose gain sliders for just noticeable tension steps
if ($prop('Settings.max_test') || $prop('Settings.TestOffsets'))
  return;
var d = new Date();
var dg = Math.max($prop('Settings.decel_gain'),2);	// base tension
var yg = $prop('Settings.yaw_gain');				// tension increment
if (null == root["odg"]) {
  root["odg"] = dg;
  root["oyg"] = yg;
}
if (dg != root["odg"] || yg != root["oyg"] || null == root["Time"]) {
  root["Time"] = d.getTime();
  root["odg"] = dg;
  root["oyg"] = yg;
}  
var s = root["Time"];
var t = d.getTime() - s;

if (3500 < t)
  d = 2;			// timeout: release tension
else if (3000 < t)
  d = dg + yg;		// base + difference tensions
else if (2500 < t)
  d = dg;			// base tension
else if (2000 < t)
  d = dg + yg;
else if (1500 < t)
  d = dg;  
else if (1000 < t)
  d = dg + yg;
else if (500 < t)
  d = dg;
else
  d = dg + yg;	// may be even or odd
var o = 1 + d;  // the other one
//return d.toString()+"\t"+o.toString();
return String.fromCharCode(d)+String.fromCharCode(o);
