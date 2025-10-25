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
