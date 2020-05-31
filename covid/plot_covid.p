unset border
set term wxt 0 enhanced size 1400,800
set style data boxes
set style fill solid 1.0 border -1
set linetype 1 lc rgb "gray" lw 0 pt 1
set linetype 2 lc rgb "yellow" lw 0 pt 1
set linetype 3 lc rgb "orange" lw 0 pt 1
set linetype 4 lc rgb "red" lw 0 pt 1
set xtics border rotate 90 offset 0,graph 0 nomirror
set logscale y
unset grid
unset y2tics
set ytics nomirror
set grid ytics front
set ylabel title
set yrange [1:7000]
plot 'data.txt' using ($2) t '> 20 days'
replot 'data.txt' using ($2-$5) t '6-20 days'
replot 'data.txt' using ($2-$4) t '3-6 days'
replot 'data.txt' using ($2-$3):xticlabels(6) t '1-3 days'
unset output
set term png size 1400,800
replot
