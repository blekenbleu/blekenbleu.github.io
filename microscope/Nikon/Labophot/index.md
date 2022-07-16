*[back](../)*
<a href="https://www.gixen.com/index.php" name="9e092736783d0da1dfd8413d57d10faf
" target="_blank" >
<img align=right src="https://www.gixen.com/images/gixenlink.gif" border="0" alt="Auction Sniper" title="Auction Sniper">
</a>  
## Nikon Labophot Microscope

- [Brochure](http://earth2geologists.net/Microscopes/documents/Nikon_Optiphot_Labophot_Pol_brochure.pdf)  
- [Instruction manual](https://neurophysics.ucsd.edu/Manuals/Nikon/Nikon%20Biological%20Microscope%20Labophot%20Y-R%20Stand%20Instructions.pdf) - Bell Labs  
- [Instruction manual](https://www.manualslib.com/manual/937966/Nikon-Labophot.html) - manualslib.com
- [Labophot @ lavinia.as.arizona.edu](https://lavinia.as.arizona.edu/~mtuell/)  
- [Repair Manual @ lavinia.as.arizona.edu](https://lavinia.as.arizona.edu/~mtuell/pdf/L0180%20OPTIPHOT%20LABOPHOT%20BODY.pdf)  
- [ Brooke Clarke 2014 ](https://www.prc68.com/I/Labophot.html)  

eBay item number: [155061301918](https://www.ebay.com/itm/155061301918)
Condition: For parts or not working  
Manufacturer: Nikon  

Nikon 221403 Labophot Microscope Parts Only (S1084)
"No power."


| ![](s-1600.jpg) | ![](s-1603.jpg) |
| --------------- | --------------- |
| ![](s-1602.jpg) | ![](s-1601.jpg) |

## Received 

### Condenser

## LED conversion
Common (grounded) emitter bipolar transistors are approximately constant current sources.  
Labophot and Optiphot use transistors to modulate halogen lamp power  
and variable resistors between base and collector for control.  
Labophot potentiometers are about 1K Ohms, connected between collector and base,  
with halogen lamp between collector and nominal +7 VDC,  
to accommodate incandescent lamp behavior:
* As filament heats, resistance increases.  
* This lowers voltage drop from collector to emitter  
  and also current thru resistor to base, reducing power to lamps.  
![ Labophot halogen illumination circuit characterization](plot.png)  
Current was measured using a CA-60 AC/DC clamp.  

LEDs behave differently:  
* Selected LED should be bright enough with 1A that 1K is minimum resistance wanted from supply to base;  
  need to determine a minimum current for useful brightness to establish wanted potentiometer range.
* Above some voltage threshold, current increases with temperature.  
* this effectively decreased resistance increases transistor collector-emitter voltage  
  and current thru collector-base resistance, provoking current runaway.  
* For the transistor to behave as a more nearly constant current source,  
  variable resistance should move to between base and voltage supply for LED and transistor collector,  
  instead of between base and collector.  
* That voltage source droops slightly with increased current, providing some stabilizing negative feedback.  
  Adding a resistor between transistor emitter and ground would increase negative feedback but waste power.  
* A resistor between base and ground would also increase negative feedback,  
  as base-to-emitter voltage increases with current.  
* A resistor in series with forward-biased diode (a nearly constant voltage drop) from base to ground  
  would provide stronger current regulation.  
