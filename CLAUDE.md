# CLAUDE.md — bibel-wiki

Sindres kanoniske bibel-kunnskap. Statisk HTML/CSS/JS, hostet på Vercel.

## Hva dette repoet er

Personlig kronologisk wiki for hele Bibelen — interaktivt master-atlas, person/bok-tidslinjer, sted-CPT, ⌘K-søk. Skopet er **alt om Bibelen** (GT er komplett; NT venter).

**Live:** https://bibel-wiki.vercel.app

## Status

Per 2026-04-28: Hele GT dekket — 44 tidslinje-sider, 71 lokasjoner, 195 auto-deriverte cross-links.

| Kategori | Sider |
|---|---|
| Personer | Abraham, Moses, Saul, David |
| Pentateuken | 1.–5. Mosebok |
| Historiske bøker | Josva, Dommerne, Rut, 1.–2. Samuel, 1.–2. Kongebok, 1.–2. Krønikebok, Esra, Nehemja, Ester |
| Visdomslitteratur | Job, Salmene, Ordspråkene, Forkynneren, Høysangen |
| Store profeter | Jesaja, Jeremia, Klagesangene, Esekiel, Daniel |
| 12 små profeter | Hosea, Joel, Amos, Obadja, Jonas, Mika, Nahum, Habakkuk, Sefanja, Haggai, Sakarja, Malaki |
| Atlas | bibel-atlas.html (interaktivt), sted.html?id=X (per sted) |

NT gjenstår: 27 bøker + Jesus, Paulus, Peter.

## Arkitektur — viktigste prinsipper

**Hver tidslinje-side er en tynn shell** (~150-300 linjer): HTML + ett `WikiPage.init({...})`-kall. Aldri inline CSS — alt deles via `wiki-styles.css`.

| Fil | Rolle |
|---|---|
| `wiki-page.js` | Render-motor: cards, akse, brackets, ticks, detaljpanel, hash-routing, atlas-integrasjon, zoom-kontroller |
| `wiki-styles.css` | Felles stilark — pergament-estetikk, dynamisk skalering via CSS-variabler |
| `wiki-search.js` | ⌘K søk-overlay — auto-merger atlas-locations inn i WIKI_INDEX |
| `maps/bibel-atlas.js` | Master-atlas + interaction (pan/zoom/pinch/dblclick/keyboard) |
| `maps/locations.json` | **Source of truth** for alle steder (manuell redigering) |
| `maps/locations.js` | **Auto-generert** av `npm run build` |
| `scripts/build-data.js` | Skanner `*-tidslinje.html` for `locations: [...]` → reverse-indekserer |
| `bibel-tidslinje.html` | Forsiden — egen logikk pga. Krønikene-overlay (bruker IKKE motoren) |
| `bibel-atlas.html` | Interaktivt master-atlas |
| `sted.html` | Dynamisk sted-side (`?id=X`) |
| `<navn>-tidslinje.html` | Person- og bok-portretter — bruker motoren |

## Hvordan utvide

### Ny person/bok-side

1. Kopier en eksisterende side som mal:
   - Person: `abraham-tidslinje.html`
   - Bok narrativ: `1-mos-tidslinje.html`
   - Bok visdom (uten kart): `job-tidslinje.html`
2. Bytt ut header, theme banner, Notion-pille-URL, footer, hele `data`-arrayet
3. Hver fase får `locations: ["id1", "id2"]` for kart-route + auto-cross-ref
4. Legg page + alle faser i `WIKI_INDEX` i `wiki-search.js`
5. `npm run build` → commit → push → Vercel deployer automatisk

### Nytt sted

1. Legg til i `maps/locations.json`:
   ```json
   "ny_id": {
     "name": "Visningsnavn",
     "x": 472, "y": 260,
     "region": "kanaan",
     "labelDy": -10,
     "altNames": ["Hebraisk navn"],
     "description": "Én setning.",
     "scriptures": ["1. Mos 12,1"]
   }
   ```
2. `npm run build` — `pages`-array auto-deriveres fra tidslinjefiler
3. Vises automatisk på atlas, blir søkbart, får sted.html-side

### Koordinatsystem

- viewBox: `0 0 1000 540`
- Projeksjon: `x = (lon - 22) * 35.71`, `y = (39 - lat) * 36`
- Dekker Hellas (22°E) → Persia (50°E), sørlige Egypt (24°N) → nordlige Anatolia (39°N)

## Workflow

```bash
cd ~/repositories/bibel-wiki
# Edit *-tidslinje.html, locations.json, etc.
npm run build         # Regenererer maps/locations.js
git add -A && git commit -m "feat: ..."
git push              # Vercel deployer automatisk
```

## Variant-klasser (visuelle modus)

- `in-chronicles` — claret border, hellig-stund
- `omitted-by-chronicles` — stiplet kant, "kjøttet" Krønikene fortier
- `leader` — claret leder-modus
- Standard — gull

## Kobling til personal-memory

Personal-memory har én pekerfil (`reference_bibel_wiki.md`) som peker hit. Ingen bibel-data lagres i personal-memory lenger.

## Git

Standard Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). Direkte til `main` er OK siden dette er solo-prosjekt og Vercel auto-deployer.
