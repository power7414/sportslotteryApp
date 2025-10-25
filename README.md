# 盈吉多社群 - 運彩分析平台

<div align="center">

**一個以社群互動為主的台灣運彩分析平台**

[![GitHub Pages](https://img.shields.io/badge/demo-online-green.svg)](https://power7414.github.io/sportslotteryApp/)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.10-646CFF.svg)](https://vitejs.dev/)

[線上 Demo](https://power7414.github.io/sportslotteryApp/) · [部署文件](./DEPLOY.md) · [開發文件](./CLAUDE.md)

</div>

---

## ✨ 功能特色

### 📊 核心功能
- **分析專區** - 瀏覽專業分析師的運彩預測與分析文章
- **賽事專區** - 即時比分追蹤與賽事預測
- **預測系統** - 支援讓分盤、不讓分、大小分、單雙四種預測類型
- **我的預測** - 個人預測記錄管理與勝率統計（歷史/本月/本週）
- **群組聊天** - 社群討論室，即時交流運彩心得
- **通知系統** - 分析更新、群組訊息等即時通知

### 🎯 特色亮點
- ✅ 完整的預測系統（一場比賽可選多種預測類型）
- ✅ 智能勝率統計（自動計算命中率）
- ✅ 日期篩選系統（前天/昨天/今天/明天/後天）
- ✅ 進行中比賽即時追蹤
- ✅ 手機優先的響應式設計
- ✅ 暗色主題 UI

---

## 🖥️ 線上預覽

**GitHub Pages**: https://power7414.github.io/sportslotteryApp/

> **注意**: 這是 Demo 版本，所有資料都是模擬資料（Mock Data），沒有連接真實的資料庫或後端 API。

---

## 🚀 快速開始

### 前置需求
- Node.js >= 18.x
- npm >= 9.x

### 安裝步驟

```bash
# 1. Clone 專案（如果你有權限）
git clone https://github.com/power7414/sportslotteryApp.git
cd sportslotteryApp

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 開啟瀏覽器訪問
# 通常是 http://localhost:5173
```

### 建置與部署

```bash
# 建置生產版本
npm run build

# 預覽建置結果
npm run preview

# 部署到 GitHub Pages
npm run deploy
```

---

## 📁 專案結構

```
運彩 App/
├── src/
│   ├── components/          # React 元件
│   │   ├── AnalysisSection.tsx       # 分析專區
│   │   ├── AnalysisDetail.tsx        # 分析詳細頁面
│   │   ├── ScoresSection.tsx         # 賽事專區
│   │   ├── ScoreDetail.tsx           # 賽事預測頁面
│   │   ├── MyPredictions.tsx         # 我的預測
│   │   ├── GroupSection.tsx          # 群組聊天
│   │   ├── ProfileSection.tsx        # 個人設定
│   │   ├── Header.tsx                # 頂部導航
│   │   ├── BottomNavigation.tsx      # 底部導航
│   │   └── ...
│   ├── types/
│   │   └── index.ts         # TypeScript 型別定義
│   ├── data/
│   │   └── index.ts         # 模擬資料
│   ├── App.tsx              # 主應用程式
│   ├── main.tsx             # React 入口點
│   └── index.css            # 全域樣式
├── public/                  # 靜態資源
├── DEPLOY.md               # 部署說明文件
├── CLAUDE.md               # 詳細開發文件
├── README.md               # 本文件
├── vite.config.ts          # Vite 設定
├── tailwind.config.js      # Tailwind CSS 設定
└── package.json            # 專案依賴
```

---

## 🛠️ 技術棧

| 類別 | 技術 | 版本 |
|-----|------|------|
| 框架 | React | 18.2.0 |
| 語言 | TypeScript | 5.3.3 |
| 建置工具 | Vite | 5.0.10 |
| 樣式 | Tailwind CSS | 3.4.0 |
| 圖標 | Lucide React | 0.303.0 |
| 部署 | GitHub Pages | - |

---

## 📱 功能截圖

### 分析專區
- 瀏覽專業分析師的預測
- 日期與運動類型篩選
- 信心指數與推薦標籤

### 賽事預測
- 四種預測類型（讓分/不讓分/大小分/單雙）
- 賠率顯示
- 一場比賽可選多種預測

### 我的預測
- 勝率統計（歷史/本月/本週）
- 預測記錄管理
- 日期篩選（前天到後天）

### 群組聊天
- 即時聊天室
- 虛擬鍵盤
- 訊息長按選單

---

## 🎯 開發階段

**目前狀態**: Demo / Prototype 階段

### 已完成
- ✅ UI/UX 設計與實作
- ✅ 前端互動邏輯
- ✅ 模擬資料系統
- ✅ 響應式設計
- ✅ GitHub Pages 部署

### 未來規劃
- 🔲 後端 API 整合
- 🔲 真實資料庫連接
- 🔲 使用者登入系統
- 🔲 即時聊天（WebSocket）
- 🔲 推播通知（Web Push API）
- 🔲 PWA 支援

---

## 📚 文件

- **[DEPLOY.md](./DEPLOY.md)** - GitHub 部署完整指南
- **[CLAUDE.md](./CLAUDE.md)** - 詳細的開發文件（給開發者）

---

## 🤝 貢獻指南

目前這是個人專案，暫不開放外部貢獻。

如果你是協作者：
1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交修改 (`git commit -m '新增某某功能'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

---

## 📄 授權

本專案為私人專案，未開放授權。

---

## 📞 聯絡資訊

- GitHub: [@power7414](https://github.com/power7414)
- 專案連結: [https://github.com/power7414/sportslotteryApp](https://github.com/power7414/sportslotteryApp)

---

## 🙏 致謝

- [React](https://reactjs.org/) - 前端框架
- [Vite](https://vitejs.dev/) - 建置工具
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide](https://lucide.dev/) - 圖標庫
- [GitHub Pages](https://pages.github.com/) - 免費託管

---

<div align="center">

**Made with ❤️ by power7414**

⭐ 如果覺得有幫助，歡迎給個 Star！

</div>
