#!/bin/bash

ID=6666

BRIGHTNESS_LEVEL=$(brightnessctl | awk -F '[()]' '/Current brightness/ {print $2}')

# echo $BRIGHTNESS_LEVEL

notify-send \
  -a "brightness-level" \
  -r "$ID" \
  "Brillo" \
  "$BRIGHTNESS_LEVEL"
