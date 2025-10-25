import React, { useState } from 'react';
import { 
  MessageCircle, TrendingUp, User, Star, Users, Send, Share2, Eye, 
  ThumbsUp, Calendar, Trophy, MoreVertical, Reply, Undo, Megaphone, 
  Flag, Edit2, Settings, Link, Search, BookOpen, Image, FileText, 
  ExternalLink, Shield, UserCog, Award, ChevronLeft, ArrowLeft, Plus,
  ChevronDown, X, Bell
} from 'lucide-react';

// --- 輔助函數：取得日期 ---
const getFormattedDate = (offset = 0) => {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  // YYYY-MM-DD 格式
  return date.toISOString().split('T')[0];
};

const dateKeys = {
  yesterday: getFormattedDate(-1),
  today: getFormattedDate(0),
  tomorrow: getFormattedDate(1),
};

const dateOptions = [
  { key: dateKeys.yesterday, label: '昨天' },
  { key: dateKeys.today, label: '今天' },
  { key: dateKeys.tomorrow, label: '明天' },
];

// --- 模擬數據 (定義在組件外部) ---

// 模擬分析數據
const initialAnalysisData = [
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
    matchDate: dateKeys.tomorrow, // 賽事日期
    isRecommended: true, // 是否推薦
    matchId: 1 // 對應到 scoresData 的 ID
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
    matchDate: dateKeys.tomorrow, // 賽事日期
    isRecommended: false, // 是否推薦
    matchId: 3 // 對應到 scoresData 的 ID
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
    matchDate: dateKeys.today, // 賽事日期
    isRecommended: true, // 是否推薦
    matchId: 1 // 對應到 scoresData 的 ID
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
    matchDate: dateKeys.today, // 賽事日期
    isRecommended: true, // 是否推薦
    matchId: 2 // 對應到 scoresData 的 ID
  },
  {
    id: 5,
    analyst: "網球觀察家",
    avatar: "🎾",
    title: "法網決賽前瞻：納達爾 vs 喬科維奇",
    sport: "網球",
    league: "法網",
    content: "紅土之王納達爾狀態火熱，但喬科維奇的反拍依然是最大威脅...",
    prediction: "納達爾 3:1",
    confidence: 75,
    rating: 4.3,
    views: 920,
    likes: 77,
    time: "1天前",
    tags: ["法網", "納達爾"],
    matchDate: dateKeys.yesterday, // 賽事日期
    isRecommended: true, // 是否推薦
    matchId: 5 // 對應到 scoresData 的 ID
  }
];

