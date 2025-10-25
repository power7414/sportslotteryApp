import React from 'react';
import { Star, ThumbsUp, Share2, Award } from 'lucide-react';
import { Analysis } from '../types';
import { AnalysisGamePreview } from './AnalysisGamePreview';
import { scoresData } from '../data';

interface AnalysisCardProps {
  analysis: Analysis;
  onClick?: () => void;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis, onClick }) => {
  // 根據 analysis.matchId 找到對應的賽事資料
  const match = scoresData.find(s => s.id === analysis.matchId);

  return (
    <div
      onClick={onClick}
      className={`relative rounded-lg shadow-md p-4 mb-4 cursor-pointer transition-transform hover:scale-[1.02]
        ${analysis.isRecommended
          ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-yellow-500'
          : 'bg-gray-800 border border-gray-700'
        }`
      }
    >
      {analysis.isRecommended && (
        <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
          <Award className="w-4 h-4" />
          <span>推薦</span>
        </div>
      )}

      {/* 分析師資訊 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{analysis.avatar}</span>
          <div>
            <h3 className="font-semibold text-gray-100">{analysis.analyst}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded">{analysis.sport}</span>
              <span>{analysis.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 標題和內文 */}
      <h2 className="text-lg font-bold text-gray-100 mb-2">{analysis.title}</h2>
      <p className="text-gray-300 text-sm mb-3">{analysis.content}</p>

      {/* 內嵌的賽事區塊 */}
      <AnalysisGamePreview match={match} />

      {/* 預測推薦 */}
      <div className="flex items-center justify-between mt-3 mb-3 px-1">
        <div>
          <span className="font-semibold text-gray-300">預測推薦：</span>
          <span className="text-gray-100 font-bold">{analysis.prediction}</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">信心指數</div>
          <div className="text-lg font-bold text-green-400">{analysis.confidence}%</div>
        </div>
      </div>

      {/* 統計數據 */}
      <div className="flex items-center justify-between text-sm text-gray-400 border-t border-gray-700 pt-3 mt-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>{analysis.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ThumbsUp className="w-4 h-4" />
            <span>{analysis.likes}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 text-gray-300 hover:text-gray-100">
            <Share2 className="w-4 h-4" />
            <span>分享到群組</span>
          </button>
        </div>
      </div>

      {/* 標籤 */}
      <div className="flex flex-wrap gap-2 mt-3">
        {analysis.tags.map((tag, index) => (
          <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
