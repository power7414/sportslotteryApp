import React from 'react';
import { Reply, Undo, Megaphone, Flag } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  messageId: number;
  isAdmin: boolean;
  onAction: (action: string, messageId: number) => void;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  messageId,
  isAdmin,
  onAction,
  onClose
}) => {
  return (
    <div
      className="fixed bg-gray-800 border border-gray-600 rounded-lg shadow-lg py-2 z-50"
      style={{ left: x, top: y }}
      onClick={onClose}
    >
      <button
        onClick={() => onAction('reply', messageId)}
        className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200"
      >
        <Reply className="w-4 h-4" />
        <span>回覆</span>
      </button>
      <button
        onClick={() => onAction('retract', messageId)}
        className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200"
      >
        <Undo className="w-4 h-4" />
        <span>收回</span>
      </button>
      {isAdmin && (
        <button
          onClick={() => onAction('pin', messageId)}
          className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-gray-200"
        >
          <Megaphone className="w-4 h-4" />
          <span>設為公告</span>
        </button>
      )}
      <button
        onClick={() => onAction('report', messageId)}
        className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center space-x-2 text-red-400"
      >
        <Flag className="w-4 h-4" />
        <span>檢舉</span>
      </button>
    </div>
  );
};