csv = 'copop.csv'
set datafile separator ","
dates = system("head -1 ".csv." | tr ',' ' '")
unset border
set logscale y
set yrange [1:10000]
set style data boxes
set style fill solid 1.0 border -1
set linetype 1 lc rgb "gray" lw 0 pt 1
set linetype 2 lc rgb "yellow" lw 0 pt 1
set linetype 3 lc rgb "orange" lw 0 pt 1
set linetype 4 lc rgb "#FF4444" lw 0 pt 1
set linetype 5 lc rgb "#AA0000" lw 0 pt 1
set xtics border rotate 90 offset 0,graph 0 nomirror
unset grid
unset y2tics
set ytics nomirror add(3,30,300,3000)
set grid ytics front
# how many columns in csv?
stats csv skip 1 nooutput
c = STATS_columns
# do not plot the first row
set key autotitle columnhead
# column(3) is population
pc(n) = (100000*n)/column(3)
f(a,b) = (a > b) ? pc(a) : 0
g(a,b,d) = (a > b && a > d) ? pc(a) : 0
s(i,j) = column(c-i)-column(c-j)
set term wxt 0 enhanced size 1600,900
# first 4 columns are NOT cases; need 20 columns (days) of history
day = word(dates,c)
set ylabel day.' COVID-19 cases per 100K'
# don't bother plotting stats0.png
# plot csv u (pc(column(c))) t '> 20 days', \
#  '' u (pc(column(c)-column(c-20))) t 'days 7-20', \
#  '' u (pc(column(c)-column(c-6))) t 'days 4-6', \
#  '' u (pc(column(c)-column(c-3))) t 'days 1-3', \
#  '' u (f(column(c)-column(c-3), column(c-3)-column(c-6))):xticlabels(2) t 'increasing days 1-3'
# set term push
# set output 'stats0.png'
# set term png size 1600,900
# replot
# set term pop
#
# don't darken red if less than a week prior
plot csv u (pc(column(c))) t '> 20 days', \
 '' u (pc(s(0,20))) t 'days 7-20', \
 '' u (pc(s(0,6))) t 'days 4-6', \
 '' u (pc(s(0,3))) t 'days 1-3', \
 '' u (g(s(0,3), s(3,6), s(7,10))):xticlabels(2) t 'increasing days 1-3'
set output 'stats.png'
set term png size 1600,923
replot
system("bash -c 'source seq.sh ".day."'")
