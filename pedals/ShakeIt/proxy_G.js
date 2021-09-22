// Front left: right turn
return - $prop('AccelerationSway') * 5

// Front right: deceleration
return $prop('AccelerationSurge') * 5

// Rear left: left turn
return $prop('AccelerationSway') * 5

// Rear right: acceleration
return -$prop('AccelerationSurge') * 5
