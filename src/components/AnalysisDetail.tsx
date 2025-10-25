import { ArrowLeft, Star, Share2, Heart, ThumbsUp, TrendingUp } from 'lucide-react';
import { Analysis } from '../types';
import { AnalysisGamePreview } from './AnalysisGamePreview';
import { scoresData } from '../data';

interface AnalysisDetailProps {
  analysis: Analysis;
  onBack: () => void;
}

export function AnalysisDetail({ analysis, onBack }: AnalysisDetailProps) {
  // 根據 analysis.matchId 找到對應的賽事資料
  const match = scoresData.find(s => s.id === analysis.matchId);
  return (
    <div className="absolute inset-0 bg-gray-900 z-50 overflow-y-auto">
      {/* 頂部導航列 */}
      <div className="sticky top-0 bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center gap-3 z-10">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-100" />
        </button>
        <h2 className="text-lg font-semibold flex-1 truncate text-gray-100">分析詳情</h2>
        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
          <Star size={20} className="text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
          <Share2 size={20} className="text-gray-400" />
        </button>
      </div>

      {/* 內容區 */}
      <div className="px-4 py-4 pb-20">
        {/* 標題與推薦標籤 */}
        <div className="mb-4">
          {analysis.isRecommended && (
            <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full mb-2">
              ⭐ 推薦分析
            </span>
          )}
          <h1 className="text-2xl font-bold mb-2 text-gray-100">{analysis.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{analysis.sport}</span>
            <span>•</span>
            <span>{analysis.league}</span>
            <span>•</span>
            <span>{analysis.time}</span>
          </div>
        </div>

        {/* 分析師資訊 */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
          <div className="text-3xl">{analysis.avatar}</div>
          <div className="flex-1">
            <div className="font-semibold text-gray-100">{analysis.analyst}</div>
            <div className="flex items-center gap-1 text-sm text-yellow-500">
              <Star size={14} className="fill-current" />
              <span>{analysis.rating.toFixed(1)}</span>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            關注
          </button>
        </div>

        {/* 賽事預覽 */}
        {analysis.matchId && (
          <div className="mb-4">
            <AnalysisGamePreview match={match} />
          </div>
        )}

        {/* 預測資訊 */}
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-lg border border-blue-700">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-blue-400" size={20} />
            <span className="font-semibold text-gray-100">預測結果</span>
          </div>
          <div className="text-2xl font-bold text-blue-300 mb-3">
            {analysis.prediction}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">信心指數</span>
              <span className="font-semibold text-blue-300">{analysis.confidence}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${analysis.confidence}%` }}
              />
            </div>
          </div>
        </div>

        {/* 分析內容 */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-100">
            <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
            詳細分析
          </h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {analysis.content}
            </p>

            {/* 模擬完整分析內容 */}
            <div className="mt-4 space-y-3 text-gray-300">
              <p className="leading-relaxed">
                <strong className="text-gray-100">近期戰績分析：</strong>
                根據過去五場比賽的數據統計，主隊在主場的勝率高達 80%，而客隊在客場的表現則相對疲軟，
                勝率僅有 35%。這樣的主客場差距在本場比賽中將會是重要的參考指標。
              </p>

              <p className="leading-relaxed">
                <strong className="text-gray-100">球員狀態：</strong>
                主隊核心球員本週訓練狀況良好，沒有傷病困擾，預計將以主力陣容出戰。
                客隊則有兩名先發球員因小傷缺陣，這對整體戰力會有一定影響。
              </p>

              <p className="leading-relaxed">
                <strong className="text-gray-100">戰術分析：</strong>
                從兩隊過往交手記錄來看，主隊在進攻端的節奏掌控較佳，能夠有效壓制對手的防守反擊。
                建議關注主隊在上半場的表現，通常能夠建立領先優勢。
              </p>

              <p className="leading-relaxed">
                <strong className="text-gray-100">投注建議：</strong>
                綜合以上分析，本場比賽建議關注主隊讓分盤。以目前盤口來看，{analysis.prediction} 是相對穩健的選擇，
                信心指數達到 {analysis.confidence}%。建議可以適度配置資金，但仍需注意風險控管。
              </p>
            </div>
          </div>
        </div>

        {/* 標籤 */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-gray-400">相關標籤</h3>
          <div className="flex flex-wrap gap-2">
            {analysis.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors cursor-pointer border border-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* 統計數據 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-gray-800 rounded-lg text-center border border-gray-700">
            <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
              <Heart size={16} />
            </div>
            <div className="text-xl font-semibold text-gray-100">{analysis.likes}</div>
            <div className="text-xs text-gray-400">按讚</div>
          </div>
          <div className="p-3 bg-gray-800 rounded-lg text-center border border-gray-700">
            <div className="flex items-center justify-center gap-1 text-gray-400 mb-1">
              <Share2 size={16} />
            </div>
            <div className="text-xl font-semibold text-gray-100">{Math.floor(analysis.views * 0.1)}</div>
            <div className="text-xs text-gray-400">分享</div>
          </div>
        </div>

        {/* 互動提示 */}
        <div className="p-4 bg-blue-900 rounded-lg border border-blue-700 text-sm">
          <p className="font-medium mb-1 text-blue-300">風險提示</p>
          <p className="text-blue-200">
            以上分析僅供參考，投注前請自行評估風險。運彩投注應量力而為，理性娛樂。
          </p>
        </div>
      </div>

      {/* 底部操作列 */}
      <div className="sticky bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-3 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
          <Heart size={20} className="text-red-500" />
          <span className="font-medium text-gray-100">按讚</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
          <ThumbsUp size={20} className="text-blue-400" />
          <span className="font-medium text-gray-100">支持</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Share2 size={20} />
          <span className="font-medium">分享</span>
        </button>
      </div>
    </div>
  );
}
