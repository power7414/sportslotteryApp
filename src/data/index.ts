import { Analysis, GroupMessageData, SportOption, ScoreData, ChatRoom, LeagueOptions } from '../types';

// 日期計算輔助函數
const getDateKey = (offset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};

export const dateKeys = {
  yesterday: getDateKey(-1),
  today: getDateKey(0),
  tomorrow: getDateKey(1)
};

export const analysisData: Analysis[] = [
  {
    id: 1,
    analyst: "籃球專家王大明",
    avatar: "👨‍💼",
    title: "湖人 vs 勇士 深度分析",
    sport: "NBA",
    league: "美國職籃",
    content: "根據兩隊近期表現，湖人主場優勢明顯，勇士客場戰績不佳。建議關注湖人讓分盤...",
    prediction: "湖人 -3.5",
    confidence: 85,
    rating: 4.2,
    views: 1250,
    likes: 89,
    time: "2小時前",
    tags: ["NBA", "讓分", "主客場"],
    matchDate: dateKeys.today,
    isRecommended: true,
    matchId: 1
  },
  {
    id: 2,
    analyst: "足球分析師李小華",
    avatar: "👩‍💼",
    title: "曼城 vs 阿森納 戰術分析",
    sport: "足球",
    league: "英超",
    content: "曼城近期攻擊力強勁，阿森納防守端有所改善。預期會是一場精彩對決...",
    prediction: "大2.5球",
    confidence: 78,
    rating: 4.0,
    views: 890,
    likes: 67,
    time: "4小時前",
    tags: ["英超", "大小球", "戰術"],
    matchDate: dateKeys.today,
    isRecommended: false,
    matchId: 4
  },
  {
    id: 3,
    analyst: "數據分析師張三",
    avatar: "🧑‍💻",
    title: "勇士隊三分球數據分析",
    sport: "NBA",
    league: "美國職籃",
    content: "勇士隊本季三分球命中率達38.5%，在主場更是高達41.2%。建議關注三分球相關玩法...",
    prediction: "勇士三分球 Over 14.5",
    confidence: 92,
    rating: 4.5,
    views: 2100,
    likes: 156,
    time: "6小時前",
    tags: ["NBA", "數據分析", "三分球"],
    matchDate: dateKeys.tomorrow,
    isRecommended: true,
    matchId: 2
  },
  {
    id: 4,
    analyst: "棒球專家陳教練",
    avatar: "⚾",
    title: "道奇 vs 教士 投手對決分析",
    sport: "棒球",
    league: "MLB",
    content: "兩隊先發投手狀態都不錯，預期會是低比分的投手戰...",
    prediction: "小於8.5分",
    confidence: 80,
    rating: 4.1,
    views: 650,
    likes: 45,
    time: "8小時前",
    tags: ["MLB", "大小分", "投手戰"],
    matchDate: dateKeys.yesterday,
    isRecommended: false,
    matchId: 5
  }
];

export const getGroupMessages = (userName: string): GroupMessageData[] => [
  { id: 1, user: "運彩高手", avatar: "🏆", message: "今天湖人的分析很不錯！", time: "10:30", isCurrentUser: false },
  { id: 2, user: userName, avatar: "👤", message: "我也覺得很有道理", time: "10:32", isCurrentUser: true },
  { id: 3, user: "籃球專家王大明", avatar: "👨‍💼", message: "謝謝大家的支持！", time: "10:35", isCurrentUser: false },
  { id: 4, user: "新手小白", avatar: "🔰", message: "請問大家怎麼看今晚的比賽？", time: "10:40", isCurrentUser: false },
  { id: 5, user: userName, avatar: "👤", message: "我覺得可以關注主隊優勢", time: "10:42", isCurrentUser: true }
];

export const sportOptions: SportOption[] = [
  { value: 'all', label: '全部運動' },
  { value: 'NBA', label: 'NBA籃球' },
  { value: '足球', label: '足球' },
  { value: '棒球', label: '棒球' },
  { value: '網球', label: '網球' }
];

export const keyboardKeys: string[][] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];

