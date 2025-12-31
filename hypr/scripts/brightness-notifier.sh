#!/bin/bash

ID=6666

BRIGHTNESS_LEVEL=$(brightnessctl | awk -F '[()]' '/Current brightness/ {print $2}')

# echo $BRIGHTNESS_LEVEL

notify-send \
  -a "brightness-level" \
  -r "$ID" \
  -h int:value:"$BRIGHTNESS_LEVEL" \
  "Brillo" \
  "$BRIGHTNESS_LEVEL"
