import React from 'react';
import { Bell, User } from 'lucide-react';

interface HeaderProps {
  hasNotifications: boolean;
  onNotificationClick: () => void;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ hasNotifications, onNotificationClick, onProfileClick }) => {
  return (
    <div className="bg-gray-800 text-gray-100 p-4 border-b border-gray-700 flex items-center justify-between">
      {/* 頭像按鈕 - 左側 */}
      <button
        onClick={onProfileClick}
        className="p-2 hover:bg-gray-700 rounded-full transition-colors"
      >
        <User className="w-5 h-5 text-gray-300" />
      </button>

      {/* 鈴鐺按鈕 - 右側 */}
      <button
        onClick={onNotificationClick}
        className="text-gray-400 hover:text-gray-100 p-2 rounded-full transition-colors"
      >
        <div className="relative">
          <Bell className="w-5 h-5" />
          {hasNotifications && (
            <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-gray-800"></span>
          )}
        </div>
      </button>
    </div>
  );
};
