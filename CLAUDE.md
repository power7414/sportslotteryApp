# CLAUDE.md - 盈吉多社群開發文件

> 本文件專為 Claude AI 助手設計，提供專案完整的開發脈絡與技術細節。

## 📌 專案簡介與目標

### 專案名稱
**盈吉多社群** (Ying-Ji-Duo Community) - 運彩分析社群平台

### 專案定位
這是一個以**社群互動為主**的台灣運彩分析平台，整合了：
- 專業分析師的運彩預測分享
- 即時賽事比分追蹤與預測功能
- 社群聊天室討論
- 個人化預測記錄與勝率統計
- 個人化通知系統

### 目標受眾
- 台灣運彩玩家
- 體育賽事關注者
- 尋求專業分析的投注者
- 運彩討論社群參與者

### 開發階段
目前處於 **Demo/Prototype 階段**：
- 所有資料皆為模擬資料（Mock Data）
- 不涉及真實的資料庫或後端 API
- 專注於 UI/UX 與前端互動邏輯
- 可作為未來後端整合的前端原型

---

## 🎯 功能列表

### 1️⃣ 分析專區（AnalysisSection）
**核心功能：** 展示專業分析師的運彩預測與分析文章

**主要特性：**
- **日期篩選**：今天 / 明天 / 後天
- **運動類型篩選**：NBA / 足球 / 棒球 / 網球
- **分析卡片顯示**：
  - 分析師資訊（頭像、名稱）
  - 預測信心指數（以進度條視覺化）
  - 推薦標籤（isRecommended）
  - 賽事預覽（AnalysisGamePreview 元件）
  - 統計數據（評分、觀看數、按讚數）
  - 標籤系統（Tags）
  - 分享功能
- **點擊查看詳情**：點擊任何分析卡片可進入完整分析頁面

**分析詳細頁面（AnalysisDetail）：**
- **頂部導航**：返回按鈕、收藏、分享
- **完整內容**：
  - 分析標題與推薦標籤
  - 分析師資訊與關注按鈕
  - 關聯賽事預覽
  - 預測結果與信心指數（視覺化進度條）
  - 詳細分析內容（近期戰績、球員狀態、戰術分析、投注建議）
  - 相關標籤（可點擊）
  - 統計數據（觀看、按讚、分享）
  - 風險提示
- **底部操作列**：按讚、支持、分享按鈕

**資料結構：**
```typescript
interface Analysis {
  id: string;
  analyst: string;        // 分析師名稱
  avatar: string;         // 頭像 URL
  title: string;          // 標題
  sport: string;          // 運動類型
  league: string;         // 聯盟名稱
  content: string;        // 分析內容
  prediction: string;     // 預測結果
  confidence: number;     // 信心指數 (0-100)
  rating: number;         // 評分
  views: number;          // 觀看數
  likes: number;          // 按讚數
  time: string;           // 發布時間
  tags: string[];         // 標籤
  matchDate?: string;     // 比賽日期
  isRecommended?: boolean;// 推薦標籤
  matchId?: string;       // 關聯賽事 ID
}
```

**關聯元件：**
- `AnalysisCard.tsx` - 分析卡片主體（列表預覽，可點擊）
- `AnalysisDetail.tsx` - 分析詳細頁面（全螢幕顯示）
- `AnalysisGamePreview.tsx` - 賽事預覽元件（顯示對戰隊伍、時間）

---

### 2️⃣ 賽事專區（ScoresSection）
**核心功能：** 即時/預定/已結束賽事的比分顯示與預測功能

**主要特性：**
- **三層篩選系統**：
  1. 日期篩選（今天/明天/後天）
  2. 運動類型篩選（NBA/足球/棒球/網球）
  3. 聯盟篩選（依運動類型動態變化）
- **點擊進入預測**：點擊賽事卡片進入完整預測頁面
- **賽事狀態**：
  - `live` - 進行中（紅色 LIVE 標籤 + 跳動動畫）
  - `final` - 已結束
  - `scheduled` - 預定時間
- **比分卡片顯示**：
  - 隊伍 Logo（支援 URL 與 Emoji）
  - 即時比分
  - 預測資訊（選項 + 百分比進度條）
  - 讓分/盤口資訊

**賽事預測頁面（ScoreDetail）：**
- **頂部導航**：返回按鈕、賽事標題
- **賽事資訊卡片**：
  - 運動類型與聯盟標籤
  - 對戰隊伍與 Logo
  - 比分或比賽時間
  - 日期與時間資訊
- **四種預測類型**：
  1. **讓分盤（Spread）**：支持正負讓分，顯示賠率
  2. **不讓分/獨贏（Moneyline）**：直接預測勝負
  3. **大小分（Totals）**：預測總分大於或小於指定分數
  4. **單雙（Odd/Even）**：預測總分為單數或雙數
- **選擇規則**：
  - 每種類型只能選擇一個選項
  - 可同時選擇多種類型
  - 選中狀態視覺化（藍色邊框 + 勾選圖標）
  - 顯示每個選項的賠率
