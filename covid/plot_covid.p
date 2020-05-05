unset border
set term wxt 0 enhanced size 1750,650
set style data boxes
set style fill solid 1.0 border -1
set linetype 1 lc rgb "gray" lw 0 pt 1
set linetype 2 lc rgb "red" lw 0 pt 1
set linetype 3 lc rgb "orange" lw 0 pt 1
set linetype 4 lc rgb "yellow" lw 0 pt 1
set xtics border rotate 90 offset 0,graph 0 nomirror
set logscale y
unset grid
unset y2tics
set grid ytics back
set yrange [10:5000]
set ylabel title
plot 'data.txt' using ($2) t 'immune'
replot 'data.txt' using ($5) t 'new'
replot 'data.txt' using ($4) t 'previous'
replot 'data.txt' using 3:xticlabels(6) t 'active'
unset output
set term png size 1400,800
replot
