sequence()
{
  let seq=10000*$3
  let s=100*$1
  let seq=${seq}+${s}
  let n=${2#0*}
  let seq=${seq}+${n}
  echo "frame${seq}.png"
}

if [ -n "$1" ] ; then
  IFS=-
  png=`sequence $1`
  unset IFS
  magick convert stats.png -rotate 90 $png
else
  echo "expected $0 mm/dd/yy"
fi
