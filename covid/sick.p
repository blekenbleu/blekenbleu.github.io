csv = 'copop.csv'
set datafile separator ","
dates = system("head -1 ".csv." | tr ',' ' '")
unset border
set logscale y
set yrange [1:7000]
set style data boxes
set style fill solid 1.0 border -1
set linetype 1 lc rgb "red" lw 0 pt 1
set linetype 2 lc rgb "yellow" lw 0 pt 1
set linetype 3 lc rgb "red" lw 0 pt 1
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
f(a,b) = (a < b) ? pc(a) : 0
s(i,j) = column(c-i)-column(c-j)
set term wxt 0 enhanced size 1400,1200
# first 4 columns are NOT cases; need 20 columns (days) of history
day = word(dates,c)
set ylabel day.' active COVID-19 cases per 100K'
plot csv u (pc(s(0,20))) t 'days 0-20', \
 '' u (pc(s(60,80))) t '60-80 days ago', \
 '' u (f(s(0,20), s(60,80))):xticlabels(2) t ''
set term push
set output 'sick.png'
set term png size 1400,1200
replot
set term pop
replot
system("bash -c 'source sick.sh ".day."'")
