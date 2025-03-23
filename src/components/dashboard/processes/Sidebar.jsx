import React , { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
    const [isExpanded, setIsExpanded] = useState(true);
  return (
    <div className="w-64 bg-white shadow-md h-screen">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">SkillSync</h1>
      </div>
      <div className="p-4">
      <ul>
        <li className="mb-4">
        <div 
              className="flex items-center justify-between p-2 bg-blue-600 text-white rounded-md cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
           <div className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
            <span>Processes</span>
          </div>
          <svg 
                className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
        </div>
        {isExpanded && (
              <div className="ml-4 pl-4 border-l-2 border-blue-200">
                <div className="py-1">
                  <Link href="/hradmin/dashboard/processes/createnew" className="block py-2 px-2 text-blue-800 hover:bg-blue-50 rounded-md bg-blue-100">
                    Create New
                  </Link>
                </div>
                <div className="py-1">
                  <Link href="/hradmin/dashboard/processes/editexisting" className="block py-2 px-2 text-gray-600 hover:bg-blue-50 rounded-md">
                    Edit existing 
                  </Link>
                </div>
                <div className="py-1">
                  <Link href="/hradmin/dashboard/processes/settings" className="block py-2 px-2 text-gray-600 hover:bg-blue-50 rounded-md">
                    Settings
                  </Link>
                </div>
              </div>
            )}
          </li>
          <li className="mb-2">
            <Link href="/hradmin/accounts" className="flex items-center space-x-2 p-2 hover:bg-gray-100 text-blue-800 rounded-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Accounts</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link href="/hradmin/hires" className="flex items-center space-x-2 p-2 hover:bg-gray-100 text-blue-800 rounded-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span>Hires</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