- **預測提示**：說明預測規則與注意事項
- **底部提交按鈕**：
  - 顯示已選擇數量
  - 未選擇時禁用
  - 支持新增與更新預測

**資料結構：**
```typescript
interface ScoreData {
  id: number;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;      // 支援 URL 或 Emoji
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'final' | 'scheduled';
  time: string;
  date: string;
  spread: string;        // 讓分盤
  prediction: {
    option: string;      // 預測選項
    percentage: number;  // 預測百分比
  };
}

// 預測類型
export type PredictionType = 'spread' | 'moneyline' | 'totals' | 'oddEven';

// 單一預測選項
export interface BetOption {
  id: string;
  type: PredictionType;
  label: string;           // 例如：湖人 -3.5
  value: string;           // 例如：home_-3.5
  odds: number;            // 賠率，例如：1.95
}

// 使用者的預測記錄
export interface UserPrediction {
  id: string;
  matchId: number;
  match: ScoreData;        // 關聯的賽事
  predictions: {           // 使用者在這場比賽的預測
    type: PredictionType;
    option: BetOption;
  }[];
  createdAt: string;       // 預測時間
  status: 'pending' | 'live' | 'finished';  // 預測狀態
  result?: {               // 預測結果（比賽結束後才有）
    type: PredictionType;
    isCorrect: boolean;
  }[];
}

// 勝率統計
export interface WinRateStats {
  total: number;           // 總預測數
  correct: number;         // 命中數
  winRate: number;         // 勝率百分比
}
```

**聯盟資料結構：**
```typescript
const leagueOptions: LeagueOptions = {
  '全部': [{ value: '全部', label: '全部聯盟' }],
  'NBA': [
    { value: '全部', label: '全部聯盟' },
    { value: 'NBA', label: 'NBA' }
  ],
  '足球': [
    { value: '全部', label: '全部聯盟' },
    { value: '英超', label: '英格蘭超級聯賽' },
    { value: '西甲', label: '西班牙甲級聯賽' },
    // ...
  ],
  // ...
};
```

**關聯元件：**
- `ScoreCard.tsx` - 比分卡片元件（可點擊）
- `ScoreDetail.tsx` - 賽事預測頁面（全螢幕顯示）

---

### 3️⃣ 我的預測（MyPredictionsSection）
**核心功能：** 顯示使用者的預測記錄與勝率統計

**主要特性：**
- **勝率統計卡片**：
  - 歷史勝率（所有時間）
  - 本月勝率（最近 30 天）
  - 本週勝率（最近 7 天）
  - 顯示命中數/總預測數
- **日期篩選**：今天 / 明天 / 後天
- **預測記錄列表**：
  - 賽事資訊（隊伍名稱）
  - 預測狀態標籤（待開賽/進行中/已結束）
  - 預測選項詳情（類型、選項、賠率）
  - 預測結果（命中/未中，僅已結束比賽顯示）
  - 編輯按鈕（僅待開賽狀態可編輯）
- **編輯功能**：點擊編輯按鈕返回賽事預測頁面修改預測

**勝率計算邏輯：**
```typescript
const calculateWinRate = (preds: UserPrediction[], timeframe: 'all' | 'month' | 'week'): WinRateStats => {
  // 篩選已結束且有結果的預測
  let filteredPreds = preds.filter(p => p.status === 'finished' && p.result);

  // 根據時間範圍篩選
  if (timeframe === 'month') {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    filteredPreds = filteredPreds.filter(p => new Date(p.createdAt) >= oneMonthAgo);
  } else if (timeframe === 'week') {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    filteredPreds = filteredPreds.filter(p => new Date(p.createdAt) >= oneWeekAgo);
  }

  // 計算總數與命中數
  const total = filteredPreds.reduce((sum, p) => sum + (p.result?.length || 0), 0);
  const correct = filteredPreds.reduce(
    (sum, p) => sum + (p.result?.filter(r => r.isCorrect).length || 0), 0
  );

  return {
    total,
    correct,
    winRate: total > 0 ? Math.round((correct / total) * 100) : 0
  };
};
```

**關聯元件：**
- `MyPredictions.tsx` - 預測記錄主元件
- `MyPredictionsSection.tsx` - 預測頁面包裝元件

**完整預測流程：**
```
1. 使用者在賽事專區點擊賽事卡片
   ↓
2. 開啟 ScoreDetail 預測頁面
   ↓
3. 選擇預測選項（可選擇多種類型，每種類型僅一個選項）
   ↓
4. 點擊「提交預測」或「更新預測」
   ↓
5. App.tsx 的 handleSubmitPrediction 處理：
   - 檢查是否為更新（matchId 已存在）
   - 建立或更新 UserPrediction 物件
   - 更新 userPredictions 狀態
   ↓
6. 返回賽事專區
   ↓
7. 前往「我的預測」分頁查看記錄
   - 查看勝率統計
   - 依日期篩選預測
   - 編輯待開賽的預測
```

