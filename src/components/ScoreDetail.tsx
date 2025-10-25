import { ArrowLeft, Calendar, Clock, Check } from 'lucide-react';
import { ScoreData, BetOption, PredictionType } from '../types';
import { useState } from 'react';

interface ScoreDetailProps {
  score: ScoreData;
  onBack: () => void;
  onSubmitPrediction: (predictions: { type: PredictionType; option: BetOption }[]) => void;
  existingPredictions?: { type: PredictionType; option: BetOption }[];
}

export function ScoreDetail({ score, onBack, onSubmitPrediction, existingPredictions = [] }: ScoreDetailProps) {
  // 當前選中的預測選項（每種類型只能選一個）
  const [selectedOptions, setSelectedOptions] = useState<Map<PredictionType, BetOption>>(
    new Map(existingPredictions.map(p => [p.type, p.option]))
  );

  // 生成預測選項
  const generateBetOptions = (): { [key in PredictionType]: BetOption[] } => {
    const spreadValue = parseFloat(score.spread.match(/-?\d+\.?\d*/)?.[0] || '3.5');

    return {
      spread: [
        {
          id: `spread_home_${score.id}`,
          type: 'spread',
          label: `${score.homeTeam} ${spreadValue > 0 ? '-' : '+'}${Math.abs(spreadValue)}`,
          value: `home_${spreadValue}`,
          odds: 1.95
        },
        {
          id: `spread_away_${score.id}`,
          type: 'spread',
          label: `${score.awayTeam} ${spreadValue > 0 ? '+' : '-'}${Math.abs(spreadValue)}`,
          value: `away_${-spreadValue}`,
          odds: 1.95
        }
      ],
      moneyline: [
        {
          id: `ml_home_${score.id}`,
          type: 'moneyline',
          label: `${score.homeTeam} 獲勝`,
          value: 'home',
          odds: 1.75
        },
        {
          id: `ml_away_${score.id}`,
          type: 'moneyline',
          label: `${score.awayTeam} 獲勝`,
          value: 'away',
          odds: 2.10
        }
      ],
      totals: [
        {
          id: `totals_over_${score.id}`,
          type: 'totals',
          label: '大 215.5 分',
          value: 'over_215.5',
          odds: 1.90
        },
        {
          id: `totals_under_${score.id}`,
          type: 'totals',
          label: '小 215.5 分',
          value: 'under_215.5',
          odds: 2.00
        }
      ],
      oddEven: [
        {
          id: `oddeven_odd_${score.id}`,
          type: 'oddEven',
          label: '總分單數',
          value: 'odd',
          odds: 1.95
        },
        {
          id: `oddeven_even_${score.id}`,
          type: 'oddEven',
          label: '總分雙數',
          value: 'even',
          odds: 1.95
        }
      ]
    };
  };

  const betOptions = generateBetOptions();

  const handleOptionSelect = (type: PredictionType, option: BetOption) => {
    const newSelected = new Map(selectedOptions);

    // 如果已經選擇這個選項，則取消選擇
    if (selectedOptions.get(type)?.id === option.id) {
      newSelected.delete(type);
    } else {
      // 否則選擇新選項（會覆蓋同類型的舊選項）
      newSelected.set(type, option);
    }

    setSelectedOptions(newSelected);
  };

  const handleSubmit = () => {
    const predictions = Array.from(selectedOptions.entries()).map(([type, option]) => ({
      type,
      option
    }));

    if (predictions.length === 0) {
      alert('請至少選擇一個預測選項');
      return;
    }

    onSubmitPrediction(predictions);
    onBack();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="absolute inset-0 bg-gray-900 z-50 overflow-y-auto pb-24">
      {/* 頂部導航 */}
      <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center gap-3 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-100" />
        </button>
        <h2 className="text-lg font-semibold flex-1 truncate text-gray-100">賽事預測</h2>
      </div>

      {/* 賽事資訊 */}
      <div className="px-4 py-4">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 mb-4">
          {/* 運動類型與聯盟 */}
          <div className="flex items-center gap-2 mb-3 text-sm">
            <span className="px-2 py-1 bg-blue-600 text-white rounded">{score.sport}</span>
            <span className="text-gray-400">{score.league}</span>
          </div>

          {/* 對戰隊伍 */}
          <div className="flex items-center justify-between mb-4">
            {/* 主隊 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-16 h-16 mb-2 flex items-center justify-center">
                {score.homeLogo.startsWith('http') ? (
                  <img src={score.homeLogo} alt={score.homeTeam} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-4xl">{score.homeLogo}</span>
                )}
              </div>
              <span className="font-semibold text-gray-100 text-center">{score.homeTeam}</span>
            </div>

            {/* 比分或時間 */}
            <div className="flex flex-col items-center px-4">
              {score.status === 'scheduled' ? (
                <>
                  <div className="text-2xl font-bold text-gray-400">VS</div>
                  <div className="text-sm text-gray-500 mt-1">{score.time}</div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-2xl font-bold text-gray-100">
                    <span>{score.homeScore}</span>
                    <span className="text-gray-500">-</span>
                    <span>{score.awayScore}</span>
                  </div>
                  {score.status === 'live' && (
                    <div className="flex items-center gap-1 text-red-400 text-sm mt-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>LIVE</span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* 客隊 */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-16 h-16 mb-2 flex items-center justify-center">
                {score.awayLogo.startsWith('http') ? (
                  <img src={score.awayLogo} alt={score.awayTeam} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-4xl">{score.awayLogo}</span>
                )}
              </div>
              <span className="font-semibold text-gray-100 text-center">{score.awayTeam}</span>
            </div>
          </div>

          {/* 日期與時間 */}
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 pt-3 border-t border-gray-700">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{formatDate(score.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{score.time}</span>
            </div>
          </div>
        </div>

        {/* 預測選項標題 */}
        <h3 className="text-lg font-semibold mb-3 text-gray-100">選擇預測</h3>

        {/* 讓分盤 */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">讓分盤</h4>
          <div className="grid grid-cols-2 gap-3">
            {betOptions.spread.map(option => {
              const isSelected = selectedOptions.get('spread')?.id === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect('spread', option)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-100">{option.label}</span>
                    {isSelected && <Check size={20} className="text-blue-400" />}
                  </div>
                  <div className="text-sm text-gray-400">賠率 {option.odds}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 不讓分（獨贏） */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">不讓分（獨贏）</h4>
          <div className="grid grid-cols-2 gap-3">
            {betOptions.moneyline.map(option => {
              const isSelected = selectedOptions.get('moneyline')?.id === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect('moneyline', option)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-100">{option.label}</span>
                    {isSelected && <Check size={20} className="text-blue-400" />}
                  </div>
                  <div className="text-sm text-gray-400">賠率 {option.odds}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 大小分 */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">大小分</h4>
          <div className="grid grid-cols-2 gap-3">
            {betOptions.totals.map(option => {
              const isSelected = selectedOptions.get('totals')?.id === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect('totals', option)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-100">{option.label}</span>
                    {isSelected && <Check size={20} className="text-blue-400" />}
                  </div>
                  <div className="text-sm text-gray-400">賠率 {option.odds}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 單雙 */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">單雙</h4>
          <div className="grid grid-cols-2 gap-3">
            {betOptions.oddEven.map(option => {
              const isSelected = selectedOptions.get('oddEven')?.id === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect('oddEven', option)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-900/30'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-100">{option.label}</span>
                    {isSelected && <Check size={20} className="text-blue-400" />}
                  </div>
                  <div className="text-sm text-gray-400">賠率 {option.odds}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 提示 */}
        <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3 text-sm text-blue-200">
          <p className="font-medium mb-1">預測提示</p>
          <ul className="list-disc list-inside space-y-1 text-blue-300">
            <li>可以選擇多種類型的預測</li>
            <li>同一類型只能選擇一個選項</li>
            <li>比賽開始後無法修改預測</li>
          </ul>
        </div>
      </div>

      {/* 底部提交按鈕 */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-3">
        <button
          onClick={handleSubmit}
          disabled={selectedOptions.size === 0}
          className={`w-full py-3 rounded-lg font-medium transition-colors ${
            selectedOptions.size > 0
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          {existingPredictions.length > 0 ? '更新預測' : '提交預測'}
          {selectedOptions.size > 0 && ` (${selectedOptions.size})`}
        </button>
      </div>
    </div>
  );
}
