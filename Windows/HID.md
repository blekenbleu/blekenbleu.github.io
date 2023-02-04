
---
Windows HID game controllers and SimHub
---
Given:&nbsp;  a [documented](../MIDI/plugin/) and working [SimHub plugin that receives
 and sends MIDI](https://github.com/blekenbleu/blekenbleu.MIDIio),  
a [working sender app](https://github.com/blekenbleu/vJoySDK) for **vJoy**,
 which [installs easily on Windows 10](../pedals/vJoy/),  
then adding parts of that sender app to the MIDIio plugin becomes a *fairly* obvious to-do.  

Before diving into the [vJoy sender app single (*but 828 line*) C# source
 file](https://github.com/blekenbleu/vJoySDK/blob/main/FeederDemoCS/Program.cs),  
I somewhat familiarized myself with its API by revising [the vJoy C# wrapper SDK document,
 converted to Markdown.](https://github.com/blekenbleu/vJoySDK/blob/main/FeederDemoCS/docs/README.md).  
Next step should be branching MIDIio before copying over that source file and pair of DLLs.  


### Background
Wanted (as well as MIDI): game controller output from SimHub, *which it implements via Arduino*  
DirectInput and XInput issues aside, vJoy keeps virtual game devices visible with no app running,  
which avoids having Assetto Corsa or other games getting confused by its devices disappearing and reappearing,  
e.g. when SimHub restarts plugins during game changes.  

* SimHub output to vJoy is wanted for 2-paddle clutch
* MIDI output is wanted to modulate ShakeIt effect volume for clutch and loaded wheel slips
* ... while, at the same time, *continuing to control* speed wind fans and (direct drive) harness tensioning  

<details>
<summary>click for doomed assumptions</summary>
<ol compact>
<li>Writing a SimHub plugin would be too hard, <i>disproved by <a href=../MIDI/plugin/>MIDIio</i></a>.  
<li><a href=https://www.howtogeek.com/792984/directinput-vs.-xinput-for-game-controllers-whats-the-difference>Differences between DirectInput and XInput</a> were unimportant.  
<li>SimHub Custom serial to <a href=../Arduino/ESPDuino>STM32/ESP32 Arduino</a> would be easier for <a href=../pedals/ESP8266>HID game controller emulation</a>.<br>
    <i>Unlike FTDI USB chips, CH340G on D1 UNO can <i>only</i> be
    <a href=https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/CustomSerialDeviceAccess>serial</a></i>.  
<li>According to <a href=http://janaxelson.com/hidpage.htm>Jan Axelson</a>, Microsoft supports HID devices via <b>DirectX</b><br>
    ... but HID support is NOT found in <a href=https://docs.microsoft.com/en-us/dotnet/api/index?view=netframework-4.7.2>.NET APIs</a><br>
    and <i>most Sim controller peripherals use classic DirectInput</i>.
<li><a href=https://github.com/ViGEm/ViGEm.NET>ViGEm</a> would be easier (better documented, more robust) than <a href=https://github.com/blekenbleu/vJoySDK>vJoy</a>.
<li>Microsoft's <a href=https://docs.microsoft.com/en-us/xamarin/graphics-games/monogame/input>MonoGame GamePad Reference</a>
 strongly implies that <a href=https://docs.microsoft.com/en-us/windows/uwp/gaming/input-for-games>Input for games</a>
 support may be only for <b>Xbox One</b> and <b>PS/4</b> Game Controllers and mainly via <b>UWP</b>.  
</ol>
</details>  


<details>
<summary>click for doomed approaches</summary>
<ol compact>
<li>Make other game controllers look (enough) like Xbox,  
while avoiding the hassle of releasing custom signed Windows drivers.
<ul compact><li>As of Windows 1809, all drivers are required to be a Universal Windows Driver
  <a href=https://docs.microsoft.com/en-us/windows-hardware/drivers/download-the-wdk>UWD</a>
  AKA (<i>by Intel</i>) "Modern Windows Drivers"  
    </ul>
<li>Convert <b>COM</b> device to <b>HID</b>?<ul compact>
  <li> Traditional __serial&lt;&gt;HID__ workaround was vJoy - no longer supported (<i>but it works!</i>)
  <li> <a href=../SerialLab>Serial-Lab</a> <i>fork already working with D1 UNO ESP8266</i>
  <li> <a href=../Arduino/VJoySerialFeeder>VJoySerialFeeder</a> <i>least obsolete COM->HID filter</i>
  <li> <a href=../Arduino/mi360>mi-360</a> <i>HID Xiaomi Gamepad -&gt; Xbox360 filter</i></ul>
<li><a href=https://github.com/ViGEm/ViGEm.NET>ViGEm.NET</a> provides a signed UWD "virtual bus" driver, <but not persistent device?</i><br>
  to which userland programs can filter unsupported devices 
</ul>
</ol>
<h4>workaround for workaround</h4><ul compact>
<li> <a href=https://github.com/Cleric-K/vJoySerialFeeder/tree/master/Arduino/Joystick>Arduino IBUS sketch</a> running on <a href=../pedals/ESP8266>ESP8266</a>
<li> <a href=https://github.com/blekenbleu/mi-360>mi-360</a> uses <a href=https://github.com/ViGEm/ViGEm.NET>ViGEm.NET</a>, which *is* supported.
     <ul compact>
    <li> <a href=https://en.wikipedia.org/wiki/C_Sharp_(programming_language)>C#</a> interface code for Xiaomi Gamepad
    </ul>
<li> Ultimately, derive a dedicated serial<>ViGEm filter from <a href=../Arduino/mi360>mi-360 fork</a>
     <ul compact>
    <li> presumably need to understand <a href=https://www.nuget.org/packages/HidLibrary/>HIDLibrary</a> &nbsp; on <a href=https://github.com/mikeobrien/HidLibrary>GitHub</a>
    </ul>
<li><a href=http://www.signal11.us/oss/hidapi/>HID API Library for Linux, Mac OS X, and Windows</a> &nbsp;
    <a href=http://www.signal11.us/oss/hidapi/hidapi/doxygen/html/group__API.html>Doxygen</a>
<li><a href=https://github.com/kmcnaught/vigem-example-dotnet>vigem-example-dotnet</a> - Using ViGem.NET SDK to control a (virtual) XBox controller from C#  
</ol>
</details>  

### Doomed efforts
#### [STM32 pedals](../pedals/STM32)
#### [ESP8266 pedals](../pedals/ESP8266) 
#### [WeMos D1 UNO R1 ESP8266](../Arduino/ESPDuino)
#### [mi-360 fork](https://github.com/blekenbleu/mi-360) - practice for hacking [ViGEm.NET](https://github.com/ViGEm/ViGEm.NET) into [VJoySerialFeeder](../Arduino/VJoySerialFeeder)  
