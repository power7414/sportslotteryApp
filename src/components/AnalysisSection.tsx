import React from 'react';
import { AnalysisCard } from './AnalysisCard';
import { analysisData, sportOptions } from '../data';

interface AnalysisSectionProps {
  selectedSport: string;
  setSelectedSport: (sport: string) => void;
}

export const AnalysisSection: React.FC<AnalysisSectionProps> = ({ 
  selectedSport, 
  setSelectedSport 
}) => {
  const filteredAnalysisData = selectedSport === 'all' 
    ? analysisData 
    : analysisData.filter(analysis => analysis.sport === selectedSport);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-100">分析專區</h2>
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
            <AnalysisCard key={analysis.id} analysis={analysis} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            目前沒有 {sportOptions.find(opt => opt.value === selectedSport)?.label} 的分析內容
          </div>
        )}
      </div>
    </div>
  );
};