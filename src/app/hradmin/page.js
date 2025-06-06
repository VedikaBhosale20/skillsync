"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import MetricsCard from '@/components/dashboard/MetricsCard';
import ProcessesTable from '@/components/dashboard/ProcessesTable';
import TasksSection from '@/components/dashboard/TasksSection';
import InboxSection from '@/components/dashboard/InboxSection';

export default function HRAdminDashboard() {
  const { userData } = useSelector((state) => state.auth);
  const cardArr = [
  {
    id: 1,
    title:"Total Candidates",
    value:"15,662",
    icon:"users",
    color:"bg-blue-500"
  },
  {
    id: 2,
    title:"New Candidates",
    value:"413",
    icon:"user-plus",
    color:"bg-yellow-400",
  },
  {
    id: 3,
    title:"Running Services",
    value:"34",
    icon:"settings",
    color:"bg-purple-500",
  },
  {
    id: 4,
    title:"Bill Due",
    value:"₹ 42,781",
    icon:"credit-card",
    color:"bg-red-500",
  }
  ]

  return (
    <div className="flex w-full min-h-screen bg-gray-100">
    <div className="flex-1 p-6">
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
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {
            cardArr.map((card, index) => (
            <MetricsCard 
              title={card.title}
              value={card.value}
              icon={card.icon}
              color={card.color}
              key={index}
            />
            ))
          }
        </div>
        
        
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4 ">
          <ProcessesTable />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <TasksSection />
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <InboxSection />
          </div>
        </div>
      </div>
    </div>
  );
}
