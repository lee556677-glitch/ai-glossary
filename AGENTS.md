# AGENTS.md — AI 白話小辭典

> 這份文件是寫給 AI 協作者（Claude Code、Codex、Gemini CLI、Cursor…）看的專案手冊。
> 開始任何新增或修改前，請先完整讀完本文件，並嚴格照著做。

---

## 1. 專案目的

「AI 白話小辭典」是一個靜態網站，用**一句話＋生活比喻**解釋常見的 AI 名詞。

- **讀者**：對 AI 有興趣、但沒有資訊背景的大學生與一般人。
- **目標**：讀者看完一頁，能用自己的話跟朋友解釋這個名詞。
- **核心精神**：每個名詞一頁、每頁格式一模一樣，所以可以一直照同一套規則往下新增。

## 2. 技術原則

| 項目 | 規則 |
|---|---|
| 技術 | 只用純 HTML + CSS + 原生 JavaScript。**不要**引入框架、npm、建置工具。 |
| 部署 | GitHub Pages，從 `main` 分支根目錄直接發布。根目錄有 `.nojekyll`，不要刪。 |
| 本機預覽 | 直接用瀏覽器打開 `index.html` 就要能正常顯示（所以資料用 `<script>` 載入，不用 `fetch`）。 |
| 外部資源 | 只允許 Google Fonts（LXGW WenKai TC）。不要放外部圖片、CDN、追蹤碼。 |
| 路徑 | 一律用**相對路徑**（例：`../assets/style.css`），不要用 `/` 開頭的絕對路徑，否則 GitHub Pages 子路徑會壞掉。 |

## 3. 目錄結構

```
ai-glossary/
├── AGENTS.md            ← 本文件（唯一的規則來源）
├── CLAUDE.md            ← 給 Claude Code，內容只是引用 AGENTS.md
├── README.md            ← 給人類看的專案介紹
├── index.html           ← 首頁：搜尋、分類篩選、名詞卡片牆（卡片由 JS 依 data/terms.js 產生）
├── .nojekyll
├── assets/
│   ├── style.css        ← 全站唯一的樣式檔（設計變數都在最上面的 :root）
│   ├── main.js          ← 首頁卡片渲染、搜尋篩選、名詞頁上一篇／下一篇
│   └── favicon.svg      ← 網站小圖示
├── data/
│   └── terms.js         ← 名詞清單（全站目錄，唯一資料來源）
├── templates/
│   └── term.html        ← 名詞頁模板，新增名詞一律從這裡複製
└── terms/
    └── <slug>.html      ← 每個名詞一頁
```

## 4. 命名規則

- **slug**：名詞的英文名稱，全小寫、單字用 `-` 連接，只能有 `a-z`、`0-9`、`-`。
  - ✅ `llm`、`context-window`、`ai-agent`、`agents-md`
  - ❌ `Context Window`、`context_window`、`上下文視窗`
- 名詞頁檔名 = `terms/<slug>.html`，slug 必須和 `data/terms.js` 裡的 `slug` 欄位、頁面 `<body data-slug="…">` 三者完全一致。
- 不要建立新的資料夾；圖片若真的需要，放 `assets/img/<slug>-<說明>.svg`，且優先用 inline SVG 或 CSS。

## 5. 資料格式：`data/terms.js`

`window.TERMS` 陣列的**順序就是建議閱讀順序**（也決定「上一篇／下一篇」）。由淺到深排列：同分類放一起，基礎在前。

```js
{
  slug: "context-window",          // 見第 4 節
  name: "上下文視窗",              // 中文名稱（台灣常用譯名）；沒有通行譯名時用原文，例如 "AGENTS.md / CLAUDE.md"
  en: "Context Window",            // 英文全名
  abbr: "",                        // 英文縮寫，沒有就留空字串
  category: "basic",               // 只能用 CATEGORIES 裡的 key
  level: 2,                        // 難度 1～3，定義見下表
  summary: "AI 一次看得到的文字上限……", // 40 字以內，等同頁面「一句話說明」的精簡版
  added: "2026-11-16"              // 收錄日期 YYYY-MM-DD
}
```

