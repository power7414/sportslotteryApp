import { useState } from 'react';
import { UserPrediction, WinRateStats } from '../types';
import { dateKeys } from '../data';
import { Minus, Edit2, Check, X } from 'lucide-react';

interface MyPredictionsProps {
  predictions: UserPrediction[];
  onEditPrediction: (prediction: UserPrediction) => void;
}

const dateOptions = [
  { key: dateKeys.dayBeforeYesterday, label: '前天' },
  { key: dateKeys.yesterday, label: '昨天' },
  { key: dateKeys.today, label: '今天' },
  { key: dateKeys.tomorrow, label: '明天' },
  { key: dateKeys.dayAfterTomorrow, label: '後天' },
];

export function MyPredictions({ predictions, onEditPrediction }: MyPredictionsProps) {
  const [selectedDate, setSelectedDate] = useState(dateKeys.today);

  // 根據日期篩選預測
  const filteredPredictions = predictions.filter(p => p.match.date === selectedDate);

  // 計算勝率統計
  const calculateWinRate = (preds: UserPrediction[], timeframe: 'all' | 'month' | 'week'): WinRateStats => {
    let filteredPreds = preds.filter(p => p.status === 'finished' && p.result);

    if (timeframe === 'month') {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filteredPreds = filteredPreds.filter(p => new Date(p.createdAt) >= oneMonthAgo);
    } else if (timeframe === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filteredPreds = filteredPreds.filter(p => new Date(p.createdAt) >= oneWeekAgo);
    }

    const total = filteredPreds.reduce((sum, p) => sum + (p.result?.length || 0), 0);
    const correct = filteredPreds.reduce(
      (sum, p) => sum + (p.result?.filter(r => r.isCorrect).length || 0),
      0
    );

    return {
      total,
      correct,
      winRate: total > 0 ? Math.round((correct / total) * 100) : 0
    };
  };

  const allTimeStats = calculateWinRate(predictions, 'all');
  const monthStats = calculateWinRate(predictions, 'month');
  const weekStats = calculateWinRate(predictions, 'week');

  const getPredictionTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      spread: '讓分',
      moneyline: '不讓分',
      totals: '大小分',
      oddEven: '單雙'
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { label: string; className: string } } = {
      pending: { label: '待開賽', className: 'bg-yellow-900/50 text-yellow-300 border-yellow-700' },
      live: { label: '進行中', className: 'bg-red-900/50 text-red-300 border-red-700' },
      finished: { label: '已結束', className: 'bg-gray-700 text-gray-300 border-gray-600' }
    };
    return badges[status] || badges.pending;
  };

  const getResultIcon = (isCorrect: boolean | undefined) => {
    if (isCorrect === undefined) return <Minus size={16} className="text-gray-400" />;
    return isCorrect ? (
      <Check size={16} className="text-green-400" />
    ) : (
      <X size={16} className="text-red-400" />
    );
  };

  return (
    <div className="mb-6">
      {/* 標題 */}
      <h3 className="text-xl font-bold mb-4 text-gray-100">我的預測</h3>

      {/* 勝率統計 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">歷史勝率</div>
          <div className="text-2xl font-bold text-blue-400">{allTimeStats.winRate}%</div>
          <div className="text-xs text-gray-500">{allTimeStats.correct}/{allTimeStats.total}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">本月勝率</div>
          <div className="text-2xl font-bold text-green-400">{monthStats.winRate}%</div>
          <div className="text-xs text-gray-500">{monthStats.correct}/{monthStats.total}</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">本週勝率</div>
          <div className="text-2xl font-bold text-purple-400">{weekStats.winRate}%</div>
          <div className="text-xs text-gray-500">{weekStats.correct}/{weekStats.total}</div>
        </div>
      </div>

      {/* 日期篩選 */}
      <div className="flex gap-2 mb-4">
        {dateOptions.map(date => (
          <button
            key={date.key}
            onClick={() => setSelectedDate(date.key)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDate === date.key
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {date.label}
          </button>
        ))}
      </div>

      {/* 預測記錄列表 */}
      <div className="space-y-3">
        {filteredPredictions.length > 0 ? (
          filteredPredictions.map(prediction => {
            const statusBadge = getStatusBadge(prediction.status);
            const canEdit = prediction.status === 'pending';

            return (
              <div
                key={prediction.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700"
              >
                {/* 賽事資訊 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-100">
                      {prediction.match.homeTeam} vs {prediction.match.awayTeam}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded border ${statusBadge.className}`}>
                      {statusBadge.label}
                    </span>
                  </div>
                  {canEdit && (
                    <button
                      onClick={() => onEditPrediction(prediction)}
                      className="p-1.5 hover:bg-gray-700 rounded transition-colors"
                    >
                      <Edit2 size={16} className="text-blue-400" />
                    </button>
                  )}
                </div>

                {/* 預測選項 */}
                <div className="space-y-2">
                  {prediction.predictions.map((pred, index) => {
                    const result = prediction.result?.find(r => r.type === pred.type);
                    const isCorrect = result?.isCorrect;

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm p-2 bg-gray-900/50 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">{getPredictionTypeLabel(pred.type)}:</span>
                          <span className="text-gray-100 font-medium">{pred.option.label}</span>
                          <span className="text-gray-500 text-xs">@ {pred.option.odds}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {prediction.status === 'finished' && (
                            <span className={`text-xs ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                              {isCorrect ? '命中' : '未中'}
                            </span>
                          )}
                          {getResultIcon(isCorrect)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 比賽時間 */}
                <div className="mt-2 text-xs text-gray-500">
                  {prediction.match.time} · {new Date(prediction.match.date).toLocaleDateString('zh-TW')}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p className="mb-2">尚無預測記錄</p>
            <p className="text-sm">前往賽事專區開始預測吧！</p>
          </div>
        )}
      </div>
    </div>
  );
}
