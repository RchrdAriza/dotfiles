# fastfetch (macOS)

Versión para macOS de `../fastfetch`: muestra un póster de película distinto
en cada terminal (kitty), sacado de TMDB según los directores de
`directors.txt`, más alguna recomendación "sorpresa" (✦) y los favoritos de
`logo/`.

## Instalación

```fish
cp -R config.jsonc poster.py directors.txt logo ~/.config/fastfetch/
cp fish/fastfetch.fish ~/.config/fish/functions/
# API key gratuita de https://www.themoviedb.org/settings/api
echo 'TU_CLAVE' > ~/.config/fastfetch/tmdb_key; chmod 600 ~/.config/fastfetch/tmdb_key
```

Requiere kitty, `curl`, `python3` y `sips` (incluido en macOS).

## Cómo funciona

- `fish/fastfetch.fish` envuelve el comando `fastfetch`: elige un póster al
  azar entre los descargados (`~/.cache/fastfetch-posters/`) y los de `logo/`,
  y en segundo plano descarga otro con `poster.py` para la próxima vez.
- `poster.py` guarda como mucho 40 pósters y cachea las filmografías 30 días.
  Los ajustes (`SURPRISE_CHANCE`, `MIN_VOTES`, …) están al principio.
- Favoritos: un `.png` en `logo/` y, opcional, un `.txt` con el mismo nombre
  para el título que aparece en la línea "Movie".
