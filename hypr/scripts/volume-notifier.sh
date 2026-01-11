#!/bin/bash

ID=9868

VOLUME_LEVEL=$(wpctl get-volume @DEFAULT_AUDIO_SINK@ | awk '{print int($2 * 100)}')

# echo $VOLUME_LEVEL
notify-send \
  -a "volume-level" \
  -h string:x-canonical-private-synchronous:vol_notify \
  -h int:value:"$VOLUME_LEVEL" \
  -h boolean:transient:true \
  "Volume" \
  "$VOLUME_LEVEL"