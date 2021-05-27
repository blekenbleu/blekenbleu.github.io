
---
title: SimHub Custom serial device for Blue Pill
---
*updated 30 Jan 2021*

#### [Background](https://blekenbleu.github.io/Arduino/SimHubCustomSerial.html)
An [STM32duino sketch](https://github.com/blekenbleu/blekenbleu.github.io/tree/master/Arduino/Blue_ASCII_Servo) was thrown together  
that moves either of a pair of servos,  
depending on least significant bit,  
for byte values (masked with 0x7F) received by USB COM port,
[as described here](index.md#serial-servos)  

Google magic revealed likely `SimHub Custom serial devices` help:
- [SimHub Forum Outputting sim data to Arduino to use with stepper motor gauges](https://www.simhubdash.com/community-2/simhub-support/outputting-sim-data-to-arduino-to-use-with-stepper-motor-gauges/)  
  - This clarifies that Custom serial device is for "adhoc" protocol with "non-SimHub" sketches  
- [SHWotever/SimHub Custom serial devices](https://github.com/SHWotever/SimHub/wiki/Custom-serial-devices)
  This walks thru enabling the plugin and defining messages:
  ![custom serial device](SimHubCustomSerial.gif)  
  The [SimHub `Custom serial device` for **Blue Pill harness servos**](proxy_G.shsds.txt) has two enabled Update messages:
  1. harness tension settings
      - click `Test untensioned positions` to adjust `Left untensioned` and `Right untenstioned` sliders  
        so that harness is most slack
      - then click `test max tension` to adjust `max tension` slider for most harness tightening;  
        check power regulator LED current readout to verify that servos are not driven to overload  
      - unclick both `Test untensioned positions` and `test max tension` for normal operation.  
  2. live G-force tensions
      - this uses `proxy_G` properties from [SimHub for ShakeSeat](../pedals/index.htm#accel) G-force `CUSTOM EFFECT`  
      - `decel gain` and `decel yaw gain` sliders affect relative strenghts of braking and cornering.  
      - `smoothing` sliders modifies responsiveness and "noise' of servo signals.  
- [SHWotever/SimHub Wiki Custom serial devices support](https://github.com/SHWotever/SimHub/wiki#custom-serial-devices-support)  
  I previously had always *failed to* scroll to [Formulas Engines](https://github.com/SHWotever/SimHub/wiki#formulas-engines)
- Here is the [NCalc reference repository to which GitHub points](http://www.codeproject.com/KB/recipes/sota_expression_evaluator.aspx).  

Sadly, NCalc seems exactly wrong for what is wanted:
* next to no string operators
* no array indexing
* no byte values
* Integers get written to serial as decimal strings.  

Much as I dislike Javascript, it supports byte banging..

This leaves the trick of sending the message for dynamic harness tensioning.  
An interesting property exists:  `GameData.GlobalAccelerationG`  
Sure would be nice if there was a reference describing it...  

In [SimHib discord](https://discord.com/channels/299259397060689920/453962780857597966/800365665289502731), Wotever wrote (01/18/2021) about deceleration:  
"it's DataCorePlugin.GameData.GlobalAccelerationG  
  deceleration is just a negative acceleration"  
On 01/25/2021, fhoos wrote: "(Deceleration goes about from 0 to -50)"  

Other properties:  GameData.Sway, GameRawData.Physics.Roll  
  GameData.OrientationRoll GameData.OrientationYaw

Clicking around in `Property Picker`:  
![acc properties](PropertyPicker_acc.gif)  

In the left margin is "Available properties";
selecting that exposes an Ncalc tester.  
Perhaps, if some game were recorded,  
then Replay here would show how data worked...?  
`round([GameRawData.Physics.AccG01],0)`  

[Rough skeleton for SImHub Custom serial device settings](tension.shsds.txt)
Need to understand the nature of available SimHub properties for acceleration.  
First, record a figure 8 track lap, then play it back and record values.  
Here is a SimHub Custom Serial formula for relevant properties:  
![SimHub acceleration recording formula ](formatAccel.gif)  
Here is yaw and speed deltas vs scaled `GlobalAccelerationG`,  plotted by [Gnuplot delta_v() script](delta.txt):  
![yaw and speed deltas vs accel gnuplot](raw_accel.gif)  
`delta_v(SpeedMph)` property basically overlays scaled `GlobalAccelerationG`.  

`OrientationYaw` presumably reports degrees heading; abrupt +/-180 transitions are a clue.  
Given figure-8 track telemetry, `delta_v(OrientationYaw)` seems a credible proxy for lateral acceleration.  
My guess is that delta_v "noise" is an artifact of SimHub sampling data at a rate somewhat slower  
than that at which Assetto Corsa updates;  deltas occasionally represent differences between 3 game samples,  
rather than 2. Artifacts could be fairly easily addressed by a non-linear filter which tests:  
```
if (a current delta value is roughly twice the previous)
     then (divide it by 2)...
```
Normalizing speed and yaw deltas by `SystemInfoPlugin.Uptime` deltas is unlikely to work,  
since it increments based on SimHub, not the game.

Harness tension, G-force gain and smoothing settings:  
![SimHub tension settings](SimHubCustomSerial.gif)
Recompiled Blue_ASCII sketch to echo hex, confirming 0 and 1 are received, all over 127 scrogged.  

While it would be nice to have delta_v filter code in a more legible format,
my guess is that SimHub live interpreter does not work for JavascriptExtensions.  
Javascript has been updated to exploit acceleration property support added to SimHub 7.3.14.  

SimHub has Visible Bindings and Enabled Bindings for Custom serial devices Setting panel;  
don't know what two different bindings imply.  Sliders work without forcing settings in their Bindings.  

As with .siprofile files for ShakeIt, .shsds files for Custom serial devices are stored in your `Documents\SimHub\` folder.
`cp proxy_G.shsds` [../GitHubDesktop/blekenbleu.github.io/Arduino/proxy_G.shsds.txt](proxy_G.shsds.txt)  
[Here is Javascript](SimHubG.js.txt) extracted from that profile.  

Since an STM32 Blue Pill is capable of driving more (at least 7) PWM devices,  
it becomes interesting to investigate useful device control granularity.  
Specifically, 4-bit granularity leaves 3 bits for addressing 7 PWM pins,  
leaving address 0x70 to e.g. download LUTs and enable/disable message echo.  
This [Noticeable.shsds](Noticeable.shsds.txt) GitHub profile has 4 Javascript messages:
1) Generate LUTs for download to (not yet written) Arduino sketch for equal tension increments
2) Repurpose decel and yaw can sliders to for equal tension increment testing
3) Updated (simplified) untensioned and max tension position slider tests
4) Simulate 4-bit quantized tension LUT in comparison to 7-bit (servo pwm granularity) control.
