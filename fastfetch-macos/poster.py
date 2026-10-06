#!/usr/bin/env python3
"""Descarga un póster aleatorio de TMDB para fastfetch.

Elige un director al azar de directors.txt y una de sus películas. A veces
(SURPRISE_CHANCE) toma en cambio una recomendación de TMDB basada en una
película de esos directores, pero de otro director: la "sorpresa".

Guarda <id>.png y <id>.txt (título · director) en ~/.cache/fastfetch-posters/.
"""
import json
import random
import subprocess
import time
import urllib.parse
from pathlib import Path

CONFIG = Path.home() / ".config/fastfetch"
POOL = Path.home() / ".cache/fastfetch-posters"
CACHE = POOL / "tmdb"
MAX_POSTERS = 40
SURPRISE_CHANCE = 0.25
CACHE_DAYS = 30
MIN_VOTES = 40          # descarta cortos y rarezas de la filmografía
SURPRISE_MIN_VOTES = 300
SURPRISE_MIN_RATING = 7.0
API = "https://api.themoviedb.org/3"
IMG = "https://image.tmdb.org/t/p/w780"


def curl(url, out=None):
    cmd = ["curl", "-fsSL", "--max-time", "15", url]
    if out:
        cmd += ["-o", str(out)]
    return subprocess.run(cmd, capture_output=True, text=out is None, check=True).stdout


def tmdb(path, **params):
    params["api_key"] = (CONFIG / "tmdb_key").read_text().strip()
    return json.loads(curl(f"{API}{path}?{urllib.parse.urlencode(params)}"))


def cached(name, fetch):
    f = CACHE / f"{name}.json"
    if f.exists() and time.time() - f.stat().st_mtime < CACHE_DAYS * 86400:
        return json.loads(f.read_text())
    data = fetch()
    f.write_text(json.dumps(data))
    return data


def director_films(name):
    """Películas dirigidas por `name` que tienen póster."""
    def fetch():
        people = tmdb("/search/person", query=name)["results"]
        directors = [p for p in people if p.get("known_for_department") == "Directing"]
        person = (directors or people)[0]
        credits = tmdb(f"/person/{person['id']}/movie_credits")["crew"]
        films = {c["id"]: c for c in credits if c["job"] == "Director" and c.get("poster_path")}
        return {"name": person["name"], "films": list(films.values())}

    slug = "".join(ch for ch in name.lower() if ch.isalnum())
    return cached(f"director-{slug}", fetch)


def year(film):
    return (film.get("release_date") or "")[:4]


def pick(directors):
    """Devuelve (película, texto para la Cartelera) que aún no esté en el pool."""
    data = [director_films(d) for d in directors]
    own_ids = {f["id"] for d in data for f in d["films"]}
    for d in data:
        d["films"] = [f for f in d["films"] if f.get("vote_count", 0) >= MIN_VOTES]
    data = [d for d in data if d["films"]]
    have = {p.stem for p in POOL.glob("*.png")}

    if random.random() < SURPRISE_CHANCE:
        seeds = [f for d in data for f in d["films"]
                 if f.get("vote_count", 0) >= SURPRISE_MIN_VOTES
                 and f.get("vote_average", 0) >= SURPRISE_MIN_RATING]
        seed = random.choice(seeds or [f for d in data for f in d["films"]])
        recs = tmdb(f"/movie/{seed['id']}/recommendations")["results"]
        recs = [r for r in recs if r.get("poster_path") and r["id"] not in own_ids
                and str(r["id"]) not in have
                and r.get("vote_count", 0) >= SURPRISE_MIN_VOTES
                and r.get("vote_average", 0) >= SURPRISE_MIN_RATING]
        if recs:
            film = random.choice(recs)
            crew = tmdb(f"/movie/{film['id']}/credits")["crew"]
            names = [c["name"] for c in crew if c["job"] == "Director"]
            by = ", ".join(names) or "?"
            return film, f"✦ {film['title']} ({year(film)}) · {by}"

    random.shuffle(data)
    for d in data:
        films = [f for f in d["films"] if str(f["id"]) not in have]
        if films:
            film = random.choice(films)
            return film, f"{film['title']} ({year(film)}) · {d['name']}"
    return None, None


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    lines = (CONFIG / "directors.txt").read_text().splitlines()
    directors = [l.strip() for l in lines if l.strip() and not l.lstrip().startswith("#")]

    film, caption = pick(directors)
    if film:
        tmp = POOL / f"{film['id']}.jpg"
        curl(IMG + film["poster_path"], out=tmp)
        # kitty-direct solo acepta PNG
        subprocess.run(["sips", "-s", "format", "png", "-Z", "900", str(tmp),
                        "--out", str(POOL / f"{film['id']}.png")],
                       capture_output=True, check=True)
        tmp.unlink()
        (POOL / f"{film['id']}.txt").write_text(caption + "\n")

    posters = sorted((p for p in POOL.glob("*.png") if p.name != "current.png"),
                     key=lambda p: p.stat().st_mtime, reverse=True)
    for old in posters[MAX_POSTERS:]:
        old.unlink()
        old.with_suffix(".txt").unlink(missing_ok=True)


if __name__ == "__main__":
    main()
