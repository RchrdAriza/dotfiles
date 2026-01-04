#!/bin/bash

# Umbrales
LOW=20
CRIT=10

while true; do
  # Obtiene porcentaje con upower, solo números
  battery_level=$(upower -i "$(upower -e | grep BAT)" | grep -E "percentage" | grep -oP '\d+')

  # Si no pudo leer, espera y sigue
  [ -z "$battery_level" ] && sleep 60 && continue

  if [ "$battery_level" -le "$CRIT" ]; then
    notify-send -u critical "Batería crítica" "Queda ${battery_level}% de batería."
  elif [ "$battery_level" -le "$LOW" ]; then
    notify-send -u normal "Batería baja" "Queda ${battery_level}% de batería."
  fi

  # Comprobar cada 60 segundos
  sleep 60
done
