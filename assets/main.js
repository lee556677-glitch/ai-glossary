/* =========================================================
   AI 白話小辭典 — 全站腳本
   - 首頁：依 data/terms.js 產生名詞卡片、搜尋、分類篩選
   - 名詞頁：依 <body data-slug> 產生「上一篇／下一篇」
   不需要修改這個檔案就能新增名詞（只要改 data/terms.js）
   ========================================================= */
(function () {
  "use strict";

  var TERMS = window.TERMS || [];
  var CATS = window.CATEGORIES || {};
  var body = document.body;
  var root = body.getAttribute("data-root") || "./";

  function esc(text) {
    return String(text).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function stars(level) {
    var s = "";
    for (var i = 1; i <= 3; i++) s += i <= level ? "★" : "☆";
    return s;
  }

  function termUrl(slug) {
    return root + "terms/" + slug + ".html";
  }

  function fullEn(t) {
    return t.abbr ? t.en + "（" + t.abbr + "）" : t.en;
  }

  /* ---------- 首頁 ---------- */
  function initIndex(grid) {
    var search = document.getElementById("term-search");
    var chipBox = document.getElementById("category-chips");
    var empty = document.getElementById("term-empty");
    var count = document.getElementById("term-count");
    var updated = document.getElementById("term-updated");
    var params = new URLSearchParams(location.search);
    var current = CATS[params.get("cat")] ? params.get("cat") : "all";

    if (count) count.textContent = TERMS.length;
    if (updated && TERMS.length) {
      updated.textContent = TERMS.map(function (t) { return t.added; }).sort().pop();
    }

    var chips = [["all", "全部"]].concat(
      Object.keys(CATS).map(function (k) { return [k, CATS[k].name]; })
    );
    chipBox.innerHTML = chips.map(function (c) {
      return '<button type="button" class="chip" data-cat="' + c[0] + '">' + esc(c[1]) + "</button>";
    }).join("");

    function card(t) {
      var cat = CATS[t.category] || { name: "", color: "yellow" };
      return (
        '<a class="card card--' + cat.color + '" href="' + termUrl(t.slug) + '">' +
          '<span class="card__cat">' + esc(cat.name) + "</span>" +
          '<h3 class="card__name">' + esc(t.name) + "</h3>" +
          '<span class="card__en">' + esc(fullEn(t)) + "</span>" +
          '<p class="card__summary">' + esc(t.summary) + "</p>" +
          '<span class="card__foot">' +
            '<span class="level" aria-label="難度 ' + t.level + ' / 3">' + stars(t.level) + "</span>" +
            '<span class="card__go">讀這頁 →</span>' +
          "</span>" +
        "</a>"
      );
    }

    function render() {
      var q = (search.value || "").trim().toLowerCase();
      var list = TERMS.filter(function (t) {
        if (current !== "all" && t.category !== current) return false;
        if (!q) return true;
        return [t.name, t.en, t.abbr, t.summary, t.slug].join(" ").toLowerCase().indexOf(q) !== -1;
      });
      grid.innerHTML = list.map(card).join("");
      empty.hidden = list.length > 0;
      Array.prototype.forEach.call(chipBox.children, function (b) {
        var on = b.getAttribute("data-cat") === current;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
    }

    chipBox.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-cat]");
      if (!btn) return;
      current = btn.getAttribute("data-cat");
      render();
    });
    search.addEventListener("input", render);
    render();
  }

  /* ---------- 名詞頁 ---------- */
  function initTerm(slug) {
    var nav = document.getElementById("term-nav");
    if (!nav) return;
    var i = TERMS.findIndex(function (t) { return t.slug === slug; });
    if (i === -1) return;
    var prev = TERMS[i - 1];
    var next = TERMS[i + 1];
    var html = "";
    if (prev) {
      html += '<a class="term-nav__prev" href="' + prev.slug + '.html"><small>← 上一篇</small>' + esc(prev.name) + "</a>";
    }
    if (next) {
      html += '<a class="term-nav__next" href="' + next.slug + '.html"><small>下一篇 →</small>' + esc(next.name) + "</a>";
    } else {
      html += '<a class="term-nav__next" href="' + root + 'index.html#terms"><small>讀完了！</small>回到名詞總覽</a>';
    }
    nav.innerHTML = html;
  }

  var grid = document.getElementById("term-grid");
  if (grid) initIndex(grid);

  var slug = body.getAttribute("data-slug");
  if (slug) initTerm(slug);
})();
