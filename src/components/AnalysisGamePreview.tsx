import React from 'react';
import { ScoreData } from '../types';

interface AnalysisGamePreviewProps {
  match: ScoreData | undefined;
}

export const AnalysisGamePreview: React.FC<AnalysisGamePreviewProps> = ({ match }) => {
  if (!match) {
    return (
      <div className="bg-gray-700 rounded-lg p-3 my-3 border border-gray-600 text-center text-gray-400">
        賽事資訊無法載入
      </div>
    );
  }

  return (
    <div className="bg-gray-700 rounded-lg p-3 my-3 border border-gray-600">
      <div className="flex items-center justify-between">
        {/* 主隊 */}
        <div className="flex items-center space-x-2 w-2/5">
          <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
            {match.homeLogo.startsWith('http') ? (
              <img src={match.homeLogo} alt={match.homeTeam} className="w-full h-full object-contain" />
            ) : (
              <span className="text-2xl">{match.homeLogo}</span>
            )}
          </div>
          <span className="font-medium text-gray-200 text-sm truncate">{match.homeTeam}</span>
        </div>

        {/* 狀態/時間/比分 */}
        <div className="text-center w-1/5 flex-shrink-0">
          <span className={`text-sm font-bold ${match.status === 'live' ? 'text-red-400' : 'text-gray-400'}`}>
            {match.status === 'scheduled' ? match.time : match.status === 'live' ? 'Live' : 'Final'}
          </span>
          {match.status !== 'scheduled' && (
            <div className="text-lg font-bold text-gray-100">
              {match.homeScore} - {match.awayScore}
            </div>
          )}
        </div>

        {/* 客隊 */}
        <div className="flex items-center justify-end space-x-2 w-2/5">
          <span className="font-medium text-gray-200 text-sm truncate text-right">{match.awayTeam}</span>
          <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
            {match.awayLogo.startsWith('http') ? (
              <img src={match.awayLogo} alt={match.awayTeam} className="w-full h-full object-contain" />
            ) : (
              <span className="text-2xl">{match.awayLogo}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
