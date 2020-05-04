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
# extract date labels
  now=${!argc}
  let j=$argc-3
  now3=${!j}
  let k=$argc-6
  now6=${!k}
  let l=$argc-20
  now20=${!l}
  first=`cat first.txt`
  if [ -z "$first" ] ; then
    first=75
  fi
  first=${!first}
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

# build output for a county of interest
# gnuplot first plots $rec, then overlays newer with older
now()
{
# approx most recent 20 days are active
  let act=${!k}-${!l}
# increase days 4-6
  let m=${!j}-${!l}
  if [ $m -lt $act ] ; then
    echo "wtf $loc $now3 $m < $act"
    m=$act
  fi
# percent day 1-3
  let n=${!argc}-${!l}
  if [ $n -lt $m ] ; then
    echo "wtf $loc $now $n < $m"
    n=$m
  fi
 
# per 100k 
  act=`rnd100k $act`
  m=`rnd100k $m`
  n=`rnd100k $n`
# over 20 days: recovered?
  rec=`rnd100k ${!argc}` 
  echo "$i	$rec	$act	$m	$n	$loc" >> $COVID_FOLDER/data.txt
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
echo "set ylabel '$now COVID-19 cases per 100K'" > $COVID_FOLDER/title.p
IFS=/
frame=`sequence ${now}`
IFS=,

echo "#index	$now20	$now	$now3	$now6	Location" > $COVID_FOLDER/data.txt

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
    echo $loc
  fi
}

cd $COVID_FOLDER
# main loop over counties of interest
i=0
while read foo ; do
  token $foo
done < myFIPS.csv

echo $GNUPLOT plot_covid.p
$GNUPLOT plot_covid.p
$MAGICK convert -rotate 90 covid.png $frame