---

### 4️⃣ 群組專區（GroupSection）
**核心功能：** 社群聊天室功能，支援群組討論與訊息管理

**主要特性：**
- **聊天室列表**（ChatRoomList）：
  - 顯示所有可用聊天室
  - 未讀訊息數量標記
  - 最後訊息預覽
  - 成員人數顯示
- **聊天室詳細視圖**：
  - 訊息時間軸顯示
  - 區分當前使用者/其他使用者訊息
  - 虛擬鍵盤支援
  - 長按訊息顯示功能選單
  - 群組選單（照片影片、檔案、連結、管理功能）

**訊息功能選單（ContextMenu）：**
- 回覆
- 收回（僅限當前使用者訊息）
- 置頂公告（僅限管理員）
- 檢舉

**資料結構：**
```typescript
interface ChatRoom {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  members: number;
}

interface GroupMessageData {
  id: string;
  user: string;
  avatar: string;
  message: string;
  time: string;
  isCurrentUser: boolean;
}
```

**關聯元件：**
- `ChatRoomList.tsx` - 聊天室列表
- `ChatRoomItem.tsx` - 單一聊天室項目
- `GroupMessage.tsx` - 訊息氣泡元件
- `ContextMenu.tsx` - 右鍵/長按選單
- `Keyboard.tsx` - 虛擬鍵盤元件

---

### 5️⃣ 個人設定選單（ProfileMenu）
**核心功能：** 使用者個人資料與設定管理，從 Header 頭像按鈕呼叫

**主要特性：**
- **側滑面板設計**：從右側滑入的設定選單
- **使用者資訊區**：
  - 頭像顯示
  - 使用者名稱（可編輯/儲存）
- **帳號綁定**：
  - 台灣運彩帳號綁定（模擬功能）
- **通知設定**：
  - 推播通知開關
  - 群組訊息提醒
  - 分析師發文提醒
- **其他功能**：
  - 關於我們
  - 服務條款
  - 隱私政策
  - 登出按鈕（紅色警告樣式）

**UI 特點：**
- 遮罩層點擊關閉
- 固定於畫面右側
- 寬度 320px (80 Tailwind units)
- 支援滾動瀏覽

**關聯元件：**
- `ProfileMenu.tsx` - 個人設定選單元件

---

### 6️⃣ 通知系統（NotificationPanel）
**核心功能：** 即時通知面板，整合各類系統通知

**通知類型：**
- **分析更新**（藍色、TrendingUp 圖標）
- **群組訊息**（綠色、MessageCircle 圖標）
- **系統通知**（黃色、Users 圖標）

**主要特性：**
- 未讀狀態管理
- 點擊標記為已讀
- 固定於 App 容器內（避免超出畫面）
- Header 通知鈴鐺顯示未讀數量

**資料結構：**
```typescript
interface Notification {
  id: string;
  type: 'analysis' | 'group' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}
```

**關聯元件：**
- `Header.tsx` - 包含通知鈴鐺按鈕
- `NotificationPanel.tsx` - 通知面板主體

---

### 7️⃣ 導航系統

#### 頂部導航（Header）
- **左側**：使用者頭像按鈕（點擊開啟 ProfileMenu）
- **右側**：通知鈴鐺（顯示未讀數量、點擊開啟 NotificationPanel）
- **設計理念**：簡潔設計，移除標題文字，專注於功能按鈕

#### 底部導航（BottomNavigation）
- 分析專區（TrendingUp 圖標）
- 賽事專區（Trophy 圖標）
- 群組專區（Users 圖標）
- **我的預測**（Target 圖標）- 替代原本的個人中心
- 選中狀態視覺化（藍色高亮）

**導航結構變更說明：**
- 原本的「個人中心」移至 Header 頭像按鈕
- 底部導航的第四個位置改為「我的預測」
- 這樣的設計讓預測功能更易訪問，設定功能保持在傳統的頂部位置

---

## 🏗️ 技術架構

### 技術棧

| 類別 | 技術 | 版本 | 用途 |
|-----|------|------|------|
| **框架** | React | ^18.2.0 | UI 框架 |
| **語言** | TypeScript | ^5.3.3 | 型別安全 |
| **建置工具** | Vite | ^5.0.10 | 開發伺服器與打包 |
| **樣式** | Tailwind CSS | ^3.4.0 | Utility-first CSS |
| **圖標** | Lucide React | ^0.303.0 | 圖標庫（40+ 圖標） |
| **CSS 處理** | PostCSS | ^8.4.32 | CSS 後處理器 |
| | Autoprefixer | ^10.4.16 | 自動加入瀏覽器前綴 |

### 專案結構

