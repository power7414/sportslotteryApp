import React, { useState } from 'react';
import { AnalysisSection } from './components/AnalysisSection';
import { ScoresSection } from './components/ScoresSection';
import { GroupSection } from './components/GroupSection';
import { ProfileSection } from './components/ProfileSection';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { ContextMenu } from './components/ContextMenu';
import { Keyboard } from './components/Keyboard';
import { NotificationPanel } from './components/NotificationPanel';
import { keyboardKeys, notificationsData } from './data';

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

  const renderContent = () => {
    switch (activeTab) {
      case 'analysis':
        return (
          <AnalysisSection
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
          />
        );
      case 'scores':
        return <ScoresSection />;
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
      case 'profile':
        return (
          <ProfileSection
            userName={userName}
            setUserName={setUserName}
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