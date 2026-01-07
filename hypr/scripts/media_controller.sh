#!/bin/bash

STATE_FILE="$HOME/.cache/last_playerctl"
mkdir -p "$(dirname "$STATE_FILE")"

# Obtener players con estado
players=$(playerctl -a metadata --format '{{status}} {{playerName}}')

# Buscar el que esté reproduciendo
playing_player=$(echo "$players" | awk '$1=="Playing" {print $2; exit}')

if [ -n "$playing_player" ]; then
  # Guardar el último player activo
  echo "$playing_player" >"$STATE_FILE"
  playerctl -p "$playing_player" play-pause
else
  # Reanudar el último player guardado
  if [ -f "$STATE_FILE" ]; then
    last_player=$(cat "$STATE_FILE")
    playerctl -p "$last_player" play-pause
  fi
fi
