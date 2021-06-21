---
HID game controllers
---

[mi-360 fork](https://github.com/blekenbleu/mi-360) - practice for hacking [ViGEm.NET](https://github.com/ViGEm/ViGEm.NET) into [VJoySerialFeeder](https://github.com/Cleric-K/vJoySerialFeeder)  

#### Background
Wanted: [D1 UNO](../Arduino/ESPDuino) as [HID game controller](../pedals/ESP8266).  
Unlike FTDI USB chips, CH340G on D1 UNO can *only* be
 [serial](https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/CustomSerialDeviceAccess).  
According to [Jan Axelson](http://janaxelson.com/hidpage.htm), Microsoft supports HID devices via **DirectX**  
... but HID support is NOT found in [.NET APIs](https://docs.microsoft.com/en-us/dotnet/api/index?view=netframework-4.7.2)  

Microsoft's [MonoGame GamePad Reference](https://docs.microsoft.com/en-us/xamarin/graphics-games/monogame/input)
 strongly implies that [Input for games](https://docs.microsoft.com/en-us/windows/uwp/gaming/input-for-games)
 support may be only for **Xbox One** and **PS/4** Game Controllers and mainly via **UWP**.  

The trick is to make other game controllers look (enough) like Xbox,  
while avoiding the hassle of releasing custom signed Windows drivers.
* As of Windows 1809, all drivers are required to be a Universal Windows Driver
  [UWD](https://docs.microsoft.com/en-us/windows-hardware/drivers/download-the-wdk)
  AKA (*by Intel*) "Modern Windows Drivers"  
- Convert **COM** device to **HID**?
  - Traditional __serial<>HID__ workaround was vJoy - no longer supported  
  - [Serial-Lab](Windows/SerialLab) *fork already working with D1 UNO ESP8266*
  - [VJoySerialFeeder](Arduino/VJoySerialFeeder) *least obsolete COM->HID filter*
  - [mi-360](Arduino/mi360) *HID Xiaomi Gamepad -> Xbox360 filter*  
* [ViGEm.NET](https://github.com/ViGEm/ViGEm.NET) provides a signed UWD "virtual bus" driver  
  to which userland programs can filter unsupported devices 

#### workaround for workaround
* [Arduino IBUS sketch](https://github.com/Cleric-K/vJoySerialFeeder/tree/master/Arduino/Joystick) running on [ESP8266](../pedals/ESP8266)
* [mi-360](https://github.com/blekenbleu/mi-360) uses [ViGEm.NET](https://github.com/ViGEm/ViGEm.NET), which *is* supported.
    * [C#](https://en.wikipedia.org/wiki/C_Sharp_(programming_language)) interface code for Xiaomi Gamepad
* Ultimately, derive a dedicated serial<>ViGEm filter from [mi-360 fork](../Arduino/mi360)  

    * presumably need to understand [HIDLibrary](https://www.nuget.org/packages/HidLibrary/) [GitHub](https://github.com/mikeobrien/HidLibrary)

[HIDAPI](http://www.signal11.us/oss/hidapi/) API ilbrary for Linux, Mac OS X, and Windows
* [Doxygen](http://www.signal11.us/oss/hidapi/hidapi/doxygen/html/group__API.html)
* [GitHub](https://github.com/signal11/hidapi)

#### [STM32 pedals](../pedals/STM32)
#### [ESP8266 pedals](../pedals/ESP8266) 
#### [WeMos D1 UNO R1 ESP8266](../Arduino/ESPDuino)
