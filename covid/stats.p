csv = 'copop.csv'
set datafile separator ","
dates = system("head -1 ".csv." | tr ',' ' '")
unset border
set logscale y
set yrange [1:5000]
set term wxt 0 enhanced size 1400,800
set style data boxes
set style fill solid 1.0 border -1
set linetype 1 lc rgb "gray" lw 0 pt 1
set linetype 2 lc rgb "yellow" lw 0 pt 1
set linetype 3 lc rgb "orange" lw 0 pt 1
set linetype 4 lc rgb "red" lw 0 pt 1
set xtics border rotate 90 offset 0,graph 0 nomirror 
unset grid
unset y2tics
set ytics nomirror
set grid ytics front
stats csv skip 1 nooutput
c = STATS_columns
pc(n) = 100000*n/column(3)
now = word(dates,c)
set ylabel now.' COVID-19 cases per 100K'
set key autotitle columnhead
plot csv u (pc(column(c))) t '> 20 days', \
 '' u (pc(column(c)-column(c-20))) t 'days 7-20', \
 '' u (pc(column(c)-column(c-6))) t 'days 4-6', \
 '' u (pc(column(c)-column(c-3))):xticlabels(2) t 'days 1-3'
set output 'stats.png'
set term png size 1400,800
replot 
print "bash -c 'source seq.sh ".now."'"
system("bash -c 'source seq.sh ".now."'")
