source cfg.sh
if [ -n "$oops" ] ; then
  echo covid.sh:  missing $oops
  return 1
fi

if [ ! -r $COVID_FOLDER/myFIPS.csv ] ; then
  echo $COVID_FOLDER/myFIPS.csv required with no header, line contents:
  echo state,county,population
  echo "eg:${OFS}California,Contra Costa,1150215"
  echo extract e.g. from https://www2.census.gov/programs-surveys/popest/datasets/2010-2019/counties/totals/co-est2019-alldata.csv
  return 2
fi

## Bash string field separator
IFS=,

if [ -n "$1" ] ; then
  csv=$1
else
  tcsv=time_series_covid19_confirmed_US.csv
  curl "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/$tcsv" > $csv
fi
echo $csv `wc $csv`

source frame.sh ''
if [ -n "$OFS" ] ; then
  IFS=$OFS
fi
#cp $frame $CHOME/covid.png
