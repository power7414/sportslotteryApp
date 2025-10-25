import React from 'react';
import { X, TrendingUp, MessageCircle, Users } from 'lucide-react';

interface Notification {
  id: number;
  type: 'analysis' | 'message' | 'system';
  title: string;
  content: string;
  time: string;
  isRead: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onNotificationClick: (id: number) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  notifications,
  onNotificationClick
}) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'analysis':
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
      case 'message':
        return <MessageCircle className="w-5 h-5 text-green-400" />;
      case 'system':
        return <Users className="w-5 h-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* 通知面板 */}
      <div className="fixed top-0 right-0 w-full max-w-md h-full bg-gray-800 shadow-lg z-50 transform transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-gray-100">通知</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* 通知列表 */}
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => onNotificationClick(notification.id)}
                  className={`w-full text-left p-4 hover:bg-gray-700 transition-colors ${
                    !notification.isRead ? 'bg-gray-750' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-100 truncate">
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {notification.content}
                      </p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {notification.time}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Bell className="w-16 h-16 mb-4 opacity-50" />
              <p>目前沒有通知</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// 預設匯出圖示以供其他地方使用
export { Bell } from 'lucide-react';
