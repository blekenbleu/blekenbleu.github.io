@echo off
: generate a difference image (third argument) from (first 2 argument) images
echo magick %1 %2 -compose Mathematics -define compose:args="0,-1,1,.5" -composite %3
magick %1 %2 -compose Mathematics -define compose:args="0,-1,1,.5" -composite %3
