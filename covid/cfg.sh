#! /bin/bash
oops=''
here=`pwd`

if [ -z "$OFS" ] ; then
  OFS=$IFS
else
  echo "'\$OFS' =" "'$OFS'"
fi

try_folder()
{
  if [ -n "$HOMEPATH" ] ; then
    cd /c
    cd $HOMEPATH
    CHOME=`pwd`/Desktop
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
  else
    CHOME=$HOME/Desktop
  fi
}

if [ -z  "$COVID_FOLDER" ] ; then
  try_folder
fi

if [ -d "$COVID_FOLDER" ] ; then
  if [ -z "$MAGICK" ] ; then
    MAGICK=`which magick`
  fi
  if [ -n  "$MAGICK" ] ; then
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
echo "define \$$oops path in configure.sh"
