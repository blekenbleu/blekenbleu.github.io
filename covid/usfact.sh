#! /bin/bash 
# generate a two frame covid animated gif using USA fact csv
source cfg.sh
if [ -n "$oops" ] ; then
  echo animate.sh:  missing $oops
  return 1
fi

if [ ! -r factFIPS.csv ] ; then
  echo source newFIPS.sh factFIPS.csv
  return 2
fi

if [ -n "$1" ] ; then
  a0=$1
fi

fco=covid_confirmed_usafacts.csv
url="https://usafactsstatic.blob.core.windows.net/public/data/covid-19/$fco"
if [ ! -r $CTMP/$fco ] ; then
  curl $url > $CTMP/$fco
else
  ls -l $CTMP/$fco
fi
fco=$CTMP/$fco

count()
{
  if [ -z "$a0" ] ; then
    a0=$#
  fi
  echo $a0 items in $fco
  let a3=$a0-3
  let a6=$a0-6
  let a20=$a0-20
  now="${!a0}"
  now3="${!a3}"
  now6="${!a6}"
  now20="${!a20}"
  echo "#index	$now	$now3	$now6	$now20	Location	Population" > $CTMP/data.txt
}

county()
{
# approx most recent 20 days are contagious
  d20=${!a20}
  if [ $a0 -gt $# ] ; then
    echo "$loc: d20='$d20'; a20='$a20'; \$96=$96; \$#=$#; FIPS='$FIPS'; \$line=
$line"
    return
  fi
  d6=${!a6}
  d3=${!a3}
  d0=${!a0}
# do not plot identical newer over older
  if [ $d3 -eq -$d6 ] ; then
    d3=$d0
  fi
  if [ $d6 -eq -$d20 ] ; then
    d6=$d3
  fi
  echo "$i	$d0	$d3	$d6	$d20	$loc	$Pop" >> data.txt
}

# grab and process county line from $fco based on FIPS ($4)
grab ()
{
  Pop=$6
  loc="\"$2 $5\""
  FIPS=$4
  line=`grep ^$FIPS, $fco`
# echo "line=$line"
  county $line
}

header=`head -1 $fco`
## Bash string field separator
IFS=,
count $header
unset IFS
i=0
# to be invoked from stats.p
cp seq.sh $CTMP/
cd $CTMP
# generate copop.csv for (eventual) use by gnuplot
ipl='index,location,population,'
(echo -n $ipl;head -1 $fco | cut -d ',' -f 58-$a0) > copop.csv
while read foo ; do
  IFS=,
# echo "foo=$foo"
  grab $foo
  unset IFS
  (echo -n "$i,$loc,$Pop,";echo $line | cut -d ',' -f 58-$a0) >> copop.csv
# less copop.csv
# cd $here
# return
  let i=1+$i
done < $here/factFIPS.csv

# comparing today with 3 days ago
echo '$GNUPLOT $here/diff_covid.p'
$GNUPLOT $here/diff_covid.p | $MAGICK convert png:- -rotate 90 diff.png
$GNUPLOT $here/stats.p
cd $here
