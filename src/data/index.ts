import { Analysis, GroupMessageData, SportOption } from '../types';

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
    tags: ["NBA", "讓分", "主客場"]
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
    tags: ["英超", "大小球", "戰術"]
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
    tags: ["NBA", "數據分析", "三分球"]
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
    tags: ["MLB", "大小分", "投手戰"]
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