```
/Users/pkwu/Documents/運彩 App/
├── src/
│   ├── components/          # React 元件目錄
│   │   ├── AnalysisSection.tsx       # 分析專區主元件
│   │   ├── AnalysisCard.tsx          # 分析卡片（可點擊）
│   │   ├── AnalysisDetail.tsx        # 分析詳細頁面（全螢幕）
│   │   ├── AnalysisGamePreview.tsx   # 賽事預覽
│   │   ├── ScoresSection.tsx         # 賽事專區主元件
│   │   ├── ScoreCard.tsx             # 比分卡片（可點擊）
│   │   ├── ScoreDetail.tsx           # 賽事預測頁面（全螢幕）
│   │   ├── MyPredictionsSection.tsx  # 我的預測頁面
│   │   ├── MyPredictions.tsx         # 預測記錄元件
│   │   ├── GroupSection.tsx          # 群組專區主元件
│   │   ├── GroupMessage.tsx          # 訊息氣泡
│   │   ├── ChatRoomList.tsx          # 聊天室列表
│   │   ├── ChatRoomItem.tsx          # 聊天室項目
│   │   ├── ProfileMenu.tsx           # 個人設定選單（側滑面板）
│   │   ├── Header.tsx                # 頂部導航（頭像+通知）
│   │   ├── BottomNavigation.tsx      # 底部導航（4個主要分頁）
│   │   ├── NotificationPanel.tsx     # 通知面板
│   │   ├── ContextMenu.tsx           # 右鍵選單
│   │   └── Keyboard.tsx              # 虛擬鍵盤
│   ├── types/
│   │   └── index.ts         # TypeScript 型別定義
│   ├── data/
│   │   └── index.ts         # 模擬資料與工具函式
│   ├── App.tsx              # 主應用程式元件
│   ├── main.tsx             # React 入口點
│   └── index.css            # 全域樣式（Tailwind 導入）
├── public/                  # 靜態資源
├── index.html               # HTML 入口點
├── vite.config.ts           # Vite 設定
├── tailwind.config.js       # Tailwind CSS 設定
├── tsconfig.json            # TypeScript 設定
├── package.json             # 專案依賴
├── demo.tsx                 # Demo 範例（未使用）
├── clear-sw.html            # Service Worker 清除工具
└── CLAUDE.md               # 本文件
```

### 元件層級架構

```
App (主容器，管理全域狀態)
├── Header (頭像按鈕 + 通知鈴鐺)
├── NotificationPanel (通知面板 Overlay，條件渲染)
├── ProfileMenu (個人設定選單，條件渲染)
├── 內容區域 (根據狀態動態切換)
│   ├── AnalysisDetail (當 selectedAnalysis 有值時，全螢幕顯示)
│   │   └── AnalysisGamePreview
│   ├── ScoreDetail (當 selectedScore 有值時，全螢幕顯示)
│   ├── AnalysisSection (activeTab === 'analysis')
│   │   └── AnalysisCard[] (點擊觸發 setSelectedAnalysis)
│   │       └── AnalysisGamePreview
│   ├── ScoresSection (activeTab === 'scores')
│   │   └── ScoreCard[] (點擊觸發 setSelectedScore)
│   ├── GroupSection (activeTab === 'group')
│   │   ├── ChatRoomList
│   │   │   └── ChatRoomItem[]
│   │   └── 聊天室詳細視圖
│   │       ├── GroupMessage[]
│   │       └── 訊息輸入區
│   └── MyPredictionsSection (activeTab === 'predictions')
│       └── MyPredictions (顯示勝率統計 + 預測記錄)
├── Keyboard (虛擬鍵盤，條件渲染)
├── ContextMenu (右鍵選單，條件渲染)
└── BottomNavigation (底部導航：分析/賽事/群組/我的預測)
```

### 狀態管理策略

**目前採用 React Local State（useState）**，主要狀態包括：

```typescript
// App.tsx 中的主要狀態
const [activeTab, setActiveTab] = useState('analysis');  // 當前分頁
const [selectedSport, setSelectedSport] = useState('all');  // 選中的運動類型
const [groupMessage, setGroupMessage] = useState('');  // 群組訊息輸入
const [contextMenu, setContextMenu] = useState<{x: number, y: number, messageId: number} | null>(null);
const [userName, setUserName] = useState('運彩新手');  // 使用者名稱
const [isAdmin] = useState(true);  // 管理員狀態
const [showKeyboard, setShowKeyboard] = useState(false);  // 虛擬鍵盤顯示
const [activeChatRoom, setActiveChatRoom] = useState<number | null>(null);  // 當前聊天室
const [notifications, setNotifications] = useState(notificationsData);  // 通知列表
const [showNotifications, setShowNotifications] = useState(false);  // 通知面板顯示
const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);  // 選中的分析
const [selectedScore, setSelectedScore] = useState<ScoreData | null>(null);  // 選中的賽事
const [userPredictions, setUserPredictions] = useState<UserPrediction[]>([]);  // 使用者預測記錄
const [showProfileMenu, setShowProfileMenu] = useState(false);  // 個人設定選單顯示
```

