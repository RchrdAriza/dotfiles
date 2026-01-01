#!/bin/bash

ID=1739

player="spotify"
cache="$HOME/.cache/spotify-cover.jpg"
mkdir -p "$HOME/.cache"

playerctl --player="$player" --follow metadata \
  --format '{{ artist }}|{{ title }}|{{ mpris:artUrl }}' |
  while IFS='|' read -r artist title arturl; do
    [[ -z "$arturl" ]] && continue

    curl -sL "$arturl" -o "$cache"

    notify-send \
      -i "$cache" \
      -r "$ID" \
      -u low \
      " $artist" \
      "$title"
  done
