"use client"
import React, { useState } from 'react';
import { Calendar, Settings, User, Users, Grid, PhoneCall } from 'lucide-react';
import Sidebar from '@/components/dashboard/processes/Sidebar';

export default function CreateProcess() {
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
    
      <Sidebar />
      
     
      <div className="flex-1">
       
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="relative w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for services"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-center">
            <div className="mr-4 relative">
              <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            <button className="mr-4 text-gray-400">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <div className="flex items-center">
              <img src="https://via.placeholder.com/40" alt="User Avatar" className="h-10 w-10 rounded-full" />
              <div className="ml-2">
                <div className="flex items-center">
                  <span className="font-medium"></span>
                  <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="p-8">
          <h1 className="text-3xl font-medium text-gray-800 mb-8">Create a process</h1>
          
          <div className="max-w-4xl">
            <div className="mb-8">
              <input
                type="text"
                placeholder="Process title"
                className="w-full border-b-2 border-gray-300 pb-2 text-3xl font-light text-gray-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <div className="mb-4">
              <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md flex items-center">
                <span>Invite Collaborators</span>
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-medium text-gray-800 mb-6">Process details</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="flex items-center">
                  <label className="w-32 text-gray-700">Start date:</label>
                  <input type="text" placeholder="dd/mm/yyyy" className="border border-gray-300 rounded px-3 py-2" />
                </div>
                <div className="flex items-center">
                  <label className="w-32 text-gray-700">Deadline:</label>
                  <input type="text" placeholder="dd/mm/yyyy" className="border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-medium text-gray-800 mb-6">Form details</h2>
              
              <button className="border border-dashed border-gray-400 rounded-full px-6 py-2 text-gray-500">
                Additional questions
              </button>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h2 className="text-xl font-medium text-gray-800 mb-6">Platform details</h2>
              
              <div className="mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-32 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                    </svg>
                    <span className="text-gray-700">LinkedIn:</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="LinkedIn API key" 
                    className="border border-gray-300 rounded px-3 py-2 flex-1" 
                  />
                </div>
                
                <div className="flex items-center">
                  <div className="w-32 flex items-center">
                    <span className="w-6 h-6 mr-2 text-blue-800 font-bold">i</span>
                    <span className="text-gray-700">Indeed:</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Indeed API key" 
                    className="border border-gray-300 rounded px-3 py-2 flex-1" 
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <button className="bg-indigo-600 text-white px-8 py-2 rounded-md">Save</button>
          </div>
        </div>
      </div>
      
      
      
    </div>
  );
}