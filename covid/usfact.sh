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
url="https://usafactsstatic.blob.core.windows.net/public/data/covid-19/$fco"
if [ ! -r $CTMP/$fco ] ; then
  curl $url > $CTMP/$fco
  a0=
else
  ls -l $CTMP/$fco
fi
fco=$CTMP/$fco

if [ -n "$1" ] ; then
  a0=$1
fi

count()
{
  if [ -z "$a0" ] ; then
    a0=$#
  fi
  echo $# items in $fco
}

# grab and process county line from $fco based on FIPS ($4)
grab ()
{
  Pop=$6
  loc="\"$2 $5\""
  FIPS=$4
  line=`grep ^$FIPS, $fco`
  if [ -z "$line" ] ; then
    echo $0 fail for $loc FIPS $4 from $fco
    return
  fi
}
# dates suitable for filenames
header=`head -1 $fco | tr '/' '-'`
## Bash string field separator
IFS=,
count $header
unset IFS
# to be invoked from stats.p
cp seq.sh $CTMP/
cd $CTMP
# generate copop.csv for gnuplot
dates=`head -1 $fco | cut -d ',' -f 38-$a0 | tr '/' '-'`
dates=${dates//-1-/-01-}
dates=${dates//-2-/-02-}
dates=${dates//-3-/-03-}
dates=${dates//-4-/-04-}
dates=${dates//-5-/-05-}
dates=${dates//-6-/-06-}
dates=${dates//-7-/-07-}
dates=${dates//-8-/-08-}
dates=${dates//-9-/-09-}
(echo -n 'index,location,population,';echo $dates) > copop.csv
i=0
while read foo ; do
  IFS=,
  grab $foo
  unset IFS
  (echo -n "$i,$loc,$Pop,";echo $line | cut -d ',' -f 38-$a0) >> copop.csv
  let i=1+$i
done < $here/factFIPS.csv

# comparing today with 3 days ago
echo '$GNUPLOT $here/stats.p'
$GNUPLOT $here/stats.p
ls frame*.png
cd $here
