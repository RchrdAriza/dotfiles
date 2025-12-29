#!/bin/bash

# 1. Detectar la carpeta de imágenes del sistema (funciona en cualquier idioma)
BASE_DIR=$(xdg-user-dir PICTURES)

# 2. Definir subcarpeta personalizada
SAVE_DIR="$BASE_DIR/Capturas"

# 3. Verificar si el directorio existe; si no, crearlo
if [ ! -d "$SAVE_DIR" ]; then
    mkdir -p "$SAVE_DIR"
fi

# 4. Generar nombre de archivo con fecha y hora
FILENAME="$SAVE_DIR/screenshot_$(date +'%Y%m%d_%H%M%S').png"

# 5. Ejecutar la captura
# -g "$(slurp)" permite elegir área
# Si el usuario cancela (Esc), slurp devuelve error y el script se detiene
if AREA=$(slurp); then
    grim -g "$AREA" "$FILENAME"
    
    # 6. Copiar al portapapeles y notificar
    wl-copy < "$FILENAME"
    notify-send "Captura realizada" "Guardada en: $SAVE_DIR" -i camera-photo
else
    exit 0 # El usuario canceló la selección
fi