# convert myFIPS state,county,2018 population
# to state,county,2018 population,FIPS,ST,2019 population

#csv=/r/TEMP/time_series_covid19_confirmed_US.csv
#COVID_FOLDER=/c/Users/bleke/Documents/COVID-19

if [ -n $1 ] ; then
  NEWCSV=$1
else
  NEWCSV=newFIPS.csv
fi

if [ -z "$csv" ] ; then
  echo 'missing environmental variable $csv'
  exit 2
fi

if [ ! -r population_usafacts.csv ] ; then
  curl "https://usafactsstatic.blob.core.windows.net/public/data/covid-19/covid_county_population_usafacts.csv" > population_usafacts.csv
fi

cofacts()
{
  echo "$foo,$FIPS,$3,$4" >> $NEWCSV
}

# build output for a county of interest
there()
{
  FIPS=${5%.*}
  if [ -n "$FIPS" ] ; then
# Bash string field separator
    unset IFS
    usfacts=`grep ^${FIPS}, population_usafacts.csv`
    if [ -n "$usfacts" ] ; then
      IFS=,
      cofacts $usfacts
    else
      echo "$foo FIPS $FIPS not found"
    fi
  else
    echo "missing FIPS for $foo"
  fi
}

# extract FIPS for counties of interest
token()
{
  unset IFS
  hit=`grep "$2,$1" $csv`
  if [ -n "$hit" ] ; then
    IFS=,
    there $hit
  else
    echo "bad $csv for $2,$1"
    exit 2
  fi
}

# main loop over [some] counties of interest
# $COVID_FOLDER/myFIPS.csv lacks NYC boroughs...
i=0
unset IFS
echo -n '' > $NEWCSV
while read foo ; do
  IFS=,
  token $foo
# return
  unset IFS
done < $COVID_FOLDER/myFIPS.csv

