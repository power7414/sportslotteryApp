import { useState } from 'react';
import { Edit2, Settings, Link, LogOut, ArrowLeft } from 'lucide-react';

interface ProfileSectionProps {
  userName: string;
  setUserName: (name: string) => void;
  onBack: () => void;
}

export function ProfileSection({ userName, setUserName, onBack }: ProfileSectionProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newUserName, setNewUserName] = useState(userName);

  const handleSaveUserName = () => {
    setUserName(newUserName);
    setIsEditingName(false);
  };

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
        <h2 className="text-lg font-semibold flex-1 text-gray-100">個人中心</h2>
      </div>

      {/* 內容區 */}
      <div className="px-4 py-4 pb-20 space-y-4">
        {/* 個人資訊卡片 */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-center mb-4">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-4xl">👤</span>
            </div>
            {isEditingName ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full border border-gray-600 rounded px-3 py-2 text-center bg-gray-700 text-gray-100"
                  placeholder="輸入使用者名稱"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveUserName}
                    className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingName(false);
                      setNewUserName(userName);
                    }}
                    className="flex-1 bg-gray-700 text-gray-300 px-3 py-2 rounded text-sm hover:bg-gray-600"
                  >
                    取消
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <h3 className="text-xl font-bold text-gray-100">{userName}</h3>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 帳號設定 */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="font-semibold text-gray-100 mb-4 flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            帳號設定
          </h3>

          <div className="space-y-4">
            {/* 綁定運彩帳號 */}
            <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
              <div className="flex items-center gap-3">
                <Link className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium text-gray-100">綁定運彩帳號</div>
                  <div className="text-sm text-gray-400">尚未綁定</div>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                綁定
              </button>
            </div>

            {/* 通知設定 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center p-2">
                <span className="text-gray-200">推播通知</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex justify-between items-center p-2">
                <span className="text-gray-200">群組訊息提醒</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex justify-between items-center p-2">
                <span className="text-gray-200">分析師發文通知</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* 其他功能 */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h3 className="font-semibold text-gray-100 mb-4">其他功能</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 hover:bg-gray-700 rounded text-gray-200 transition-colors">
              關於我們
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-700 rounded text-gray-200 transition-colors">
              使用條款
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-700 rounded text-gray-200 transition-colors">
              隱私政策
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-700 rounded text-red-400 transition-colors flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              登出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
