import React, { useState } from 'react';
import { AnalysisSection } from './components/AnalysisSection';
import { AnalysisDetail } from './components/AnalysisDetail';
import { ScoresSection } from './components/ScoresSection';
import { ScoreDetail } from './components/ScoreDetail';
import { GroupSection } from './components/GroupSection';
import { MyPredictionsSection } from './components/MyPredictionsSection';
import { ProfileSection } from './components/ProfileSection';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { ContextMenu } from './components/ContextMenu';
import { Keyboard } from './components/Keyboard';
import { NotificationPanel } from './components/NotificationPanel';
import { keyboardKeys, notificationsData, scoresData } from './data';
import { Analysis, ScoreData, UserPrediction, PredictionType, BetOption } from './types';

// 模擬的初始預測資料
const mockUserPredictions: UserPrediction[] = [
  // 進行中的預測（不顯示結果）
  {
    id: 'pred_1',
    matchId: 1,
    match: scoresData[0], // 湖人 vs 勇士 (進行中)
    predictions: [
      {
        type: 'spread',
        option: {
          id: 'spread_home_1',
          type: 'spread',
          label: '湖人 -3.5',
          value: 'home_-3.5',
          odds: 1.95
        }
      },
      {
        type: 'totals',
        option: {
          id: 'totals_over_1',
          type: 'totals',
          label: '大 210.5',
          value: 'over_210.5',
          odds: 1.90
        }
      }
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2小時前
    status: 'live'
    // 注意：進行中的比賽不應該有 result 屬性
  },
  // 待開賽的預測
  {
    id: 'pred_2',
    matchId: 2,
    match: scoresData[1], // 賽爾提克 vs 獨行俠 (明天)
    predictions: [
      {
        type: 'spread',
        option: {
          id: 'spread_home_2',
          type: 'spread',
          label: '賽提 -5.5',
          value: 'home_-5.5',
          odds: 1.85
        }
      },
      {
        type: 'moneyline',
        option: {
          id: 'moneyline_home_2',
          type: 'moneyline',
          label: '賽爾提克',
          value: 'home',
          odds: 1.50
        }
      },
      {
        type: 'oddEven',
        option: {
          id: 'oddeven_odd_2',
          type: 'oddEven',
          label: '單',
          value: 'odd',
          odds: 1.95
        }
      }
    ],
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30分鐘前
    status: 'pending'
  },
  // 後天的預測
  {
    id: 'pred_3',
    matchId: 3,
    match: scoresData[2], // 公鹿 vs 熱火 (後天)
    predictions: [
      {
        type: 'spread',
        option: {
          id: 'spread_home_3',
          type: 'spread',
          label: '公鹿 -4.5',
          value: 'home_-4.5',
          odds: 1.90
        }
      }
    ],
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10分鐘前
    status: 'pending'
  },
  // === 已完成的歷史預測記錄（用於顯示勝率） ===
  // 昨天 - 命中2個
  {
    id: 'pred_hist_1',
    matchId: 101,
    match: {
      ...scoresData[0],
      id: 101,
      homeTeam: '快艇',
      awayTeam: '太陽',
      homeScore: 115,
      awayScore: 108,
      status: 'final' as const,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    } as ScoreData,
    predictions: [
      {
        type: 'spread',
        option: { id: 's1', type: 'spread', label: '快艇 -5.5', value: 'home', odds: 1.90 }
      },
      {
        type: 'totals',
        option: { id: 't1', type: 'totals', label: '大 215.5', value: 'over', odds: 1.85 }
      }
    ],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'finished',
    result: [
      { type: 'spread', isCorrect: true },
      { type: 'totals', isCorrect: true }
    ]
  },
  // 昨天 - 命中1個，未中1個
  {
    id: 'pred_hist_2',
    matchId: 102,
    match: {
      ...scoresData[1],
      id: 102,
      homeTeam: '76人',
      awayTeam: '籃網',
      homeScore: 102,
      awayScore: 98,
      status: 'final' as const,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    } as ScoreData,
    predictions: [
      {
        type: 'moneyline',
        option: { id: 'm1', type: 'moneyline', label: '76人', value: 'home', odds: 1.65 }
      },
      {
        type: 'oddEven',
        option: { id: 'oe1', type: 'oddEven', label: '雙', value: 'even', odds: 1.95 }
      }
    ],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'finished',
    result: [
      { type: 'moneyline', isCorrect: true },
      { type: 'oddEven', isCorrect: false }
    ]
  },
  // 3天前 - 全中
  {
    id: 'pred_hist_3',
    matchId: 103,
    match: {
      ...scoresData[2],
      id: 103,
      homeTeam: '灰熊',
      awayTeam: '鵜鶘',
      homeScore: 118,
      awayScore: 110,
      status: 'final' as const,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    } as ScoreData,
    predictions: [
      {
        type: 'spread',
        option: { id: 's2', type: 'spread', label: '灰熊 -6.5', value: 'home', odds: 1.88 }
      }
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'finished',
    result: [
      { type: 'spread', isCorrect: true }
    ]
  },
  // 5天前 - 未中
  {
    id: 'pred_hist_4',
    matchId: 104,
    match: {
      ...scoresData[0],
      id: 104,
      homeTeam: '國王',
      awayTeam: '拓荒者',
      homeScore: 95,
      awayScore: 102,
      status: 'final' as const,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    } as ScoreData,
    predictions: [
      {
        type: 'moneyline',
        option: { id: 'm2', type: 'moneyline', label: '國王', value: 'home', odds: 1.75 }
      },
      {
        type: 'totals',
        option: { id: 't2', type: 'totals', label: '小 205.5', value: 'under', odds: 1.92 }
      }
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'finished',
    result: [
      { type: 'moneyline', isCorrect: false },
      { type: 'totals', isCorrect: true }
    ]
  },
  // 7天前 - 命中1個
  {
    id: 'pred_hist_5',
    matchId: 105,
    match: {
      ...scoresData[1],
      id: 105,
      homeTeam: '爵士',
      awayTeam: '雷霆',
      homeScore: 108,
      awayScore: 112,
      status: 'final' as const,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    } as ScoreData,
    predictions: [
      {
        type: 'spread',
        option: { id: 's3', type: 'spread', label: '雷霆 +2.5', value: 'away', odds: 1.95 }
      }
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'finished',
    result: [
      { type: 'spread', isCorrect: true }
    ]
  },
  // 10天前 - 未中
  {
    id: 'pred_hist_6',
    matchId: 106,
    match: {
      ...scoresData[2],
      id: 106,
      homeTeam: '黃蜂',
      awayTeam: '巫師',
      homeScore: 99,
      awayScore: 105,
      status: 'final' as const,
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    } as ScoreData,
    predictions: [
      {
        type: 'moneyline',
        option: { id: 'm3', type: 'moneyline', label: '黃蜂', value: 'home', odds: 2.10 }
      }
    ],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'finished',
    result: [
      { type: 'moneyline', isCorrect: false }
    ]
  },
  // 35天前 - 命中（測試本月統計）
  {
    id: 'pred_hist_7',
    matchId: 107,
    match: {
      ...scoresData[0],
      id: 107,
      homeTeam: '馬刺',
      awayTeam: '火箭',
      homeScore: 110,
      awayScore: 105,
      status: 'final' as const,
      date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    } as ScoreData,
    predictions: [
      {
        type: 'spread',
        option: { id: 's4', type: 'spread', label: '馬刺 -3.5', value: 'home', odds: 1.90 }
      },
      {
        type: 'totals',
        option: { id: 't4', type: 'totals', label: '大 208.5', value: 'over', odds: 1.88 }
      }
    ],
    createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'finished',
    result: [
      { type: 'spread', isCorrect: true },
      { type: 'totals', isCorrect: false }
    ]
  }
];

const SportsApp = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [selectedSport, setSelectedSport] = useState('all');
  const [groupMessage, setGroupMessage] = useState('');
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, messageId: number} | null>(null);
  const [userName, setUserName] = useState('運彩新手');
  const [isAdmin] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeChatRoom, setActiveChatRoom] = useState<number | null>(null);
  const [notifications, setNotifications] = useState(notificationsData);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null);
  const [selectedScore, setSelectedScore] = useState<ScoreData | null>(null);
  const [userPredictions, setUserPredictions] = useState<UserPrediction[]>(mockUserPredictions);
  const [showProfile, setShowProfile] = useState(false);

  // 計算是否有未讀通知
  const hasNotifications = notifications.some(n => !n.isRead);

  const handleContextMenu = (e: React.MouseEvent, messageId: number) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      messageId: messageId
    });
  };

  const handleContextMenuAction = (action: string, messageId: number) => {
    alert(`執行動作: ${action} 對訊息 ${messageId}`);
    setContextMenu(null);
  };

  const handleNotificationClick = (id: number) => {
    // 標記通知為已讀
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
    // 關閉通知面板
    setShowNotifications(false);
    // 這裡可以根據通知類型跳轉到對應頁面
    console.log('點擊通知:', id);
  };

  const handleSubmitPrediction = (score: ScoreData, predictions: { type: PredictionType; option: BetOption }[]) => {
    const existingPredictionIndex = userPredictions.findIndex(p => p.matchId === score.id);

    // 將 ScoreData status 轉換為 UserPrediction status
    const predictionStatus: 'pending' | 'live' | 'finished' =
      score.status === 'scheduled' ? 'pending' :
      score.status === 'live' ? 'live' : 'finished';

    const newPrediction: UserPrediction = {
      id: existingPredictionIndex >= 0 ? userPredictions[existingPredictionIndex].id : `pred_${Date.now()}`,
      matchId: score.id,
      match: score,
      predictions: predictions,
      createdAt: new Date().toISOString(),
      status: predictionStatus
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

  const renderContent = () => {
    // 如果顯示個人中心，顯示全螢幕個人中心頁面
    if (showProfile) {
      return (
        <ProfileSection
          userName={userName}
          setUserName={setUserName}
          onBack={() => setShowProfile(false)}
        />
      );
    }

    // 如果有選中的分析，顯示詳細頁面
    if (selectedAnalysis) {
      return (
        <AnalysisDetail
          analysis={selectedAnalysis}
          onBack={() => setSelectedAnalysis(null)}
        />
      );
    }

    // 如果有選中的賽事，顯示預測頁面
    if (selectedScore) {
      const existingPrediction = userPredictions.find(p => p.matchId === selectedScore.id);
      return (
        <ScoreDetail
          score={selectedScore}
          onBack={() => setSelectedScore(null)}
          onSubmitPrediction={(predictions) => handleSubmitPrediction(selectedScore, predictions)}
          existingPredictions={existingPrediction?.predictions}
        />
      );
    }

    switch (activeTab) {
      case 'analysis':
        return (
          <AnalysisSection
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
            onAnalysisClick={(analysis) => setSelectedAnalysis(analysis)}
          />
        );
      case 'scores':
        return <ScoresSection onScoreClick={(score) => setSelectedScore(score)} />;
      case 'group':
        return (
          <GroupSection
            userName={userName}
            isAdmin={isAdmin}
            groupMessage={groupMessage}
            setGroupMessage={setGroupMessage}
            setShowKeyboard={setShowKeyboard}
            handleContextMenu={handleContextMenu}
            activeChatRoom={activeChatRoom}
            setActiveChatRoom={setActiveChatRoom}
          />
        );
      case 'predictions':
        return (
          <MyPredictionsSection
            userPredictions={userPredictions}
            onEditPrediction={(prediction) => setSelectedScore(prediction.match)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-900 min-h-screen relative text-gray-100">
      {/* Header */}
      <Header
        hasNotifications={hasNotifications}
        onNotificationClick={() => setShowNotifications(true)}
        onProfileClick={() => setShowProfile(true)}
      />

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
      />

      {/* Content */}
      <div className={`flex-1 p-4 ${activeTab === 'group' && activeChatRoom && showKeyboard ? 'pb-80' : 'pb-20'}`}>
        {renderContent()}
      </div>

      {/* Virtual Keyboard */}
      {activeTab === 'group' && activeChatRoom && showKeyboard && (
        <Keyboard
          keyboardKeys={keyboardKeys}
          onKeyPress={(key) => setGroupMessage(prev => prev + key)}
          onBackspace={() => setGroupMessage(prev => prev.slice(0, -1))}
          onSpace={() => setGroupMessage(prev => prev + ' ')}
        />
      )}

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          messageId={contextMenu.messageId}
          isAdmin={isAdmin}
          onAction={handleContextMenuAction}
          onClose={() => setContextMenu(null)}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Click outside to close menus */}
      {contextMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default SportsApp;