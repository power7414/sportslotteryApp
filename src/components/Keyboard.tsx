import React from 'react';

interface KeyboardRowProps {
  keys: string[];
  onKeyPress: (key: string) => void;
}

const KeyboardRow: React.FC<KeyboardRowProps> = ({ keys, onKeyPress }) => (
  <div className="flex justify-center space-x-1 mb-1">
    {keys.map((key) => (
      <button
        key={key}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded text-sm font-medium min-w-8"
        onClick={() => onKeyPress(key.toLowerCase())}
      >
        {key}
      </button>
    ))}
  </div>
);

interface KeyboardProps {
  keyboardKeys: string[][];
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
}

export const Keyboard: React.FC<KeyboardProps> = ({ keyboardKeys, onKeyPress, onBackspace, onSpace }) => (
  <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-100 p-3 rounded-t-lg">
    <div className="space-y-1">
      {keyboardKeys.map((row, index) => (
        <KeyboardRow key={index} keys={row} onKeyPress={onKeyPress} />
      ))}
      <div className="flex justify-center space-x-1">
        <button 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-2 rounded text-sm font-medium"
          onClick={onSpace}
        >
          空格
        </button>
        <button 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm font-medium"
          onClick={onBackspace}
        >
          ⌫
        </button>
      </div>
    </div>
  </div>
);
