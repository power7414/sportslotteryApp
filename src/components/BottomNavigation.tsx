import React from 'react';
import { TrendingUp, MessageCircle, Target, Trophy } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-800 border-t border-gray-700">
      <div className="flex">
        <button
          onClick={() => setActiveTab('analysis')}
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
          onClick={() => setActiveTab('scores')}
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
          onClick={() => setActiveTab('group')}
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
          onClick={() => setActiveTab('predictions')}
          className={`flex-1 py-3 px-4 text-center ${
            activeTab === 'predictions'
              ? 'text-gray-200 bg-gray-700'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Target className="w-5 h-5 mx-auto mb-1" />
          <span className="text-xs">我的預測</span>
        </button>
      </div>
    </div>
  );
};