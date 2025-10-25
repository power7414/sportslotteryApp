import React from 'react';
import { ScoreData } from '../types';

interface ScoreCardProps {
  score: ScoreData;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'live':
        return 'text-red-400 font-bold';
      case 'final':
        return 'text-gray-400';
      case 'scheduled':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 mb-4 border border-gray-700">
      {/* 聯盟 & 狀態 */}
      <div className="flex items-center justify-between mb-3 text-sm">
        <div className="flex items-center space-x-2">
          <span className="bg-gray-700 text-gray-200 px-2 py-1 rounded">
            {score.league}
          </span>
          <span className="text-gray-400">
            {new Date(score.date).toLocaleDateString('zh-TW', { month: '2-digit', day: '2-digit' })}
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className={getStatusClass(score.status)}>
            {score.status === 'live' ? 'Live' : score.status === 'final' ? 'Final' : 'Scheduled'}
          </span>
          <span className="text-gray-400">{score.time}</span>
        </div>
      </div>

      {/* 隊伍 & 比分 */}
      <div className="flex items-center justify-between mb-4">
        {/* 主隊 */}
        <div className="flex flex-col items-center w-2/5">
          <div className="text-4xl mb-1">{score.homeLogo}</div>
          <span className="font-semibold text-gray-100 text-center">{score.homeTeam}</span>
        </div>

        {/* 比分 */}
        <div className="text-center">
          {score.status !== 'scheduled' ? (
            <div className="text-4xl font-bold text-gray-100">
              {score.homeScore} - {score.awayScore}
            </div>
          ) : (
            <div className="text-3xl font-bold text-gray-500">VS</div>
          )}
        </div>

        {/* 客隊 */}
        <div className="flex flex-col items-center w-2/5">
          <div className="text-4xl mb-1">{score.awayLogo}</div>
          <span className="font-semibold text-gray-100 text-center">{score.awayTeam}</span>
        </div>
      </div>

      {/* 預測比例條 */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-gray-300 mb-1">
          <span>{score.prediction.option} ({score.prediction.percentage}%)</span>
          <span>({100 - score.prediction.percentage}%) 其他</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2.5 overflow-hidden flex">
          <div
            className="bg-blue-500 h-2.5 rounded-l-full"
            style={{ width: `${score.prediction.percentage}%` }}
          ></div>
          <div
            className="bg-red-500 h-2.5 rounded-r-full flex-1"
          ></div>
        </div>
      </div>
    </div>
  );
};
