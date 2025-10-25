# 🚀 GitHub 部署說明文件

> 本文件說明如何將「盈吉多社群」專案部署到 GitHub 和 GitHub Pages

---

## 📋 目錄

- [專案資訊](#專案資訊)
- [GitHub 倉庫設定](#github-倉庫設定)
- [GitHub Pages 部署](#github-pages-部署)
- [本地開發](#本地開發)
- [常見問題](#常見問題)

---

## 📦 專案資訊

**倉庫名稱**: sportslotteryApp
**GitHub 倉庫**: https://github.com/power7414/sportslotteryApp
**GitHub Pages 預覽**: https://power7414.github.io/sportslotteryApp/

**技術棧**:
- React 18.2.0
- TypeScript 5.3.3
- Vite 5.0.10
- Tailwind CSS 3.4.0

---

## 🔐 GitHub 倉庫設定

### 1️⃣ 倉庫隱私設定

#### 設定為私有倉庫（推薦）

1. 前往倉庫：https://github.com/power7414/sportslotteryApp
2. 點擊 **Settings**
3. 滾動到最下方 **Danger Zone**
4. 找到 **Change repository visibility**
5. 點擊 **Change visibility** → 選擇 **Make private**
6. 輸入倉庫名稱確認：`power7414/sportslotteryApp`
7. 點擊確認

**注意**：即使倉庫設為私有，GitHub Pages 仍然是**公開的**！

---

### 2️⃣ 邀請協作者

如果倉庫是私有的，可以邀請特定的人查看程式碼：

1. 前往倉庫 → **Settings** → **Collaborators**
2. 點擊 **Add people**
3. 輸入對方的 GitHub 使用者名稱或 Email
4. 選擇權限：
   - **Read** - 只能查看（推薦給查看者）
   - **Write** - 可以修改程式碼（推薦給開發者）
   - **Admin** - 完全控制（謹慎使用）

---

## 🌐 GitHub Pages 部署

### 初次設定 GitHub Pages

#### 步驟 1：啟用 GitHub Pages

1. 前往倉庫：https://github.com/power7414/sportslotteryApp
2. 點擊 **Settings** → 左側選單的 **Pages**
3. 在 **Build and deployment** 下：
   - **Source**: 選擇 `Deploy from a branch`
   - **Branch**: 選擇 `gh-pages`，資料夾選擇 `/ (root)`
4. 點擊 **Save**

#### 步驟 2：等待部署完成

- 部署通常需要 **2-5 分鐘**
- 完成後會顯示綠色提示：
  > **Your site is live at https://power7414.github.io/sportslotteryApp/**

#### 步驟 3：訪問網站

前往：**https://power7414.github.io/sportslotteryApp/**

---

### 更新部署

每次修改程式碼後，執行以下指令即可自動部署：

```bash
npm run deploy
```

**這個指令會做什麼？**
1. 執行 TypeScript 編譯檢查
2. 使用 Vite 建置專案（產生 `dist/` 資料夾）
3. 將 `dist/` 內容推送到 `gh-pages` 分支
4. GitHub Pages 自動偵測並更新網站（等待 1-2 分鐘）

---

### 手動部署流程

如果你想了解 `npm run deploy` 背後做了什麼：

```bash
# 1. 建置專案
npm run build

# 2. 部署到 gh-pages 分支（需要先安裝 gh-pages）
npx gh-pages -d dist
```

---

## 💻 本地開發

### 安裝依賴

第一次下載專案或其他人 clone 專案時：

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

通常會在 http://localhost:5173 啟動

### 建置專案（測試）

```bash
npm run build
```

建置後的檔案會在 `dist/` 資料夾

### 預覽建置結果

```bash
npm run preview
```

---

## 🔄 完整工作流程

### 日常開發流程

```bash
# 1. 確保在最新版本
git pull origin main

# 2. 啟動開發伺服器
npm run dev

# 3. 修改程式碼...

# 4. 提交修改
git add .
git commit -m "描述你的修改"

# 5. 推送到 GitHub
git push origin main

# 6. 部署到 GitHub Pages（選擇性）
npm run deploy
```

---

## 📝 重要檔案說明

### vite.config.ts

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/sportslotteryApp/',  // GitHub Pages 路徑設定
})
```

**重要**：`base` 必須設定為 `/倉庫名稱/`，否則 GitHub Pages 會無法正確載入資源。

### .gitignore

已設定排除以下檔案/資料夾：
- `node_modules/` - 依賴套件
- `dist/` - 建置輸出
- `.env` - 環境變數
- 影片檔案（.mp4, .mov, .avi 等）

### package.json - scripts

```json
{
  "scripts": {
    "dev": "vite",                              // 開發伺服器
    "build": "tsc && vite build",               // 建置專案
    "preview": "vite preview",                  // 預覽建置結果
    "deploy": "npm run build && gh-pages -d dist"  // 部署到 GitHub Pages
  }
}
```

---

## ❓ 常見問題

### Q1: GitHub Pages 網址顯示 404

**可能原因**：
1. GitHub Pages 尚未啟用
2. 選錯分支（應該選 `gh-pages`）
3. 部署尚未完成（等待 2-5 分鐘）

**解決方法**：
- 檢查 Settings → Pages 是否正確設定
- 確認 `gh-pages` 分支存在：https://github.com/power7414/sportslotteryApp/tree/gh-pages

---

### Q2: 頁面樣式跑掉或資源載入失敗

**可能原因**：`vite.config.ts` 的 `base` 路徑設定錯誤

**解決方法**：
確保 `vite.config.ts` 中：
```typescript
base: '/sportslotteryApp/',  // 必須與倉庫名稱一致
```

修改後重新部署：
```bash
npm run deploy
```

---

### Q3: 如何讓 GitHub Pages 變成私有的？

**答案**：**GitHub Pages 無法設為私有**

GitHub 的免費方案中，Pages 永遠是公開的。

**替代方案**：
- 使用 Vercel / Netlify（支援密碼保護）
- 使用 Cloudflare Pages（支援訪問控制）
- 購買 GitHub Enterprise（付費方案）

---

### Q4: 部署後網站沒有更新

**可能原因**：
1. 瀏覽器快取
2. GitHub Pages 尚未重新部署

**解決方法**：
1. 強制重新整理頁面（Cmd+Shift+R 或 Ctrl+Shift+R）
2. 等待 2-5 分鐘
3. 檢查 Actions 分頁是否有錯誤：https://github.com/power7414/sportslotteryApp/actions

---

### Q5: 如何刪除 GitHub Pages

1. 前往 Settings → Pages
2. 在 **Build and deployment** 下
3. Source 選擇 **None**
4. 點擊 Save

---

### Q6: 本地開發正常，但部署後功能不正常

**可能原因**：
- 路徑問題（本地是 `/`，GitHub Pages 是 `/sportslotteryApp/`）
- 環境變數問題

**檢查重點**：
1. 所有資源路徑是否使用相對路徑
2. `vite.config.ts` 的 `base` 設定是否正確
3. 是否使用了環境變數（GitHub Pages 不支援 `.env`）

---

### Q7: 如何查看部署歷史

1. 前往倉庫的 **Actions** 分頁
2. 或直接訪問：https://github.com/power7414/sportslotteryApp/actions
3. 每次執行 `npm run deploy` 都會顯示在這裡

---

### Q8: 部署失敗怎麼辦？

**檢查清單**：

```bash
# 1. 確認本地建置成功
npm run build

# 2. 檢查 TypeScript 錯誤
npx tsc --noEmit

# 3. 檢查 git 狀態
git status

# 4. 確認遠端連接
git remote -v

# 5. 手動推送
git push origin main
```

如果都沒問題，重試部署：
```bash
npm run deploy
```

---

## 🔗 相關連結

- **GitHub 倉庫**: https://github.com/power7414/sportslotteryApp
- **GitHub Pages**: https://power7414.github.io/sportslotteryApp/
- **Vite 文件**: https://vitejs.dev/
- **GitHub Pages 文件**: https://docs.github.com/en/pages

---

## 📞 需要幫助？

如果遇到問題：
1. 檢查 [常見問題](#常見問題) 章節
2. 查看 GitHub Actions 的錯誤訊息
3. 檢查瀏覽器 Console 的錯誤

---

**最後更新**: 2025-10-25
**維護者**: power7414
