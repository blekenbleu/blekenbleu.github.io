#! /bin/bash 
# generate a single frame for covid animated gif
source cfg.sh
if [ -n "$oops" ] ; then
  echo animate.sh:  missing $oops
  return 1
fi

if [ ! -r $csv ] ; then
  source covid.sh
fi

sequence()
{
  let seq=10000*$3
  let i=100*$1
  let seq=${seq}+${i}
  let seq=${seq}+$2
  echo "$COVID_FOLDER/frame${seq}.png"
}  

count()
{
  last=$#
  echo $last items
  first=`cat $COVID_FOLDER/first.txt`
  if [ -z "$first" ] ; then
    first=75
    echo $first>$COVID_FOLDER/first.txt
  fi
  while [ $first -le $last ] ; do
    now="${!first}"
    IFS=/
    frame=`sequence ${now}`
    IFS=$OFS
    if [ ! -r $frame ] ; then
      echo "frame.sh $first"
      source frame.sh $first
    fi
    let first=1+$first
  done
}

header=`head -1 $csv`
## Bash string field separator
IFS=,
count $header

if [ $frame -nt anicovopt.gif ] ; then
  echo $MAGICK 'convert -delay 50 frame*.png -loop 1 -layers optimize anicovopt.gif'
  $MAGICK convert -delay 50 $COVID_FOLDER/frame*.png -loop 1 -layers optimize anicovopt.gif
# optional optimization https://eternallybored.org/misc/gifsicle/
  if [ -n "$GIFSICLE" ] ; then
    $GIFSICLE anicovopt.gif
  fi
  touch anicovopt.gif
else
  ls -lt $frame anicovopt.gif
fi
