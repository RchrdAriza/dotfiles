# 🔧 Richard's Dotfiles

Bienvenido a mi repositorio de configuraciones personales (dotfiles). Aquí encontrarás mis configuraciones para **Arch Linux**, utilizando principalmente **Hyprland** como gestor de ventanas y **KDE Plasma** como entorno de escritorio alternativo, junto con diversas herramientas para mejorar la productividad y la estética.

## 🖼️ Vistazo General

*(Aquí puedes agregar capturas de pantalla de tu escritorio)*
<!-- ![Desktop](ruta/a/screenshot.png) -->

## 🧩 Componentes Principales

Estas son las herramientas principales que conforman mi entorno:

*   **Sistema Operativo**: Arch Linux (gestionado con `yay`)
*   **Gestor de Ventanas**: [Hyprland](https://hyprland.org/)
*   **Entorno de Escritorio**: KDE Plasma
*   **Barra de Estado & Widgets**: 
    *   [Waybar](https://github.com/Alexays/Waybar)
    *   [AGS](https://github.com/Aylur/ags) (Aylur's GTK Shell)
    *   [SwayNC](https://github.com/ErikReider/SwayNotificationCenter) (Centro de notificaciones)
*   **Terminal**: [Kitty](https://sw.kovidgoyal.net/kitty/)
*   **Editor de Texto**: [Neovim](https://neovim.io/) (Basado en [LazyVim](https://www.lazyvim.org/))
*   **Launcher**: [Rofi](https://github.com/davatorium/rofi)
*   **Shell**: Zsh
*   **Información del sistema**: Fastfetch, Htop
*   **Gestión de Archivos**: Ranger, Dolphin

## 📂 Estructura del Repositorio

Aquí tienes una descripción breve de los directorios más importantes:

| Directorio | Descripción |
|---|---|
| `hypr/` | Configuración de Hyprland (binds, monitores, autostart, etc.). |
| `nvim/` | Configuración de Neovim (LazyVim, plugins, LSP). |
| `kitty/` | Configuración del emulador de terminal Kitty. |
| `waybar/` | Configuración de la barra de estado Waybar. |
| `ags/` | Configuración de widgets avanzados con TypeScript/JS. |
| `rofi/` | Temas y configuración del lanzador de aplicaciones. |
| `swaync/` | Configuración del centro de notificaciones. |
| `fastfetch/`| Personalización de la herramienta de información del sistema. |
| `cava/` | Visualizador de audio. |

## 🚀 Instalación

> **Nota:** Se recomienda hacer una copia de seguridad de tus configuraciones actuales antes de instalar.

### Requisitos

Asegúrate de tener instalados los paquetes base y `git`.

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/dotfiles.git ~/dotfiles
cd ~/dotfiles
```

### Aplicar configuraciones

Puedes utilizar [GNU Stow](https://www.gnu.org/software/stow/) para crear enlaces simbólicos fácilmente:

```bash
# Ejemplo para instalar configuración de nvim
stow nvim

# O copiar manualmente (no recomendado)
cp -r nvim ~/.config/
```

## 🛠️ Dependencias Comunes

Algunos paquetes que probablemente necesites:

```bash
# Arch Linux (pacman / yay)
yay -S hyprland kitty neovim rofi-wayland waybar swaync-git \
       ttf-jetbrains-mono-nerd fastfetch htop ranger \
       zsh starship
```

## ⌨️ Atajos de Teclado (Highlights)

*(Revisar `hypr/binds.conf` para la lista completa)*

*   `Super + Q`: Terminal (Kitty)
*   `Super + E`: Gestor de archivos
*   `Super + Space`: Launcher (Rofi)
*   `Super + C`: Cerrar ventana

---
*Personalizado por Richard*