/**
 * Wiki page rendering engine — shared by all bibel-wiki timeline pages.
 *
 * Each page calls WikiPage.init({ ... }) once with config + data.
 * The engine handles cards, axis ticks/brackets, detail panel, hash routing.
 *
 * See CLAUDE.md in the repo root for the full conventions.
 *
 * Required DOM (each page must have these IDs):
 *   #cardsRow      — receives card elements
 *   #ticks         — receives tick + tick-label elements
 *   #brackets      — receives bracket elements
 *   #detail        — receives the detail panel content
 *
 * Optional DOM:
 *   #turningMarker — when config.turningPoint is set
 */

(function (global) {
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function notionKey(label) {
    return label
      .replace(/\s+\d+[–-]\d+.*$/, "")  // strip "12–50" chapter ranges
      .replace(/\s*\(.*\)\s*$/, "")     // strip "(slutt)" notes
      .trim();
  }

  function init(cfg) {
    const data        = cfg.data;
    const cols        = cfg.cols || 8;
    const cardLabel   = cfg.cardLabel || "FASE";
    const axis        = cfg.axis;
    const defaultId   = cfg.defaultId;
    const pageUrls    = cfg.pageUrls || {};
    const notionUrls  = cfg.notionUrls || {};
    const birthYear   = cfg.birthYear; // optional — enables age calc on person pages

    const totalSpan   = axis.end - axis.start;
    const pct = (v) => ((v - axis.start) / totalSpan) * 100;

    function ageAt(year) {
      if (birthYear == null || year == null) return null;
      // BC dates are negative; age = year - birthYear (both negative makes a positive age).
      return Math.max(0, Math.round(year - birthYear));
    }
    function ageLabel(item) {
      if (birthYear == null) return null;
      const a1 = ageAt(item.start);
      const a2 = ageAt(item.end);
      if (a1 == null || a2 == null) return null;
      if (a1 === a2) return "Alder " + a1;
      return "Alder " + a1 + "–" + a2;
    }

    function lookupUrl(label) {
      const key = notionKey(label);
      if (pageUrls[key])   return { url: pageUrls[key],   local: true };
      if (notionUrls[key]) return { url: notionUrls[key], local: false };
      return null;
    }

    const cardsRow      = document.getElementById("cardsRow");
    const ticksContainer = document.getElementById("ticks");
    const bracketsContainer = document.getElementById("brackets");
    const detailEl      = document.getElementById("detail");

    if (cardsRow && cols) cardsRow.classList.add("cols-" + cols);

    const cardNodes    = {};
    const bracketNodes = {};

    // Find max duration for the duration-bar fill width
    const maxDuration = data.reduce((m, item) => {
      const d = (item.end != null && item.start != null) ? Math.abs(item.end - item.start) : 0;
      return Math.max(m, d);
    }, 1);

    function buildCard(item) {
      const variantCls = item.variant ? " " + item.variant : "";
      const card = el("div", "card" + variantCls);
      card.id = "card-" + item.id;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", item.title + ", " + (item.label || ""));

      card.appendChild(el("div", "card-num", cardLabel + " " + item.num));
      card.appendChild(el("h3", "card-title", item.title));
      card.appendChild(el("div", axis.isChapters ? "card-chap" : "card-years", item.label || ""));

      const age = ageLabel(item);
      if (age) card.appendChild(el("div", "card-age", age));

      // Duration bar — only shown for year-axis when start/end given
      if (!axis.isChapters && item.start != null && item.end != null) {
        const duration = Math.abs(item.end - item.start);
        const durationPct = (duration / maxDuration) * 100;
        const durRow = el("div", "card-duration");
        const track = el("div", "card-duration-track");
        const fill = el("div", "card-duration-fill");
        fill.style.width = Math.max(durationPct, 4) + "%";
        track.appendChild(fill);
        durRow.appendChild(track);
        durRow.appendChild(el("span", "card-duration-label", Math.max(1, Math.round(duration)) + " år"));
        card.appendChild(durRow);
      }

      if (item.bottomTag) {
        card.appendChild(el("div", "card-tag " + (item.bottomTag.class || ""), item.bottomTag.text));
      } else if (item.bottomArc) {
        card.appendChild(el("div", "card-arc", item.bottomArc));
      } else if (item.bottomProtag) {
        card.appendChild(el("div", "card-protag", item.bottomProtag));
      }

      card.addEventListener("click", () => selectItem(item.id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectItem(item.id);
        }
      });
      return card;
    }

    function buildBracket(item) {
      const variantCls = item.variant ? " " + item.variant : "";
      const bracket = el("div", "bracket" + variantCls);
      bracket.id = "bracket-" + item.id;
      const left = pct(item.start);
      const width = Math.max(pct(item.end + (axis.isChapters ? 1 : 0)) - left, 1);
      bracket.style.left = left + "%";
      bracket.style.width = width + "%";

      bracket.appendChild(el("div", "bracket-bar"));
      bracket.appendChild(el("div", "bracket-cap left"));
      bracket.appendChild(el("div", "bracket-cap right"));
      bracket.appendChild(el("div", "bracket-num", item.num));
      return bracket;
    }

    function renderCardsAndBrackets() {
      data.forEach(item => {
        const card = buildCard(item);
        cardsRow.appendChild(card);
        cardNodes[item.id] = card;

        const bracket = buildBracket(item);
        bracketsContainer.appendChild(bracket);
        bracketNodes[item.id] = bracket;
      });
    }

    function renderTicks() {
      const tickStep = axis.tickStep || (axis.isChapters ? 1 : 10);
      const majorStep = axis.majorStep || (axis.isChapters ? 5 : 20);
      const start = axis.tickStart != null ? axis.tickStart : axis.start;
      const end = axis.tickEnd != null ? axis.tickEnd : axis.end;

      for (let v = start; v <= end; v += tickStep) {
        const isMajor = (v === start) || (v === end) || (v % majorStep === 0);
        const tick = el("div", "tick" + (isMajor ? " major" : ""));
        tick.style.left = pct(v) + "%";
        ticksContainer.appendChild(tick);

        if (isMajor) {
          const labelText = axis.isChapters
            ? "Kap " + v
            : Math.abs(v) + " f.Kr.";
          const label = el("div", "tick-label", labelText);
          label.style.left = pct(v) + "%";
          ticksContainer.appendChild(label);
        }
      }
    }

    function renderTurningPoint() {
      if (!cfg.turningPoint) return;
      const tm = document.getElementById("turningMarker");
      if (!tm) return;
      tm.style.left = pct(cfg.turningPoint.value) + "%";
      if (cfg.turningPoint.label) {
        tm.setAttribute("data-label", cfg.turningPoint.label);
      }
    }

    function renderTagGroup(parent, label, items, tagClass) {
      if (!items || !items.length) return;
      const sec = el("div", "section");
      sec.appendChild(el("h3", null, label));
      const tags = el("div", "tags");
      items.forEach(item => {
        const link = lookupUrl(item);
        const cls = "tag"
          + (tagClass ? " " + tagClass : "")
          + (link ? " linked" : "")
          + (link && link.local ? " local" : "");
        if (link) {
          const a = el("a", cls, item);
          a.href = link.url;
          if (!link.local) {
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.title = "Åpne " + notionKey(item) + " i Notion";
          } else {
            a.title = "Åpne tidslinje for " + notionKey(item);
          }
          tags.appendChild(a);
        } else {
          tags.appendChild(el("span", cls, item));
        }
      });
      sec.appendChild(tags);
      parent.appendChild(sec);
    }

    // ---------- Map (optional) ----------
    const SVG_NS = "http://www.w3.org/2000/svg";
    function svgEl(tag, attrs) {
      const node = document.createElementNS(SVG_NS, tag);
      if (attrs) Object.keys(attrs).forEach(k => node.setAttribute(k, attrs[k]));
      return node;
    }

    const mapCfg     = cfg.map;
    const mapSvg     = mapCfg ? document.querySelector(".map-svg") : null;
    const mapBg      = mapCfg ? document.getElementById("map-bg-places") : null;
    const mapMarkers = mapCfg ? document.getElementById("map-markers")   : null;
    const mapRoute   = mapCfg ? document.getElementById("map-route")     : null;
    const mapCurrent = mapCfg ? document.getElementById("mapCurrent")    : null;
    const hasMap     = mapCfg && mapSvg && mapMarkers && mapRoute;

    // Atlas mode: cfg.map.atlas provides a globally-shared geography + locations.
    // Inline mode: cfg.map.locations is supplied directly by the page.
    const mapLocations = mapCfg && mapCfg.atlas ? mapCfg.atlas.locations : (mapCfg && mapCfg.locations);

    if (hasMap && mapCfg.atlas) {
      mapCfg.atlas.render(mapSvg, { viewBox: mapCfg.viewBox });
      // Set CSS aspect-ratio matching viewBox so the SVG element's box matches
      // its content — no letterboxing from preserveAspectRatio="xMidYMid meet".
      const vb = mapSvg.viewBox.baseVal;
      if (vb.width && vb.height) {
        mapSvg.style.aspectRatio = vb.width + " / " + vb.height;
      }
    }

    function updateMapVars() {
      if (!hasMap) return;
      const Atlas = mapCfg.atlas;
      if (Atlas && Atlas.computeScale) {
        const s = Atlas.computeScale(mapSvg);
        mapSvg.style.setProperty("--map-scale", String(s));
        const vb = mapSvg.viewBox.baseVal;
        if (Atlas.computeRegionFade && vb && vb.width) {
          const fullW = parseFloat(Atlas.fullViewBox.split(/\s+/)[2]) || vb.width;
          mapSvg.style.setProperty("--region-fade",
            String(Atlas.computeRegionFade(vb.width, fullW)));
        }
      }
    }

    function renderMapBackground() {
      if (!hasMap || !mapBg || !mapLocations) return;
      Object.entries(mapLocations).forEach(([id, loc]) => {
        const dot = svgEl("circle", {
          cx: loc.x, cy: loc.y,
          class: "place-dot",
          "data-loc": id
        });
        // Pages-based "important" places get a gold tint
        if (loc.pages && loc.pages.length) dot.classList.add("has-pages");
        mapBg.appendChild(dot);

        const label = svgEl("text", {
          x: loc.x,
          y: loc.y,
          "text-anchor": "middle",
          class: "place-label-soft",
          "data-loc": id
        });
        label.style.setProperty("--label-dy", String(loc.labelDy < 0 ? -8 : 12));
        label.textContent = loc.name;
        mapBg.appendChild(label);
      });
    }

    function renderMapForItem(item) {
      if (!hasMap || !mapLocations) return;
      while (mapMarkers.firstChild) mapMarkers.removeChild(mapMarkers.firstChild);
      while (mapRoute.firstChild)   mapRoute.removeChild(mapRoute.firstChild);

      const ids = (item.locations || []).filter(id => mapLocations[id]);
      const activeSet = new Set(ids);

      if (mapBg) {
        mapBg.querySelectorAll("[data-loc]").forEach(node => {
          const id = node.getAttribute("data-loc");
          node.style.display = activeSet.has(id) ? "none" : "";
        });
      }

      if (mapCurrent) {
        while (mapCurrent.firstChild) mapCurrent.removeChild(mapCurrent.firstChild);
        mapCurrent.appendChild(el("span", "num",
          cardLabel.charAt(0) + cardLabel.slice(1).toLowerCase() + " " + item.num));
        if (ids.length > 0) {
          mapCurrent.appendChild(el("span", "sep", "·"));
          mapCurrent.appendChild(el("span", "place",
            ids.map(id => mapLocations[id].name).join(" → ")));
        }
      }

      if (ids.length >= 2) {
        const d = "M " + ids.map(id =>
          mapLocations[id].x + "," + mapLocations[id].y
        ).join(" L ");
        mapRoute.appendChild(svgEl("path", { d: d, class: "route" }));
      }

      ids.forEach((id, idx) => {
        const loc = mapLocations[id];

        if (idx === 0) {
          mapMarkers.appendChild(svgEl("circle", {
            cx: loc.x, cy: loc.y, class: "marker-pulse"
          }));
        }

        mapMarkers.appendChild(svgEl("circle", {
          cx: loc.x, cy: loc.y, class: "marker-ring"
        }));

        const num = svgEl("text", {
          x: loc.x, y: loc.y, class: "marker-num"
        });
        num.textContent = ids.length > 1 ? String(idx + 1) : "•";
        mapMarkers.appendChild(num);

        const label = svgEl("text", {
          x: loc.x, y: loc.y, class: "marker-label"
        });
        label.style.setProperty("--label-dy", String(loc.labelDy));
        label.textContent = loc.name;
        mapMarkers.appendChild(label);
      });
    }

    function selectItem(id) {
      const item = data.find(d => d.id === id);
      if (!item) return;

      Object.values(cardNodes).forEach(n => n.classList.remove("active"));
      Object.values(bracketNodes).forEach(n => n.classList.remove("active"));
      if (cardNodes[id])    cardNodes[id].classList.add("active");
      if (bracketNodes[id]) bracketNodes[id].classList.add("active");

      renderMapForItem(item);

      detailEl.className = "detail" + (item.variant ? " " + item.variant : "");
      while (detailEl.firstChild) detailEl.removeChild(detailEl.firstChild);

      const meta = el("div", "detail-meta");
      meta.appendChild(el("span", "num", cardLabel.charAt(0) + cardLabel.slice(1).toLowerCase() + " " + item.num));
      meta.appendChild(el("span", "sep", "·"));
      meta.appendChild(el("span", axis.isChapters ? "chap" : "years", item.label || ""));
      const age = ageLabel(item);
      if (age) {
        meta.appendChild(el("span", "sep", "·"));
        meta.appendChild(el("span", "age", age));
      }
      if (item.metaExtra) {
        meta.appendChild(el("span", "sep", "·"));
        meta.appendChild(el("span", item.metaExtra.class || "chron", item.metaExtra.text));
      }
      detailEl.appendChild(meta);

      detailEl.appendChild(el("h2", null, item.title));
      if (item.tagline) detailEl.appendChild(el("p", "detail-tagline", item.tagline));
      detailEl.appendChild(el("p", "detail-lede", item.lede));

      if (item.keyEvent) {
        const ev = el("div", "key-event");
        ev.appendChild(el("span", "label", "Nøkkelhendelse"));
        ev.appendChild(document.createTextNode(item.keyEvent));
        detailEl.appendChild(ev);
      }

      const sectionsEl = el("div", "sections");
      renderTagGroup(sectionsEl, "Bøker",   item.books,    "book");
      renderTagGroup(sectionsEl, "Profeter", item.prophets, "prophet");
      renderTagGroup(sectionsEl, "Personer", item.people,   null);

      // Auto-render "Steder" group from item.locations as links to sted.html?id=X
      if (item.locations && item.locations.length > 0 && mapLocations) {
        const sec = el("div", "section");
        sec.appendChild(el("h3", null, "Steder"));
        const tags = el("div", "tags");
        item.locations.forEach(id => {
          const loc = mapLocations[id];
          if (!loc) return;
          const a = el("a", "tag place", loc.name);
          a.href = "sted.html?id=" + encodeURIComponent(id);
          a.title = "Åpne sted-side for " + loc.name;
          tags.appendChild(a);
        });
        sec.appendChild(tags);
        sectionsEl.appendChild(sec);
      }

      if (sectionsEl.children.length > 0) detailEl.appendChild(sectionsEl);
    }

    function selectFromHash() {
      const hash = window.location.hash.slice(1);
      const valid = hash && data.find(d => d.id === hash);
      selectItem(valid ? hash : defaultId);
    }

    // Render once, then wire up hash
    renderCardsAndBrackets();
    renderTicks();
    renderTurningPoint();
    updateMapVars();
    renderMapBackground();

    // Attach zoom/pan/pinch/dblclick interaction (default on; opt out via cfg.map.allowZoom: false)
    let mapInteraction = null;
    if (hasMap && mapCfg.atlas && mapCfg.atlas.attachInteraction && mapCfg.allowZoom !== false) {
      mapInteraction = mapCfg.atlas.attachInteraction(mapSvg, {
        onChange: () => updateMapVars(),
        onChangeDebounced: () => {
          if (mapCfg.atlas.applyLabelCollision) mapCfg.atlas.applyLabelCollision(mapSvg);
        }
      });
      injectMapControls();
    }

    function makeBtn(label, act, title, ariaLabel, cls) {
      const b = document.createElement("button");
      b.type = "button";
      b.dataset.act = act;
      b.title = title;
      b.setAttribute("aria-label", ariaLabel);
      if (cls) b.className = cls;
      b.textContent = label;
      return b;
    }

    function injectMapControls() {
      const section = mapSvg.closest(".map-section");
      if (!section || section.querySelector(".map-zoom-controls")) return;
      const controls = document.createElement("div");
      controls.className = "map-zoom-controls";
      controls.appendChild(makeBtn("+", "in", "Zoom inn (+)", "Zoom inn"));
      controls.appendChild(makeBtn("−", "out", "Zoom ut (−)", "Zoom ut"));
      controls.appendChild(makeBtn("reset", "reset", "Tilbakestill (0)", "Tilbakestill", "reset"));
      section.appendChild(controls);
      controls.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (!btn) return;
        const act = btn.dataset.act;
        if (act === "in")    mapInteraction.zoomBy(1 / 1.4);
        if (act === "out")   mapInteraction.zoomBy(1.4);
        if (act === "reset") mapInteraction.reset();
      });
    }

    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);

    if (hasMap) {
      let resizeTimer;
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          updateMapVars();
          if (mapCfg.atlas && mapCfg.atlas.applyLabelCollision) {
            mapCfg.atlas.applyLabelCollision(mapSvg);
          }
        }, 150);
      });
    }

    return { selectItem };
  }

  global.WikiPage = { init };
})(window);
