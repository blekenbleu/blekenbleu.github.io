# generate a single png e.g. for covid animated gif

if [ -n "$csv" ] ; then
  if [ -r $csv ] ; then
    header=`head -1 $csv`
  else
    ls -l $csv
    return 3
  fi
else
  echo 'missing environmental variable $csv'
  return 2
fi

count()
{
  a0=$#
  echo $a0 header items in $csv
}

args()
{
# echo "header = $header"
# column  indices and date labels
  now=${!a0}
  let a3=$a0-3
  now3=${!a3}
  let a6=$a0-6
  now6=${!a6}
  let a20=$a0-20
  now20=${!a20}
# two extra commas in data rows
  let a0=2+$a0
  let a3=2+$a3
  let a6=2+$a6
  let a20=2+$a20
}

## Bash string field separator
IFS=,
if [ -n "$1" ] ; then
  a0=$1
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
echo "using dates '$now' '$now3' '$now6' '$now20'"
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
county()
{
# approx most recent 20 days are contagious
  let d20=${!a20}
  if [ $d20 -lt 0 ] ; then
    echo "$loc $now20 $d20 < 0"
    d20=0
  fi
# trend:  day 6
  let d6=${!a6}
  if [ $d6 -lt $d20 ] ; then
    echo "$loc $now6 $d6 < $now20 $d20"
    d6=$d20
  fi
# trend:  day 3
  let d3=${!a3}
  if [ $d3 -lt $d6 ] ; then
    echo "$loc $now3 $d3 < $now6 $d6"
    d3=$d6
  fi
# day 0
  d0=${!a0}
  if [ $d0 -lt $d3 ] ; then
    echo "$loc $now $d0 < $now3 $d3"
    d0=$d3
  fi
# do not plot identical newer over older
  if [ $d3 -eq -$d6 ] ; then
    d3=$d0
  fi
  if [ $d6 -eq -$d20 ] ; then
    d6=$d3
  fi
 
# echo "a0=$a0"
# echo "$i	$d0	$d3	$d6	$d20	$loc	$Pop"
# per 100k 
  d20=`rnd100k $d20`
  d6=`rnd100k $d6`
  d3=`rnd100k $d3`
  d0=`rnd100k $d0` 
# echo "$i	$d0	$d3	$d6	$d20	$loc	$Pop"
  echo "$i	$d0	$d3	$d6	$d20	$loc	$Pop" >> data.txt
}

echo "#index	$now	$now3	$now6	$now20	Location	Population" > $CTMP/data.txt

# extract latest stats for counties of interest
token()
{
  # remove potential leading blank[s] from numeric population string
  Pop=$3
  loc="\"$2,$4\""
  line=`grep "$2,$1" $csv`
  if [ -n "$line" ] ; then
    county $line
    let i=$i+1
  else
    echo "bad $csv for $loc"
    unset IFS
    exit 2
  fi
}

cd $CTMP
# main loop over counties of interest
i=0
unset IFS
while read foo ; do
  IFS=,
  token $foo
  unset IFS
done < $COVID_FOLDER/myFIPS.csv

title="title='$now COVID-19 cases per 100K'"
echo $GNUPLOT -e "$title" $here/diff_covid.p
$GNUPLOT -e "$title" $here/diff_covid.p | $MAGICK convert png:- -rotate 90 $frame
cd $here
