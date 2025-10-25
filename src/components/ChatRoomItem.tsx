import React from 'react';
import { ChatRoom } from '../types';

interface ChatRoomItemProps {
  room: ChatRoom;
  onClick: (roomId: number) => void;
}

export const ChatRoomItem: React.FC<ChatRoomItemProps> = ({ room, onClick }) => (
  <button
    onClick={() => onClick(room.id)}
    className="flex items-center w-full p-3 hover:bg-gray-700 rounded-lg"
  >
    <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden">
      {/* 判斷 avatar 是 URL 還是 emoji */}
      {room.avatar.startsWith('http') ? (
        <img src={room.avatar} alt={room.name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-2xl">{room.avatar}</span>
      )}
    </div>
    <div className="flex-1 min-w-0 text-left">
      <div className="flex justify-between items-center mb-0.5">
        <h3 className="font-semibold text-gray-100 truncate">{room.name}</h3>
        <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{room.lastTime}</span>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400 truncate">{room.lastMessage}</p>
        {room.unread > 0 && (
          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold flex-shrink-0 ml-2">
            {room.unread}
          </span>
        )}
      </div>
    </div>
  </button>
);
