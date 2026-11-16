# AI 白話小辭典

用**一句話＋生活比喻**，看懂常見的 AI 名詞。

網站：https://lee556677-glitch.github.io/ai-glossary/

## 這是什麼？

一個給沒有資訊背景的人看的 AI 名詞小辭典。每個名詞一頁，每頁都有固定的 6 個區塊：

1. 一句話說明
2. 生活比喻
3. 實際例子
4. 常見誤會
5. 小測驗
6. 相關名詞

## 為什麼有 AGENTS.md？

這個專案的重點不是「做出一個網頁」，而是建立一套規則，讓 AI 可以照同一套方式一直新增內容。
所有規則都寫在 [`AGENTS.md`](AGENTS.md)：專案目的、目錄結構、命名規則、頁面格式、視覺風格、寫作風格、新增 SOP 和自我檢查清單。
[`CLAUDE.md`](CLAUDE.md) 只是引用 `AGENTS.md`，讓 Claude Code 也讀同一份規則。

想新增名詞時，只要對 AI 說：

```
請依照 AGENTS.md，新增名詞：微調（Fine-tuning）
```

## 目前收錄

完整清單在網站首頁，資料來源是 [`data/terms.js`](data/terms.js)（全站唯一的名詞目錄）。
下一批想收錄的名詞列在 `AGENTS.md` 第 11 節「待收錄清單」。

## 本機預覽

不需要安裝任何東西，直接用瀏覽器打開 `index.html` 即可。

## 技術

純 HTML + CSS + JavaScript，沒有框架、沒有建置步驟，透過 GitHub Pages 發布。
