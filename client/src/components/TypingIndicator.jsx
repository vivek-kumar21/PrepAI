import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="flex space-x-2 mt-2 ml-1">
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce"></div>
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
      <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce animation-delay-400"></div>
    </div>
  );
};

export default TypingIndicator;
