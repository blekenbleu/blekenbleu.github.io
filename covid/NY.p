a=180458
b=a
d=8627
c = d
new_cases(x)=(b=a,a=x,b-x)
died(y)=(d=c,c=y,d-y)
set xlabel 'days passed'
set ylabel 'daily'
set title 'NY new cases, deaths'
plot "NY.txt" using (new_cases($1)) pt 7 ps 2, "NY.txt" using (10*died($2))