**預測功能的狀態管理：**
```typescript
// 提交預測的處理函式
const handleSubmitPrediction = (score: ScoreData, predictions: { type: PredictionType; option: BetOption }[]) => {
  const existingPredictionIndex = userPredictions.findIndex(p => p.matchId === score.id);

  const newPrediction: UserPrediction = {
    id: existingPredictionIndex >= 0 ? userPredictions[existingPredictionIndex].id : `pred_${Date.now()}`,
    matchId: score.id,
    match: score,
    predictions: predictions,
    createdAt: new Date().toISOString(),
    status: score.status
  };

  if (existingPredictionIndex >= 0) {
    // 更新現有預測
    setUserPredictions(prev =>
      prev.map((p, i) => i === existingPredictionIndex ? newPrediction : p)
    );
  } else {
    // 新增預測
    setUserPredictions(prev => [...prev, newPrediction]);
  }
};
```

**為何不使用 Redux/Zustand？**
- 目前專案規模小，狀態簡單
- 沒有跨多層元件的複雜狀態傳遞需求
- Prop drilling 尚未造成問題
- 適合 Prototype 快速迭代

**未來擴展建議：**
當專案需要整合後端 API 時，可考慮：
- **React Query / SWR**：處理伺服器狀態（快取、重新驗證）
- **Zustand / Jotai**：輕量級全域狀態管理
- **Redux Toolkit**：複雜狀態邏輯（如需要 time-travel debugging）

### 資料流設計

```
[模擬資料] (src/data/index.ts)
    ↓
[App.tsx State]
    ↓
[Props 傳遞]
    ↓
[子元件渲染]
    ↓
[使用者互動]
    ↓
[事件處理器]
    ↓
[更新 State]
    ↓
[重新渲染]
```

**範例：通知系統資料流**
```typescript
// 1. 初始資料載入
const [notifications, setNotifications] = useState<Notification[]>(notificationsData);

// 2. 傳遞到子元件
<NotificationPanel
  notifications={notifications}
  onNotificationClick={handleNotificationClick}
/>

// 3. 使用者互動
const handleNotificationClick = (id: string) => {
  setNotifications(prev =>
    prev.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    )
  );
};

// 4. UI 自動更新
```

### 樣式設計系統

**Tailwind CSS 使用策略：**

1. **顏色系統**
   - 主色調：藍色（`bg-blue-500`, `text-blue-600`）
   - 成功/進行中：綠色（`bg-green-500`）
   - 警告/Live：紅色（`bg-red-500`）
   - 中性色：灰階（`bg-gray-50` ~ `bg-gray-800`）

2. **間距系統**
   - 卡片內距：`p-4`
   - 元件間距：`space-y-4`, `gap-4`
   - 容器邊距：`px-4`, `py-2`

3. **響應式設計**
   - 主要為移動端設計（320px ~ 428px）
   - 使用固定寬度容器模擬手機畫面
   - 可擴展至平板/桌面（需加入 `md:`, `lg:` 斷點）

4. **動畫效果**
   ```css
   /* Live 狀態跳動動畫 */
   @keyframes pulse-dot {
     0%, 100% { opacity: 1; }
     50% { opacity: 0.5; }
   }

   /* Tailwind 類別 */
   animate-pulse-dot
   ```

5. **共用元件樣式模式**
   ```typescript
   // 卡片基礎樣式
   const cardBaseClass = "bg-white rounded-lg shadow p-4";

   // 按鈕基礎樣式
   const buttonBaseClass = "px-4 py-2 rounded-lg transition-colors";

   // 標籤基礎樣式
   const badgeBaseClass = "px-2 py-1 rounded text-xs";
   ```

### TypeScript 型別系統

**核心型別定義位置：** `src/types/index.ts`

**型別設計原則：**
1. **明確的狀態列舉**
   ```typescript
   status: 'live' | 'final' | 'scheduled'  // ✅ 好
   status: string  // ❌ 避免
   ```

2. **可選屬性使用 `?`**
   ```typescript
   matchDate?: string;
   isRecommended?: boolean;
   ```

3. **介面組合**
   ```typescript
   interface LeagueOptions {
     [sport: string]: SportOption[];
   }
   ```

4. **函式型別定義**
   ```typescript
   interface AnalysisSectionProps {
     selectedSport: string;
     onSportChange: (sport: string) => void;
   }
   ```

**型別安全實踐：**
- 避免使用 `any`
- Props 必須定義介面
- 事件處理器明確型別
- 使用 TypeScript 嚴格模式（tsconfig.json）

---

## 🛠️ 開發指南

### 環境設定

**系統需求：**
- Node.js >= 18.x
- npm >= 9.x

**安裝步驟：**
```bash
# 1. 進入專案目錄
cd "/Users/pkwu/Documents/運彩 App"

# 2. 安裝依賴
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 開啟瀏覽器訪問
# 通常是 http://localhost:5173
```

**建置專案：**
```bash
npm run build      # 建置生產版本
npm run preview    # 預覽建置結果
```

