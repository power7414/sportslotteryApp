import React, { useState } from 'react';
import { AnalysisCard } from './AnalysisCard';
import { analysisData, sportOptions, dateKeys } from '../data';
import { Analysis } from '../types';

const dateOptions = [
  { key: dateKeys.today, label: '今天' },
  { key: dateKeys.tomorrow, label: '明天' },
  { key: dateKeys.dayAfterTomorrow, label: '後天' },
];

interface AnalysisSectionProps {
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
  onAnalysisClick: (analysis: Analysis) => void;
}

export const AnalysisSection: React.FC<AnalysisSectionProps> = ({
  selectedSport,
  setSelectedSport,
  onAnalysisClick
}) => {
  const [selectedDate, setSelectedDate] = useState(dateKeys.today);

  // 篩選和排序分析資料
  const filteredAnalysisData = analysisData
    .filter(analysis => {
      const matchDate = analysis.matchDate === selectedDate;
      const matchSport = selectedSport === 'all' || analysis.sport === selectedSport;
      return matchDate && matchSport;
    })
    .sort((a, b) => {
      // 排序：推薦的 (isRecommended) 優先
      return (a.isRecommended === b.isRecommended) ? 0 : (a.isRecommended ? -1 : 1);
    });

  return (
    <div>
      {/* 日期篩選 */}
      <div className="flex justify-around mb-4 bg-gray-800 p-1 rounded-lg">
        {dateOptions.map(date => (
          <button
            key={date.key}
            onClick={() => setSelectedDate(date.key)}
            className={`w-full text-center px-3 py-2 rounded-md text-sm font-medium
              ${selectedDate === date.key
                ? 'bg-gray-600 text-gray-100 shadow'
                : 'text-gray-400 hover:bg-gray-700'
              }`}
          >
            {date.label} ({date.key.slice(5)})
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-100">
          分析專區 ({dateOptions.find(d => d.key === selectedDate)?.label})
        </h2>
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:border-gray-500 text-gray-100"
        >
          {sportOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredAnalysisData.length > 0 ? (
          filteredAnalysisData.map(analysis => (
            <AnalysisCard
              key={analysis.id}
              analysis={analysis}
              onClick={() => onAnalysisClick(analysis)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            {dateOptions.find(d => d.key === selectedDate)?.label} 沒有 {sportOptions.find(opt => opt.value === selectedSport)?.label} 的分析內容
          </div>
        )}
      </div>
    </div>
  );
};