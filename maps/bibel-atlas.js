/**
 * Bibel Atlas — master SVG + global locations registry
 *
 * One source of truth for bible-relevant geography. Each timeline page crops
 * to its region via viewBox, references locations by global ID.
 *
 * Coordinate system: viewBox 0 0 1000 540
 *   Projection: x = (lon - 22) * 35.71, y = (39 - lat) * 36
 *   This is approximate equirectangular — fine for stylized rendering.
 *
 * Adding a location: pick lat/lon, project to (x, y), add to LOCATIONS.
 * Adding a page: include this script, set cfg.map = { atlas: BibelAtlas, viewBox: "..." },
 *   reference locations by id in each phase's `locations: []` array.
 */
(function (global) {

  const LOCATIONS = {
    // ===== Egypt =====
    goshen:     { name: "Goshen", x: 350, y: 295, region: "egypt", labelDy: -10,
                  pages: ["moses-tidslinje.html", "1-mos-tidslinje.html", "2-mos-tidslinje.html"],
                  altNames: ["Pi-Ramses", "Land of Goshen"],
                  description: "Området i Nil-deltaet hvor israelittene bodde under slaveriet. Moses ble født her.",
                  scriptures: ["1. Mos 47,4", "2. Mos 9,26"] },
    memphis:    { name: "Memphis", x: 330, y: 327, region: "egypt", labelDy: 12,
                  altNames: ["Noph"],
                  description: "Egypts gamle hovedstad og religiøse senter. Profetene varslet dom over Memphis." },
    thebes:     { name: "Thebes", x: 379, y: 480, region: "egypt", labelDy: -10,
                  altNames: ["No-Amon", "Luxor"],
                  description: "Den øvre Egypts hovedstad, kjent for Karnak-templene." },
    alexandria: { name: "Alexandria", x: 285, y: 281, region: "egypt", labelDy: -10,
                  description: "Grunnlagt av Aleksander den store; senter for jødisk diaspora og Septuaginta-oversettelsen." },

    // ===== Sinai-halvøya & ørkenen =====
    sivsjoen:   { name: "Sivsjøen", x: 371, y: 313, region: "sinai", labelDy: 12,
                  pages: ["moses-tidslinje.html", "2-mos-tidslinje.html"],
                  altNames: ["Reed Sea", "Yam Suph"],
                  description: "Hvor Moses delte vannet og Israel gikk tørrskodd ut av Egypt.",
                  scriptures: ["2. Mos 14"] },
    horeb:      { name: "Sinai / Horeb", x: 425, y: 378, region: "sinai", labelDy: 12,
                  pages: ["moses-tidslinje.html", "2-mos-tidslinje.html", "3-mos-tidslinje.html", "5-mos-tidslinje.html"],
                  altNames: ["Mt Sinai", "Horeb-fjellet", "Guds fjell"],
                  description: "Fjellet hvor Moses møtte Gud i den brennende busken og senere mottok Ti bud.",
                  scriptures: ["2. Mos 3", "2. Mos 19–20", "1. Kong 19,8"] },
    kadesj:     { name: "Kadesj-Barnea", x: 446, y: 299, region: "sinai", labelDy: -10,
                  pages: ["moses-tidslinje.html", "4-mos-tidslinje.html"],
                  description: "Oase sør for Kanaan hvor Israel ble straffet til 40 år i ørkenen.",
                  scriptures: ["4. Mos 13–14", "4. Mos 20"] },

    // ===== Arabia / Midjan =====
    midjan:     { name: "Midjan", x: 488, y: 378, region: "arabia", labelDy: -10,
                  pages: ["moses-tidslinje.html", "2-mos-tidslinje.html"],
                  description: "Området hvor Moses flyktet etter å ha drept egypteren; bodde her i 40 år som hyrde hos Jetro.",
                  scriptures: ["2. Mos 2", "2. Mos 18"] },

    // ===== Kanaan =====
    jerusalem:  { name: "Jerusalem", x: 472, y: 260, region: "kanaan", labelDy: -10,
                  pages: ["david-tidslinje.html", "2-samuel-tidslinje.html"],
                  altNames: ["Salem", "Sion", "Jebus"],
                  description: "Davids by, tempelbyen, åstedet for korsfestelsen og pinsedagen.",
                  scriptures: ["2. Sam 5,7", "1. Kong 8", "Apg 2"] },
    hebron:     { name: "Hebron", x: 467, y: 269, region: "kanaan", labelDy: 12,
                  pages: ["abraham-tidslinje.html", "david-tidslinje.html", "1-mos-tidslinje.html", "2-samuel-tidslinje.html"],
                  altNames: ["Kirjat-Arba"],
                  description: "Patriarkenes by; Abraham, Isak og Jakob ligger begravet her. Davids første hovedstad i 7 år.",
                  scriptures: ["1. Mos 23", "2. Sam 2,11"] },
    bethlehem:  { name: "Betlehem", x: 471, y: 264, region: "kanaan", labelDy: 16,
                  pages: ["david-tidslinje.html", "1-samuel-tidslinje.html"],
                  altNames: ["Efrata"],
                  description: "Davids fødeby og Jesu fødested.",
                  scriptures: ["1. Sam 16", "Mika 5,2", "Luk 2"] },
    jericho:    { name: "Jeriko", x: 484, y: 263, region: "kanaan", labelDy: -10,
                  description: "Den første byen Israel erobret i Kanaan; murene falt etter 7 dagers marsj.",
                  scriptures: ["Jos 6"] },
    shechem:    { name: "Sikem", x: 472, y: 240, region: "kanaan", labelDy: -10,
                  pages: ["abraham-tidslinje.html", "1-mos-tidslinje.html"],
                  description: "Hvor Abraham bygde sitt første alter i Kanaan; senere et viktig religiøst senter.",
                  scriptures: ["1. Mos 12,6", "Jos 24"] },
    galilee:    { name: "Galileasjøen", x: 485, y: 223, region: "kanaan", labelDy: -10,
                  altNames: ["Kinneret", "Tiberias-sjøen", "Genesaret"],
                  description: "Innsjø i Galilea hvor Jesus virket mye av sin offentlige tjeneste." },
    megiddo:    { name: "Megiddo", x: 472, y: 231, region: "kanaan", labelDy: -10,
                  altNames: ["Harmageddon"],
                  description: "Strategisk festning ved Jisreel-dalen. Jesus' siste slag (åpenbaringsboken)." },
    samaria:    { name: "Samaria", x: 472, y: 244, region: "kanaan", labelDy: 14,
                  description: "Hovedstad i Nordriket, grunnlagt av Omri." },
    nazareth:   { name: "Nasaret", x: 476, y: 230, region: "kanaan", labelDy: 12,
                  description: "Jesu hjemby i Galilea." },
    bethel:     { name: "Betel", x: 475, y: 251, region: "kanaan", labelDy: -10,
                  pages: ["1-mos-tidslinje.html"],
                  description: "Hvor Jakob så himmelstigen.",
                  scriptures: ["1. Mos 28", "1. Mos 35"] },
    shilo:      { name: "Shilo", x: 475, y: 247, region: "kanaan", labelDy: 14,
                  pages: ["1-samuel-tidslinje.html"],
                  description: "Religiøst sentrum før Jerusalem; her sto tabernaklet i flere hundre år.",
                  scriptures: ["Jos 18,1", "1. Sam 1–4"] },
    gilgal:     { name: "Gilgal", x: 482, y: 261, region: "kanaan", labelDy: 14,
                  pages: ["1-samuel-tidslinje.html"],
                  description: "Israels første leir vest for Jordan; Saul ble salvet konge her." },
    gibea:      { name: "Gibea", x: 472, y: 258, region: "kanaan", labelDy: 16,
                  pages: ["saul-tidslinje.html", "1-samuel-tidslinje.html"],
                  description: "Sauls hjemby; Israels første kongsete." },
    beersheba:  { name: "Be'er Sheva", x: 458, y: 282, region: "kanaan", labelDy: 12,
                  description: "Sørgrensen av Israel; Abraham og Isak gravde brønner her." },
    gaza:       { name: "Gaza", x: 449, y: 268, region: "kanaan", labelDy: -10,
                  description: "Filisterbyenes største; hvor Samson døde." },
    askelon:    { name: "Askelon", x: 451, y: 263, region: "kanaan", labelDy: 14,
                  description: "Filisterby ved kysten." },
    jaffa:      { name: "Jaffa", x: 455, y: 252, region: "kanaan", labelDy: -10,
                  altNames: ["Joppe"],
                  description: "Havneby; Peters visjon (Apg 10), Jonas' flukt (Jonas 1)." },
    aijalon:    { name: "Ajjalon", x: 463, y: 257, region: "kanaan", labelDy: 16,
                  description: "Dalen hvor solen sto stille for Josva.",
                  scriptures: ["Jos 10,12"] },
    lakish:     { name: "Lakisj", x: 457, y: 267, region: "kanaan", labelDy: 14,
                  description: "Festningsby i Juda; falt for Sankerib." },
    hasor:      { name: "Hasor", x: 480, y: 219, region: "kanaan", labelDy: -10,
                  description: "Største kanaaneerby; ødelagt av Josva.",
                  scriptures: ["Jos 11"] },
    bethshean:  { name: "Bet-Sjean", x: 484, y: 230, region: "kanaan", labelDy: 14,
                  pages: ["saul-tidslinje.html", "1-samuel-tidslinje.html"],
                  description: "Hvor Sauls lik ble hengt opp av filisterne." },
    endor:      { name: "Endor", x: 478, y: 228, region: "kanaan", labelDy: -10,
                  pages: ["saul-tidslinje.html", "1-samuel-tidslinje.html"],
                  description: "Hvor Saul oppsøkte spåkvinnen." },
    adullam:    { name: "Adullam", x: 462, y: 263, region: "kanaan", labelDy: -10,
                  pages: ["david-tidslinje.html", "1-samuel-tidslinje.html"],
                  description: "Hulen der David samlet sine menn på flukt fra Saul." },
    mtkarmel:   { name: "Mt Karmel", x: 467, y: 226, region: "kanaan", labelDy: -10,
                  description: "Hvor Elia konfronterte Baals profeter.",
                  scriptures: ["1. Kong 18"] },
    mthermon:   { name: "Mt Hermon", x: 495, y: 202, region: "kanaan", labelDy: -10,
                  description: "Det høyeste fjellet i området; mulig sted for forklarelsen." },
    mttabor:    { name: "Mt Tabor", x: 478, y: 227, region: "kanaan", labelDy: 14,
                  description: "Debora og Barak samlet hæren her.",
                  scriptures: ["Dom 4"] },
    tyre:       { name: "Tyrus", x: 471, y: 206, region: "fenikia", labelDy: -10,
                  description: "Fønikisk handelsby; leverte sedertre til Salomos tempel." },
    sidon:      { name: "Sidon", x: 477, y: 196, region: "fenikia", labelDy: -10,
                  description: "Eldste fønikiske byen." },

    // ===== Trans-Jordan =====
    moab:       { name: "Moab-sletten", x: 489, y: 275, region: "moab", labelDy: 12,
                  pages: ["moses-tidslinje.html", "4-mos-tidslinje.html", "5-mos-tidslinje.html"],
                  description: "Slettelandet øst for Jordan og Dødehavet hvor Moses holdt sine avskjedstaler.",
                  scriptures: ["5. Mos 1,1", "5. Mos 34"] },
    nebo:       { name: "Nebo-fjellet", x: 488, y: 260, region: "moab", labelDy: -10,
                  pages: ["moses-tidslinje.html", "5-mos-tidslinje.html"],
                  description: "Fjellet hvor Moses så Det lovede land og døde, 120 år gammel.",
                  scriptures: ["5. Mos 34"] },
    hesbon:     { name: "Hesbon", x: 493, y: 259, region: "moab", labelDy: 14,
                  pages: ["4-mos-tidslinje.html"],
                  description: "Amoritterkongen Sihons hovedstad; Israel erobret den under ørkenvandringen." },
    rabba:      { name: "Rabba (Amman)", x: 498, y: 256, region: "moab", labelDy: -10,
                  description: "Ammonittenes hovedstad." },
    penuel:     { name: "Penuel", x: 489, y: 247, region: "moab", labelDy: -10,
                  pages: ["1-mos-tidslinje.html"],
                  altNames: ["Pniel", "Jabbok-vadestedet"],
                  description: "Hvor Jakob brøt med Gud og fikk navnet Israel.",
                  scriptures: ["1. Mos 32,22-32"] },
    edom:       { name: "Edom", x: 480, y: 295, region: "edom", labelDy: 12,
                  description: "Esau's etterkommere; lå sør for Dødehavet." },

    // ===== Syria =====
    damascus:   { name: "Damaskus", x: 511, y: 196, region: "syria", labelDy: -10,
                  description: "En av de eldste byene i verden; Pauli omvendelse skjedde på veien hit.",
                  scriptures: ["Apg 9,1-19"] },
    aram:       { name: "Aram", x: 540, y: 175, region: "syria", labelDy: -10,
                  description: "Området nord for Israel; jevnlig fiende av Israel under kongetiden." },
    haran:      { name: "Haran", x: 608, y: 77, region: "syria", labelDy: -10,
                  pages: ["abraham-tidslinje.html", "1-mos-tidslinje.html"],
                  description: "Hvor Abraham bodde etter Ur, og hvor Tarah døde. Også hvor Jakob fant sine koner.",
                  scriptures: ["1. Mos 11,31-32", "1. Mos 28–29"] },

    // ===== Syria =====
    // (damascus, aram, haran defined above; expand metadata)

    // ===== Mesopotamia =====
    babylon:    { name: "Babylon", x: 800, y: 232, region: "babylonia", labelDy: -10,
                  pages: ["1-mos-tidslinje.html"],
                  description: "Den store byen ved Eufrat; senter for det babylonske eksilet (586–538 f.Kr.). Babels tårn, Daniel, Nebukadnesar.",
                  scriptures: ["1. Mos 11", "Dan 1–6", "2. Kong 25"] },
    ur:         { name: "Ur", x: 861, y: 290, region: "babylonia", labelDy: 12,
                  pages: ["abraham-tidslinje.html", "1-mos-tidslinje.html"],
                  altNames: ["Ur Kasdim"],
                  description: "Abrahams fødeby; han forlot den for Haran og siden Kanaan.",
                  scriptures: ["1. Mos 11,28", "1. Mos 15,7"] },
    nineveh:    { name: "Ninive", x: 756, y: 95, region: "assyria", labelDy: -10,
                  description: "Assyrias hovedstad; Jonas forkynte omvendelse her, og byen ble senere ødelagt av babylonerne 612 f.Kr.",
                  scriptures: ["Jonas 1–4", "Nahum"] },
    assur:      { name: "Assur", x: 740, y: 130, region: "assyria", labelDy: 12,
                  description: "Assyrias gamle religiøse senter; navnet på riket og hovedguden." },

    // ===== Persia =====
    susa:       { name: "Susa", x: 937, y: 245, region: "persia", labelDy: -10,
                  altNames: ["Susan", "Sjusjan"],
                  description: "Persias vinterhovedstad; hjemby for Ester og Daniel under perserkongene.",
                  scriptures: ["Ester 1–10", "Dan 8,2", "Neh 1,1"] },

    // ===== Anatolia / Hellas (NT-relevant) =====
    tarsus:     { name: "Tarsus", x: 461, y: 75, region: "anatolia", labelDy: -10,
                  description: "Apostelen Paulus' fødeby." },
    antioch:    { name: "Antiokia", x: 506, y: 101, region: "syria", labelDy: 12,
                  description: "Hvor disiplene først ble kalt 'kristne'; Paulus' utgangspunkt for misjonsreisene.",
                  scriptures: ["Apg 11,26", "Apg 13,1"] },
    ephesus:    { name: "Efesos", x: 191, y: 38, region: "anatolia", labelDy: -10,
                  description: "Stor hellenistisk by; sentral i Paulus' virke. Brevet til Efeserne.",
                  scriptures: ["Apg 19", "Ef 1–6"] },
    pisidia:    { name: "Antiokia (Pisidia)", x: 321, y: 40, region: "anatolia", labelDy: 12,
                  description: "Stoppested på Paulus' første misjonsreise." },
    ikonium:    { name: "Ikonium", x: 374, y: 41, region: "anatolia", labelDy: -10,
                  description: "By hvor Paulus og Barnabas grunnla menighet." },
    athens:     { name: "Aten", x: 62, y: 37, region: "hellas", labelDy: -10,
                  description: "Hvor Paulus talte på Areopagos om 'den ukjente Gud'.",
                  scriptures: ["Apg 17,16-34"] },
    corinth:    { name: "Korint", x: 34, y: 38, region: "hellas", labelDy: 12,
                  description: "Stor handelsby; Paulus' brev 1. og 2. Korinterbrev.",
                  scriptures: ["Apg 18", "1. Kor", "2. Kor"] },

    // ===== Øyer =====
    cyprus:     { name: "Kypros",      x: 393, y: 144, region: "oyer",    labelDy: -10 },
    crete:      { name: "Kreta",       x: 100, y: 137, region: "oyer",    labelDy: -10 }
  };

  // SVG geography — coastlines, water, rivers, region labels.
  // Coordinates use the projection: x = (lon - 22) * 35.71, y = (39 - lat) * 36.
  // So Egypt N coast (lat ~31.2) is at y ≈ 281, Anatolia S coast (lat ~36.5) at y ≈ 90.
  const GEO_SVG = `
    <rect class="land" x="0" y="0" width="1000" height="540" />

    <!-- ========== MEDITERRANEAN ========== -->
    <!-- Naturalistic horizontal blob.
         Levant E coast aligned to real geography:
           Antakya (506,101), Beirut (482,184), Tyre (471,206), Haifa (464,222),
           Jaffa (456,249), Gaza area (450,270), Sinai NE (455,275). -->
    <path class="water" d="
      M 0,70
      C 30,72 80,75 130,78
      C 175,82 215,90 250,95
      C 270,99 285,98 295,92
      C 305,85 320,80 340,82
      C 365,86 390,95 415,99
      C 435,102 455,103 475,104
      C 495,103 506,101 506,101
      C 495,135 484,170 478,200
      C 470,225 462,250 455,275
      L 450,280
      C 415,288 370,290 320,285
      C 240,280 160,278 80,277
      L 0,277
      L 0,70
      Z
    " />
    <path class="coast" d="
      M 0,277 C 80,277 160,278 240,280 C 320,285 370,290 415,288 L 450,280 L 455,275
      C 462,250 470,225 478,200 C 484,170 495,135 506,101
      C 495,103 475,104 455,103 C 435,102 415,99 390,95
      C 365,86 340,82 320,80 C 305,85 295,92 285,98
      C 270,99 250,95 215,90 C 175,82 130,78 80,75 C 30,72 0,70 0,70
    " />

    <!-- ========== CYPRUS (clearer island in Mediterranean) ========== -->
    <ellipse class="land" cx="395" cy="148" rx="20" ry="6" />
    <path class="coast" d="M 376,150 Q 395,142 414,150 Q 395,156 376,150 Z" />

    <!-- ========== CRETE (more visible) ========== -->
    <ellipse class="land" cx="100" cy="138" rx="35" ry="5" />
    <path class="coast" d="M 65,140 Q 100,131 135,140 Q 100,145 65,140 Z" />

    <!-- ========== BLACK SEA hint (mostly off-frame top, narrow strip near top edge) ========== -->
    <path class="water" d="
      M 660,0 L 1000,0 L 1000,40
      C 920,42 850,40 780,32
      C 720,25 680,15 660,8 Z
    " />

    <!-- ========== GULF OF SUEZ (between Egypt and Sinai) ========== -->
    <path class="water" d="
      M 365,316 L 385,318 L 395,355 L 405,395 L 412,420 L 405,425 L 395,402 L 380,360 L 365,316 Z
    " />

    <!-- ========== GULF OF AQABA (between Sinai and Arabia) ========== -->
    <path class="water" d="
      M 442,326 L 462,322 L 467,358 L 458,395 L 442,425 L 432,420 L 432,395 L 442,360 L 442,326 Z
    " />

    <!-- ========== RED SEA (south of Sinai, off-frame bottom) ========== -->
    <path class="water" d="
      M 405,425 L 412,420 L 432,425 L 442,427 L 460,435 L 488,460 L 520,500 L 540,540 L 405,540 Z
    " />

    <!-- ========== PERSIAN GULF ========== -->
    <!-- North coast: long curve from where Tigris+Euphrates meet (x~860, y~290)
         eastward and southward to off-frame at bottom-right. -->
    <path class="water" d="
      M 855,295
      C 870,310 890,330 910,348
      C 935,372 955,395 975,420
      C 985,440 985,470 970,495
      L 990,540
      L 1000,540
      L 1000,280
      C 970,285 920,290 855,295
      Z
    " />
    <path class="coast" d="
      M 855,295 C 870,310 890,330 910,348 C 935,372 955,395 975,420 C 985,440 985,470 970,495
    " />

    <!-- ========== CASPIAN SEA hint (right edge) ========== -->
    <path class="water" d="
      M 985,40 L 1000,40 L 1000,250 L 990,248 C 985,180 982,110 985,40 Z
    " />

    <!-- ========== DEAD SEA ========== -->
    <ellipse class="water" cx="482" cy="263" rx="3.5" ry="13" />

    <!-- ========== SEA OF GALILEE ========== -->
    <ellipse class="water" cx="485" cy="223" rx="3" ry="5" />

    <!-- ========== NILE RIVER ========== -->
    <path class="water-line" d="M 322,540 C 320,470 314,400 308,340 C 304,310 312,290 327,288" />
    <!-- Delta forks -->
    <path class="water-line" d="M 327,288 L 318,278" />
    <path class="water-line" d="M 327,288 L 333,278" />
    <path class="water-line" d="M 327,288 L 348,279" />

    <!-- ========== JORDAN RIVER ========== -->
    <path class="water-line" d="M 485,228 C 484,235 483,245 482,250" />

    <!-- ========== TIGRIS ========== -->
    <path class="water-line" d="M 745,80 C 765,140 790,200 815,250 C 840,285 865,300 870,290" />

    <!-- ========== EUPHRATES ========== -->
    <path class="water-line" d="M 580,55 C 620,120 680,180 740,235 C 800,275 855,295 870,290" />

    <!-- ============ REGION LABELS ============ -->
    <text class="region-label" x="290" y="380">Egypt</text>
    <text class="region-label" x="408" y="365">Sinai</text>
    <text class="region-label" x="525" y="415">Arabia</text>
    <text class="region-label kanaan" x="430" y="240">Kanaan</text>
    <text class="region-label" x="510" y="280">Moab</text>
    <text class="region-label" x="525" y="160">Syria</text>
    <text class="region-label" x="690" y="155">Mesopotamia</text>
    <text class="region-label" x="820" y="220">Babylonia</text>
    <text class="region-label" x="455" y="50">Anatolia</text>
    <text class="region-label" x="50" y="55">Hellas</text>
    <text class="region-label" x="920" y="190">Persia</text>

    <!-- ============ WATER LABELS ============ -->
    <text class="water-label" x="220" y="170">Middelhavet</text>
    <text class="water-label" x="455" y="510" transform="rotate(75 455 510)">Rødehavet</text>
    <text class="water-label" x="890" y="430" transform="rotate(-52 890 430)">Persiske gulf</text>
    <text class="water-label" x="990" y="160" transform="rotate(-90 990 160)">Kaspia</text>
    <text class="water-label" x="780" y="22">Svartehavet</text>
  `;

  function render(svgEl, options) {
    options = options || {};
    svgEl.setAttribute("viewBox", options.viewBox || "0 0 1000 540");
    if (options.preserveAspectRatio) {
      svgEl.setAttribute("preserveAspectRatio", options.preserveAspectRatio);
    }
    // Inject geography at the start so markers (added later) render on top.
    svgEl.insertAdjacentHTML("afterbegin", GEO_SVG);
  }

  function parseVB(s) {
    const p = String(s).trim().split(/\s+/).map(Number);
    return { x: p[0], y: p[1], w: p[2], h: p[3] };
  }

  /**
   * Attach pan + zoom + pinch + dblclick + keyboard to an SVG element.
   * @param {SVGSVGElement} svgEl  — the .map-svg element
   * @param {object} options
   *   onChange(vb)       — called whenever viewBox changes (cheap; for scale/CSS updates)
   *   onChangeDebounced(vb) — called after viewBox settles (~100ms; for collision detection)
   *   minViewBoxWidth    — min zoom-in width (default 60)
   *   maxViewBoxWidth    — max zoom-out width (default fullVB.w * 1.2)
   * @returns {object} controller — { zoomBy, reset, zoomToLocation, getViewBox }
   */
  function attachInteraction(svgEl, options) {
    options = options || {};
    const FULL_VB = parseVB(svgEl.getAttribute("viewBox") || "0 0 1000 540");
    let currentVB = { ...FULL_VB };

    const MIN_W = options.minViewBoxWidth || 60;
    const MAX_W = options.maxViewBoxWidth || FULL_VB.w * 1.2;

    let debounceTimer = null;
    function applyVB() {
      svgEl.setAttribute("viewBox",
        currentVB.x + " " + currentVB.y + " " + currentVB.w + " " + currentVB.h);
      if (options.onChange) options.onChange(currentVB);
      if (options.onChangeDebounced) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => options.onChangeDebounced(currentVB), 100);
      }
    }

    function clientToSvgPoint(clientX, clientY) {
      const pt = svgEl.createSVGPoint();
      pt.x = clientX; pt.y = clientY;
      return pt.matrixTransform(svgEl.getScreenCTM().inverse());
    }

    function zoomBy(factor, centerClientX, centerClientY) {
      const newW = currentVB.w * factor;
      if (newW < MIN_W || newW > MAX_W) return;
      let cx, cy;
      if (centerClientX != null) {
        const sp = clientToSvgPoint(centerClientX, centerClientY);
        cx = sp.x; cy = sp.y;
      } else {
        cx = currentVB.x + currentVB.w / 2;
        cy = currentVB.y + currentVB.h / 2;
      }
      currentVB.x = cx - (cx - currentVB.x) * factor;
      currentVB.y = cy - (cy - currentVB.y) * factor;
      currentVB.w = newW;
      currentVB.h = currentVB.h * factor;
      applyVB();
    }

    function reset() {
      currentVB = { ...FULL_VB };
      applyVB();
    }

    function zoomToLocation(loc, w) {
      const targetW = w || (FULL_VB.w * 0.2);
      const targetH = targetW * (FULL_VB.h / FULL_VB.w);
      currentVB = {
        x: loc.x - targetW / 2,
        y: loc.y - targetH / 2,
        w: targetW,
        h: targetH
      };
      applyVB();
    }

    // Wheel zoom around cursor
    svgEl.addEventListener("wheel", (e) => {
      e.preventDefault();
      zoomBy(e.deltaY > 0 ? 1.18 : 1 / 1.18, e.clientX, e.clientY);
    }, { passive: false });

    // Pointer-based pan + pinch
    const pointers = new Map();
    let dragState = null;
    let pinchState = null;

    function pointerDistance(pts) {
      const dx = pts[0].x - pts[1].x, dy = pts[0].y - pts[1].y;
      return Math.hypot(dx, dy);
    }
    function pointerMidpoint(pts) {
      return { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
    }

    svgEl.addEventListener("pointerdown", (e) => {
      // Don't intercept marker/interactive children
      if (e.target.closest && e.target.closest(".place-marker, .marker-ring, .marker-num, .marker-label, .place-dot")) {
        return;
      }
      svgEl.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 1) {
        svgEl.classList.add("dragging");
        dragState = {
          sx: e.clientX, sy: e.clientY,
          vbx: currentVB.x, vby: currentVB.y
        };
      } else if (pointers.size === 2) {
        dragState = null;
        svgEl.classList.remove("dragging");
        const pts = [...pointers.values()];
        const mid = pointerMidpoint(pts);
        pinchState = {
          startDist: pointerDistance(pts),
          startVB: { ...currentVB },
          center: clientToSvgPoint(mid.x, mid.y)
        };
      }
    });
    svgEl.addEventListener("pointermove", (e) => {
      if (pointers.has(e.pointerId)) {
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }
      if (pinchState && pointers.size === 2) {
        const pts = [...pointers.values()];
        const dist = pointerDistance(pts);
        if (!dist) return;
        const factor = pinchState.startDist / dist;
        const newW = pinchState.startVB.w * factor;
        if (newW < MIN_W || newW > MAX_W) return;
        currentVB.x = pinchState.center.x - (pinchState.center.x - pinchState.startVB.x) * factor;
        currentVB.y = pinchState.center.y - (pinchState.center.y - pinchState.startVB.y) * factor;
        currentVB.w = newW;
        currentVB.h = pinchState.startVB.h * factor;
        applyVB();
        return;
      }
      if (dragState && pointers.size === 1) {
        const rect = svgEl.getBoundingClientRect();
        const dx = (e.clientX - dragState.sx) * (currentVB.w / rect.width);
        const dy = (e.clientY - dragState.sy) * (currentVB.h / rect.height);
        currentVB.x = dragState.vbx - dx;
        currentVB.y = dragState.vby - dy;
        applyVB();
      }
    });
    function endPointer(e) {
      if (pointers.has(e.pointerId)) pointers.delete(e.pointerId);
      if (pointers.size < 2) pinchState = null;
      if (pointers.size === 0) {
        dragState = null;
        svgEl.classList.remove("dragging");
      }
      try { svgEl.releasePointerCapture(e.pointerId); } catch (_) {}
    }
    svgEl.addEventListener("pointerup", endPointer);
    svgEl.addEventListener("pointercancel", endPointer);
    svgEl.addEventListener("pointerleave", endPointer);

    // Double-click / double-tap → zoom in 2x (Shift = zoom out)
    svgEl.addEventListener("dblclick", (e) => {
      if (e.target.closest && e.target.closest(".place-marker, .place-dot")) return;
      e.preventDefault();
      zoomBy(e.shiftKey ? 2 : 0.5, e.clientX, e.clientY);
    });

    // Block native pinch on touch (we handle it)
    svgEl.addEventListener("touchstart", (e) => {
      if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });
    svgEl.addEventListener("touchmove", (e) => {
      if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });

    // Keyboard
    function onKey(e) {
      if (e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) return;
      if (e.key === "+" || e.key === "=") { zoomBy(1 / 1.3); }
      else if (e.key === "-" || e.key === "_") { zoomBy(1.3); }
      else if (e.key === "0") { reset(); }
    }
    window.addEventListener("keydown", onKey);

    // Initial fire so consumers can compute scale on mount
    requestAnimationFrame(() => {
      if (options.onChange) options.onChange(currentVB);
      if (options.onChangeDebounced) options.onChangeDebounced(currentVB);
    });

    return {
      zoomBy: zoomBy,
      reset: reset,
      zoomToLocation: zoomToLocation,
      getViewBox: () => ({ ...currentVB }),
      getFullViewBox: () => ({ ...FULL_VB }),
      destroy: () => window.removeEventListener("keydown", onKey)
    };
  }

  /**
   * Compute scale factor for the SVG (viewBox.w / rendered.w, max with vertical).
   * Used to set --map-scale CSS variable for consistent screen-px sizing.
   */
  function computeScale(svgEl) {
    const vb = svgEl.viewBox && svgEl.viewBox.baseVal;
    const rect = svgEl.getBoundingClientRect();
    if (!vb || !vb.width || !rect.width || !rect.height) return 1;
    return Math.max(vb.width / rect.width, vb.height / rect.height);
  }

  /**
   * Compute "region fade" opacity based on current vs full viewBox width.
   * Smooth fade so timeline pages (ratio ~0.3) still show region context.
   *   ratio >= 0.5 → 0.65 (full)
   *   ratio <= 0.05 → 0 (invisible at single-city zoom)
   *   linear in between
   */
  function computeRegionFade(currentW, fullW) {
    const ratio = currentW / fullW;
    const t = (ratio - 0.05) / (0.5 - 0.05);
    return Math.max(0, Math.min(0.65, t * 0.65));
  }

  /**
   * Hide overlapping place labels. Priority: places with `pages` win.
   */
  function applyLabelCollision(svgEl) {
    const labels = [...svgEl.querySelectorAll(".place-label-soft")];
    labels.forEach(l => l.classList.remove("collide-hidden"));
    // Sort: has-pages first, then alphabetical for stable order
    labels.sort((a, b) => {
      const aId = a.getAttribute("data-loc"), bId = b.getAttribute("data-loc");
      const aLoc = LOCATIONS[aId], bLoc = LOCATIONS[bId];
      const aHas = !!(aLoc && aLoc.pages && aLoc.pages.length);
      const bHas = !!(bLoc && bLoc.pages && bLoc.pages.length);
      if (aHas !== bHas) return bHas - aHas;
      return aId < bId ? -1 : 1;
    });
    const visible = [];
    labels.forEach(l => {
      const bb = l.getBoundingClientRect();
      if (!bb.width || !bb.height) return;
      // Add small margin
      const m = 2;
      const expanded = {
        left: bb.left - m, right: bb.right + m,
        top: bb.top - m, bottom: bb.bottom + m
      };
      const collides = visible.some(v =>
        expanded.left < v.right && expanded.right > v.left &&
        expanded.top < v.bottom && expanded.bottom > v.top
      );
      if (collides) l.classList.add("collide-hidden");
      else visible.push(expanded);
    });
  }

  global.BibelAtlas = {
    fullViewBox: "0 0 1000 540",
    locations: LOCATIONS,
    geoSvg: GEO_SVG,
    render: render,
    attachInteraction: attachInteraction,
    computeScale: computeScale,
    computeRegionFade: computeRegionFade,
    applyLabelCollision: applyLabelCollision
  };
})(window);