// 賽事比分資料
export const scoresData: ScoreData[] = [
  {
    id: 1,
    sport: "NBA",
    league: "美國職籃",
    homeTeam: "湖人",
    awayTeam: "勇士",
    homeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/250px-Los_Angeles_Lakers_logo.svg.png",
    awayLogo: "https://upload.wikimedia.org/wikipedia/zh/d/da/Golden_State_Warriors.png",
    homeScore: 108,
    awayScore: 102,
    status: "live",
    time: "Q3 5:32",
    date: dateKeys.today,
    spread: "湖人 -3.5",
    prediction: {
      option: "湖人 -3.5",
      percentage: 68
    }
  },
  {
    id: 2,
    sport: "NBA",
    league: "美國職籃",
    homeTeam: "賽爾提克",
    awayTeam: "獨行俠",
    homeLogo: "https://upload.wikimedia.org/wikipedia/zh/thumb/f/f5/Boston_Celtics.png/250px-Boston_Celtics.png",
    awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Dallas_Mavericks_logo.svg/1200px-Dallas_Mavericks_logo.svg.png",
    homeScore: 0,
    awayScore: 0,
    status: "scheduled",
    time: "21:00",
    date: dateKeys.tomorrow,
    spread: "賽提 -5.5",
    prediction: {
      option: "賽提 -5.5",
      percentage: 60
    }
  },
  {
    id: 3,
    sport: "NBA",
    league: "美國職籃",
    homeTeam: "湖人",
    awayTeam: "勇士",
    homeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/250px-Los_Angeles_Lakers_logo.svg.png",
    awayLogo: "https://upload.wikimedia.org/wikipedia/zh/d/da/Golden_State_Warriors.png",
    homeScore: 115,
    awayScore: 110,
    status: "final",
    time: "Final",
    date: dateKeys.yesterday,
    spread: "湖人 -4.5",
    prediction: {
      option: "湖人 -4.5",
      percentage: 65
    }
  },
  {
    id: 4,
    sport: "足球",
    league: "英超",
    homeTeam: "曼城",
    awayTeam: "阿森納",
    homeLogo: "https://upload.wikimedia.org/wikipedia/zh/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
    awayLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/800px-Arsenal_FC.svg.png",
    homeScore: 2,
    awayScore: 1,
    status: "live",
    time: "78'",
    date: dateKeys.today,
    spread: "大2.5球",
    prediction: {
      option: "大2.5球",
      percentage: 58
    }
  },
  {
    id: 5,
    sport: "棒球",
    league: "MLB",
    homeTeam: "道奇",
    awayTeam: "教士",
    homeLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Los_Angeles_Dodgers_Logo.svg/1158px-Los_Angeles_Dodgers_Logo.svg.png",
    awayLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/San_Diego_Padres_logo.svg/250px-San_Diego_Padres_logo.svg.png",
    homeScore: 4,
    awayScore: 3,
    status: "final",
    time: "Final",
    date: dateKeys.yesterday,
    spread: "小8.5分",
    prediction: {
      option: "小8.5分",
      percentage: 62
    }
  }
];

// 聊天室資料
export const chatRoomsData: ChatRoom[] = [
  {
    id: 1,
    name: "運彩討論群",
    avatar: "🏆",
    lastMessage: "我覺得可以關注主隊優勢",
    lastTime: "10:42",
    unread: 2,
    members: 1234
  },
  {
    id: 2,
    name: "NBA 專屬群",
    avatar: "https://images.seeklogo.com/logo-png/24/1/nba-logo-png_seeklogo-247736.png",
    lastMessage: "今晚勇士場大家怎麼看？",
    lastTime: "9:15",
    unread: 0,
    members: 456
  },
  {
    id: 3,
    name: "足球交流區",
    avatar: "https://upload.wikimedia.org/wikipedia/zh/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png",
    lastMessage: "曼城那場可惜了...",
    lastTime: "昨天",
    unread: 5,
    members: 789
  },
  {
    id: 4,
    name: "棒球 MLB/CPBL",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/640px-Major_League_Baseball_logo.svg.png",
    lastMessage: "道奇投手狀況不錯",
    lastTime: "昨天",
    unread: 1,
    members: 321
  }
];

// 聯盟選項
export const leagueOptions: LeagueOptions = {
  'NBA': [
    { value: 'all', label: '全部聯盟' },
    { value: '美國職籃', label: '美國職籃' }
  ],
  '足球': [
    { value: 'all', label: '全部聯盟' },
    { value: '英超', label: '英超' },
    { value: '西甲', label: '西甲' },
    { value: '德甲', label: '德甲' },
    { value: '意甲', label: '意甲' }
  ],
  '棒球': [
    { value: 'all', label: '全部聯盟' },
    { value: 'MLB', label: 'MLB' },
    { value: '中華職棒', label: '中華職棒' }
  ],
  '網球': [
    { value: 'all', label: '全部聯盟' },
    { value: 'ATP', label: 'ATP' },
    { value: 'WTA', label: 'WTA' }
  ]
};

// 通知資料
export const notificationsData = [
  {
    id: 1,
    type: 'analysis' as const,
    title: '新的推薦分析',
    content: '籃球專家王大明發布了「湖人 vs 勇士」的深度分析，信心指數 85%',
    time: '5分鐘前',
    isRead: false
  },
  {
    id: 2,
    type: 'message' as const,
    title: 'NBA 專屬群',
    content: '運彩高手：今天湖人的分析很不錯！',
    time: '15分鐘前',
    isRead: false
  },
  {
    id: 3,
    type: 'system' as const,
    title: '賽事提醒',
    content: '湖人 vs 勇士的比賽將在1小時後開始',
    time: '30分鐘前',
    isRead: true
  },
  {
    id: 4,
    type: 'analysis' as const,
    title: '分析更新',
    content: '足球分析師李小華更新了「曼城 vs 阿森納」的預測',
    time: '1小時前',
    isRead: true
  }
];
