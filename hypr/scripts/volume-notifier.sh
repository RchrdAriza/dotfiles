#!/bin/bash

ID=9868

VOLUME_LEVEL=$(wpctl get-volume @DEFAULT_AUDIO_SINK@ | awk '{print int($2 * 100)}')

# echo $VOLUME_LEVEL
notify-send \
  -a "volume-level" \
  -r "$ID" \
  "Volume" \
  -h int:value:"$VOLUME_LEVEL" \
  "$VOLUME_LEVEL"
