import React from 'react';
import { GroupMessageData } from '../types';

interface GroupMessageProps {
  message: GroupMessageData;
  onContextMenu: (e: React.MouseEvent, messageId: number) => void;
}

export const GroupMessage: React.FC<GroupMessageProps> = ({ message, onContextMenu }) => (
  <div className={`flex mb-4 ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
    {!message.isCurrentUser && (
      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2 mt-1">
        <span className="text-sm">{message.avatar}</span>
      </div>
    )}
    <div className="flex flex-col max-w-xs">
      {!message.isCurrentUser && (
        <span className="text-xs text-gray-400 mb-1 ml-2">{message.user}</span>
      )}
      <div className={`px-4 py-2 rounded-2xl ${
        message.isCurrentUser 
          ? 'bg-gray-600 text-gray-100 rounded-br-md' 
          : 'bg-gray-700 text-gray-200 rounded-bl-md'
      }`}
      onContextMenu={(e) => onContextMenu(e, message.id)}
      >
        <p className="text-sm">{message.message}</p>
      </div>
      <span className={`text-xs text-gray-500 mt-1 ${message.isCurrentUser ? 'text-right mr-2' : 'ml-2'}`}>
        {message.time}
      </span>
    </div>
    {message.isCurrentUser && (
      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center ml-2 mt-1">
        <span className="text-sm">{message.avatar}</span>
      </div>
    )}
  </div>
);
