export interface Analysis {
  id: number;
  analyst: string;
  avatar: string;
  title: string;
  sport: string;
  league: string;
  content: string;
  prediction: string;
  confidence: number;
  rating: number;
  views: number;
  likes: number;
  time: string;
  tags: string[];
  matchDate?: string;  // 新增：賽事日期
  isRecommended?: boolean;  // 新增：推薦標籤
  matchId?: number;  // 新增：關聯賽事ID
}

export interface GroupMessageData {
  id: number;
  user: string;
  avatar: string;
  message: string;
  time: string;
  isCurrentUser: boolean;
  sharedAnalysis?: Analysis;  // 分享的分析內容（可選）
}

export interface SportOption {
  value: string;
  label: string;
}

// 新增：賽事比分資料結構
export interface ScoreData {
  id: number;
  sport: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  homeScore: number;
  awayScore: number;
  status: 'live' | 'final' | 'scheduled';
  time: string;
  date: string;
  spread: string;
  prediction: {
    option: string;
    percentage: number;
  };
}

// 新增：聊天室資料結構
export interface ChatRoom {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  members: number;
}

// 新增：聯盟選項結構
export interface LeagueOptions {
  [key: string]: { value: string; label: string; }[];
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
