---
title: Use D1 UNO USB (serial) as HID game controller
---

#### Background
Wanted: D1 UNO as HID game controller.  
Unlike FTDI USB chips, CH340G on D1 UNO can *only* be serial.
* Traditional workaround was vJoy - no longer supported
* [VJoySerialFeeder](https://github.com/Cleric-K/vJoySerialFeeder) is a recent alternative.
  * [Docs](https://github.com/Cleric-K/vJoySerialFeeder/tree/master/Docs) lacks [installation](vJoySFinstall) instructions in [Quickstart](https://github.com/Cleric-K/vJoySerialFeeder/blob/master/Docs/Quickstart.md)
* "Feeder" because it depends on a virtual HID bus for visibility by games.
* As of Windows 1809, all drivers are required to be a Universal Windows Driver [UWD](https://docs.microsoft.com/en-us/windows-hardware/drivers/download-the-wdk)
AKA "Modern Windows Drivers"
* VJoySerialFeeder uses vJoy or vXbox; neither are UWD
  * [ViGEm](https://github.com/ViGEm) is UWD
  * [mi-360](https://github.com/dancol90/mi-360) uses [ViGEm.NET](https://github.com/ViGEm/ViGEm.NET)
    * C# interface code for ViGEm may work for VJoySerialFeeder...