### 開發工作流

#### 1. 新增功能模組
假設要新增「收藏功能」：

**步驟 1：定義型別**
```typescript
// src/types/index.ts
export interface Favorite {
  id: string;
  type: 'analysis' | 'score' | 'chatroom';
  itemId: string;
  timestamp: string;
}
```

**步驟 2：新增模擬資料**
```typescript
// src/data/index.ts
export const favoritesData: Favorite[] = [
  {
    id: 'fav1',
    type: 'analysis',
    itemId: '1',
    timestamp: '2024-01-20T10:00:00Z'
  }
];
```

**步驟 3：建立元件**
```typescript
// src/components/FavoriteButton.tsx
import { Star } from 'lucide-react';

interface FavoriteButtonProps {
  itemId: string;
  isFavorited: boolean;
  onToggle: (itemId: string) => void;
}

export function FavoriteButton({ itemId, isFavorited, onToggle }: FavoriteButtonProps) {
  return (
    <button
      onClick={() => onToggle(itemId)}
      className={`p-2 rounded-full transition-colors ${
        isFavorited ? 'text-yellow-500' : 'text-gray-400'
      }`}
    >
      <Star className={isFavorited ? 'fill-current' : ''} size={20} />
    </button>
  );
}
```

**步驟 4：整合到 App.tsx**
```typescript
// App.tsx
const [favorites, setFavorites] = useState<string[]>([]);

const handleToggleFavorite = (itemId: string) => {
  setFavorites(prev =>
    prev.includes(itemId)
      ? prev.filter(id => id !== itemId)
      : [...prev, itemId]
  );
};

// 傳遞到子元件
<AnalysisCard
  favorites={favorites}
  onToggleFavorite={handleToggleFavorite}
/>
```

#### 2. 修改現有元件

**修改前檢查清單：**
- [ ] 確認元件的 Props 介面
- [ ] 了解元件的狀態管理
- [ ] 檢查是否影響父元件
- [ ] 確認 TypeScript 型別正確

**範例：在 AnalysisCard 新增分享次數**

```typescript
// 1. 更新型別
interface Analysis {
  // ... 現有欄位
  shares?: number;  // 新增
}

// 2. 更新模擬資料
export const analysisData: Analysis[] = [
  {
    id: '1',
    // ... 現有資料
    shares: 42  // 新增
  }
];

// 3. 修改元件
export function AnalysisCard({ analysis }: AnalysisCardProps) {
  return (
    <div>
      {/* ... 現有內容 */}
      {analysis.shares && (
        <div className="flex items-center gap-1 text-gray-500">
          <Share2 size={16} />
          <span>{analysis.shares}</span>
        </div>
      )}
    </div>
  );
}
```

#### 3. 除錯技巧

**React DevTools：**
```bash
# 安裝瀏覽器擴充功能
# Chrome: React Developer Tools
# Firefox: React DevTools
```

**Console 除錯：**
```typescript
// 檢查 Props
useEffect(() => {
  console.log('Current props:', props);
}, [props]);

// 檢查 State 變化
useEffect(() => {
  console.log('State changed:', state);
}, [state]);
```

**TypeScript 錯誤排查：**
```bash
# 執行型別檢查（不建置）
npx tsc --noEmit

# 查看詳細錯誤
npx tsc --noEmit --pretty
```

#### 4. 常見開發任務

**新增運動類型：**
```typescript
// 1. 更新 sportOptions (data/index.ts)
export const sportOptions: SportOption[] = [
  // ... 現有項目
  { value: '電競', label: '電競' }
];

// 2. 更新 leagueOptions
'電競': [
  { value: '全部', label: '全部聯盟' },
  { value: 'LOL', label: '英雄聯盟' },
  { value: 'DOTA2', label: 'DOTA 2' }
]

// 3. 新增對應的模擬資料
export const scoresData: ScoreData[] = [
  // ... 現有資料
  {
    id: 'esports1',
    sport: '電競',
    league: 'LOL',
    // ...
  }
];
```

**新增通知類型：**
```typescript
// 1. 更新型別定義
type: 'analysis' | 'group' | 'system' | 'promotion';  // 新增 promotion

// 2. 在 NotificationPanel 新增圖標對應
const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'analysis': return <TrendingUp className="text-blue-500" />;
    case 'group': return <MessageCircle className="text-green-500" />;
    case 'system': return <Users className="text-yellow-500" />;
    case 'promotion': return <Gift className="text-purple-500" />;  // 新增
  }
};
```

### 程式碼風格規範

**命名慣例：**
```typescript
// 元件檔案：PascalCase
AnalysisCard.tsx
NotificationPanel.tsx

// 介面/型別：PascalCase
interface Analysis { }
type Tab = 'analysis' | 'scores';

// 變數/函式：camelCase
const selectedSport = 'NBA';
const handleClick = () => { };

// 常數：UPPER_SNAKE_CASE (如需要)
const MAX_NOTIFICATIONS = 50;

// Props 介面命名：元件名稱 + Props
interface AnalysisCardProps { }
```

