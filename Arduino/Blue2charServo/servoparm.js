// update per-servo parameters
var ns = $prop('Settings.ns');       // servo count
var ts = [0];
var tm = [0];
var to = [0];
//return ns;
// Set up data and reset IIR filters
if (null == root["t1"]) {
  for (i = 1; i <= ns; i++) {
     ts[i-1] = $prop('Settings.p'+i+'min');
     tm[i-1] = $prop('Settings.p'+i+'max');
     to[i-1] = $prop('Settings.p'+i+'off');
  }
  // first message initialized offsets to Arduino; should initialize all
  root["ts"] = ts;
  root["tm"] = tm;
  root["to"] = to;
}
ts = root["ts"];
tm = root["tm"];
to = root["to"];
