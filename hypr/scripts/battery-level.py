#!/usr/bin/env python3

import subprocess
import re
import time

# Umbrales
LOW = 20
CRIT = 10

def get_battery_level():
    """Obtiene el porcentaje de batería usando upower."""
    try:
        # Obtener el dispositivo de batería
        result = subprocess.run(
            ["upower", "-e"],
            capture_output=True,
            text=True,
            check=True
        )
        
        bat_device = None
        for line in result.stdout.splitlines():
            if "BAT" in line:
                bat_device = line.strip()
                break
        
        if not bat_device:
            return None
        
        # Obtener información de la batería
        result = subprocess.run(
            ["upower", "-i", bat_device],
            capture_output=True,
            text=True,
            check=True
        )
        
        # Extraer porcentaje
        for line in result.stdout.splitlines():
            if "percentage" in line:
                match = re.search(r'(\d+)', line)
                if match:
                    return int(match.group(1))
        
        return None
    except subprocess.CalledProcessError:
        return None

def send_notification(urgency: str, title: str, message: str):
    """Envía una notificación usando notify-send."""
    subprocess.run(
        ["notify-send", "-u", urgency, title, message],
        check=False
    )

def main():
    while True:
        battery_level = get_battery_level()
        
        if battery_level is None:
            time.sleep(60)
            continue
        
        if battery_level <= CRIT:
            send_notification(
                "critical",
                "Batería crítica",
                f"Queda {battery_level}% de batería."
            )
        elif battery_level <= LOW:
            send_notification(
                "normal",
                "Batería baja",
                f"Queda {battery_level}% de batería."
            )
        
        # Comprobar cada 60 segundos
        time.sleep(60)

if __name__ == "__main__":
    main()