**檔案組織：**
```typescript
// 1. Imports (按類型分組)
import React, { useState, useEffect } from 'react';  // React
import { Star, Share2 } from 'lucide-react';         // 第三方
import { Analysis } from '../types';                  // 專案內部

// 2. 型別定義
interface ComponentProps { }

// 3. 元件定義
export function Component({ }: ComponentProps) {
  // 3.1 State
  const [state, setState] = useState();

  // 3.2 Effects
  useEffect(() => { }, []);

  // 3.3 事件處理器
  const handleClick = () => { };

  // 3.4 渲染邏輯
  return ( );
}

// 4. 子元件/輔助函式（如有）
function HelperComponent() { }
```

**註解規範：**
```typescript
// ✅ 好的註解：解釋「為什麼」
// 限制通知面板在 App 容器內，避免超出視窗
const panelStyle = { maxHeight: 'calc(100vh - 120px)' };

// ✅ 複雜邏輯說明
// 將昨天/今天/明天轉換為實際日期，供資料篩選使用
const actualDate = dateMap[selectedDate] || selectedDate;

// ❌ 避免：重複程式碼的註解
// 設定 active tab 為 analysis
setActiveTab('analysis');  // 程式碼本身已經很清楚
```

### 效能優化建議

**目前階段（Prototype）：**
- 資料量小，不需要過度優化
- 優先考慮程式碼可讀性

**未來優化方向：**

1. **列表渲染優化**
   ```typescript
   // 使用 key 屬性
   {analyses.map(analysis => (
     <AnalysisCard key={analysis.id} analysis={analysis} />
   ))}

   // 大列表考慮虛擬滾動（react-window）
   ```

2. **避免不必要的重渲染**
   ```typescript
   // 使用 React.memo
   export const AnalysisCard = React.memo(({ analysis }) => {
     // ...
   });

   // 使用 useCallback
   const handleClick = useCallback(() => {
     // ...
   }, [dependencies]);
   ```

3. **圖片優化**
   ```typescript
   // 使用 loading="lazy"
   <img src={logo} alt="logo" loading="lazy" />

   // 考慮使用 WebP 格式
   // 設定適當的圖片尺寸
   ```

### Git 工作流建議

**分支策略：**
```bash
main              # 主分支（穩定版本）
├── feature/*     # 功能分支
├── bugfix/*      # 修復分支
└── experiment/*  # 實驗性功能
```

**Commit 訊息格式：**
```bash
# 格式：<類型>: <簡短描述>

# 類型：
新增:   新功能
更新:   功能改進
修正:   Bug 修復
重構:   程式碼重構
樣式:   UI/樣式調整
文件:   文件更新

# 範例：
新增: 收藏功能到分析卡片
修正: 通知面板定位問題
更新: 賽事篩選支援多聯盟
```

### 常見問題排查

**問題 1：Tailwind 樣式不生效**
```bash
# 檢查 tailwind.config.js 的 content 路徑
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",  # 確認包含所有元件
]

# 確認 index.css 有導入 Tailwind
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**問題 2：TypeScript 型別錯誤**
```bash
# 確認 tsconfig.json 設定
"strict": true,
"noUnusedLocals": true,
"noUnusedParameters": true,

# 檢查 Props 介面是否定義
interface Props {
  value: string;  // 不是 value?: string
}
```

**問題 3：元件不重新渲染**
```typescript
// 檢查是否正確更新 State（不可變性）
// ❌ 錯誤：直接修改
state.push(newItem);
setState(state);

// ✅ 正確：建立新陣列
setState([...state, newItem]);
```

### 測試建議（未來擴展）

**目前階段：** 手動測試即可

**未來可加入：**
```bash
# 單元測試：Vitest + React Testing Library
npm install -D vitest @testing-library/react

# E2E 測試：Playwright
npm install -D @playwright/test
```

---

## 📝 開發注意事項

### 資料模擬策略
- 所有資料來自 `src/data/index.ts`
- 不使用 localStorage（避免狀態持久化混淆）
- 每次重新整理頁面會重置為初始狀態
- 時間相關資料使用「相對時間」（如：2小時前）

### UI/UX 原則
- **移動優先設計**（Mobile-first）
- 所有互動必須有視覺回饋（hover, active 狀態）
- 使用適當的 loading 狀態（雖然目前沒有真實 API）
- 保持一致的間距與色彩系統

### 無障礙性（a11y）考量
```typescript
// 使用語意化 HTML
<button> 而非 <div onClick>

// 提供 alt 文字
<img src={logo} alt={`${team} 隊徽`} />

