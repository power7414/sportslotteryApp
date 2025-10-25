import React from 'react';
import { Star, Eye, ThumbsUp, Share2 } from 'lucide-react';
import { Analysis } from '../types';

interface AnalysisCardProps {
  analysis: Analysis;
}

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ analysis }) => (
  <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4 border border-gray-700">
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
    
    <h2 className="text-lg font-bold text-gray-100 mb-2">{analysis.title}</h2>
    <p className="text-gray-300 mb-3">{analysis.content}</p>
    
    <div className="bg-sky-900 border border-sky-700 rounded p-3 mb-3">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-semibold text-sky-200">預測推薦：</span>
          <span className="text-sky-100">{analysis.prediction}</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-sky-300">信心指數</div>
          <div className="text-lg font-bold text-green-400">{analysis.confidence}%</div>
        </div>
      </div>
    </div>

    <div className="flex items-center justify-between text-sm text-gray-400">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>{analysis.rating}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>{analysis.views}</span>
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

    <div className="flex flex-wrap gap-2 mt-3">
      {analysis.tags.map((tag, index) => (
        <span key={index} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
          #{tag}
        </span>
      ))}
    </div>
  </div>
);
