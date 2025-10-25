import React, { useState } from 'react';
import { Users, Send, Search, BookOpen, MoreVertical, Image, FileText, ExternalLink, Shield, UserCog, ChevronLeft } from 'lucide-react';
import { GroupMessage } from './GroupMessage';
import { ChatRoomList } from './ChatRoomList';
import { getGroupMessages, chatRoomsData } from '../data';

interface GroupSectionProps {
  userName: string;
  isAdmin: boolean;
  groupMessage: string;
  setGroupMessage: (message: string) => void;
  setShowKeyboard: (show: boolean) => void;
  handleContextMenu: (e: React.MouseEvent, messageId: number) => void;
  activeChatRoom: number | null;
  setActiveChatRoom: (roomId: number | null) => void;
}

export const GroupSection: React.FC<GroupSectionProps> = ({
  userName,
  isAdmin,
  groupMessage,
  setGroupMessage,
  setShowKeyboard,
  handleContextMenu,
  activeChatRoom,
  setActiveChatRoom
}) => {
  const [groupMenu, setGroupMenu] = useState(false);
  const groupMessages = getGroupMessages(userName, activeChatRoom);
  const currentRoom = chatRoomsData.find(r => r.id === activeChatRoom);

  const handleSendMessage = () => {
    if (groupMessage.trim()) {
      console.log("Sending message:", groupMessage);
      setGroupMessage('');
    }
  };

  const handleGroupMenuAction = (action: string) => {
    alert(`你點擊了 "${action}"`);
    setGroupMenu(false);
  };

  // 如果沒有選擇聊天室，顯示聊天室列表
  if (!activeChatRoom) {
    return <ChatRoomList onSelectRoom={setActiveChatRoom} />;
  }

  // 顯示單一聊天室（滿版設計）
  return (
    <div className="absolute inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Group Header with Functions */}
      <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-4 py-3 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* 返回按鈕 */}
            <button
              onClick={() => setActiveChatRoom(null)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-100" />
            </button>
            <h2 className="text-lg font-bold text-gray-100">{currentRoom?.name || '聊天室'}</h2>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              <span>{currentRoom?.members || 0}人</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <Search className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
              <BookOpen className="w-5 h-5 text-gray-400" />
            </button>
            <div className="relative">
              <button
                onClick={() => setGroupMenu(!groupMenu)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
              {groupMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                  <button onClick={() => handleGroupMenuAction('照片/影片')} className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200">
                    <Image className="w-4 h-4" />
                    <span>照片/影片</span>
                  </button>
                  <button onClick={() => handleGroupMenuAction('檔案')} className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200">
                    <FileText className="w-4 h-4" />
                    <span>檔案</span>
                  </button>
                  <button onClick={() => handleGroupMenuAction('連結')} className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200">
                    <ExternalLink className="w-4 h-4" />
                    <span>連結</span>
                  </button>
                  {isAdmin && (
                    <>
                      <hr className="border-gray-600 my-1" />
                      <button onClick={() => handleGroupMenuAction('管理員設定')} className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200">
                        <Shield className="w-4 h-4" />
                        <span>管理員設定</span>
                      </button>
                    </>
                  )}
                  <button onClick={() => handleGroupMenuAction('詳細設定')} className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200">
                    <UserCog className="w-4 h-4" />
                    <span>詳細設定</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area - 自動填滿剩餘空間 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-900">
        {groupMessages.map(message => (
          <GroupMessage key={message.id} message={message} onContextMenu={handleContextMenu} />
        ))}
      </div>

      {/* Input Area - 固定在底部 */}
      <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 px-4 py-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={groupMessage}
            onChange={(e) => setGroupMessage(e.target.value)}
            onFocus={() => setShowKeyboard(true)}
            onBlur={() => setTimeout(() => setShowKeyboard(false), 200)}
            placeholder="輸入訊息..."
            className="flex-1 border border-gray-600 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-gray-500 bg-gray-700 text-gray-100 placeholder-gray-400"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};