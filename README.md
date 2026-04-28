# Bibel-wiki

Personlig kronologisk wiki for hele Bibelen — med interaktivt atlas, person-portretter, bok-portretter og søk.

## Sider

- **[bibel-tidslinje.html](bibel-tidslinje.html)** — forside med kronologisk oversikt over Det gamle testamente
- **[bibel-atlas.html](bibel-atlas.html)** — interaktivt master-atlas med ~50 steder fra Hellas til Persia, klikkbare markører, søk, hover-tooltips, pan/zoom/pinch
- **[sted.html?id=X](sted.html?id=goshen)** — dynamiske sted-sider (place CPT) med beskrivelse, skriftsteder, minimap, nærliggende steder
- **`*-tidslinje.html`** — person- og bok-portretter (Moses, David, 2. Mosebok, …) med kronologisk tidslinje + reise-kart for personer

## Arkitektur

| Fil | Rolle |
|---|---|
| `wiki-page.js` | Render-motor for tidslinjesider — kort, akse, detalj-panel, atlas-integrasjon, zoom-kontroller |
| `wiki-styles.css` | Felles stilark — pergament-estetikk, dynamisk skalering via CSS-variabler |
| `wiki-search.js` | Globalt søk (⌘K / Ctrl+K) som auto-merger atlas-steder inn i indeksen |
| `maps/bibel-atlas.js` | Master-atlas: SVG-geografi (kystlinjer, elver, regioner) + `attachInteraction()` for pan/zoom/pinch |
| `maps/locations.json` | **Source of truth** — alle steder (manuell redigering) |
| `maps/locations.js` | **Auto-generert** av `npm run build` — JSON med auto-deriverte `pages` arrays inlinet for browser-bruk |
| `scripts/build-data.js` | Build-script: leser locations.json + skanner `*-tidslinje.html` for `locations: [...]` → unionerer manual og auto-deriverte pages → skriver locations.js |

### Data-pipeline

```
maps/locations.json  ─┐
                      ├──▶  scripts/build-data.js  ──▶  maps/locations.js
*-tidslinje.html      ─┘                                       │
   (locations: [...])                                          ▼
                                                       window.__BIBEL_LOCATIONS
                                                              │
                                                              ▼
                                                       maps/bibel-atlas.js
```

Etter redigering: `npm run build` (eller `node scripts/build-data.js`) for å regenerere locations.js.

### Hvordan legge til en ny person/bok-side

1. Kopier en eksisterende `*-tidslinje.html` som mal
2. Tilpass `WikiPage.init({ ... })`:
   - `data: [...]` — fasene/kapitlene
   - `map: { atlas: BibelAtlas, viewBox: "x y w h" }` — passende kart-utsnitt
   - For hver fase: `locations: ["goshen", "horeb", ...]` — refererer til IDer i master-atlas
3. Done. Tidslinje, kort, kart, route-rendering, zoom, søk-indeksering kommer automatisk.

### Hvordan legge til et nytt sted

I `maps/locations.json`, legg til en oppføring:

```json
"ny_id": {
  "name": "Visningsnavn",
  "x": 472,
  "y": 260,
  "region": "kanaan",
  "labelDy": -10,
  "altNames": ["Hebraisk navn", "Greek name"],
  "description": "Én setning om stedet.",
  "scriptures": ["1. Mos 12,1", "Apg 17,16"]
}
```

Kjør `npm run build`. `pages`-arrayen blir auto-derivert fra hvilke `*-tidslinje.html`-filer som inkluderer stedet i en `locations: [...]`-array. Trenger du å legge til sider som ikke har `locations: []` ennå (f.eks. for cross-ref før migrering), legg til en `pages`-array manuelt — den unioneres med auto-deriverte.

Etter build vises stedet automatisk på atlaset, blir søkbart, og får sin egen sted-side på `sted.html?id=ny_id`.

### Koordinatsystem

- viewBox: `0 0 1000 540`
- Projeksjon: `x = (lon - 22) * 35.71`, `y = (39 - lat) * 36`
- Dekker omtrent: 22°E–50°E (Hellas → Persia), 24°N–39°N (sørlige Egypt → nordlige Anatolia)

## Tastatur

- `⌘K` / `Ctrl+K` / `/` — åpne søk
- `+` / `-` — zoom inn/ut på kart
- `0` — tilbakestill kart
- Dobbel-klikk kart — zoom inn 2x (Shift = zoom ut)

## Stack

Ren statisk HTML/CSS/JS — ingen build-steg. Hosted på Vercel.

Skrifttyper: Fraunces (serif) + JetBrains Mono.
