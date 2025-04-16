"use client";

import React from 'react';
import ProcessesTable from '@/components/dashboard/ProcessesTable';
import Link from 'next/link';


export default function HRAdminDashboard(){

    const [userData, setUserData] = React.useState(null);
    React.useEffect(() => {
      try {
        const data = JSON.parse(localStorage.getItem("userData"));
        setUserData(data);
      } catch(err) {
        console.error("Error Parsing user data:", err);
      }
    }, []);

    return (
        <div className="flex w-full min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {userData?.username?.charAt(0) || 'U'}
              </div>
              <span>{userData?.username || 'User'}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4 ">
          <ProcessesTable />
        </div>
        <div className="flex flex-col items-center justify-center p-6">
        <Link href="processes/createnew">
        <button className="flex items-center justify-center rounded-full w-12 h-12 bg-gray-300 hover:bg-gray-500 transition" >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
        </Link>
        <p className="mt-2 text-lg font-medium text-gray-400">Create New Processes</p>
      </div>
        </div>
      </div>
      
     
    
  );
}


