#!/usr/bin/env python3
import subprocess
from pathlib import Path

player = "spotify"
ID = 9868
cache = Path.home() / ".cache" / "spotify-cover.jpg"
cache.parent.mkdir(parents=True, exist_ok=True)

cmd = [
    "playerctl",
    f"--player={player}",
    "--follow",
    "metadata",
    "--format",
    "{{ artist }}|{{ title }}|{{ mpris:artUrl }}"
]

process = subprocess.Popen(
    cmd,
    stdout=subprocess.PIPE,
    text=True
)

for line in process.stdout:
    line = line.strip()
    if not line:
        continue

    try:
        artist, title, arturl = line.split("|", 2)
    except ValueError:
        continue

    if not arturl:
        continue

    # Descargar portada
    subprocess.run([
        "curl",
        "-sL",
        arturl,
        "-o",
        str(cache)
    ])

    # Notificación
    subprocess.run([
        "notify-send",
        "-i", str(cache),
        "-r", str(ID),
        "-u", "low",
        f" {artist}",
        title
    ])
