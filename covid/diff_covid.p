unset border
set term wxt 0 enhanced size 1400,1200
set style data boxes
set style fill solid 1.0 border -1
set linetype 1 lc rgb "gray" lw 0 pt 1
set linetype 2 lc rgb "yellow" lw 0 pt 1
set linetype 3 lc rgb "orange" lw 0 pt 1
set linetype 4 lc rgb "#FF4444" lw 0 pt 1
set linetype 5 lc rgb "#AA0000" lw 0 pt 1
set xtics border rotate 90 offset 0,graph 0 nomirror
set logscale y
unset grid
unset y2tics
set ytics nomirror
set grid ytics front
dates = system("head -1 data.txt")
set ylabel word(dates,2).' COVID-19 cases per 100K'
set yrange [1:5000]
pc(n) = (100000*n)/column(7)
f(a,b) = (a > b) ? pc(a) : 0
plot 'data.txt' using (pc($2)) t '> 20 days'
replot 'data.txt' using (pc($2-$5)) t 'days 7-20'
replot 'data.txt' using (pc($2-$4)) t 'days 4-6'
# differently color-code increasing 3 day cases
replot 'data.txt' using (pc($2-$3)) t 'days 1-3'
replot 'data.txt' using (f($2-$3,$3-$4)):xticlabels(6) t 'increasing days 1-3'
unset output
set term png size 1400,1200
replot
