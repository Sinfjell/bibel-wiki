/**
 * Wiki search overlay — shared across all bible-pages in this directory.
 *
 * Activate: ⌘K / Ctrl+K · "/" key
 * Index lives in WIKI_INDEX below. To add a new page or person:
 *   1. Add an entry to WIKI_INDEX with type, title, url, keywords
 *   2. If the URL has a hash (page.html#phase-id), the target page must
 *      handle the hash on load — see selectPhaseFromHash() in each page.
 */

const WIKI_INDEX = [
  // ============ Pages ============
  { type: "page", icon: "📖", title: "Bibelen", subtitle: "Forside · GT-kronologi (9 epoker), NT kommer senere",
    url: "bibel-tidslinje.html", keywords: ["bibel", "bibelen", "forside", "oversikt", "GT", "gamle testamente", "kronologi", "tidslinje"] },
  { type: "page", icon: "🗺️", title: "Bibel-atlas", subtitle: "Interaktivt kart med alle steder",
    url: "bibel-atlas.html", keywords: ["atlas", "kart", "geografi", "steder", "map"] },

  // Personer
  { type: "page", icon: "🌟", title: "Abraham", subtitle: "Person · Troens far, ~2100–1925 f.Kr.",
    url: "abraham-tidslinje.html", keywords: ["abraham", "abram", "patriark", "ur", "kanaan", "isak", "sara", "moria"] },
  { type: "page", icon: "📜", title: "Moses", subtitle: "Person · 8 livsfaser, 1525–1405 f.Kr.",
    url: "moses-tidslinje.html", keywords: ["moses", "lov", "egypt", "sinai", "tabernakel", "ørken"] },
  { type: "page", icon: "⚔️", title: "Saul", subtitle: "Person · Israels første konge, 1050–1010 f.Kr.",
    url: "saul-tidslinje.html", keywords: ["saul", "konge", "gilboa", "samuel"] },
  { type: "page", icon: "👑", title: "David", subtitle: "Person · 8 livsfaser, 1040–970 f.Kr.",
    url: "david-tidslinje.html", keywords: ["david", "konge", "salmer", "betlehem", "jerusalem"] },

  // Bøker — Mosebøkene
  { type: "page", icon: "📕", title: "1. Mosebok", subtitle: "Bok · Begynnelsen — skapelse til Josef i Egypt",
    url: "1-mos-tidslinje.html", keywords: ["1 mos", "mosebok", "genesis", "skapelse", "abraham", "isak", "jakob", "josef", "noah", "babel"] },
  { type: "page", icon: "📕", title: "2. Mosebok", subtitle: "Bok · Utgangen og Sinai-pakten",
    url: "2-mos-tidslinje.html", keywords: ["2 mos", "mosebok", "exodus", "utgangen", "sinai", "moses", "tabernakel", "påsken", "loven"] },
  { type: "page", icon: "📕", title: "3. Mosebok", subtitle: "Bok · Hellighet, ofre og soningsdagen",
    url: "3-mos-tidslinje.html", keywords: ["3 mos", "mosebok", "leviticus", "offer", "soningsdagen", "yom kippur", "hellighet", "prest"] },
  { type: "page", icon: "📕", title: "4. Mosebok", subtitle: "Bok · Ørkenvandringen, fra Sinai til Moab",
    url: "4-mos-tidslinje.html", keywords: ["4 mos", "mosebok", "numbers", "ørken", "speidere", "kaleb", "josva", "korah", "bileam"] },
  { type: "page", icon: "📕", title: "5. Mosebok", subtitle: "Bok · Moses' avskjedstaler og Sjema",
    url: "5-mos-tidslinje.html", keywords: ["5 mos", "mosebok", "deuteronomy", "sjema", "ti bud", "nebo", "moses død", "moab"] },

  // Bøker — Samuel
  { type: "page", icon: "📕", title: "1. Samuel", subtitle: "Bok · Samuel, Saul og David",
    url: "1-samuel-tidslinje.html", keywords: ["1 samuel", "samuel", "saul", "david", "eli", "arken"] },
  { type: "page", icon: "📕", title: "2. Samuel", subtitle: "Bok · Davids regjering",
    url: "2-samuel-tidslinje.html", keywords: ["2 samuel", "david", "kongerike", "jerusalem", "absalom"] },

  // Bøker — Kongebøker
  { type: "page", icon: "👑", title: "1. Kongebok", subtitle: "Bok · Salomo, splittelsen, Elia mot Akab",
    url: "1-kong-tidslinje.html", keywords: ["1 kongebok", "1 kong", "kings", "salomo", "tempel", "rikets deling", "elia", "akab", "jezabel", "karmel"] },
  { type: "page", icon: "👑", title: "2. Kongebok", subtitle: "Bok · Elisja, eksilet — Israel og Juda faller",
    url: "2-kong-tidslinje.html", keywords: ["2 kongebok", "2 kong", "kings", "elisja", "jehu", "hiskia", "josja", "sankerib", "nebukadnesar", "eksilet"] },

  // Bøker — Krønikene
  { type: "page", icon: "📜", title: "1. Krønikebok", subtitle: "Bok · Adam til David — slektslister + tempelforberedelse",
    url: "1-kron-tidslinje.html", keywords: ["1 krønikebok", "1 kron", "chronicles", "krønikene", "slektslister", "david", "tempel", "adam"] },
  { type: "page", icon: "📜", title: "2. Krønikebok", subtitle: "Bok · Salomo til Kyros' dekret",
    url: "2-kron-tidslinje.html", keywords: ["2 krønikebok", "2 kron", "chronicles", "krønikene", "salomo", "juda-konger", "tempel", "eksil", "kyros"] },

  // Bøker — Josva til Rut
  { type: "page", icon: "⚔️", title: "Josva", subtitle: "Bok · Erobringen av Kanaan — Jeriko, Ai, Gibeon",
    url: "josva-tidslinje.html", keywords: ["josva", "joshua", "jeriko", "ai", "gibeon", "rahab", "erobring", "kanaan", "tilfluktsbyer"] },
  { type: "page", icon: "⚖️", title: "Dommerne", subtitle: "Bok · Syklusen mellom synd og frelse — Debora, Gideon, Samson",
    url: "dommerne-tidslinje.html", keywords: ["dommerne", "judges", "debora", "gideon", "samson", "jeftah", "ehud", "rahab"] },
  { type: "page", icon: "🌾", title: "Rut", subtitle: "Bok · En perle i kaoset — moabittisk oldemor til David",
    url: "rut-tidslinje.html", keywords: ["rut", "ruth", "naomi", "boas", "obed", "moabitt", "betlehem"] },

  // Bøker — Esra-Nehemja-Ester (etter eksilet)
  { type: "page", icon: "🏗️", title: "Esra", subtitle: "Bok · Hjemkomsten — tempelet bygges (538-458 f.Kr.)",
    url: "esra-tidslinje.html", keywords: ["esra", "ezra", "kyros", "serubabel", "tempelet", "hjemkomst", "eksilet"] },
  { type: "page", icon: "🧱", title: "Nehemja", subtitle: "Bok · Muren bygges på 52 dager",
    url: "nehemja-tidslinje.html", keywords: ["nehemja", "nehemiah", "muren", "jerusalem", "artaxerxes", "sanballat", "tobia"] },
  { type: "page", icon: "👑", title: "Ester", subtitle: "Bok · Jødinne i Persia redder sitt folk",
    url: "ester-tidslinje.html", keywords: ["ester", "esther", "mordekai", "haman", "purim", "ahasverus", "xerxes", "vasti", "susa"] },

  // ============ Phases on David's page ============
  { type: "phase", icon: "🌾", title: "Gjetergutten i Betlehem", subtitle: "David · Fase I · ~1040–1025 f.Kr.",
    url: "david-tidslinje.html#gjeter", keywords: ["betlehem", "samuel salver", "gjeter"] },
  { type: "phase", icon: "🎵", title: "David ved Sauls hoff", subtitle: "David · Fase II · ~1025–1018 f.Kr.",
    url: "david-tidslinje.html#hoff", keywords: ["goliat", "harpe", "jonatan", "elah"] },
  { type: "phase", icon: "🏃", title: "Davids flukt", subtitle: "David · Fase III · ~1018–1010 f.Kr.",
    url: "david-tidslinje.html#flukt", keywords: ["adullam", "siklag", "akisj", "utlegg"] },
  { type: "phase", icon: "👑", title: "David konge i Hebron", subtitle: "David · Fase IV · 1010–1003 f.Kr.",
    url: "david-tidslinje.html#hebron", keywords: ["hebron", "isjbosjet", "abner"] },
  { type: "phase", icon: "🏛️", title: "Davidpakten — Jerusalem", subtitle: "David · Fase V · 1003–990 f.Kr.",
    url: "david-tidslinje.html#jerusalem", keywords: ["jerusalem", "arken", "natan", "davidpakten", "evig ætt"] },
  { type: "phase", icon: "💔", title: "Batseba og Natan — Davids fall", subtitle: "David · Fase VI · ~990 f.Kr.",
    url: "david-tidslinje.html#fallet", keywords: ["batseba", "uria", "natan", "salme 51"] },
  { type: "phase", icon: "⚔️", title: "Absaloms opprør", subtitle: "David · Fase VII · ~985–975 f.Kr.",
    url: "david-tidslinje.html#uro", keywords: ["absalom", "amnon", "tamar", "akitofel", "sjeba"] },
  { type: "phase", icon: "🕯️", title: "Davids avskjed — Salomo salves", subtitle: "David · Fase VIII · ~975–970 f.Kr.",
    url: "david-tidslinje.html#slutten", keywords: ["adonja", "salomo", "gihon", "tempelet"] },

  // ============ Phases on Moses's page ============
  { type: "phase", icon: "👶", title: "Moses som prins i Egypt", subtitle: "Moses · Fase I · ~1525–1485 f.Kr.",
    url: "moses-tidslinje.html#egypt", keywords: ["egypt", "kurv", "farao", "jokebed"] },
  { type: "phase", icon: "🐑", title: "Moses i Midjan", subtitle: "Moses · Fase II · ~1485–1445 f.Kr.",
    url: "moses-tidslinje.html#midjan", keywords: ["midjan", "sippora", "jetro", "hyrde"] },
  { type: "phase", icon: "🔥", title: "Den brennende busken og plagene", subtitle: "Moses · Fase III · ~1445 f.Kr.",
    url: "moses-tidslinje.html#kallet", keywords: ["brennende busken", "ti plager", "påsken", "JHVH"] },
  { type: "phase", icon: "🌊", title: "Utgangen og Sivsjøen", subtitle: "Moses · Fase IV · ~1445 f.Kr.",
    url: "moses-tidslinje.html#utgangen", keywords: ["sivsjøen", "manna", "exodus", "utgangen"] },
  { type: "phase", icon: "⛰️", title: "Sinai og loven", subtitle: "Moses · Fase V · ~1445–1444 f.Kr.",
    url: "moses-tidslinje.html#sinai", keywords: ["sinai", "ti bud", "gullkalven", "tabernaklet"] },
  { type: "phase", icon: "🔭", title: "Speidernes opprør", subtitle: "Moses · Fase VI · ~1444 f.Kr.",
    url: "moses-tidslinje.html#speidere", keywords: ["speidere", "kadesj", "josva", "kaleb", "førti år"] },
  { type: "phase", icon: "🐍", title: "Ørkenvandringen", subtitle: "Moses · Fase VII · ~1444–1405 f.Kr.",
    url: "moses-tidslinje.html#vandring", keywords: ["korah", "slangen", "klippen", "bileam"] },
  { type: "phase", icon: "🪦", title: "Moses dør på Nebo", subtitle: "Moses · Fase VIII · ~1405 f.Kr.",
    url: "moses-tidslinje.html#nebo", keywords: ["nebo", "5 mosebok", "josva", "død"] },

  // ============ Phases on Saul's page ============
  { type: "phase", icon: "👑", title: "Saul salves", subtitle: "Saul · Fase I · ~1050 f.Kr.",
    url: "saul-tidslinje.html#salvelsen", keywords: ["mispa", "kisj", "samuel"] },
  { type: "phase", icon: "⚔️", title: "Sauls tidlige seire", subtitle: "Saul · Fase II · ~1050–1045 f.Kr.",
    url: "saul-tidslinje.html#tidlige-seire", keywords: ["ammon", "jabesj", "mikmas", "jonatan"] },
  { type: "phase", icon: "🔥", title: "Frafall i Gilgal", subtitle: "Saul · Fase III · ~1045 f.Kr.",
    url: "saul-tidslinje.html#gilgal", keywords: ["gilgal", "ulovlig offer"] },
  { type: "phase", icon: "🐏", title: "Amalek-krigen — Sauls dom", subtitle: "Saul · Fase IV · ~1040 f.Kr.",
    url: "saul-tidslinje.html#amalek", keywords: ["amalek", "agag", "lydighet", "samuel forlater"] },
  { type: "phase", icon: "🎵", title: "David ved Sauls hoff", subtitle: "Saul · Fase V · ~1040–1025 f.Kr.",
    url: "saul-tidslinje.html#david-hoffet", keywords: ["david", "goliat", "harpe"] },
  { type: "phase", icon: "🗡️", title: "Sauls paranoia mot David", subtitle: "Saul · Fase VI · ~1025–1020 f.Kr.",
    url: "saul-tidslinje.html#paranoia", keywords: ["spyd", "mikal", "jonatan"] },
  { type: "phase", icon: "🩸", title: "Massakren på Nob", subtitle: "Saul · Fase VII · ~1018–1011 f.Kr.",
    url: "saul-tidslinje.html#forfolgelsen", keywords: ["nob", "doeg", "akimelek", "abjatar"] },
  { type: "phase", icon: "🏔️", title: "Saul faller på Gilboa", subtitle: "Saul · Fase VIII · ~1011–1010 f.Kr.",
    url: "saul-tidslinje.html#gilboa", keywords: ["gilboa", "en-dor", "selvmord", "filisterne"] },

  // ============ Faser på Abrahams side ============
  { type: "phase", icon: "🌟", title: "Abrahams kall i Ur og Haran", subtitle: "Abraham · Fase I · ~2100–2090 f.Kr.",
    url: "abraham-tidslinje.html#kallet", keywords: ["ur", "haran", "tarah", "kallet", "abram"] },
  { type: "phase", icon: "🐪", title: "Abraham til Kanaan og Egypt", subtitle: "Abraham · Fase II · ~2090–2085 f.Kr.",
    url: "abraham-tidslinje.html#kanaan", keywords: ["kanaan", "egypt", "sarai", "farao"] },
  { type: "phase", icon: "🍷", title: "Lot og Melkisedek", subtitle: "Abraham · Fase III · ~2085–2080 f.Kr.",
    url: "abraham-tidslinje.html#lot-melkisedek", keywords: ["lot", "melkisedek", "salem", "tienden"] },
  { type: "phase", icon: "✨", title: "Pakten med Abraham", subtitle: "Abraham · Fase IV · ~2080–2075 f.Kr.",
    url: "abraham-tidslinje.html#pakten", keywords: ["pakt", "stjernene", "tro", "rettferdighet", "omskjærelse"] },
  { type: "phase", icon: "🏜️", title: "Hagar og Ismael", subtitle: "Abraham · Fase V · ~2075–2065 f.Kr.",
    url: "abraham-tidslinje.html#hagar", keywords: ["hagar", "ismael", "sara"] },
  { type: "phase", icon: "🔥", title: "Sodoma og det hellige besøket", subtitle: "Abraham · Fase VI · ~2065 f.Kr.",
    url: "abraham-tidslinje.html#sodoma", keywords: ["sodoma", "gomorra", "lot", "mamre", "saltstøtte"] },
  { type: "phase", icon: "👶", title: "Isaks fødsel", subtitle: "Abraham · Fase VII · ~2060 f.Kr.",
    url: "abraham-tidslinje.html#isak-fodes", keywords: ["isak", "latter", "hagar bortvises", "abimelek"] },
  { type: "phase", icon: "⛰️", title: "Moriafjellet — den store prøvelsen", subtitle: "Abraham · Fase VIII · ~2055 f.Kr.",
    url: "abraham-tidslinje.html#moria", keywords: ["moria", "isak offer", "rebekka", "sara dør", "abrahams død"] },

  // ============ 1. Mosebok — deler ============
  { type: "phase", icon: "🌍", title: "Skapelsen", subtitle: "1. Mosebok · Del I · Kap 1–2",
    url: "1-mos-tidslinje.html#skapelsen", keywords: ["skapelse", "adam", "eva", "eden", "syv dager"] },
  { type: "phase", icon: "🛶", title: "Syndefall og storflom", subtitle: "1. Mosebok · Del II · Kap 3–9",
    url: "1-mos-tidslinje.html#fall", keywords: ["syndefall", "kain", "abel", "noah", "arken", "regnbuen"] },
  { type: "phase", icon: "🗼", title: "Babel og folketavlene", subtitle: "1. Mosebok · Del III · Kap 10–11",
    url: "1-mos-tidslinje.html#babel", keywords: ["babel", "språk", "folkeslag", "tarah"] },
  { type: "phase", icon: "🌟", title: "Abraham — kall og løfte", subtitle: "1. Mosebok · Del IV · Kap 12–25",
    url: "1-mos-tidslinje.html#abraham", keywords: ["abraham", "sara", "isak", "moria", "pakt"] },
  { type: "phase", icon: "👬", title: "Isak og tvillingene", subtitle: "1. Mosebok · Del V · Kap 25–28",
    url: "1-mos-tidslinje.html#isak-jakob", keywords: ["isak", "rebekka", "esau", "jakob", "førstefødselsrett"] },
  { type: "phase", icon: "🐑", title: "Jakob i fremmed land", subtitle: "1. Mosebok · Del VI · Kap 29–31",
    url: "1-mos-tidslinje.html#jakob-laban", keywords: ["jakob", "laban", "lea", "rakel", "tolv stammer"] },
  { type: "phase", icon: "🤼", title: "Jakob blir Israel", subtitle: "1. Mosebok · Del VII · Kap 32–36",
    url: "1-mos-tidslinje.html#israel", keywords: ["jabbok", "israel", "esau forsoning", "dina", "rakel dør"] },
  { type: "phase", icon: "👔", title: "Josef i Egypt", subtitle: "1. Mosebok · Del VIII · Kap 37–50",
    url: "1-mos-tidslinje.html#josef", keywords: ["josef", "drømmer", "potifar", "farao", "hungersnød", "gosen"] },

  // ============ 2. Mosebok — deler ============
  { type: "phase", icon: "🧱", title: "Slaveriet i Egypt", subtitle: "2. Mosebok · Del I · Kap 1–2",
    url: "2-mos-tidslinje.html#slaveri", keywords: ["slaveri", "farao", "jokebed", "moses kurv", "midjan"] },
  { type: "phase", icon: "🔥", title: "Moses' kall og plagene", subtitle: "2. Mosebok · Del II · Kap 3–12",
    url: "2-mos-tidslinje.html#kallet-plager", keywords: ["brennende busken", "ti plager", "påsken", "JHVH"] },
  { type: "phase", icon: "🌊", title: "Utgangen og Sivsjøen", subtitle: "2. Mosebok · Del III · Kap 13–15",
    url: "2-mos-tidslinje.html#utgangen", keywords: ["sivsjøen", "exodus", "moses sang", "mirjam"] },
  { type: "phase", icon: "🍞", title: "Vandring til Sinai — manna", subtitle: "2. Mosebok · Del IV · Kap 16–18",
    url: "2-mos-tidslinje.html#vandring", keywords: ["manna", "klippen", "amalek", "jetro"] },
  { type: "phase", icon: "⛰️", title: "Sinai og loven", subtitle: "2. Mosebok · Del V · Kap 19–24",
    url: "2-mos-tidslinje.html#sinai-loven", keywords: ["sinai", "ti bud", "loven", "pakt"] },
  { type: "phase", icon: "🏛️", title: "Tabernaklet — instruksjon", subtitle: "2. Mosebok · Del VI · Kap 25–31",
    url: "2-mos-tidslinje.html#tabernaklet-plan", keywords: ["tabernakel", "ark", "nådestol", "bezalel"] },
  { type: "phase", icon: "🐮", title: "Gullkalven", subtitle: "2. Mosebok · Del VII · Kap 32–34",
    url: "2-mos-tidslinje.html#gullkalven", keywords: ["gullkalven", "fornyet pakt", "moses ansikt"] },
  { type: "phase", icon: "☁️", title: "Tabernaklet bygges og innvies", subtitle: "2. Mosebok · Del VIII · Kap 35–40",
    url: "2-mos-tidslinje.html#tabernaklet-bygges", keywords: ["tabernakel ferdig", "skyen", "Herrens herlighet"] },

  // ============ 3. Mosebok — deler ============
  { type: "phase", icon: "🐑", title: "Ofringene", subtitle: "3. Mosebok · Del I · Kap 1–7",
    url: "3-mos-tidslinje.html#ofringene", keywords: ["brennoffer", "syndoffer", "skyldoffer", "fredsoffer"] },
  { type: "phase", icon: "🕯️", title: "Aron innvies — fremmed ild", subtitle: "3. Mosebok · Del II · Kap 8–10",
    url: "3-mos-tidslinje.html#aron", keywords: ["aron", "nadab", "abihu", "fremmed ild"] },
  { type: "phase", icon: "🧼", title: "Rene og urene", subtitle: "3. Mosebok · Del III · Kap 11–15",
    url: "3-mos-tidslinje.html#renhet", keywords: ["renhet", "spedalskhet", "mat", "kropp"] },
  { type: "phase", icon: "🐐", title: "Den store soningsdagen", subtitle: "3. Mosebok · Del IV · Kap 16",
    url: "3-mos-tidslinje.html#soningsdagen", keywords: ["yom kippur", "soningsdagen", "syndebukk", "forhenget"] },
  { type: "phase", icon: "✨", title: "Hellighetsloven", subtitle: "3. Mosebok · Del V · Kap 17–22",
    url: "3-mos-tidslinje.html#hellighet", keywords: ["hellighet", "elske din neste", "moralsk lov"] },
  { type: "phase", icon: "🎊", title: "Festene", subtitle: "3. Mosebok · Del VI · Kap 23",
    url: "3-mos-tidslinje.html#festene", keywords: ["sabbat", "påske", "pinse", "løvhytte", "festtider"] },
  { type: "phase", icon: "🎉", title: "Sabbatsår og jubelår", subtitle: "3. Mosebok · Del VII · Kap 24–25",
    url: "3-mos-tidslinje.html#jubelaret", keywords: ["sabbatsår", "jubelår", "gjeldsettergivelse"] },
  { type: "phase", icon: "📜", title: "Velsignelser og forbannelser (3 Mos)", subtitle: "3. Mosebok · Del VIII · Kap 26–27",
    url: "3-mos-tidslinje.html#velsignelser", keywords: ["velsignelser", "forbannelser", "løfter", "tienden"] },

  // ============ 4. Mosebok — deler ============
  { type: "phase", icon: "🔢", title: "Folketellingen ved Sinai", subtitle: "4. Mosebok · Del I · Kap 1–4",
    url: "4-mos-tidslinje.html#telling", keywords: ["folketelling", "stammer", "leiren", "levittene"] },
  { type: "phase", icon: "🙏", title: "Renhet og nasiræer", subtitle: "4. Mosebok · Del II · Kap 5–6",
    url: "4-mos-tidslinje.html#renhet-nasir", keywords: ["nasiræer", "aron-velsignelsen"] },
  { type: "phase", icon: "🎺", title: "Tabernaklets innvielse og oppbrudd", subtitle: "4. Mosebok · Del III · Kap 7–10",
    url: "4-mos-tidslinje.html#innvielse", keywords: ["sølvtrompet", "andre påsken", "skyen løfter seg"] },
  { type: "phase", icon: "😢", title: "Klagene og opprørene", subtitle: "4. Mosebok · Del IV · Kap 11–12",
    url: "4-mos-tidslinje.html#klager", keywords: ["klager", "vaktler", "mirjam spedalskhet"] },
  { type: "phase", icon: "🔭", title: "Speidernes opprør — vendepunktet", subtitle: "4. Mosebok · Del V · Kap 13–14",
    url: "4-mos-tidslinje.html#speidere", keywords: ["speidere", "kaleb", "josva", "førti år", "kanaan"] },
  { type: "phase", icon: "⚖️", title: "Korahs opprør og Arons stav", subtitle: "4. Mosebok · Del VI · Kap 15–19",
    url: "4-mos-tidslinje.html#korah", keywords: ["korah", "datan", "arons stav", "rødkvige"] },
  { type: "phase", icon: "🐍", title: "Klippen, slangen og Bileam", subtitle: "4. Mosebok · Del VII · Kap 20–25",
    url: "4-mos-tidslinje.html#klippen-slangen", keywords: ["klippen", "kobberslangen", "bileam", "balak", "baal-peor"] },
  { type: "phase", icon: "🌅", title: "Ny generasjon — på Moabs sletter", subtitle: "4. Mosebok · Del VIII · Kap 26–36",
    url: "4-mos-tidslinje.html#ny-generasjon", keywords: ["andre folketelling", "selofhads døtre", "tilfluktsbyer"] },

  // ============ 5. Mosebok — deler ============
  { type: "phase", icon: "📜", title: "Første tale — historien", subtitle: "5. Mosebok · Del I · Kap 1–4",
    url: "5-mos-tidslinje.html#historien", keywords: ["første tale", "horeb", "sihon", "og"] },
  { type: "phase", icon: "🪨", title: "Andre tale — Ti bud (5 Mos)", subtitle: "5. Mosebok · Del II · Kap 5",
    url: "5-mos-tidslinje.html#ti-bud", keywords: ["ti bud", "andre generasjon"] },
  { type: "phase", icon: "❤️", title: "Sjema — det største bud", subtitle: "5. Mosebok · Del III · Kap 6–11",
    url: "5-mos-tidslinje.html#sjema", keywords: ["sjema", "elske gud", "shema", "trosbekjennelse"] },
  { type: "phase", icon: "🏛️", title: "Lovsamlingen — sentralhelligdommen", subtitle: "5. Mosebok · Del IV · Kap 12–18",
    url: "5-mos-tidslinje.html#lovsamling", keywords: ["sentralhelligdom", "kongelov", "profetlovet", "messias"] },
  { type: "phase", icon: "⚖️", title: "Sivilrett og menneskerett", subtitle: "5. Mosebok · Del V · Kap 19–26",
    url: "5-mos-tidslinje.html#sivilrett", keywords: ["sivilrett", "tilfluktsby", "førstegrøde", "krigsregler"] },
  { type: "phase", icon: "🏔️", title: "Velsignelser og forbannelser (5 Mos)", subtitle: "5. Mosebok · Del VI · Kap 27–28",
    url: "5-mos-tidslinje.html#velsignelser-forbannelser", keywords: ["garisim", "ebal", "forbannelser", "eksil profeti"] },
  { type: "phase", icon: "🤝", title: "Pakt og løftet om omvendelse", subtitle: "5. Mosebok · Del VII · Kap 29–30",
    url: "5-mos-tidslinje.html#pakt-omvendelse", keywords: ["pakt fornyes", "velg livet", "omvendelse"] },
  { type: "phase", icon: "🪦", title: "Avskjeden og Moses' død", subtitle: "5. Mosebok · Del VIII · Kap 31–34",
    url: "5-mos-tidslinje.html#avskjeden", keywords: ["moses sang", "moses velsignelse", "nebo", "moses dør"] },

  // ============ External — Notion entities ============
  { type: "external", icon: "🔗", title: "Bibelen i Notion", subtitle: "Parent-entitet for alle 66 bibelbøker",
    url: "https://www.notion.so/b8a45277f4cc4c459b7f2e696bccf51c", keywords: ["bibel", "notion", "bibelen"] },
  { type: "external", icon: "🔗", title: "Davids leseplan i Notion", subtitle: "Les Bibelen på ett år (prosjekt)",
    url: "https://www.notion.so/d869e8843ca0470f9843314684a655fa", keywords: ["leseplan", "ett år", "notion", "prosjekt"] }
];

