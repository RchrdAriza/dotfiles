function fastfetch --description 'fastfetch con un póster de película aleatorio'
    set -l dir ~/.cache/fastfetch-posters
    set -l favs ~/.config/fastfetch/logo
    set -l script ~/.config/fastfetch/poster.py
    set -l downloaded (string match -v '*/current.png' -- $dir/*.png)

    # Primera vez: descarga uno ya mismo para tener algo que mostrar
    if test (count $downloaded) -eq 0
        python3 -I $script 2>/dev/null
        set downloaded (string match -v '*/current.png' -- $dir/*.png)
    end

    # Pósters descargados + favoritos fijos de ~/.config/fastfetch/logo
    set -l pool $downloaded $favs/*.png

    if test (count $pool) -gt 0
        mkdir -p $dir
        set -l pick $pool[(random 1 (count $pool))]
        cp $pick $dir/current.png
        rm -f $dir/current.txt
        cp (string replace -r '\.png$' '.txt' -- $pick) $dir/current.txt 2>/dev/null
        command fastfetch $argv
    else
        # Sin internet y sin pósters guardados: logo normal de macOS
        command fastfetch --logo macos --logo-type auto $argv
    end

    # Descarga otro póster en segundo plano para la próxima vez
    sh -c "python3 -I '$script' >/dev/null 2>&1 &"
end
