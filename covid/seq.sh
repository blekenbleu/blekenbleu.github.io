sequence()
{
  let seq=$1%100
  let seq=10000*$seq
  let s=100*$2
  let seq=${seq}+${s}
# let n=${2#0*}
  let seq=${seq}+${3}
  echo "frame${seq}.png"
}

if [ -n "$1" ] ; then
  IFS=-
  png=`sequence $1`
  unset IFS
  if [ -n "$2" ] ; then
    magick convert ${2}stats.png -rotate 90 ${2}${png}
  else
    magick convert stats.png -rotate 90 $png
  fi
else
  echo "expected $0 mm/dd/yy"
fi