// Auto-merge atlas locations into the search index when BibelAtlas is loaded.
if (typeof window !== "undefined" && window.BibelAtlas && window.BibelAtlas.locations) {
  Object.entries(window.BibelAtlas.locations).forEach(([id, loc]) => {
    const keywords = [loc.name.toLowerCase()];
    if (loc.altNames) keywords.push(...loc.altNames.map(n => n.toLowerCase()));
    if (loc.region) keywords.push(loc.region);
    WIKI_INDEX.push({
      type: "place",
      icon: "📍",
      title: loc.name,
      subtitle: "Sted" + (loc.region ? " · " + loc.region : "") + (loc.description ? " · " + loc.description.slice(0, 60) + (loc.description.length > 60 ? "…" : "") : ""),
      url: "sted.html?id=" + id,
      keywords: keywords
    });
  });
}

(function () {
  const STYLE_CSS = `
    .wiki-search-trigger {
      position: fixed;
      bottom: 24px; right: 24px;
      z-index: 998;
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 14px 10px 12px;
      background: #fbf5e6;
      border: 1px solid #c5b48b;
      border-radius: 999px;
      color: #4a3f30;
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: .72rem;
      letter-spacing: .12em;
      text-transform: uppercase;
      box-shadow: 0 4px 14px rgba(60,40,15,.10), 0 12px 28px rgba(60,40,15,.06);
      cursor: pointer;
      transition: transform .15s ease, border-color .15s ease, color .15s ease;
    }
    .wiki-search-trigger:hover {
      transform: translateY(-1px);
      border-color: #8b2635;
      color: #8b2635;
    }
    .wiki-search-trigger .kbd {
      display: inline-grid; place-items: center;
      min-width: 22px; height: 20px;
      padding: 0 6px;
      background: #ede1c4;
      border-radius: 4px;
      color: #1d1814;
      font-size: .7rem;
      letter-spacing: 0;
    }
    .wiki-search-overlay {
      position: fixed; inset: 0;
      z-index: 999;
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding-top: 12vh;
      background: rgba(60, 40, 15, .35);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      animation: wsFade .18s ease;
    }
    .wiki-search-overlay.open { display: flex; }
    @keyframes wsFade { from { opacity: 0; } to { opacity: 1; } }
    .wiki-search-modal {
      width: min(640px, 92vw);
      background: #fbf5e6;
      border: 1px solid #c5b48b;
      border-radius: 6px;
      box-shadow: 0 24px 60px rgba(60,40,15,.25);
      overflow: hidden;
      display: flex; flex-direction: column;
      max-height: 70vh;
      animation: wsRise .22s cubic-bezier(.2,.8,.2,1);
    }
    @keyframes wsRise {
      from { opacity: 0; transform: translateY(-12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .wiki-search-input-wrap {
      display: flex; align-items: center; gap: 12px;
      padding: 16px 20px;
      border-bottom: 1px solid #d8c9a3;
      background: linear-gradient(180deg, #fbf2e0 0%, #fbf5e6 100%);
    }
    .wiki-search-icon { font-size: 1.1rem; color: #8b2635; }
    .wiki-search-input {
      flex: 1;
      background: transparent;
      border: none; outline: none;
      font-family: "Fraunces", "Iowan Old Style", Georgia, serif;
      font-variation-settings: "opsz" 24, "SOFT" 50;
      font-size: 1.15rem;
      color: #1d1814;
    }
    .wiki-search-input::placeholder { color: #8a7a62; font-style: italic; }
    .wiki-search-esc {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: .65rem;
      letter-spacing: .15em;
      text-transform: uppercase;
      color: #8a7a62;
      padding: 4px 8px;
      background: #ede1c4;
      border-radius: 4px;
    }
    .wiki-search-results { overflow-y: auto; padding: 8px; }
    .wiki-search-results::-webkit-scrollbar { width: 8px; }
    .wiki-search-results::-webkit-scrollbar-track { background: #e8dec7; }
    .wiki-search-results::-webkit-scrollbar-thumb { background: #c5b48b; border-radius: 4px; }
    .wiki-search-result {
      display: flex; align-items: center; gap: 14px;
      padding: 10px 14px;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: background .12s ease;
    }
    .wiki-search-result.selected, .wiki-search-result:hover { background: #faedce; }
    .wiki-search-result-icon {
      width: 32px; height: 32px;
      display: grid; place-items: center;
      background: #ede1c4;
      border-radius: 6px;
      font-size: 1.05rem;
      flex-shrink: 0;
    }
    .wiki-search-result.selected .wiki-search-result-icon { background: #8b2635; color: #fbf5e6; }
    .wiki-search-result-text { flex: 1; min-width: 0; }
    .wiki-search-result-title {
      font-family: "Fraunces", serif;
      font-variation-settings: "opsz" 24, "SOFT" 40;
      font-size: 1rem; font-weight: 500;
      color: #1d1814;
      line-height: 1.2;
      margin-bottom: 2px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wiki-search-result.selected .wiki-search-result-title { color: #8b2635; }
    .wiki-search-result-subtitle {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: .68rem;
      color: #8a7a62;
      letter-spacing: .04em;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .wiki-search-result-arrow {
      color: #c5b48b;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      transition: color .12s ease, transform .12s ease;
    }
    .wiki-search-result.selected .wiki-search-result-arrow {
      color: #8b2635;
      transform: translateX(2px);
    }
    .wiki-search-empty {
      text-align: center;
      padding: 32px 20px;
      color: #8a7a62;
      font-family: "Fraunces", serif;
      font-style: italic;
      font-size: .95rem;
    }
    .wiki-search-footer {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 16px;
      border-top: 1px solid #d8c9a3;
      background: #f5e8c8;
      font-family: "JetBrains Mono", ui-monospace, monospace;
      font-size: .6rem;
      letter-spacing: .15em;
      text-transform: uppercase;
      color: #8a7a62;
    }
    .wiki-search-footer .keys { display: flex; gap: 12px; }
    .wiki-search-footer .key { display: inline-flex; align-items: center; gap: 5px; }
    .wiki-search-footer .key kbd {
      font-family: "JetBrains Mono", ui-monospace, monospace;
      background: #ede1c4;
      padding: 2px 5px;
      border-radius: 3px;
      color: #1d1814;
      font-size: .6rem;
    }
    @media (max-width: 540px) {
      .wiki-search-trigger { bottom: 14px; right: 14px; padding: 8px 12px 8px 10px; }
      .wiki-search-modal { max-height: 80vh; }
      .wiki-search-overlay { padding-top: 6vh; }
    }
  `;

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // Inject styles
  const styleEl = document.createElement("style");
  styleEl.appendChild(document.createTextNode(STYLE_CSS));
  document.head.appendChild(styleEl);

  // Build trigger button
  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
  const trigger = el("button", "wiki-search-trigger");
  trigger.setAttribute("aria-label", "Søk i wiki");
  trigger.appendChild(el("span", null, "🔍 Søk"));
  trigger.appendChild(el("span", "kbd", isMac ? "⌘" : "Ctrl"));
  trigger.appendChild(el("span", "kbd", "K"));

  // Build overlay
  const overlay = el("div", "wiki-search-overlay");
  const modal = el("div", "wiki-search-modal");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-label", "Søk");

  const inputWrap = el("div", "wiki-search-input-wrap");
  inputWrap.appendChild(el("span", "wiki-search-icon", "🔍"));
  const input = el("input", "wiki-search-input");
  input.type = "text";
  input.placeholder = "Søk personer, faser, bøker — f.eks. David, Sinai, Batseba…";
  input.autocomplete = "off";
  input.spellcheck = false;
  inputWrap.appendChild(input);
  inputWrap.appendChild(el("span", "wiki-search-esc", "esc"));
  modal.appendChild(inputWrap);

  const results = el("div", "wiki-search-results");
  results.id = "wikiSearchResults";
  modal.appendChild(results);

  const footer = el("div", "wiki-search-footer");
  const keys = el("div", "keys");
  const k1 = el("span", "key");
  k1.appendChild(el("kbd", null, "↑"));
  k1.appendChild(el("kbd", null, "↓"));
  k1.appendChild(document.createTextNode(" naviger"));
  const k2 = el("span", "key");
  k2.appendChild(el("kbd", null, "↵"));
  k2.appendChild(document.createTextNode(" åpne"));
  keys.appendChild(k1);
  keys.appendChild(k2);
  footer.appendChild(keys);
  footer.appendChild(el("span", null, WIKI_INDEX.length + " oppføringer"));
  modal.appendChild(footer);

  overlay.appendChild(modal);

  function attach() {
    document.body.appendChild(trigger);
    document.body.appendChild(overlay);

    let selectedIdx = 0;
    let currentResults = WIKI_INDEX.slice();

    function score(item, q) {
      if (!q) return 0;
      const haystack = [
        item.title.toLowerCase(),
        item.subtitle.toLowerCase(),
        ...(item.keywords || []).map(k => k.toLowerCase())
      ];
      let total = 0;
      const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
      for (const t of tokens) {
        let bestForToken = 0;
        for (let i = 0; i < haystack.length; i++) {
          const h = haystack[i];
          if (h === t) bestForToken = Math.max(bestForToken, 100);
          else if (h.startsWith(t)) bestForToken = Math.max(bestForToken, 60);
          else if (h.includes(t)) bestForToken = Math.max(bestForToken, 30);
        }
        if (bestForToken === 0) return 0;
        total += bestForToken;
      }
      return total;
    }

    function buildResultRow(item, idx) {
      const a = document.createElement("a");
      a.className = "wiki-search-result" + (idx === selectedIdx ? " selected" : "");
      a.href = item.url;
      if (item.type === "external") {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      a.appendChild(el("span", "wiki-search-result-icon", item.icon || "•"));
      const text = el("span", "wiki-search-result-text");
      text.appendChild(el("div", "wiki-search-result-title", item.title));
      text.appendChild(el("div", "wiki-search-result-subtitle", item.subtitle));
      a.appendChild(text);
      a.appendChild(el("span", "wiki-search-result-arrow", "→"));
      a.addEventListener("click", () => closeSearch());
      a.addEventListener("mouseenter", () => {
        selectedIdx = idx;
        updateSelection();
      });
      return a;
    }

    function render() {
      while (results.firstChild) results.removeChild(results.firstChild);
      if (currentResults.length === 0) {
        results.appendChild(el("div", "wiki-search-empty", "Ingen treff. Prøv et annet søkeord."));
        return;
      }
      currentResults.forEach((item, idx) => {
        results.appendChild(buildResultRow(item, idx));
      });
      const sel = results.children[selectedIdx];
      if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: "nearest" });
    }

    function updateSelection() {
      const items = results.querySelectorAll(".wiki-search-result");
      items.forEach((node, i) => {
        node.classList.toggle("selected", i === selectedIdx);
      });
      const sel = items[selectedIdx];
      if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: "nearest" });
    }

    function filter(q) {
      if (!q.trim()) {
        currentResults = WIKI_INDEX.slice();
      } else {
        currentResults = WIKI_INDEX
          .map(item => ({ item, s: score(item, q) }))
          .filter(x => x.s > 0)
          .sort((a, b) => b.s - a.s)
          .map(x => x.item);
      }
      selectedIdx = 0;
      render();
    }

    input.addEventListener("input", e => filter(e.target.value));
    input.addEventListener("keydown", e => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIdx = Math.min(selectedIdx + 1, currentResults.length - 1);
        updateSelection();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIdx = Math.max(selectedIdx - 1, 0);
        updateSelection();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = currentResults[selectedIdx];
        if (target) {
          if (target.type === "external") {
            window.open(target.url, "_blank", "noopener,noreferrer");
          } else {
            window.location.href = target.url;
          }
          closeSearch();
        }
      } else if (e.key === "Escape") {
        closeSearch();
      }
    });

    overlay.addEventListener("click", e => {
      if (e.target === overlay) closeSearch();
    });
    trigger.addEventListener("click", openSearch);

    function openSearch() {
      overlay.classList.add("open");
      input.value = "";
      filter("");
      setTimeout(() => input.focus(), 30);
    }
    function closeSearch() {
      overlay.classList.remove("open");
    }

    window.openWikiSearch = openSearch;

    document.addEventListener("keydown", e => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const focusedTag = document.activeElement && document.activeElement.tagName;
      const isSlash = e.key === "/" && !overlay.classList.contains("open")
        && focusedTag !== "INPUT" && focusedTag !== "TEXTAREA";
      if (isCmdK || isSlash) {
        e.preventDefault();
        openSearch();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attach);
  } else {
    attach();
  }
})();
