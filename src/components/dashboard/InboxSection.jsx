import React from 'react';

export default function InboxSection() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-500">My Inbox</h2>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-full bg-gray-200 rounded-lg p-4 relative">
          <div className="flex items-center justify-center space-x-4">
            <button className="p-2 rounded-full bg-gray-300 hover:bg-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
              </svg>
            </button>
            <div className="flex-1 h-2 bg-gray-300 rounded-full relative">
              <div className="absolute left-0 top-0 h-full w-1/4 bg-blue-500 rounded-full"></div>
            </div>
            <div className="text-sm">00:02 / 02:06</div>
          </div>
        </div>
      </div>
    </div>
  );
}