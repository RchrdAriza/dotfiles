#!/usr/bin/env bash

# Simple battery notifier using upower + notify-send
# Converted from Python to Bash.

LOW=20
CRIT=10
INTERVAL=60

get_battery_level() {
    local device
    device=$(upower -e 2>/dev/null | grep -E 'BAT|battery' | head -n1)
    if [[ -z "$device" ]]; then
        return 1
    fi

    local perc
    perc=$(upower -i "$device" 2>/dev/null | grep -i 'percentage' | awk '{print $2}' | tr -d '%')
    if [[ -z "$perc" ]]; then
        return 1
    fi

    # Ensure it's an integer
    if ! [[ "$perc" =~ ^[0-9]+$ ]]; then
        return 1
    fi

    echo "$perc"
    return 0
}

send_notification() {
    local urgency="$1"
    local title="$2"
    local msg="$3"
    notify-send -u "$urgency" "$title" "$msg"
}

if [[ "$1" == "--once" ]]; then
    battery_level=$(get_battery_level) || exit 1
    echo "$battery_level"
    exit 0
fi

while true; do
    battery_level=$(get_battery_level)
    if [[ -z "$battery_level" ]]; then
        sleep "$INTERVAL"
        continue
    fi

    if (( battery_level <= CRIT )); then
        send_notification critical "Batería crítica" "Queda ${battery_level}% de batería."
    elif (( battery_level <= LOW )); then
        send_notification normal "Batería baja" "Queda ${battery_level}% de batería."
    fi

    sleep "$INTERVAL"
done
