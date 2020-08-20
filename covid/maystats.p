# compare most recent 20 days to May
csv = 'copop.csv'
set datafile separator ","
dates = system("head -1 ".csv." | tr ',' ' '")
unset border
set logscale y
set yrange [1:7000]
set style data boxes
set style fill solid 1.0 border -1
set linetype 1 lc rgb "gray" lw 0 pt 1
set linetype 2 lc rgb "yellow" lw 0 pt 1
set linetype 3 lc rgb "#AA0000" lw 0 pt 1
set linetype 4 lc rgb "yellow" lw 0 pt 1
set linetype 5 lc rgb "#FF4444" lw 0 pt 1
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
g(a,b) = (a > b) ? pc(b) : 0
s(i) = column(c)-column(c-i)
m(i) = column(90)-column(90-i)
set term wxt 0 enhanced size 1600,900
# first 4 columns are NOT cases; need 20 columns (days) of history
day = word(dates,c)
may = word(dates,90)
set ylabel day.' vs May COVID-19 cases per 100K'
#
plot csv u (pc(column(c))) t 'total cases', \
 '' u (f(m(20),s(20))) t 'May 1-20', \
 '' u (f(s(20),m(20))) t 'increasing days 1-20', \
 '' u (g(s(20),m(20))) t '', \
 '' u (g(m(20),s(20))):xticlabels(2) t 'decreasing days 1-20'
set term push
set output 'maystats.png'
set term png size 1400,900
replot
system("bash -c 'source seq.sh ".day." may'")
set term pop