// 鍵盤導航支援
onKeyDown={(e) => e.key === 'Enter' && handleClick()}
```

### 瀏覽器相容性
- 目標：現代瀏覽器（Chrome, Firefox, Safari, Edge）
- 不支援 IE11
- 使用 Vite 預設的 ES2020 目標

---

## 🚀 未來擴展方向

### 階段 1：API 整合準備
當需要連接後端時，建議的重構點：

```typescript
// 1. 建立 API Service 層
// src/services/api.ts
export async function fetchAnalyses(sport: string, date: string) {
  const response = await fetch(`/api/analyses?sport=${sport}&date=${date}`);
  return response.json();
}

// 2. 使用 React Query
import { useQuery } from '@tanstack/react-query';

function AnalysisSection() {
  const { data, isLoading } = useQuery({
    queryKey: ['analyses', selectedSport, selectedDate],
    queryFn: () => fetchAnalyses(selectedSport, selectedDate)
  });
}
```

### 階段 2：進階功能
- WebSocket 即時聊天
- 推播通知（Web Push API）
- PWA 支援（離線功能）
- 圖表視覺化（勝率統計）
- 影片播放器（賽事精華）

### 階段 3：效能與規模化
- 程式碼分割（React.lazy）
- 圖片 CDN
- Server-Side Rendering（Next.js）
- 狀態管理重構（Zustand/Redux）

---

## 📚 參考資源

### 官方文件
- [React 文件](https://react.dev)
- [TypeScript 手冊](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 文件](https://tailwindcss.com/docs)
- [Vite 指南](https://vitejs.dev/guide/)

### 工具與圖標
- [Lucide Icons](https://lucide.dev) - 圖標搜尋
- [Tailwind CSS 智能提示](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### 開發除錯
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [Vite 熱更新說明](https://vitejs.dev/guide/api-hmr.html)

---

## 🔄 主要功能開發歷程

### 最新更新（2025-10-25）
- **Header 重新設計**：頭像移至左側、通知鈴鐺右側、移除標題文字
- **導航架構調整**：個人中心移至 Header，底部導航改為「我的預測」

### 預測系統（2025-10-25）
- 新增完整預測功能（讓分盤、不讓分、大小分、單雙）
- 實作 ScoreDetail 預測頁面（選擇介面、賠率顯示）
- 新增 MyPredictions 預測記錄與勝率統計
- 新增 ProfileMenu 個人設定側滑選單
- 更新底部導航：新增「我的預測」分頁

### 分析詳細頁面
- 實作點擊分析卡片查看完整內容
- 新增 AnalysisDetail 全螢幕詳細頁面
- 移除觀看數顯示（列表與詳細頁）

### 日期系統更新
- 將日期篩選從「昨天/今天/明天」改為「今天/明天/後天」
- 更新所有相關元件與模擬資料

### 早期版本
- 97b8da3：修正通知面板定位（限制在 App 容器內）
- 1fab7ef：新增通知面板功能
- d48cb87：更新 logo 顯示（支援 URL 圖片）
- f329047：整合所有功能到 App.tsx
- 38a2cfc：更新分析專區（日期篩選 + 推薦標籤）
- 6e0284c：新增賽事專區元件
- 1a8934c：初始提交

---

## ✅ 給 Claude 的開發提示

### 當收到新需求時
1. **先確認影響範圍**：這個功能會影響哪些元件？
2. **檢查型別定義**：是否需要新增/修改介面？
3. **更新模擬資料**：是否需要新增測試資料？
4. **保持一致性**：參考現有元件的設計模式
5. **測試互動**：確認所有點擊、輸入、篩選功能正常

### 程式碼修改原則
- 優先編輯現有檔案，避免創建新檔案（除非必要）
- 保持 Tailwind 類別的一致性
- 確保 TypeScript 沒有型別錯誤
- 維持元件的單一職責原則

### 溝通建議
- 提供檔案路徑與行號（方便定位）
- 說明修改理由（為什麼這樣做）
- 列出受影響的元件（整體影響評估）

---

## 📋 功能清單總覽

### 核心功能（已實作）
- ✅ 分析專區（瀏覽、篩選、詳細頁面）
- ✅ 賽事專區（即時比分、多層篩選）
- ✅ 預測系統（四種預測類型、賠率顯示）
- ✅ 我的預測（記錄管理、勝率統計）
- ✅ 群組聊天（聊天室、訊息、虛擬鍵盤）
- ✅ 通知系統（面板、未讀標記）
- ✅ 個人設定（使用者資訊、通知設定）

### 資料篩選功能
- ✅ 運動類型篩選（NBA、足球、棒球、網球）
- ✅ 日期篩選（今天、明天、後天）
- ✅ 聯盟篩選（依運動類型動態變化）

### UI/UX 特色
- ✅ 暗色主題設計
- ✅ 響應式卡片佈局
- ✅ 全螢幕詳細頁面
- ✅ 即時狀態標籤（Live、Final、Scheduled）
- ✅ 視覺化進度條（信心指數、預測百分比）
- ✅ 互動式選單（右鍵選單、側滑面板）

---

**文件版本：** 2.0
**最後更新：** 2025-10-25
**維護者：** Claude AI Assistant