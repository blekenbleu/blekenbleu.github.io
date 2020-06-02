# arrays and conditional values
# indices are base 1; S[0] does not exist
set xlabel 'days'
set xrange[1:300]
# S for susceptible percent of population
array S[300]
set ylabel 'percent of population'
S[1] = 100
# new infections
array N[300]
N[1] = 0
# currently infected
array C[300]
C[1] = 1
# recovered/removed
array R[300]
R[1] = 0
# assumptions: days infectious
t = 20
# constant contagion risk spread over infectious period
c = .015/t
# discrete approximation
do for [x=2:300] {
  S[x] = S[1]-R[x-1]-C[x-1]
# new infections
  N[x] = C[x-1]*S[x-1]*c
# recoveries
  r = (x>t?N[x-t]:0)
  R[x] = R[x-1]+r
# currently infected
  C[x] = N[x]+C[x-1]-r
}
plot S w l, R w l, C w l
