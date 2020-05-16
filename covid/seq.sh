sequence()
{
  let seq=10000*$3
  let s=100*$1
  let seq=${seq}+${s}
  let seq=${seq}+$2
  echo "frame${seq}.png"
}

if [ -n "$1" ] ; then
  IFS=/
  png=`sequence $1`
  unset IFS
  echo -n magick convert stats.png -rotate 90 $png
  magick convert stats.png -rotate 90 $png
  echo " ... done"
else
  echo "expected $0 mm/dd/yy"
fi
