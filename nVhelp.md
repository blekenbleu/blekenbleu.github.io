
<h2 id="U0">VNA (Vector Network Analyzer)</h2>

 * distinguished from antenna analyzer by having two ports instead of one  
 * distinguished from scaler analyzer e.g. SWR (Standing Wave Ratio) bridge
   by sorting resistance vs reactance instead of lumped *magnitude*.  


nanoVNA principles of operation
-------------------------------
Largely as described in Michael Knitter DG5MK's YouTube video:  
[Hamradio 2018 FA-VA5 presentation-UK](https://www.youtube.com/watch?v=X8Z7veGV57o")

Instead of nanoVNA's `SA612` mixer
(also used by [EU1KY analyzer](https://bitbucket.org/kuchura/eu1ky_aa_v3/wiki/Home)),  
the [FA-VA5](https://www.sdr-kits.net/VA5-Antenna-Analyzer-Kit) uses `74LVC4066` analog switches.  
Analog switch ICs have better linearity, dynamic range and GHz bandwidths,<br>
but switching times > 1ns limit local oscillators to <code>200MHz</code> or so..  

<h4><a href="https://www.youtube.com/watch?v=mKi6s3WvBAM">beginners guide video</a></h4>
<em>thanks to Joe Smith</em>  

<h4><a href="https://www.youtube.com/watch?v=zw7Dp1nwvD8">nanoVNAsharp Windows software video</a></h4>
<em>thanks to IMSAI Guy</em>  

<h4><a href="https://www.youtube.com/watch?v=29yTVG8lg7s">2-port measurements video</a></h4>
<em>thanks to Volker Block</em>  

<h3>Physical attributes</h3>
<p>From the <a href="https://groups.io/g/nanovna-users/attachment/14/0/NanoVNA%20User%20Guide_20190527..pdf">manual</a>,
<sl compact>
<li>Measurement range:<br>
 <code>70dB (50kHz-300MHz), 50dB (300M-600MHz), 40dB (600M-900MHz)</code>
<li>Port SWR <code>< 1.1</code>
<li>Frequency error <code>< 0.5ppm</code>
</sl>
</p>
<br>
<em>thanks to Warren Allgyer</em>:
<br>
<img src="html/nanoSpectrum.gif">

Above `300MHz`, nanoVNA boosts `Si5351` output and uses its 3rd harmonic.  

*thanks to hugen@outlook.com:*  

The `Si5351` internal VCO (Voltage Controlled Oscillator) maximum  
operating frequency decreases with increasing temperature.  
*Fully enclosed cases, raising component temperatures, may be problematic.*  
The specified maximum is <code>900MHz</code> for a divide-by-4-frequency of <code>225MHz</code>.  
For `300MHz` output, VCOs are overclocked to <code>1200MHz</code>, which some **cannot**.  
If significant spike artifacts are noted (> `0dB`) at `300MHz` or `900MHz`,  
then [`800MHz` firmware is recommended](#F800).

USB connectors are Type C except for Micro-USB B on white gekkos.  
One LED (between USB and power switch) blinks @ 1/2Hz while charging,  
 then illuminates constantly;  
    - remaining on for 40 seconds after disconnecting USB or powering off,  
          *perhaps discharging capacitors?*  

Another LED, between power switch and multi-directional switch,  
    illuminates while nanoLED is powered;  
    - this may be vestigal from  nanoVNA prototypes lackng LCD displays.

### multi-directional switch

Pressing this launches menu or selects menu item;  
nudging left or right migrates among menu items or moves selected marker.

### nanoVNA Console Commands
  [PDF @ groups.io](https://groups.io/g/nanovna-users/files/NanoVNA%20Console%20Commands%208-6-19.pdf)

<h3 id="N4">nanoVNA Calibration Considerations</h3>

  [PDF @ groups.io](https://groups.io/g/nanovna-users/attachment/896/0/NanoVNA%20Calibration%20Considerations%20and%20Procedure%20FINAL.pdf)
<em>thanks to Larry Goga</em>

### Calibration for 4 track nanoVNA
*thanks to Alan Victor*

###### Some notes:  
A *second* 50 ohm termination and female-female SMA adapter
 are wanted for ISOLN and THRU calibration.  

Supplied and used are TWO matched cables, LOADS and one SMA adapter.  
Each NUMBERED step below represents your PRESS (SOFT KEY TOUCH).  

Turn on the VNA and note register 0 is ON.  
CONNECT MATCHED CABLES to `CH0` and `CH1`.  

<ol>
<li> DISPLAY
<li> TRACE 0
<li> SINGLE
<li> TRACE 1
<br>Now <code>S11</code> and <code>S22</code> both display ONLY as LOGMAG.<br>

<li> STIMULUS
<li> START 100KHz
<li> STOP 500MHz
<li> BACK
<li> CAL
<li>RESET
<li>CALIBRATE
<br>
<b>Note!</b> No softkeys (right side of touch screen) are highlighted.<br>
Place an OPEN on end of CH0 cable and this will be followed by a SHORT.<br>

<li>OPEN
<li>SHORT
<br>
Connect 50 ohm LOADs to ends of CH0 and CH1 cables.<br>

<li>LOAD
<li>ISOLN
<br>
Connect cables, replacing LOADs with female-female SMA adapter.<br>

<li>THRU
<li>DONE
<br>
Finally save to a desired register.<br>
</ol>

That's it. Check that the open, short and 50 ohm display properly.  
 **Note**, the cables are CONNECTED to CH0 and CH1  
 and the calibration is to the cables **ends**.
 The reference plane for insertion loss measure magnitude is in plane of the adapter.  
 However, the phase is subject to error and that needs addressed in another message.  

Also, with a thru cable connection between CH0 and CH1,   
`S21` should measure nearly `0dB`.


<h3 id="TSC">Touchscreen Calibration</h3>
<em> thanks to Larry Rothman</em>:
<p>
For best behavior, nanoVNA devices need touchscreen calibraton,<br>
which requires USB connection to your PC/MAC/Terminal.<br>
<ol compact><li>install <a href="https://www.st.com/en/development-tools/stsw-stm32102.html">STM USB drivers</a>, if required.
<li>connect the nanoVNA and determine which serial port has been assigned (e.g. COM5)
<li>use a serial terminal emulator such as TeraTerm to access the nanoVNA console.
<li>you may need to hit the ENTER key once or twice<br>
    to bring up its command shell prompt.
<li>at the command prompt, enter:  <code>touchcal</code>
<li>the nanoVNA should now display a calibration point at the upper-left corner of the display.<br>
<li>touch that corner - a new calibration point will appear at the lower right corner of the display.
<li>touch that corner - the screen is now calibrated - <b>BUT NOT SAVED</b><br>
</ol>
<dl compact><dt><b>touchcal</b>
<dd>- produces calibration touch points in the upper left and lower right corners<br>
     outputs: "first touch upper left, then lower right..."<br>
             "done"<br>
             "touch cal params: A B C D (upper left and lower right x-y co-ords)"</dd>
<br><dt><b>touchtest</b></dt><dd> - test touch accuracy - touch, hold and drag pointer</dd></dl>
<h4>Now, save this touchscreen calibration:</h4>
    At the command prompt, enter <code>saveconfig</code>
<ul compact><li><b>saveconfig</b> - saves current configuration - outputs "Config saved"</li></ul>
You can verify touch calibration using the menu boxes.<br>
<br>
<b>NOTE</b>: at this time, it is not known what else the saveconfig command saves besides touchscreen calibration.
</p>

<h2>Software and Firmware</h2>
<h3 id="F800">firmware mitigation for nanoVNA <code>300MHz, 600MHz</code> spikes</h3>
Some nanoVNAs fail when overclocked to <code>300MHz</code> by standard firmware;<br>
<a href="https://groups.io/g/nanovna-users/topic/defective_nanovna/32747641?p=,,,20,0,0,0::recentpostdate%2Fsticky,,,20,2,0,32747641"><b>here</b></a> is a description of reflashing those problematic devices.
<br>
<a href="html/software.htm"><em>Here</em></a> is more software information.
<br>
<br>

<h3>technical</h3>
<h4 id="DSP">FFT "quadrature mixing", Hilbert transform and filtering DSP</h4>

... after quadrature sampling by Si5351 and SA612A.  
Lacking access to the famous July, 2015 QEX magazine article by DG5MK..
- Richard Lyons' <a href="https://dspguru.com/files/QuadSignals.pdf">Quadrature Signals:  Complex, Not Complicated</a> is approachable theory referenced by DG5MK.
- <a href="https://www.youtube.com/watch?v=X8Z7veGV57o">Hamradio 2018 FA-VA5 presentation-UK</a> video
- DG5MK's <a href="https://www.dg5mk.de/media/Labview%20SDR/FFT_SSB_MOD/English%20Version/FFT%20SSB%20mod%20demod%20DG5MK%20English%20V03.pdf">FFB SSB Modulation</a> PDF avoids digging into mathematics.
- DG5MK's <a href="https://www.dg5mk.de/media/Labview%20SDR/SDR%20Kurzbeitrag/Labview_SDR_DG5MK_English_08_2012.pdf">Labview-based SDR</a> provides software insights.
- DD4WH's detailed DSP description in <a href="https://github.com/df8oe/UHSDR/wiki/How-does-your-UHSDR-software-DSP-work">UHSDR wiki</a>, based on Teensy SDR
- UHSDR <a href="https://github.com/df8oe/UHSDR/wiki/IQ---correction-and-mirror-frequencies">IQ correction and mirror frequencies</a> @ GitHub
- relevant <a href="https://github.com/DD4WH/Teensy-ConvolutionSDR">Teensy-ConvolutionSDR</a> (Si5351, ARM) <a href="https://github.com/DD4WH/Teensy-ConvolutionSDR/blob/master/Teensy_Convolution_SDR.ino">Arduino source code</a>

#### Other technical 
 - [Here](html/bridge.htm) is nanoVNA bridge analysis

<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<h3 id="U1">Linked from DISPLAY</h3>
<p>
In addition to selecting values to be displayed,<br>
 CHANNEL submenu selects whether signals are from CH0 (TX) or CH1 (RX).
</p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<h4 id="U1L1">linked from TRACE</h4>
<p>Up to 4 simultaneous color-coded data can be plotted.<br>
  Some firmware instead supports only 2.<br>
OFF disables <em>this</em> trace;  SINGLE disables <em>all other</em> traces...?</p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<h3 id="U131">linked from SCALE/DIV</h3>
watch this space
<h3 id="U133">linked from NUM KEYS</h3>
<em>thanks to Mike Brown</em>

Numerical input seems a bit flaky,  
although it works better for e.g. CW frequency than position.  
Touchscreen typically wants [calibration](#TSC).    
Antenna analyser firmware has a larger font;
touchscreen [mis]calibration is more critical for other firmware..<br>

Numeric entry displays no decimal point, but one may be implied. eg:
<ul compact><li>When in logmag reference adjust mode,<br>
 digits appear to represent steps of <code>0.01dB</code>,<br>
 so a change of +1000 moves the reference <code>10dB</code> higher.
<li>In CW Freq setting, digits seem to represent steps of <code>100Hz.</code></ul>

<dl><dt>
Rocker switch input
<dd>
Tapping on a digit makes it adjustable;
<br>step it up or down using the multi-directional switch.<br>
 If you hold the multi-directional switch in,
<br> that digit is <b>'highlighted'</b> and its background goes black.<br>
 The multi-directional switch can shift highlighting to another digit.<br>
 Press in again, highlighting disappears and the digit becomes adjustable.<br>
 Press in <em>again briefly</em> to store that numerical setting.<br>
 <b>NB</b> waiting a few seconds between rocker switch presses seemingly helps.

<dt>Touchscreen input
<dd>
Tapping far right of numbers brings up a numeric keyboard.<br>
This keyboard may be operated either by touchscreen taps<br>
or by multi-directional switch movements.<br>
   With 2-trace <code>900MHz</code> antenna analyser firmware,<br>
    multi-directional switch movements seem buggy.<br>
    In reference position adjust mode,<br>
    the 'enter' button doesn't seem to do anything<br>
    but if it is held the keyboard clears from the screen.<br>
    The keyboard works fine when setting e.g. CW Freq.<br>
    Frequencies may be entered as GHz, MHz or kHz;<br>
    just enter the digits then tap G, M or k to enter the set value.<br>
    (eg to set <code>800MHz</code> you can enter 0.8G, 800M or 800000k.)

</dl>

<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<h3 id="U132">linked from REFERENCE POSITION</h3>
<em>thanks to Mike Brown:</em><br>
<dl>
<dt>for e.g. LOGMAG</dt>
<dd>Entering 1-8 (0001 to 0008)<br>
 places the REFERENCE line 1 to 8 grid spaces from the BOTTOM.<br>
  With default setting 7 000, changing it to 8 000 moves the trace reference<br>
 (shown by a small marker at left of screen) up one grid space, to screen TOP.</dd>
<br>
<dt>for e.g SWR 1:1</dt>
<dd>trace is below screen bottom.<br>
  Changing reference position to 180 raises trace to screen bottom</dd>
</dl>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<h3 id="U134">linked from ELECTRICAL DELAY</h3>
<p>Calibration data can be modified by electrical delay in picoseconds.<br>
Hugen customized short and accurate calibrations kits. </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<h2 id="U2">linked from MARKER</h2>
<p>While displayed markers can in theory be manipulated by hand or stylus,<br>
touch calibration inaccuracy typically frustrates that.<br>
Better to use the multi-directional switch..<br>
.. or try the <a href="https://groups.io/g/nanovna-users/wiki/Touch-Screen-Calibration-Procedure">touchscreen calibration</a> procedure.
<dl compact>
<dt>SELECT MARKER</dt>
<dd>select (by push) any of MARKER 1 - 4<br>
selecting that same marker again toggles it off.<br>
Sliding the multi-directional switch moves the selected marker.<br>
A selected marker can change START, STOP or CENTER of sweeps.<br>
SPAN changes sweeps when 2 markers are active.</dd></dl></p>

<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<h3 id="U36">link from PAUSE SWEEP</h3>
This button freezes data collection.<br>
<br><em>thanks to Gary O'Neil</em>:
<p>
The nanoVNA must remain powered on to successfully capture data via USB.<br>
<ol compact>
<li> With the data you wish to "save" and port to your workstation,<br>
 navigate to STIMULUS > PAUSE SWEEP.<br>
Data at the top of the screen will freeze, confirming sweep is paused.

<li> Take care to not inadvertently alter the current state...<br>
 either by the toggle switch or touchscreen.<br>
 Remove the NanoVNA from the DUT,<br>
 observe that the desired data remains on the display,<br>
 transport it to your workstation, hotplug the device into a USB port,<br>
 then tap on the display a couple of times.
<br> This appears to initiate handshaking<br>
  and establishes a connection with the workstation.

<li> Launch the nanoVNAsharp app and connect.<br>
App display should match that on the nanoVNA.
<li>Use nanoVNAsharp facilities to save the data.
 
</ol>

<br>To be clear, data is <em>not</em> otherwise saved within the NanoVNA.<br>
Once PAUSE is cancelled or the nanoVNA is power cycled,<br>
data is flushed and replaced.</p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
<p>     <br>     <br>     <br>     <br>     <br>     <br>     <br>     <br> </p>