**分類（`window.CATEGORIES`）**：新增分類前要先問使用者。

| key | 名稱 | 便利貼顏色 | 放什麼 |
|---|---|---|---|
| `basic` | 基礎概念 | 黃 `--note-yellow` | AI 怎麼運作的基本觀念 |
| `usage` | 使用技巧 | 粉 `--note-pink` | 一般人使用 AI 時會碰到的事 |
| `advanced` | 進階應用 | 藍 `--note-blue` | 把 AI 組合成系統的做法 |
| `tools` | 開發工具 | 綠 `--note-green` | 寫程式、做專案時用的工具與檔案 |

**難度（`level`）**：`1` 不用任何背景就懂／`2` 需要先懂 1～2 個其他名詞／`3` 牽涉系統或流程。

## 6. 名詞頁格式（最重要）

每個名詞頁**必須**依序包含以下 6 個區塊，`id` 和標題文字都不能改：

| # | `id` | 標題 | 內容規則 |
|---|---|---|---|
| 1 | `oneliner` | 一句話說明 | 1～2 句、60 字內。關鍵詞用 `<mark class="hl">` 標起來（最多 2 處）。 |
| 2 | `analogy` | 生活比喻 | 用台灣大學生日常會遇到的情境（點飲料、考試、打工、搭捷運…）。100～200 字。 |
| 3 | `example` | 實際例子 | 具體情境，**必須**使用下方元件之一：`compare`、`chat`、`steps`。 |
| 4 | `myths` | 常見誤會 | 剛好 2 組「誤會 → 其實」。 |
| 5 | `quiz` | 小測驗 | 1 題選擇題、剛好 3 個選項（A/B/C），答案與解說放在 `<details>` 裡。 |
| 6 | `related` | 相關名詞 | 2～3 個連結，**只能連到已經存在的名詞頁**。 |

頁首固定包含：麵包屑、`<h1>` 中文名稱、英文名稱（含縮寫）、分類標籤、難度星星（★ 實心數 = level，共 3 顆）。
頁尾固定包含「最後更新：YYYY-MM-DD」，每次修改該頁都要改成當天日期。
頁面最下方的 `<nav id="term-nav">` 保持空白，「上一篇／下一篇」由 `assets/main.js` 自動產生。

### 可用元件（`assets/style.css` 已定義，不要自己發明新的 class）

| 元件 | 用途 | 結構 |
|---|---|---|
| `.hl` | 螢光筆重點 | `<mark class="hl">文字</mark>` |
| `.note` | 便利貼框 | `<div class="note note--yellow">`（yellow / pink / blue / green） |
| `.compare` | 好壞對照 | `.compare > .compare__bad + .compare__good`，各含一個 `<h3>` 和內容 |
| `.chat` | 對話示範 | `.chat > p.chat__user`、`p.chat__ai`（交錯出現） |
| `.steps` | 流程步驟 | `<ol class="steps"><li>…</li></ol>`，3～6 步 |
| `.myths` | 常見誤會 | `<ul class="myths"><li><p class="myths__wrong">…</p><p class="myths__right">…</p></li></ul>` |
| `.quiz` | 小測驗 | 見 `templates/term.html` |
| `.chips` | 相關名詞 | `<ul class="chips"><li><a class="chip" href="slug.html">名稱</a></li></ul>` |

## 7. 視覺風格：手寫筆記本風

- **感覺**：攤開在書桌上的筆記本——米白方格紙、紅色邊線、螢光筆、貼著紙膠帶的便利貼。溫暖、好讀、不花俏。
- **字體**：全站 `LXGW WenKai TC`（霞鶩文楷），後備字體 `Noto Sans TC`、系統字體。
- **顏色**：只能用 `:root` 裡定義的 CSS 變數，**不要**在 HTML 或新 CSS 裡寫死色碼。
  - 紙張 `--paper` #FBF8F1、墨水 `--ink` #2B2F3A、藍筆 `--pen` #3B5BDB、紅筆 `--red` #D9480F
  - 螢光筆 `--hl` #FFE58A；便利貼 `--note-yellow / pink / blue / green`