// 聊天室列表數據
const chatRoomsData = [
  { id: 1, name: "運彩討論群", avatar: "🏆", lastMessage: "我覺得可以關注主隊優勢", time: "10:42", unread: 2, members: 1234 },
  { id: 2, name: "NBA 專屬群", avatar: "https://images.seeklogo.com/logo-png/24/1/nba-logo-png_seeklogo-247736.png", lastMessage: "今晚勇士場大家怎麼看？", time: "9:15", unread: 0, members: 456 },
  { id: 3, name: "足球交流區", avatar: "https://upload.wikimedia.org/wikipedia/zh/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png", lastMessage: "曼城那場可惜了...", time: "昨天", unread: 5, members: 789 },
  { id: 4, name: "棒球 MLB/CPBL", avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/640px-Major_League_Baseball_logo.svg.png", lastMessage: "道奇投手狀況不錯", time: "昨天", unread: 1, members: 321 },
];

// --- 聯盟選項 ---
const leagueOptions = {
  all: ['全部聯盟'],
  NBA: ['全部聯盟', 'NBA'],
  足球: ['全部聯盟', '英超', '西甲', '德甲'],
  棒球: ['全部聯盟', 'MLB', 'CPBL', '日棒'],
  網球: ['全部聯盟', '法網', '溫網', '美網']
};

// 賽事比分數據
const scoresData = [
  {
    id: 1,
    sport: 'NBA',
    league: 'NBA',
    teamA: { name: '湖人', score: 58, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/250px-Los_Angeles_Lakers_logo.svg.png' },
    teamB: { name: '勇士', score: 62, logo: 'https://upload.wikimedia.org/wikipedia/zh/d/da/Golden_State_Warriors.png' },
    status: 'Live',
    time: '半場',
    matchDate: dateKeys.tomorrow,
    pollData: { teamAPercent: 70, teamBPercent: 30, labelA: '湖人 -3.5', labelB: '勇士 +3.5' }
  },
  {
    id: 2,
    sport: '棒球',
    league: 'MLB',
    teamA: { name: '道奇', score: 3, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Los_Angeles_Dodgers_Logo.svg/1158px-Los_Angeles_Dodgers_Logo.svg.png' },
    teamB: { name: '教士', score: 1, logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/San_Diego_Padres_logo.svg/250px-San_Diego_Padres_logo.svg.png' },
    status: 'Live',
    time: 'Top 7',
    matchDate: dateKeys.today,
    pollData: { teamAPercent: 65, teamBPercent: 35, labelA: '道奇 讓分', labelB: '教士 讓分' }
  },
  {
    id: 3,
    sport: '足球',
    league: '英超',
    teamA: { name: '曼城', score: 2, logo: 'https://upload.wikimedia.org/wikipedia/zh/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png' },
    teamB: { name: '阿森納', score: 2, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/800px-Arsenal_FC.svg.png' },
    status: 'Final',
    time: 'FT',
    matchDate: dateKeys.tomorrow,
    pollData: { teamAPercent: 55, teamBPercent: 45, labelA: '曼城 讓球', labelB: '阿森納 受讓' }
  },
  {
    id: 4,
    sport: 'NBA',
    league: 'NBA',
    teamA: { name: '賽爾提克', score: 0, logo: 'https://upload.wikimedia.org/wikipedia/zh/thumb/f/f5/Boston_Celtics.png/250px-Boston_Celtics.png' },
    teamB: { name: '獨行俠', score: 0, logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Dallas_Mavericks_logo.svg/1200px-Dallas_Mavericks_logo.svg.png' },
    status: 'Scheduled',
    time: '20:30',
    matchDate: dateKeys.today,
    pollData: { teamAPercent: 60, teamBPercent: 40, labelA: '賽提 -5.5', labelB: '獨行俠 +5.5' }
  },
  {
    id: 5,
    sport: '網球',
    league: '法網',
    teamA: { name: '納達爾', score: 3, logo: 'https://placehold.co/64x64/E8A87C/FFFFFF?text=Rafa' },
    teamB: { name: '喬科維奇', score: 1, logo: 'https://placehold.co/64x64/C38D9E/FFFFFF?text=Nole' },
    status: 'Final',
    time: 'FT',
    matchDate: dateKeys.yesterday,
    pollData: { teamAPercent: 80, teamBPercent: 20, labelA: '納達爾 贏', labelB: '喬科 贏' }
  }
];

// 聊天室訊息 (模擬)
const groupMessages = [
  { id: 1, user: "運彩高手", avatar: "🏆", message: "今天湖人的分析很不錯！", time: "10:30", isCurrentUser: false },
  // { id: 2, user: userName, avatar: "👤", message: "我也覺得很有道理", time: "10:32", isCurrentUser: true }, // userName 會動態生成
  { id: 3, user: "籃球專家王大明", avatar: "👨‍💼", message: "謝謝大家的支持！", time: "10:35", isCurrentUser: false },
  { id: 4, user: "新手小白", avatar: "🔰", message: "請問大家怎麼看今晚的比賽？", time: "10:40", isCurrentUser: false },
  // { id: 5, user: userName, avatar: "👤", message: "我覺得可以關注主隊優勢", time: "10:42", isCurrentUser: true }
];

// 運動選項
const sportOptions = [
  { value: 'all', label: '全部運動' },
  { value: 'NBA', label: 'NBA籃球' },
  { value: '足球', label: '足球' },
  { value: '棒球', label: '棒球' },
  { value: '網球', label: '網球' }
];

// 模擬鍵盤按鍵
const keyboardKeys = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
];


// --- 主要 App 組件 ---
const SportsApp = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [groupMessage, setGroupMessage] = useState('');
  const [contextMenu, setContextMenu] = useState(null);
  const [groupMenu, setGroupMenu] = useState(false);
  const [userName, setUserName] = useState('運彩新手');
  const [isEditingName, setIsEditingName] = useState(false);
  const [newUserName, setNewUserName] = useState(userName);
  const [isAdmin, setIsAdmin] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(true); // 通知狀態

  // --- 分析區 State ---
  const [analysisData, setAnalysisData] = useState(initialAnalysisData);
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedDate, setSelectedDate] = useState(dateKeys.tomorrow); // 預設明天

  // --- 群組區 State ---
  const [activeChatRoom, setActiveChatRoom] = useState(null); // null: 列表, ID: 聊天室
  
  // --- 賽事區 State ---
  const [selectedScoreSport, setSelectedScoreSport] = useState('all');
  const [selectedLeague, setSelectedLeague] = useState('全部聯盟');
  const [selectedScoreDate, setSelectedScoreDate] = useState(dateKeys.today); // 預設今天

  // 篩選分析數據
  const filteredAnalysisData = analysisData
    .filter(analysis => {
      // 篩選日期
      return analysis.matchDate === selectedDate;
    })
    .filter(analysis => {
      // 篩選運動
      return selectedSport === 'all' || analysis.sport === selectedSport;
    })
    .sort((a, b) => {
      // 排序：推薦的 (isRecommended) 優先
      return (a.isRecommended === b.isRecommended) ? 0 : (a.isRecommended ? -1 : 1);
    });

  // --- 篩選賽事數據 ---
  const filteredScoresData = scoresData
    .filter(score => {
      // 篩選日期 (使用 selectedScoreDate)
      return score.matchDate === selectedScoreDate;
    })
    .filter(score => {
      // 篩選運動 (使用 selectedScoreSport)
      return selectedScoreSport === 'all' || score.sport === selectedScoreSport;
    })
    .filter(score => {
      // 篩選聯盟
      return selectedLeague === '全部聯盟' || score.league === selectedLeague;
    });

  // 動態的聯盟選項 (for 賽事專區)
  const currentLeagueOptions = leagueOptions[selectedScoreSport] || ['全部聯盟'];

  // 處理動態的聊天訊息 (加入 userName)
  const dynamicGroupMessages = [
    { id: 1, user: "運彩高手", avatar: "🏆", message: "今天湖人的分析很不錯！", time: "10:30", isCurrentUser: false },
    { id: 2, user: userName, avatar: "👤", message: "我也覺得很有道理", time: "10:32", isCurrentUser: true },
    { id: 3, user: "籃球專家王大明", avatar: "👨‍💼", message: "謝謝大家的支持！", time: "10:35", isCurrentUser: false },
    { id: 4, user: "新手小白", avatar: "🔰", message: "請問大家怎麼看今晚的比賽？", time: "10:40", isCurrentUser: false },
    { id: 5, user: userName, avatar: "👤", message: "我覺得可以關注主隊優勢", time: "10:42", isCurrentUser: true }
  ];


  const handleSendMessage = () => {
    if (groupMessage.trim()) {
      // 這裡應加入發送訊息到後端的邏輯
      console.log('Sent:', groupMessage);
      setGroupMessage('');
    }
  };

  const handleContextMenu = (e, messageId) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      messageId: messageId
    });
  };

  const handleContextMenuAction = (action, messageId) => {
    console.log(`執行動作: ${action} 對訊息 ${messageId}`);
    setContextMenu(null);
  };

  const handleSaveUserName = () => {
    setUserName(newUserName);
    setIsEditingName(false);
  };

  const handleSelectRoom = (roomId) => {
    setActiveChatRoom(roomId);
  };
  
  const handleLeagueChange = (e) => {
    setSelectedLeague(e.target.value);
  };
  
  const handleScoreSportChange = (e) => {
    const newSport = e.target.value;
    setSelectedScoreSport(newSport);
    // 當運動改變時，重設聯盟為 "全部聯盟"
    setSelectedLeague('全部聯盟'); 
  };

  // --- 用於分析卡片內嵌的賽事預覽組件 ---
  const AnalysisGamePreview = ({ match }) => {
    if (!match) {
      return (
        <div className="bg-gray-700 rounded-lg p-3 my-3 border border-gray-600 text-center text-gray-400">
          賽事資訊無法載入
        </div>
      );
    }
    return (
      <div className="bg-gray-700 rounded-lg p-3 my-3 border border-gray-600">
        <div className="flex items-center justify-between">
          {/* Team A */}
          <div className="flex items-center space-x-2 w-2/5">
            <img src={match.teamA.logo} alt={match.teamA.name} className="w-8 h-8 object-contain flex-shrink-0" />
            <span className="font-medium text-gray-200 text-sm truncate">{match.teamA.name}</span>
          </div>
          
          {/* Status/Time/Score */}
          <div className="text-center w-1/5 flex-shrink-0">
            <span className={`text-sm font-bold ${match.status === 'Live' ? 'text-red-400' : 'text-gray-400'}`}>
              {match.status === 'Scheduled' ? match.time : match.status}
            </span>
            {match.status !== 'Scheduled' && (
              <div className="text-lg font-bold text-gray-100">
                {match.teamA.score} - {match.teamB.score}
              </div>
            )}
          </div>

          {/* Team B */}
          <div className="flex items-center justify-end space-x-2 w-2/5">
            <span className="font-medium text-gray-200 text-sm truncate text-right">{match.teamB.name}</span>
            <img src={match.teamB.logo} alt={match.teamB.name} className="w-8 h-8 object-contain flex-shrink-0" />
          </div>
        </div>
      </div>
    );
  };

  // --- 分析卡片組件 ---
  const AnalysisCard = ({ analysis }) => {
    // 根據 analysis.matchId 找到對應的賽事資料
    const match = scoresData.find(s => s.id === analysis.matchId);

    return (
      <div 
        className={`relative rounded-lg shadow-md p-4 mb-4 
          ${analysis.isRecommended 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500' // 推薦卡片樣式
            : 'bg-gray-800 border border-gray-700' // 一般卡片樣式
          }`
        }
      >
        {analysis.isRecommended && (
          <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
            <Award className="w-4 h-4" />
            <span>推薦</span>
          </div>
        )}

        {/* 分析師資訊 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{analysis.avatar}</span>
            <div>
              <h3 className="font-semibold text-gray-100">{analysis.analyst}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded">{analysis.sport}</span>
                <span>{analysis.time}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* 標題和內文 */}
        <h2 className="text-lg font-bold text-gray-100 mb-2">{analysis.title}</h2>
        <p className="text-gray-300 text-sm mb-3">{analysis.content}</p>
        
        {/* --- 內嵌的賽事區塊 --- */}
        <AnalysisGamePreview match={match} />
        
        {/* 預測推薦 (移除外框) */}
        <div className="flex items-center justify-between mt-3 mb-3 px-1">
          <div>
            <span className="font-semibold text-gray-300">預測推薦：</span>
            <span className="text-gray-100 font-bold">{analysis.prediction}</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">信心指數</div>
            <div className="text-lg font-bold text-green-400">{analysis.confidence}%</div>
          </div>
        </div>

        {/* 統計數據 (加上上邊框分隔) */}
        <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-3 mt-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{analysis.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{analysis.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{analysis.likes}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 text-gray-300 hover:text-gray-100">
              <Share2 className="w-4 h-4" />
              <span className="text-xs">分享到群組</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {analysis.tags.map((tag, index) => (
            <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // --- 聊天訊息組件 ---
  const GroupMessage = ({ message }) => (
    <div className={`flex mb-4 ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!message.isCurrentUser && (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2 mt-1">
          <span className="text-sm">{message.avatar}</span>
        </div>
      )}
      <div className="flex flex-col max-w-xs">
        {!message.isCurrentUser && (
          <span className="text-xs text-gray-400 mb-1 ml-2">{message.user}</span>
        )}
        <div className={`px-4 py-2 rounded-2xl ${
          message.isCurrentUser 
            ? 'bg-gray-600 text-gray-100 rounded-br-md' 
            : 'bg-gray-700 text-gray-200 rounded-bl-md'
        }`}
        onContextMenu={(e) => handleContextMenu(e, message.id)}
        >
          <p className="text-sm">{message.message}</p>
        </div>
        <span className={`text-xs text-gray-500 mt-1 ${message.isCurrentUser ? 'text-right mr-2' : 'ml-2'}`}>
          {message.time}
        </span>
      </div>
      {message.isCurrentUser && (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center ml-2 mt-1">
          <span className="text-sm">{message.avatar}</span>
        </div>
      )}
    </div>
  );

  // --- 虛擬鍵盤組件 ---
  const KeyboardRow = ({ keys }) => (
    <div className="flex justify-center space-x-1 mb-1">
      {keys.map((key) => (
        <button
          key={key}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded text-sm font-medium min-w-8"
          onClick={() => setGroupMessage(prev => prev + key.toLowerCase())}
        >
          {key}
        </button>
      ))}
    </div>
  );

  // --- 聊天室列表項組件 ---
  const ChatRoomItem = ({ room, onClick }) => (
    <button 
      onClick={() => onClick(room.id)}
      className="flex items-center w-full p-3 hover:bg-gray-700 rounded-lg"
    >
      <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden">
        {/* 判斷 avatar 是 URL 還是 emoji */}
        {room.avatar.startsWith('http') ? (
          <img src={room.avatar} alt={room.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl">{room.avatar}</span>
        )}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <div className="flex justify-between items-center mb-0.5">
          <h3 className="font-semibold text-gray-100 truncate">{room.name}</h3>
          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{room.time}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-400 truncate">{room.lastMessage}</p>
          {room.unread > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold flex-shrink-0 ml-2">
              {room.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );

  // --- 聊天室列表組件 ---
  const GroupChatList = ({ onSelectRoom }) => (
    <div>
      <h2 className="text-lg font-bold text-gray-100 mb-2">群組專區</h2>
      <div className="space-y-1">
        {chatRoomsData.map(room => (
          <ChatRoomItem key={room.id} room={room} onClick={onSelectRoom} />
        ))}
      </div>
    </div>
  );

  // --- 賽事卡片組件 ---
  const GameScoreCard = ({ score }) => {
    const getStatusClass = (status) => {
      switch (status) {
        case 'Live':
          return 'text-red-400 font-bold';
        case 'Final':
          return 'text-gray-400';
        case 'Scheduled':
          return 'text-blue-400';
        default:
          return 'text-gray-400';
      }
    };

    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4 border border-gray-700">
        {/* 聯盟 & 狀態 */}
        <div className="flex items-center justify-between mb-3 text-sm">
          {/* --- 加上日期 --- */}
          <div className="flex items-center space-x-2">
            <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded">{score.league}</span>
            {/* 格式化日期為 MM/DD */}
            <span className="text-gray-400">{new Date(score.matchDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className={getStatusClass(score.status)}>{score.status}</span>
            <span className="text-gray-400">{score.time}</span>
          </div>
        </div>

        {/* 隊伍 & 比分 */}
        <div className="flex items-center justify-between mb-4">
          {/* A 隊 */}
          <div className="flex flex-col items-center w-2/5">
            <img src={score.teamA.logo} alt={score.teamA.name} className="w-16 h-16 object-contain mb-1" />
            <span className="font-semibold text-gray-100 text-center">{score.teamA.name}</span>
          </div>
          
          {/* 比分 */}
          <div className="text-center">
            {score.status !== 'Scheduled' ? (
              <div className="text-4xl font-bold text-gray-100">
                {score.teamA.score} - {score.teamB.score}
              </div>
            ) : (
              <div className="text-3xl font-bold text-gray-500">VS</div>
            )}
          </div>
          
          {/* B 隊 */}
          <div className="flex flex-col items-center w-2/5">
            <img src={score.teamB.logo} alt={score.teamB.name} className="w-16 h-16 object-contain mb-1" />
            <span className="font-semibold text-gray-100 text-center">{score.teamB.name}</span>
          </div>
        </div>

        {/* 預測比例條 */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium text-gray-300 mb-1">
            <span>{score.pollData.labelA} ({score.pollData.teamAPercent}%)</span>
            <span>({score.pollData.teamBPercent}%) {score.pollData.labelB}</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-blue-500 h-2.5 rounded-l-full" 
              style={{ width: `${score.pollData.teamAPercent}%` }}
            ></div>
            <div 
              className="bg-red-500 h-2.5 rounded-r-full" 
              style={{ width: `${score.pollData.teamBPercent}%`, float: 'right' }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  
  // --- 主渲染 ---
  return (
    <div className="max-w-md mx-auto bg-gray-900 min-h-screen relative text-gray-100">
      {/* Header */}
      <div className="relative bg-gray-800 text-gray-100 p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-center">運彩社群</h1>
        {/* --- 鈴鐺按鈕 --- */}
        <button 
          onClick={() => setHasNotifications(false)} // 點擊後(應開啟通知頁)先移除紅點
          className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-100 p-2 rounded-full"
        >
          <div className="relative">
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-gray-800"></span>
            )}
          </div>
        </button>
      </div>

      {/* Content */}
      <div className={`flex-1 p-4 ${
          activeTab === 'group' && activeChatRoom && showKeyboard ? 'pb-80' : 'pb-20'
        }`}>
        
        {/* --- 分析專區 --- */}
        {activeTab === 'analysis' && (
          <div>
            {/* 日期篩選 */}
            <div className="flex justify-around mb-4 bg-gray-800 p-1 rounded-lg">
              {dateOptions.map(date => (
                <button
                  key={date.key}
                  onClick={() => setSelectedDate(date.key)}
                  className={`w-full text-center px-3 py-2 rounded-md text-sm font-medium
                    ${selectedDate === date.key 
                      ? 'bg-gray-600 text-gray-100 shadow' 
                      : 'text-gray-400 hover:bg-gray-700'
                    }`}
                >
                  {date.label} ({date.key.slice(5)})
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-100">
                分析專區 ({dateOptions.find(d => d.key === selectedDate)?.label})
              </h2>
              <select 
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:border-gray-500 text-gray-100"
              >
                {sportOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-4">
              {filteredAnalysisData.length > 0 ? (
                filteredAnalysisData.map(analysis => (
                  <AnalysisCard key={analysis.id} analysis={analysis} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  {dateOptions.find(d => d.key === selectedDate)?.label} 沒有 {sportOptions.find(opt => opt.value === selectedSport)?.label} 的分析內容
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- 賽事專區 --- */}
        {activeTab === 'scores' && (
          <div>
            {/* --- 日期篩選 --- */}
            <div className="flex justify-around mb-4 bg-gray-800 p-1 rounded-lg">
              {dateOptions.map(date => (
                <button
                  key={date.key}
                  onClick={() => setSelectedScoreDate(date.key)}
                  className={`w-full text-center px-3 py-2 rounded-md text-sm font-medium
                    ${selectedScoreDate === date.key 
                      ? 'bg-gray-600 text-gray-100 shadow' 
                      : 'text-gray-400 hover:bg-gray-700'
                    }`}
                >
                  {date.label} ({date.key.slice(5)})
                </button>
              ))}
            </div>
            
            <h2 className="text-lg font-bold text-gray-100 mb-4">
              賽事專區 ({dateOptions.find(d => d.key === selectedScoreDate)?.label})
            </h2>
            
            {/* 篩選器 */}
            <div className="flex items-center space-x-2 mb-4">
              {/* 運動篩選 */}
              <select 
                value={selectedScoreSport}
                onChange={handleScoreSportChange}
                className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:border-gray-500 text-gray-100"
              >
                {sportOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {/* 聯盟篩選 */}
              <select 
                value={selectedLeague}
                onChange={handleLeagueChange}
                className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:border-gray-500 text-gray-100"
                disabled={currentLeagueOptions.length <= 1}
              >
                {currentLeagueOptions.map(league => (
                  <option key={league} value={league}>
                    {league}
                  </option>
                ))}
              </select>
            </div>

            {/* 賽事列表 */}
            <div className="space-y-4">
              {filteredScoresData.length > 0 ? (
                filteredScoresData.map(score => (
                  <GameScoreCard key={score.id} score={score} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  {dateOptions.find(d => d.key === selectedScoreDate)?.label}沒有 {sportOptions.find(opt => opt.value === selectedScoreSport)?.label} 的賽事
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- 群組專區 --- */}
        {activeTab === 'group' && (
          <div>
            {/* 根據 activeChatRoom 顯示列表或聊天室 */}
            {!activeChatRoom ? (
              // 聊天室列表
              <GroupChatList onSelectRoom={handleSelectRoom} />
            ) : (
              // 單一聊天室
              <div>
                <div className="bg-gray-800 rounded-lg shadow-md mb-4 border border-gray-700">
                  {/* Group Header with Functions */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <div className="flex items-center space-x-3">
                      {/* 返回按鈕 */}
                      <button 
                        onClick={() => setActiveChatRoom(null)} 
                        className="p-1 hover:bg-gray-700 rounded"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-400" />
                      </button>
                      <h2 className="text-lg font-bold text-gray-100">
                        {chatRoomsData.find(r => r.id === activeChatRoom)?.name || '聊天室'}
                      </h2>
                      <div className="flex items-center space-x-1 text-sm text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{chatRoomsData.find(r => r.id === activeChatRoom)?.members || 0}人</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-700 rounded">
                        <Search className="w-5 h-5 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-700 rounded">
                        <BookOpen className="w-5 h-5 text-gray-400" />
                      </button>
                      <div className="relative">
                        <button 
                          onClick={() => setGroupMenu(!groupMenu)}
                          className="p-2 hover:bg-gray-700 rounded"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                        {groupMenu && (
                          <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200">
                              <Image className="w-4 h-4" />
                              <span>照片/影片</span>
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200">
                              <FileText className="w-4 h-4" />
                              <span>檔案</span>
                            </button>
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200">
                              <ExternalLink className="w-4 h-4" />
                              <span>連結</span>
                            </button>
                            {isAdmin && (
                              <>
                                <hr className="border-gray-600 my-1" />
                                <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200">
                                  <Shield className="w-4 h-4" />
                                  <span>管理員設定</span>
                                </button>
                              </>
                            )}
                            <button className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200">
                              <UserCog className="w-4 h-4" />
                              <span>詳細設定</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Messages Area */}
                  <div className="max-h-96 overflow-y-auto p-4">
                    {dynamicGroupMessages.map(message => (
                      <GroupMessage key={message.id} message={message} />
                    ))}
                  </div>

                  {/* Input Area */}
                  <div className="flex items-center space-x-2 border-t border-gray-700 p-3">
                    <input
                      type="text"
                      value={groupMessage}
                      onChange={(e) => setGroupMessage(e.target.value)}
                      onFocus={() => setShowKeyboard(true)}
                      onBlur={() => setTimeout(() => setShowKeyboard(false), 200)} // 延遲關閉
                      placeholder="輸入訊息..."
                      className="flex-1 border border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-500 bg-gray-700 text-gray-100 placeholder-gray-400"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-gray-600 text-gray-100 rounded-full p-2 hover:bg-gray-500"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- 個人中心 --- */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            {/* 個人資訊卡片 */}
            <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">👤</div>
                {isEditingName ? (
                  <div className="flex items-center justify-center space-x-2">
                    <input
                      type="text"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="border border-gray-600 rounded px-2 py-1 text-center bg-gray-700 text-gray-100"
                    />
                    <button
                      onClick={handleSaveUserName}
                      className="bg-gray-600 text-gray-100 px-3 py-1 rounded text-sm hover:bg-gray-500"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => {
                        setIsEditingName(false);
                        setNewUserName(userName);
                      }}
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-600"
                    >
                      取消
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <h2 className="text-xl font-bold text-gray-100">{userName}</h2>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 帳號設定卡片 */}
            <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
              <h3 className="font-semibold text-gray-100 mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                帳號設定
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                  <div className="flex items-center space-x-3">
                    <Link className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-100">綁定運彩帳號</div>
                      <div className="text-sm text-gray-400">尚未綁定</div>
                    </div>
                  </div>
                  <button className="bg-gray-600 text-gray-100 px-4 py-2 rounded text-sm hover:bg-gray-500">
                    綁定
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2">
                    <span className="text-gray-200">推播通知</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="text-gray-200">群組訊息提醒</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <span className="text-gray-200">分析師發文通知</span>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                </div>
              </div>
            </div>

            {/* 其他設定 */}
            <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
              <h3 className="font-semibold text-gray-100 mb-4">其他功能</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-2 hover:bg-gray-700 rounded text-gray-200">
                  關於我們
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-700 rounded text-gray-200">
                  使用條款
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-700 rounded text-gray-200">
                  隱私政策
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-700 rounded text-red-400">
                  登出
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Virtual Keyboard */}
      {activeTab === 'group' && activeChatRoom && showKeyboard && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-100 p-3 rounded-t-lg z-50">
          <div className="space-y-1">
            {keyboardKeys.map((row, index) => (
              <KeyboardRow key={index} keys={row} />
            ))}
            <div className="flex justify-center space-x-1">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-2 rounded text-sm font-medium"
                onClick={() => setGroupMessage(prev => prev + ' ')}
              >
                空格
              </button>
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm font-medium"
                onClick={() => setGroupMessage(prev => prev.slice(0, -1))}
              >
                ⌫
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-gray-800 border border-gray-600 rounded-lg shadow-lg py-2 z-50"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={() => setContextMenu(null)}
        >
          <button
            onClick={() => handleContextMenuAction('reply', contextMenu.messageId)}
            className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200"
          >
            <Reply className="w-4 h-4" />
            <span>回覆</span>
          </button>
          <button
            onClick={() => handleContextMenuAction('retract', contextMenu.messageId)}
            className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200"
          >
            <Undo className="w-4 h-4" />
            <span>收回</span>
          </button>
          {isAdmin && (
            <button
              onClick={() => handleContextMenuAction('pin', contextMenu.messageId)}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200"
            >
              <Megaphone className="w-4 h-4" />
              <span>設為公告</span>
            </button>
          )}
          <button
            onClick={() => handleContextMenuAction('report', contextMenu.messageId)}
            className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-red-400"
          >
            <Flag className="w-4 h-4" />
            <span>檢舉</span>
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-800 border-t border-gray-700">
        <div className="flex">
          <button
            onClick={() => {
              setActiveTab('analysis');
              setActiveChatRoom(null); // 切換時關閉聊天室
            }}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'analysis'
                ? 'text-gray-200 bg-gray-700'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <TrendingUp className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">分析專區</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('scores');
              setActiveChatRoom(null); // 切換時關閉聊天室
            }}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'scores'
                ? 'text-gray-200 bg-gray-700'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Trophy className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">賽事專區</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('group');
              // 點擊群組 Tab 時，保持 activeChatRoom 狀態
            }}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'group'
                ? 'text-gray-200 bg-gray-700'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <MessageCircle className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">群組專區</span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab('profile');
              setActiveChatRoom(null); // 切換時關閉聊天室
            }}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'profile'
                ? 'text-gray-200 bg-gray-700'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <User className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">個人中心</span>
          </button>
        </div>
      </div>

      {/* Click outside to close menus */}
      {(contextMenu || groupMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setContextMenu(null);
            setGroupMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default SportsApp;

