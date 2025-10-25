import React, { useState } from 'react';
import { AnalysisSection } from './components/AnalysisSection';
import { GroupSection } from './components/GroupSection';
import { ProfileSection } from './components/ProfileSection';
import { BottomNavigation } from './components/BottomNavigation';
import { ContextMenu } from './components/ContextMenu';
import { Keyboard } from './components/Keyboard';
import { keyboardKeys } from './data';

const SportsApp = () => {
  const [activeTab, setActiveTab] = useState('analysis');
  const [selectedSport, setSelectedSport] = useState('all');
  const [groupMessage, setGroupMessage] = useState('');
  const [contextMenu, setContextMenu] = useState<{x: number, y: number, messageId: number} | null>(null);
  const [userName, setUserName] = useState('運彩新手');
  const [isAdmin] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);

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

  const renderContent = () => {
    switch (activeTab) {
      case 'analysis':
        return (
          <AnalysisSection 
            selectedSport={selectedSport}
            setSelectedSport={setSelectedSport}
          />
        );
      case 'group':
        return (
          <GroupSection
            userName={userName}
            isAdmin={isAdmin}
            groupMessage={groupMessage}
            setGroupMessage={setGroupMessage}
            setShowKeyboard={setShowKeyboard}
            handleContextMenu={handleContextMenu}
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
      <div className="bg-gray-800 text-gray-100 p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-center">盈吉多社群</h1>
      </div>

      {/* Content */}
      <div className={`flex-1 p-4 ${activeTab === 'group' && showKeyboard ? 'pb-80' : 'pb-20'}`}>
        {renderContent()}
      </div>

      {/* Virtual Keyboard */}
      {activeTab === 'group' && showKeyboard && (
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