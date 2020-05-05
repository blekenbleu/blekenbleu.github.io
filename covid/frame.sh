# generate a single png e.g. for covid animated gif
## Bash string field separator
OFS=$IFS
IFS=,

csv=$COVID_FOLDER/time_series_covid19_confirmed_US.csv

count()
{
  argc=$#
}

args()
{
  echo $argc items
# echo "header = " $*
# column  indices and date labels
  now=${!argc}
  let a3=$argc-3
  now3=${!a3}
  let a6=$argc-6
  now6=${!a6}
  let a20=$argc-20
  now20=${!a20}
}

if [ -n "$1" ] ; then
  argc=$1
else
  count `head -1 $csv`
fi
args `head -1 $csv`

# rounded values per 100K
rnd100k()
{
  let v=100000*$1
  let r=$pop/2
  let v=$v+$r
  let v=$v/$pop
  echo $v
}

sequence()
{
  let seq=10000*$3
  let i=100*$1
  let seq=${seq}+${i}
  let seq=${seq}+$2
  echo "frame${seq}.png"
}

# check out csv header line
echo "$csv using dates" ${now} ${now3} $now6 ${now20}
IFS=/
frame=`sequence ${now}`
IFS=,

# build output for a county of interest
# gnuplot first plots $a0, then overlays newer with older
now()
{
# approx most recent 20 days are contagious
  let a26=${!a6}-${!a20}
# trend:  increase days 4-6
  let a23=${!a3}-${!a20}
  if [ $a23 -lt $a26 ] ; then
    echo "wtf $loc $now3 $a23 < $a26"
    a23=$a26
  fi
# increase days 1-3
  let a20=${!argc}-${!a20}
  if [ $a20 -lt $a23 ] ; then
    echo "wtf $loc $now $a20 < $a23"
    a20=$a23
  fi
 
# per 100k 
  a26=`rnd100k $a26`
  a23=`rnd100k $a23`
  a20=`rnd100k $a20`
  a0=`rnd100k ${!argc}` 
  echo "$i	$a0	$a26	$a23	$a20	$loc" >> $COVID_FOLDER/data.txt
}

echo "#index	$now	$now6	$now3	$now20	Location" > $COVID_FOLDER/data.txt

# extract latest stats for counties of interest
token()
{
  hit=`grep "$2,$1" $csv`
  if [ "$2" == "$1" ] ; then
    loc="\"$1\""
  else
    loc="\"$2,$1\""
  fi
  if [ -n "$hit" ] ; then
    pop=$3
    now $hit
    let i=$i+1
  else
    echo "bad $csv for $loc"
    exit 2
  fi
}

cd $COVID_FOLDER
# main loop over counties of interest
i=0
while read foo ; do
  token $foo
done < myFIPS.csv

echo $GNUPLOT -e "title='$now COVID-19 cases per 100K'" plot_covid.p
$GNUPLOT -e "title='$now COVID-19 cases per 100K'" plot_covid.p
$MAGICK convert -rotate 90 covid.png $frame