- **不要**：漸層大背景、陰影很重的卡片、emoji 當裝飾、深色模式、動畫超過 0.3 秒。
- 手機版（寬 < 640px）必須正常閱讀，不能出現水平捲軸。

## 8. 寫作風格

- 一律使用**台灣繁體中文**與台灣常用譯名（例：「程式」不是「程序」、「資料」不是「數據」、「影片」不是「視頻」）。
- 全形標點（，。「」？）；中文與英文、數字之間加一個半形空格（例：`用 AI 寫 3 段文字`）。
- 口吻像學長姐在講解：親切、白話、短句。避免「賦能」「顛覆」這類空話。
- 第一次出現的英文術語附中文：`token（詞元）`。
- **事實正確優先**：不確定、會隨時間改變的事（價格、模型規格、排名）不要寫具體數字；若必須寫，標註「截至 YYYY 年」。
- 不提特定公司的優劣比較，舉例可以說「ChatGPT、Claude、Gemini 等聊天 AI」。

## 9. 標準作業流程

### 9.1 新增一個名詞（使用者說「新增名詞：XXX」時）

1. 確認 `data/terms.js` 裡**還沒有**這個名詞（避免重複）。
2. 決定 `slug`、`category`、`level`（不確定分類時先問使用者）。
3. 複製 `templates/term.html` → `terms/<slug>.html`，把所有 `{{…}}` 換成內容，並刪掉模板裡的 `<!-- 說明 -->` 註解。
4. 依第 6 節寫滿 6 個區塊，依第 8 節的寫作風格。
5. 在 `data/terms.js` 的 `TERMS` 陣列中，插入到**同分類的最後一筆後面**。
6. 「相關名詞」要雙向：如果新名詞連到 A，也到 A 的頁面把新名詞加進它的「相關名詞」（A 已有 3 個時可略過）。
7. 若名詞在第 11 節的「待收錄清單」，把它從清單移除。
8. 跑一次第 10 節的自我檢查。

### 9.2 修改既有內容

- 只改使用者要求的部分，不要順手重寫其他段落。
- 修改名詞頁的「一句話說明」時，同步更新 `data/terms.js` 的 `summary`。
- 改 `slug` 等於改網址：必須同時改檔名、`data/terms.js`、所有連到它的「相關名詞」連結。

### 9.3 修改全站樣式或結構

- 先在回覆中說明要改什麼、影響哪些頁面，**等使用者同意**再動手。
- 新增元件時，同步更新本文件第 6 節的元件表與 `templates/term.html`。

## 10. 完成前自我檢查清單

- [ ] `terms/<slug>.html`、`data/terms.js` 的 `slug`、`<body data-slug>` 三者一致
- [ ] 6 個區塊齊全、順序正確、`id` 正確；模板的 `{{…}}` 和註解都已清除
- [ ] `<title>` 格式為 `中文名稱（English）｜AI 白話小辭典`；`<meta name="description">` 與 `summary` 相同
- [ ] 頁尾「最後更新」是今天的日期
- [ ] 所有連結是相對路徑，且指向的檔案真的存在
- [ ] 小測驗剛好 3 個選項，答案在 `<details>` 裡
- [ ] 沒有寫死的色碼、沒有新的 class、沒有外部圖片
- [ ] 用瀏覽器直接打開首頁：新卡片出現、搜尋得到、點進去上一篇／下一篇正常
- [ ] 文字是台灣繁體中文、全形標點、中英文間有空格

## 11. 待收錄清單（可以從這裡挑下一個名詞）

- 微調（Fine-tuning）— advanced
- 向量嵌入（Embedding）— advanced
- 溫度（Temperature）— usage
- 多模態（Multimodal）— basic
- MCP（Model Context Protocol）— tools
- Vibe Coding — tools

## 12. 給使用者的指令範例

```
請依照 AGENTS.md，新增名詞：微調（Fine-tuning）
請依照 AGENTS.md，把「Token」頁的生活比喻改得更貼近大學生
請依照 AGENTS.md 的自我檢查清單，檢查所有名詞頁
```
