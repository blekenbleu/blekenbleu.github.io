sequence()
{
  let seq=10000*$3
  let s=100*$1
  let seq=${seq}+${s}
# eliminate illegal octal (leading 0)
  n=${2#0*}
  let seq=${seq}+${n}
  echo "frame${seq}.png"
}

rename()
{
  a=${1%*.png}
  b=${a#*stats}
  IFS=-
  echo `sequence $b`
  unset IFS
}

for i in stats*.png ; do
  a=`rename $i`
  echo magick convert $i -rotate 90 $a
  magick convert $i -rotate 90 $a
  echo rm $i
  rm $i
done
