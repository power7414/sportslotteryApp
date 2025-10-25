import React, { useState, useEffect } from 'react';
import { ScoreCard } from './ScoreCard';
import { scoresData, sportOptions, leagueOptions, dateKeys } from '../data';
import { ScoreData } from '../types';

const dateOptions = [
  { key: dateKeys.today, label: '今天' },
  { key: dateKeys.tomorrow, label: '明天' },
  { key: dateKeys.dayAfterTomorrow, label: '後天' },
];

interface ScoresSectionProps {
  onScoreClick: (score: ScoreData) => void;
}

export const ScoresSection: React.FC<ScoresSectionProps> = ({ onScoreClick }) => {
  const [selectedDate, setSelectedDate] = useState(dateKeys.today);
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [currentLeagueOptions, setCurrentLeagueOptions] = useState<{ value: string; label: string; }[]>([
    { value: 'all', label: '全部聯盟' }
  ]);

  // 當運動類型變更時，更新聯盟選項
  useEffect(() => {
    if (selectedSport === 'all') {
      setCurrentLeagueOptions([{ value: 'all', label: '全部聯盟' }]);
      setSelectedLeague('all');
    } else {
      const leagues = leagueOptions[selectedSport] || [{ value: 'all', label: '全部聯盟' }];
      setCurrentLeagueOptions(leagues);
      setSelectedLeague('all');
    }
  }, [selectedSport]);

  // 篩選賽事資料
  const filteredScoresData = scoresData.filter(score => {
    const matchDate = score.date === selectedDate;
    const matchSport = selectedSport === 'all' || score.sport === selectedSport;
    const matchLeague = selectedLeague === 'all' || score.league === selectedLeague;
    return matchDate && matchSport && matchLeague;
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

      <h2 className="text-lg font-bold text-gray-100 mb-4">
        賽事專區 ({dateOptions.find(d => d.key === selectedDate)?.label})
      </h2>

      {/* 篩選器 */}
      <div className="flex items-center space-x-2 mb-4">
        {/* 運動篩選 */}
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:border-gray-500 text-gray-100"
        >
          {sportOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* 聯盟篩選 */}
        <select
          value={selectedLeague}
          onChange={(e) => setSelectedLeague(e.target.value)}
          className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-1 text-sm focus:outline-none focus:border-gray-500 text-gray-100"
          disabled={currentLeagueOptions.length <= 1}
        >
          {currentLeagueOptions.map(league => (
            <option key={league.value} value={league.value}>
              {league.label}
            </option>
          ))}
        </select>
      </div>

      {/* 賽事列表 */}
      <div className="space-y-4">
        {filteredScoresData.length > 0 ? (
          filteredScoresData.map(score => (
            <ScoreCard
              key={score.id}
              score={score}
              onClick={() => onScoreClick(score)}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            {dateOptions.find(d => d.key === selectedDate)?.label}沒有 {sportOptions.find(opt => opt.value === selectedSport)?.label} 的賽事
          </div>
        )}
      </div>
    </div>
  );
};
