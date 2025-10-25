import React from 'react';
import { Star, TrendingUp } from 'lucide-react';
import { GroupMessageData } from '../types';

interface GroupMessageProps {
  message: GroupMessageData;
  onContextMenu: (e: React.MouseEvent, messageId: number) => void;
}

export const GroupMessage: React.FC<GroupMessageProps> = ({ message, onContextMenu }) => (
  <div className={`flex mb-4 ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
    {!message.isCurrentUser && (
      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
        <span className="text-sm">{message.avatar}</span>
      </div>
    )}
    <div className="flex flex-col max-w-[75%]">
      {!message.isCurrentUser && (
        <span className="text-xs text-gray-400 mb-1 ml-2">{message.user}</span>
      )}
      <div className={`px-4 py-2 rounded-2xl ${
        message.isCurrentUser
          ? 'bg-gray-600 text-gray-100 rounded-br-md'
          : 'bg-gray-700 text-gray-200 rounded-bl-md'
      }`}
      onContextMenu={(e) => onContextMenu(e, message.id)}
      >
        <p className="text-sm">{message.message}</p>

        {/* 如果有分享的分析，顯示分析卡片 */}
        {message.sharedAnalysis && (
          <div className="mt-2 bg-gray-800 border border-gray-600 rounded-lg p-3 hover:border-blue-500 transition-colors cursor-pointer">
            {/* 推薦標籤 */}
            {message.sharedAnalysis.isRecommended && (
              <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-0.5 rounded-full mb-2">
                ⭐ 推薦
              </span>
            )}

            {/* 標題 */}
            <h4 className="font-semibold text-gray-100 mb-1 text-sm">
              {message.sharedAnalysis.title}
            </h4>

            {/* 分析師資訊 */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs">{message.sharedAnalysis.avatar}</span>
              <span className="text-xs text-gray-400">{message.sharedAnalysis.analyst}</span>
              <div className="flex items-center gap-1 text-xs text-yellow-500">
                <Star size={12} className="fill-current" />
                <span>{message.sharedAnalysis.rating.toFixed(1)}</span>
              </div>
            </div>

            {/* 預測結果 */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded p-2 mb-2">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp size={14} className="text-blue-400" />
                <span className="text-xs text-gray-300">預測</span>
              </div>
              <div className="text-sm font-semibold text-blue-300">
                {message.sharedAnalysis.prediction}
              </div>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="text-gray-400">信心指數</span>
                <span className="text-blue-300 font-semibold">{message.sharedAnalysis.confidence}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full"
                  style={{ width: `${message.sharedAnalysis.confidence}%` }}
                />
              </div>
            </div>

            {/* 標籤 */}
            <div className="flex flex-wrap gap-1">
              {message.sharedAnalysis.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-0.5 bg-gray-700 text-gray-400 rounded text-xs">
                  #{tag}
                </span>
              ))}
            </div>

            {/* 點擊查看提示 */}
            <div className="mt-2 text-xs text-blue-400 text-center">
              點擊查看完整分析
            </div>
          </div>
        )}
      </div>
      <span className={`text-xs text-gray-500 mt-1 ${message.isCurrentUser ? 'text-right mr-2' : 'ml-2'}`}>
        {message.time}
      </span>
    </div>
    {message.isCurrentUser && (
      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
        <span className="text-sm">{message.avatar}</span>
      </div>
    )}
  </div>
);
