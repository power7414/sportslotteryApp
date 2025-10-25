import React from 'react';
import { ChatRoomItem } from './ChatRoomItem';
import { chatRoomsData } from '../data';

interface ChatRoomListProps {
  onSelectRoom: (roomId: number) => void;
}

export const ChatRoomList: React.FC<ChatRoomListProps> = ({ onSelectRoom }) => (
  <div>
    <h2 className="text-lg font-bold text-gray-100 mb-2">群組專區</h2>
    <div className="space-y-1">
      {chatRoomsData.map(room => (
        <ChatRoomItem key={room.id} room={room} onClick={onSelectRoom} />
      ))}
    </div>
  </div>
);
