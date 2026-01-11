#!/bin/bash

ID=1478

CAPS_STATE=$(hyprctl devices -j | jq -r '.keyboards[]? | select(.main == true) | .capsLock' 2>/dev/null)
STATE_FILE="/tmp/caps-lock-state"

PREV_STATE=$(cat "$STATE_FILE" 2>/dev/null)

echo "$CAPS_STATE" >"$STATE_FILE"

# Solo notificar si cambió el estado
if [[ "$CAPS_STATE" != "$PREV_STATE" ]]; then
  if [[ "$CAPS_STATE" == "true" ]]; then
    notify-send \
      -a "caps-lock" \
      -h string:x-canonical-private-synchronous:vol_notify \
      -h boolean:transient:true \
      "Caps Lock" \
      "Activado"
  else
    notify-send \
      -a "caps-lock" \
      -h string:x-canonical-private-synchronous:vol_notify \
      -h boolean:transient:true \
      "Caps Lock" \
      "Desactivado"
  fi
fi

if [[ "$CAPS_STATE" == "true" ]]; then
  echo '{"text": "󰪛", "class": "caps-on", "tooltip": "Caps Lock activo"}'
else
  echo '{"text": "", "class": "caps-off", "tooltip": "Caps Lock inactivo"}'
fi
