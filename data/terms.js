/* =========================================================
   名詞清單：全站唯一的「目錄」與資料來源
   - 陣列順序 = 建議閱讀順序（同分類放一起、由淺到深）
   - 新增名詞：插在「同分類最後一筆」後面
   - 欄位說明：AGENTS.md 第 5 節
   ========================================================= */

window.CATEGORIES = {
  basic:    { name: "基礎概念", color: "yellow" },
  usage:    { name: "使用技巧", color: "pink" },
  advanced: { name: "進階應用", color: "blue" },
  tools:    { name: "開發工具", color: "green" }
};

window.TERMS = [
  {
    slug: "llm",
    name: "大型語言模型",
    en: "Large Language Model",
    abbr: "LLM",
    category: "basic",
    level: 1,
    summary: "讀過海量文字、專門「預測下一個字」的程式，ChatGPT 等聊天 AI 的大腦。",
    added: "2026-11-16"
  },
  {
    slug: "token",
    name: "詞元",
    en: "Token",
    abbr: "",
    category: "basic",
    level: 1,
    summary: "AI 讀寫文字的最小單位，像把句子拆成一塊塊樂高積木。",
    added: "2026-11-16"
  },
  {
    slug: "context-window",
    name: "上下文視窗",
    en: "Context Window",
    abbr: "",
    category: "basic",
    level: 2,
    summary: "AI 一次「看得到」的文字上限，超過了它就會忘記前面的內容。",
    added: "2026-11-16"
  },
  {
    slug: "prompt",
    name: "提示詞",
    en: "Prompt",
    abbr: "",
    category: "usage",
    level: 1,
    summary: "你給 AI 的指令或問題，講得越清楚，拿到的結果越接近你要的。",
    added: "2026-11-16"
  },
  {
    slug: "hallucination",
    name: "幻覺",
    en: "Hallucination",
    abbr: "",
    category: "usage",
    level: 2,
    summary: "AI 一本正經地講出錯誤、甚至根本不存在的內容。",
    added: "2026-11-16"
  },
  {
    slug: "rag",
    name: "檢索增強生成",
    en: "Retrieval-Augmented Generation",
    abbr: "RAG",
    category: "advanced",
    level: 3,
    summary: "先找出相關資料再讓 AI 看著回答，像把閉書考變成開書考。",
    added: "2026-11-16"
  },
  {
    slug: "ai-agent",
    name: "AI 代理",
    en: "AI Agent",
    abbr: "",
    category: "advanced",
    level: 3,
    summary: "會自己規劃步驟、使用工具，一步步把任務做完的 AI。",
    added: "2026-11-16"
  },
  {
    slug: "agents-md",
    name: "AGENTS.md / CLAUDE.md",
    en: "Agent Instruction File",
    abbr: "",
    category: "tools",
    level: 2,
    summary: "放在專案裡、寫給 AI 看的說明書，告訴它專案規則與做事方式。",
    added: "2026-11-16"
  }
];
