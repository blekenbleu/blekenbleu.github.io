source cfg.sh
if [ -n "$oops" ] ; then
  echo covid.sh:  missing $oops
  exit 1
fi

if [ ! -r $COVID_FOLDER/myFIPS.csv ] ; then
  echo $COVID_FOLDER/myFIPS.csv required with no header, line contents:
  echo state,county,population
  echo eg California,Contra Costa,1150215
  extract e.g. from https://www2.census.gov/programs-surveys/popest/datasets/2010-2019/counties/totals/co-est2019-alldata.csv
  exit 2
fi

## Bash string field separator
OFS=$IFS
IFS=,

if [ -n "$1" ] ; then
  csv=$1
else
  csv=time_series_covid19_confirmed_US.csv
  curl "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/$csv" > $COVID_FOLDER/$csv
  csv=$COVID_FOLDER/$csv
  echo $csv `wc $csv`
fi

source frame.sh ''
rm covid.png
cp $frame $CHOME/covid.png