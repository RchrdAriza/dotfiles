#!/bin/bash

CAPS_STATE=$(hyprctl devices -j | jq -r '.keyboards[]? | select(.main == true) | .capsLock' 2>/dev/null)

if [[ "$CAPS_STATE" == "true" ]]; then
    echo '{"text": "󰪛", "class": "caps-on", "tooltip": "Caps Lock activo"}'
else
    echo '{"text": "", "class": "caps-off", "tooltip": "Caps Lock inactivo"}'
fi