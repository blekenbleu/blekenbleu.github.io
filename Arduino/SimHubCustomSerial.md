
---
title: SimHub Custom serial device for Blue Pill
---
*updated 30 Jan 2021*

#### Background
An [STM32duino sketch](https://github.com/blekenbleu/blekenbleu.github.io/tree/master/Arduino/Blue_ASCII_Servo) was thrown together  
that moves either of a pair of servos,  
depending on least significant bit,  
for byte values (masked with 0x7F) received by serial port,
[as described here](index.md#serial-servos)  

Google magic revealed likely `SimHub Custom serial devices` help:
- [SimHub Forum Outputting sim data to Arduino to use with stepper motor gauges](https://www.simhubdash.com/community-2/simhub-support/outputting-sim-data-to-arduino-to-use-with-stepper-motor-gauges/)  
  - This clarifies that it is for "adhoc" protocol with "non simhub" sketches  
- [SHWotever/SimHub Custom serial devices](https://github.com/SHWotever/SimHub/wiki/Custom-serial-devices)
  This walks thru enabling the plugin and defining messages:
  ![custom serial device](SimHubCustomSerial.gif)  
- [SHWotever/SimHub Wiki Custom serial devices support](https://github.com/SHWotever/SimHub/wiki#custom-serial-devices-support)  
  Previously had always *failed to* scroll to [Formulas Engines](https://github.com/SHWotever/SimHub/wiki#formulas-engines)
- Here is the [NCalc reference repository to which GitHub points](http://www.codeproject.com/KB/recipes/sota_expression_evaluator.aspx).  

Sadly, NCalc seems exactly wrong for what I want
* next to no string operators
* no array indexing
* no byte values
* Integers evidently get written to serial as decimal strings.  

As much as I dislike Javascript, it allows for byte banging..

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

[Rough skeleton for SImHub Custom serial device settings](BlueBeltServos.shsds.txt)
