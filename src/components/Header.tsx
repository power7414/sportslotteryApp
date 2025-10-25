import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  hasNotifications: boolean;
  onNotificationClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ hasNotifications, onNotificationClick }) => {
  return (
    <div className="relative bg-gray-800 text-gray-100 p-4 border-b border-gray-700">
      <h1 className="text-xl font-bold text-center">盈吉多社群</h1>
      {/* 鈴鐺按鈕 */}
      <button
        onClick={onNotificationClick}
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
  );
};
