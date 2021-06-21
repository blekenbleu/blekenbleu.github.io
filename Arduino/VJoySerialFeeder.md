
---   
HID gamepad by vJoySerialFeeder
---

#### Background
Wanted: D1 UNO as [HID game controller](../Windows/HID).  
Unlike FTDI USB chips, CH340G on D1 UNO can *only* be serial.
* Traditional workaround was vJoy - no longer supported
#### alternatives
* [VJoySerialFeeder](https://github.com/Cleric-K/vJoySerialFeeder) is a recent alternative.
  * [Docs](https://github.com/Cleric-K/vJoySerialFeeder/tree/master/Docs) lacks [installation](vJoySFinstall) instructions in [Quickstart](https://github.com/Cleric-K/vJoySerialFeeder/blob/master/Docs/Quickstart.md)
* "Feeder" because it depends on a virtual HID bus for visibility by games.
* VJoySerialFeeder uses vJoy or vXbox; neither are UWD
  * [ViGEm](https://github.com/ViGEm) is UWD
  * [mi-360](https://github.com/dancol90/mi-360) uses [ViGEm.NET](https://github.com/ViGEm/ViGEm.NET)
    * C# interface code for ViGEm may work for VJoySerialFeeder...
    * Ultimately, I may use [mi-360](mi360) to derive a simpler dedicated serial<>ViGEm filter
  * meanwhile, concerns about C# and .NET foibles and incompatilities among
    * Visual Studio 2017 Community (thankfully the latest version) for [mi-360](mi360).
    * SharpDevelop 4.4 (for VJoySerialFeeder) and
      * SharpDevelop seems nearly dead; current version is 5.1

## C# code
  Among other things, MainForm.cs selects serial port and protocol  
  and, along with MainFormWorker.cs, defines `class MainForm`
* MainFormWorker.cs:  `backgroundWorker` in `MainForm` is main program loop  

#### IBus C# code
* __SerialProtocols/IbusReader.cs__ `ReadChannels()`, IbusSetupForm.cs
* vJoySerialFeederLinux.csproj, vJoySerialFeeder.csproj
* MainForm.cs

#### IBus references
* [IBus half-duplex control and telemetry](https://github.com/betaflight/betaflight/wiki/Single-wire-FlySky-(IBus)-telemetry)
* [iBus Arduino library](https://github.com/aanon4/FlySkyIBus)
* [FlySky FS-i6 IBus](https://basejunction.wordpress.com/2015/08/23/en-flysky-i6-14-channels-part1/)
* [IBus C library](https://github.com/33d/ibus-library)

#### serial C# code
* SerialProtocols/SerialReader.cs `class SerialReader` and  
  `class SerialBuffer` (which uses `SerialPort`)  
  `SerialBuffer.Init` creates `Buffer`
* MainForm.cs `SerialPort.GetPortNames()`  
* PortSetupForm.cs
  
  
* linux vs Windows via VJoyCollectionBase.cs


#### virtual bus C# code
  * Windows: VirtualJoysticks/VJoyCollectionWindows.cs  
    selects among available vJoy vs vXbox vs None (wants extension to ViGEm)
    * mi-360 close to vXBox..  
      VJoyVXBox.cs appears to have reverse-engineered vXboxInterface.dll entry points
    * From mi-360, hack MiGamepad.cs here as VJoyViGEm.cs

#### Web browser for monitoring / debugging
*  [WebSocket Interaction](https://github.com/Cleric-K/vJoySerialFeeder/blob/master/Docs/WebSocket.md)
