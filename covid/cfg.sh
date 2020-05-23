#! /bin/bash
oops=''
here=`pwd`

try_folder()
{
  if [ -n "$HOMEPATH" ] ; then
    cd /c
    cd $HOMEPATH
    CHOME=`pwd`/Desktop
  else
    CHOME=$HOME/Desktop
    cd $HOME
  fi
  cd Documents
  if [ -e COVID-19 ] ; then
     if [ -d COVID-19 ] ; then
       COVID_FOLDER=`pwd`/COVID-19
     else
       echo set COVID_FOLDER to a subfolder of `pwd`
     fi
  else
    mkdir COVID-19
    COVID_FOLDER=`pwd`/COVID-19
  fi
  cd $here
}

if [ -z  "$COVID_FOLDER" ] ; then
  try_folder
fi

if [ -n "$RAMDISK" ] ; then
  if [ ! -d $RAMDISK ] ; then
    ls -l  $RAMDISK
    CTMP=$COVID_FOLDER
  else
    CTMP=$RAMDISK
  fi
else
  CTMP=$COVID_FOLDER
fi
csv=$CTMP/time_series_covid19_confirmed_US.csv

if [ -d "$COVID_FOLDER" ] ; then
  if [ -z "$MAGICK" ] ; then
    MAGICK=`which magick`
  fi
  if [ -n  "`$MAGICK convert`" ] ; then
    if [ -z "$GNUPLOT" ] ; then
      GNUPLOT=`which gnuplot`
    fi
    if [ -n "$GNUPLOT" ] ; then
      return 0
    else
      oops=GNUPLOT
    fi
  else
    oops=MAGICK
  fi
else
  oops=COVID_FOLDER
fi
echo "define \$$oops path in cfg.sh"
