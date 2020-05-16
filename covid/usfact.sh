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

fco=covid_confirmed_usafacts.csv
if [ ! -r $CTMP/$fco ] ; then
  curl "https://usafactsstatic.blob.core.windows.net/public/data/covid-19/$fco" > $CTMP/$fco
else
  ls -l $CTMP/$fco
fi
fco=$CTMP/$fco

count()
{
  a0=$#
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

# rounded values per 100K
rnd100k()
{
  let v=100000*$1
  let r=$Pop/2
  let v=$v+$r
  let v=$v/$Pop
  echo $v
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
  d20=`rnd100k $d20`
  d6=`rnd100k $d6`
  d3=`rnd100k $d3`
  d0=`rnd100k $d0`
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
cd $CTMP
# generate copop.csv for (eventual) use by gnuplot
(echo -n '#index,location,population,';head -1 $fco | cut -d ',' -f 58-$a0) > copop.csv
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
title="title='$now COVID-19 cases per 100K'"
echo $GNUPLOT -e "$title" $here/diff_covid.p
$GNUPLOT -e "$title" $here/diff_covid.p | $MAGICK convert png:- -rotate 90 diff.png
cd $here
