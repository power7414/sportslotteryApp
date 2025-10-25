import React, { useState } from 'react';
import { Edit2, Settings, Link } from 'lucide-react';
import { MyPredictions } from './MyPredictions';
import { UserPrediction } from '../types';

interface ProfileSectionProps {
  userName: string;
  setUserName: (name: string) => void;
  userPredictions: UserPrediction[];
  onEditPrediction: (prediction: UserPrediction) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  userName,
  setUserName,
  userPredictions,
  onEditPrediction
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newUserName, setNewUserName] = useState(userName);

  const handleSaveUserName = () => {
    setUserName(newUserName);
    setIsEditingName(false);
  };

  return (
    <div className="space-y-4">
      {/* 我的預測區塊 */}
      <MyPredictions
        predictions={userPredictions}
        onEditPrediction={onEditPrediction}
      />

      {/* 個人資訊卡片 */}
      <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
        <div className="text-center mb-4">
          <div className="text-6xl mb-2">👤</div>
          {isEditingName ? (
            <div className="flex items-center justify-center space-x-2">
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="border border-gray-600 rounded px-2 py-1 text-center bg-gray-700 text-gray-100"
              />
              <button
                onClick={handleSaveUserName}
                className="bg-gray-600 text-gray-100 px-3 py-1 rounded text-sm hover:bg-gray-500"
              >
                保存
              </button>
              <button
                onClick={() => {
                  setIsEditingName(false);
                  setNewUserName(userName);
                }}
                className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-600"
              >
                取消
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <h2 className="text-xl font-bold text-gray-100">{userName}</h2>
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

      {/* 帳號設定卡片 */}
      <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
        <h3 className="font-semibold text-gray-100 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          帳號設定
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
            <div className="flex items-center space-x-3">
              <Link className="w-5 h-5 text-gray-400" />
              <div>
                <div className="font-medium text-gray-100">綁定運彩帳號</div>
                <div className="text-sm text-gray-400">尚未綁定</div>
              </div>
            </div>
            <button className="bg-gray-600 text-gray-100 px-4 py-2 rounded text-sm hover:bg-gray-500">
              綁定
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center p-2">
              <span className="text-gray-200">推播通知</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="text-gray-200">群組訊息提醒</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
            <div className="flex justify-between items-center p-2">
              <span className="text-gray-200">分析師發文通知</span>
              <input type="checkbox" defaultChecked className="toggle" />
            </div>
          </div>
        </div>
      </div>

      {/* 其他設定 */}
      <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
        <h3 className="font-semibold text-gray-100 mb-4">其他功能</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-2 hover:bg-gray-700 rounded text-gray-200">
            關於我們
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-700 rounded text-gray-200">
            使用條款
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-700 rounded text-gray-200">
            隱私政策
          </button>
          <button className="w-full text-left p-2 hover:bg-gray-700 rounded text-red-400">
            登出
          </button>
        </div>
      </div>
    </div>
  );
};