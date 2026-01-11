#!/bin/bash

OUTPUT=$(brightnessctl)

PERCENT=$(echo "$OUTPUT" | grep -oP 'Current brightness:.*\(\K\d+(?=%\))')

if [ -z "$PERCENT" ]; then
    PERCENT=$(echo "$OUTPUT" | sed -n 's/.*(\([0-9]\+\)%).*/\1/p')
fi

# notify-send -r "$ID" -h "int:value:$PERCENT" "Brillo" "$PERCENT"
notify-send \
  -h string:x-canonical-private-synchronous:vol_notify \
  -h int:value:"$PERCENT" \
  "BRILLO" \
  "$PERCENT"