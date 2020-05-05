#! /bin/bash 
# generate a single frame for covid animated gif
source cfg.sh
if [ -n "$oops" ] ; then
  echo animate.sh:  missing $oops
  exit 1
else
  cd $COVID_FOLDER
fi

## Bash string field separator
IFS=,

csv=time_series_covid19_confirmed_US.csv

sequence()
{
  let seq=10000*$3
  let i=100*$1
  let seq=${seq}+${i}
  let seq=${seq}+$2
  echo "frame${seq}.png"
}  

count()
{
  argc=$#
  echo $argc items
  first=`cat first.txt`
  if [ -z "$first" ] ; then
    first=75
  fi
  while [ $first -le $argc ] ; do
    now="${!first}"
    IFS=/
    frame=`sequence ${now}`
    IFS=,
    if [ ! -r $frame ] ; then
      echo "sh frame.sh $first"
      sh frame.sh $first
    fi
    let first=1+$first
  done
}

count `head -1 $csv`

if [ $frame -nt anicovopt.gif ] ; then
  echo $MAGICK 'convert -delay 100 frame*.png -loop 1 -layers optimize anicovopt.gif'
  $MAGICK convert -delay 100 frame*.png -loop 1 -layers optimize anicovopt.gif
  touch anicovopt.gif
else
  ls -lt $frame anicovopt.gif
fi
