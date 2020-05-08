# generate a single png e.g. for covid animated gif

csv=$COVID_FOLDER/time_series_covid19_confirmed_US.csv
header=`head -1 $csv`
# where to write/read data.txt
if [ -n "$RAMDISK" ] ; then
  CTMP=$RAMDISK
else
  CTMP=$COVID_FOLDER
fi

count()
{
  argc=$#
}

args()
{
  echo $argc items
# echo "header = $header"
# column  indices and date labels
  now=${!argc}
  let a3=$argc-3
  now3=${!a3}
  let a6=$argc-6
  now6=${!a6}
  let a20=$argc-20
  now20=${!a20}
}

## Bash string field separator
IFS=,
if [ -n "$1" ] ; then
  argc=$1
else
  count $header
fi
args $header

sequence()
{
  let seq=10000*$3
  let s=100*$1
  let seq=${seq}+${s}
  let seq=${seq}+$2
  echo "$COVID_FOLDER/frame${seq}.png"
}

# check out csv header line
echo "using dates" ${now} ${now3} $now6 ${now20}
IFS=/
frame=`sequence ${now}`
IFS=,

# rounded values per 100K
rnd100k()
{
  let v=100000*$1
  let r=$Pop/2
  let v=$v+$r
  let v=$v/$Pop
  echo $v
}

# build output for a county of interest
# gnuplot first plots $a0, then overlays newer with older
now()
{
# approx most recent 20 days are contagious
  let a26=${!a6}-${!a20}
  if [ $a26 -lt 0 ] ; then
    echo "wtf $loc $now6 $a6 < $now20 $a20"
    a26=0
  fi
# trend:  increase days 4-6
  let a23=${!a3}-${!a20}
  if [ $a23 -lt $a26 ] ; then
    echo "wtf $loc $now3 $a23 < $now26 $a26"
    a23=$a26
  fi
# increase days 1-3
  let a21=${!argc}-${!a20}
  if [ $a21 -lt $a23 ] ; then
    echo "wtf $loc $now $a21 < $now3 $a23"
    a21=$a23
  fi
 
# per 100k 
  a26=`rnd100k $a26`
  a23=`rnd100k $a23`
  a21=`rnd100k $a21`
  a0=`rnd100k ${!argc}` 
  echo "$i	$a0	$a26	$a23	$a21	$loc" >> data.txt
}

echo "#index	$now	$now6	$now3	$now20	Location" > $CTMP/data.txt

# extract latest stats for counties of interest
token()
{
  # remove potential leading blank[s] from numeric population string
  Pop=$3
  hit=`grep "$2,$1" $csv`
  if [ "$2" == "$1" ] ; then
    loc="\"$1\""
  else
    loc="\"$2,$1\""
  fi
  if [ -n "$hit" ] ; then
    now $hit
    let i=$i+1
  else
    echo "bad $csv for $loc"
    IFS=$OFS
    exit 2
  fi
}

cd $CTMP
# main loop over counties of interest
i=0
IFS=$OFS
while read foo ; do
  IFS=,
  token $foo
  IFS=$OFS
done < $COVID_FOLDER/myFIPS.csv

title="title='$now COVID-19 cases per 100K'"
echo $GNUPLOT -e "$title" $here/plot_covid.p
$GNUPLOT -e "$title" $here/plot_covid.p | $MAGICK convert png:- -rotate 90 $frame
cd $here
