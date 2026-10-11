(function () {
  "use strict";

  var LANGS = window.PECK_LANGS;
  var I18N = window.PECK_I18N;
  var TEAS = window.PECK_TEAS;
  var root = document.getElementById("app");

  var store = {
    get: function (k, d) { try { var v = localStorage.getItem("peck." + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("peck." + k, JSON.stringify(v)); } catch (e) {} },
  };

  var state = {
    lang: store.get("lang", null),
    view: null,
    quiz: { step: 0, answers: {} },
    catalog: { q: "", cat: "all" },
    study: { order: [], i: 0, flipped: false },
    known: store.get("known", {}),
  };
  var stack = [];

  var QUIZ = [
    { key: "moment", q: "q_moment", opts: [["morning", "m_morning"], ["afternoon", "m_afternoon"], ["evening", "m_evening"], ["afterMeal", "m_afterMeal"]] },
    { key: "caffeine", q: "q_caffeine", single: true, opts: [["yes", "c_yes"], ["low", "c_low"], ["none", "c_none"]] },
    { key: "flavor", q: "q_flavor", opts: [["floral", "f_floral"], ["fruity", "f_fruity"], ["citrus", "f_citrus"], ["spicy", "f_spicy"], ["sweet", "f_sweet"], ["fresh", "f_fresh"], ["earthy", "f_earthy"]] },
    { key: "temp", q: "q_temp", single: true, opts: [["hot", "t_hot"], ["iced", "t_iced"], ["any", "t_any"]] },
  ];
  var CATS = ["black", "green", "white", "oolong", "puerh", "herbal", "rooibos", "fruit"];

  // ---------- helpers ----------
  function t(key, vars) {
    var s = (I18N[state.lang] && I18N[state.lang][key]) || I18N.it[key] || key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.replace("{" + k + "}", vars[k]); });
    return s;
  }
  function loc(v) {
    if (v == null) return "";
    if (typeof v === "string") return v;
    return v[state.lang] || v.it || v.en || "";
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; });
  }
  function byId(id) { return TEAS.filter(function (x) { return x.id === id; })[0]; }

  var LEAF = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15Z" fill="rgba(255,255,255,.22)" stroke="rgba(255,255,255,.85)" stroke-width="1.2"/><path d="M5 19 15 9" stroke="rgba(255,255,255,.85)" stroke-width="1.2" stroke-linecap="round"/></svg>';
  function thumb(tea, cls) {
    var inner = tea.image ? '<img src="' + esc(tea.image) + '" alt="" loading="lazy">' : LEAF;
    return '<div class="thumb ' + (cls || "") + '" style="--cat: var(--cat-' + tea.category + ')">' + inner + "</div>";
  }

  var ICON_BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';

  function header(showBack) {
    return '<header class="top">' +
      (showBack ? '<button class="icon-btn back" data-act="back" aria-label="' + esc(t("back")) + '">' + ICON_BACK + "</button>" : "<span></span>") +
      '<div class="wordmark" data-act="home"><b>PECK</b><small>Milano 1883</small></div>' +
      (state.lang ? '<button class="icon-btn lang-btn" data-act="lang" aria-label="' + esc(t("language")) + '">' + state.lang + "</button>" : "<span></span>") +
      "</header>";
  }
  function sampleNotice() { return window.PECK_SAMPLE ? '<p class="notice">' + esc(t("sample")) + "</p>" : ""; }

  function teaRow(tea, rank) {
    return '<button class="tea-row" data-act="tea" data-id="' + tea.id + '">' + thumb(tea) +
      "<div><strong>" + esc(loc(tea.name)) + "</strong><small>" + esc(t("cat_" + tea.category)) + " · " + esc(t("caf_" + tea.caffeine)) + "</small></div>" +
      (rank ? '<span class="rank">' + rank + "</span>" : "<span></span>") + "</button>";
  }

  // ---------- navigation ----------
  function go(view, push) {
    if (push !== false && state.view) stack.push(state.view);
    state.view = view;
    render();
    window.scrollTo(0, 0);
  }
  function back() {
    state.view = stack.pop() || { name: "home" };
    render();
  }

  // ---------- views ----------
  function viewLang() {
    var h = '<main class="screen"><div class="lang-hero"><div class="wordmark"><b>PECK</b><small>Milano 1883</small></div>' +
      "<p>Scegli la lingua · Choose your language</p></div><div class=\"lang-list\">";
    LANGS.forEach(function (l) {
      h += '<button data-act="setlang" data-lang="' + l.code + '" dir="' + l.dir + '" lang="' + l.code + '"' +
        (state.lang === l.code ? ' aria-current="true"' : "") + ">" + esc(l.native) + "<span>" + l.code + "</span></button>";
    });
    return (state.lang ? header(true) : "") + h + "</div></main>";
  }

  function viewHome() {
    return header(false) + '<main class="screen">' +
      '<div><p class="eyebrow">' + esc(t("appName")) + "</p><h1>" + esc(t("homeIntro")) + "</h1></div>" +
      '<nav class="menu">' +
      '<button class="primary" data-act="advise"><strong>' + esc(t("advise")) + "</strong><small>" + esc(t("adviseSub")) + '</small><span class="arrow">→</span></button>' +
      '<button data-act="catalog"><strong>' + esc(t("catalog")) + "</strong><small>" + esc(t("catalogSub")) + '</small><span class="arrow">→</span></button>' +
      '<button data-act="study"><strong>' + esc(t("study")) + "</strong><small>" + esc(t("studySub")) + '</small><span class="arrow">→</span></button>' +
      "</nav>" + sampleNotice() + "</main>";
  }

  function viewQuiz() {
    var s = state.quiz.step;
    if (s >= QUIZ.length) return viewResults();
    var q = QUIZ[s];
    var h = header(true) + '<main class="screen"><div class="progress"><i style="width:' + Math.round((s / QUIZ.length) * 100) + '%"></i></div>' +
      '<p class="eyebrow">' + esc(t("step", { n: s + 1, t: QUIZ.length })) + "</p><h1>" + esc(t(q.q)) + "</h1>" +
      '<div class="options' + (q.single ? " single" : "") + '">';
    q.opts.forEach(function (o) { h += '<button data-act="answer" data-val="' + o[0] + '">' + esc(t(o[1])) + "</button>"; });
    return h + "</div></main>";
  }

  function recommend(a) {
    var scored = TEAS.map(function (tea) {
      var score = 0;
      if (a.caffeine === "none" && tea.caffeine !== "none") return null;
      if (a.caffeine === "low") score += { none: 2, low: 3, medium: 0, high: -2 }[tea.caffeine];
      if (a.caffeine === "yes") score += { none: -3, low: 0, medium: 2, high: 3 }[tea.caffeine];
      if (a.temp === "iced") { if (!tea.iced) return null; score += 1; }
      if (tea.moments.indexOf(a.moment) >= 0) score += 3;
      if (a.moment === "evening" && (tea.caffeine === "high" || tea.caffeine === "medium")) score -= 3;
      if (tea.flavors.indexOf(a.flavor) >= 0) score += 5;
      return { tea: tea, score: score };
    }).filter(function (x) { return x && x.score > 0; });
    scored.sort(function (x, y) { return y.score - x.score; });
    return scored.slice(0, 3).map(function (x) { return x.tea; });
  }

  function viewResults() {
    var list = recommend(state.quiz.answers);
    var h = header(true) + '<main class="screen"><div class="progress"><i style="width:100%"></i></div><h1>' + esc(t("results")) + "</h1>";
    if (!list.length) h += '<p class="lead">' + esc(t("noResults")) + "</p>";
    else h += '<div class="tea-list">' + list.map(function (tea, i) { return teaRow(tea, i + 1); }).join("") + "</div>";
    return h + '<button class="btn solid" data-act="advise">' + esc(t("restart")) + "</button>" + sampleNotice() + "</main>";
  }

  function haystack(tea) {
    var parts = [loc(tea.name), loc(tea.origin), loc(tea.desc), t("cat_" + tea.category)];
    tea.flavors.forEach(function (f) { parts.push(t("f_" + f)); });
    if (typeof tea.name === "object") Object.keys(tea.name).forEach(function (k) { parts.push(tea.name[k]); });
    return parts.join(" ").toLowerCase();
  }

  function catalogList() {
    var c = state.catalog, q = c.q.trim().toLowerCase();
    return TEAS.filter(function (tea) {
      return (c.cat === "all" || tea.category === c.cat) && (!q || haystack(tea).indexOf(q) >= 0);
    }).sort(function (a, b) { return loc(a.name).localeCompare(loc(b.name), state.lang); });
  }
  function catalogResults() {
    var list = catalogList();
    return '<p class="count">' + esc(t("count", { n: list.length })) + '</p><div class="tea-list">' + list.map(function (x) { return teaRow(x); }).join("") + "</div>";
  }
  function viewCatalog() {
    var present = CATS.filter(function (c) { return TEAS.some(function (x) { return x.category === c; }); });
    var h = header(true) + '<main class="screen"><h1>' + esc(t("catalog")) + "</h1>" +
      '<input id="search" class="search" type="search" autocomplete="off" placeholder="' + esc(t("search")) + '" value="' + esc(state.catalog.q) + '">' +
      '<div class="filter-row">' + ["all"].concat(present).map(function (c) {
        return '<button data-act="cat" data-cat="' + c + '" aria-pressed="' + (state.catalog.cat === c) + '">' + esc(c === "all" ? t("all") : t("cat_" + c)) + "</button>";
      }).join("") + "</div>" +
      '<div id="results">' + catalogResults() + "</div>" + sampleNotice() + "</main>";
    return h;
  }

  function teaFacts(tea) {
    return '<dl class="facts">' +
      "<div><dt>" + esc(t("taste")) + '</dt><dd class="chips">' + tea.flavors.map(function (f) { return '<span class="chip">' + esc(t("f_" + f)) + "</span>"; }).join("") + "</dd></div>" +
      "<div><dt>" + esc(t("pairing")) + '</dt><dd class="chips">' + tea.pairing.map(function (p) { return '<span class="chip">' + esc(t("p_" + p)) + "</span>"; }).join("") + "</dd></div>" +
      "<div><dt>" + esc(t("origin")) + "</dt><dd>" + esc(loc(tea.origin)) + "</dd></div></dl>";
  }
  function brewBlock(tea) {
    var b = tea.brew;
    return '<div class="brew"><div><b>' + b.temp + "°</b><span>" + esc(t("temp")) + " °C</span></div>" +
      "<div><b>" + b.time + "</b><span>" + esc(t("time")) + " · " + esc(t("minutes")) + "</span></div>" +
      "<div><b>" + b.grams + "</b><span>" + esc(t("grams")) + "</span></div></div>";
  }

  function viewTea(id) {
    var tea = byId(id);
    return header(true) + '<main class="screen">' + thumb(tea, "hero-img") +
      '<div><p class="eyebrow">' + esc(t("cat_" + tea.category)) + "</p><h1>" + esc(loc(tea.name)) + "</h1></div>" +
      '<div class="chips"><span class="chip gold">' + esc(t("caf_" + tea.caffeine)) + "</span>" + (tea.iced ? '<span class="chip gold">' + esc(t("iced")) + "</span>" : "") + "</div>" +
      '<p class="desc">' + esc(loc(tea.desc)) + "</p>" +
      '<p class="eyebrow">' + esc(t("brewing")) + "</p>" + brewBlock(tea) + teaFacts(tea) + "</main>";
  }

  function shuffledDeck() {
    var ids = TEAS.map(function (x) { return x.id; }).filter(function (id) { return !state.known[id]; });
    for (var i = ids.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = ids[i]; ids[i] = ids[j]; ids[j] = tmp; }
    return ids;
  }
  function viewStudy() {
    var s = state.study;
    var knownCount = TEAS.filter(function (x) { return state.known[x.id]; }).length;
    var h = header(true) + '<main class="screen"><div class="progress"><i style="width:' + Math.round((knownCount / TEAS.length) * 100) + '%"></i></div>' +
      '<p class="eyebrow">' + esc(t("known", { n: knownCount, t: TEAS.length })) + "</p>";
    if (s.i >= s.order.length) {
      return h + "<h1>" + esc(t("studyDone")) + '</h1><button class="btn solid" data-act="study-reset">' + esc(t("studyReset")) + "</button></main>";
    }
    var tea = byId(s.order[s.i]);
    h += '<button class="flip' + (s.flipped ? " flipped" : "") + '" data-act="flip" aria-live="polite"><div class="flip-inner">' +
      '<div class="face front">' + thumb(tea) + "<h2>" + esc(loc(tea.name)) + '</h2><p class="hint">' + esc(t("flip")) + "</p></div>" +
      '<div class="face back"><p class="eyebrow">' + esc(t("cat_" + tea.category)) + " · " + esc(t("caf_" + tea.caffeine)) + "</p>" +
      "<h2>" + esc(loc(tea.name)) + '</h2><p class="desc">' + esc(loc(tea.desc)) + "</p>" + brewBlock(tea) + teaFacts(tea) + "</div>" +
      "</div></button>" +
      '<div class="study-actions"><button class="btn" data-act="again">' + esc(t("again")) + '</button><button class="btn solid" data-act="know">' + esc(t("know")) + "</button></div>";
    return h + "</main>";
  }

  // ---------- render ----------
  function render() {
    var meta = LANGS.filter(function (l) { return l.code === state.lang; })[0];
    document.documentElement.lang = state.lang || "it";
    document.documentElement.dir = meta ? meta.dir : "ltr";
    var v = state.view;
    var html = !state.lang || v.name === "lang" ? viewLang()
      : v.name === "quiz" ? viewQuiz()
      : v.name === "catalog" ? viewCatalog()
      : v.name === "tea" ? viewTea(v.id)
      : v.name === "study" ? viewStudy()
      : viewHome();
    root.innerHTML = '<div class="app">' + html + "</div>";
    var search = document.getElementById("search");
    if (search) search.addEventListener("input", function () {
      state.catalog.q = search.value;
      document.getElementById("results").innerHTML = catalogResults();
    });
  }

  root.addEventListener("click", function (e) {
    var el = e.target.closest("[data-act]");
    if (!el) return;
    var act = el.getAttribute("data-act");
    switch (act) {
      case "setlang":
        state.lang = el.getAttribute("data-lang");
        store.set("lang", state.lang);
        stack = [];
        go({ name: "home" }, false);
        break;
      case "lang": go({ name: "lang" }); break;
      case "back": back(); break;
      case "home": if (state.lang) { stack = []; go({ name: "home" }, false); } break;
      case "advise":
        state.quiz = { step: 0, answers: {} };
        if (state.view.name === "quiz") { render(); window.scrollTo(0, 0); } else go({ name: "quiz" });
        break;
      case "answer":
        state.quiz.answers[QUIZ[state.quiz.step].key] = el.getAttribute("data-val");
        state.quiz.step++;
        render(); window.scrollTo(0, 0);
        break;
      case "catalog": go({ name: "catalog" }); break;
      case "cat": state.catalog.cat = el.getAttribute("data-cat"); render(); break;
      case "tea": go({ name: "tea", id: el.getAttribute("data-id") }); break;
      case "study":
        state.study = { order: shuffledDeck(), i: 0, flipped: false };
        go({ name: "study" });
        break;
      case "flip": state.study.flipped = !state.study.flipped; el.classList.toggle("flipped", state.study.flipped); break;
      case "know":
        state.known[state.study.order[state.study.i]] = true;
        store.set("known", state.known);
        state.study.i++; state.study.flipped = false; render();
        break;
      case "again":
        state.study.order.push(state.study.order[state.study.i]);
        state.study.i++; state.study.flipped = false; render();
        break;
      case "study-reset":
        state.known = {}; store.set("known", {});
        state.study = { order: shuffledDeck(), i: 0, flipped: false }; render();
        break;
    }
  });

  state.view = { name: state.lang ? "home" : "lang" };
  render();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
