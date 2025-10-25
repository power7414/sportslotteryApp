import React from 'react';
import { Bell, User } from 'lucide-react';

interface HeaderProps {
  hasNotifications: boolean;
  onNotificationClick: () => void;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ hasNotifications, onNotificationClick, onProfileClick }) => {
  return (
    <div className="relative bg-gray-800 text-gray-100 p-4 border-b border-gray-700">
      <h1 className="text-xl font-bold text-center">盈吉多社群</h1>

      {/* 右側按鈕群組 */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center gap-2">
        {/* 鈴鐺按鈕 */}
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

        {/* 頭像按鈕 */}
        <button
          onClick={onProfileClick}
          className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <User className="w-5 h-5 text-gray-300" />
        </button>
      </div>
    </div>
  );
};
