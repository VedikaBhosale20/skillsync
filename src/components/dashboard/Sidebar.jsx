'use client'
import React , { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [userData, setUserData] = React.useState("");
  const router = useRouter();
  React.useEffect(() => {
    try{
      const data = JSON.parse(localStorage.getItem("userData"));
      setUserData(data)
    }
    catch(err)
    {
      console.error("Error Parsing user data" + err)
    }
  }, []);
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
            <span>Dashboard</span>
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
                  <a onClick={() =>{
                    if(userData !== null && userData.rolename === "hradmin")
                      router.push("/hradmin")
                    else
                      router.push("/admin")
                  }} className="block py-2 px-2 text-blue-800 hover:bg-blue-50 rounded-md bg-blue-100">
                    My Homepage
                  </a>
                </div>
                <div className="py-1">
                  <a onClick={() =>{
                    if(userData !== null && userData.rolename === "hradmin")
                      router.push("/hradmin/processes")
                    else
                      router.push("/admin/processes")
                  }} className="block py-2 px-2 text-gray-600 hover:bg-blue-50 rounded-md">
                    Processes
                  </a>
                </div>
                <div className="py-1">
                  <a onClick={() =>{
                    if(userData !== null && userData.rolename === "hradmin")
                      router.push("/hradmin/addorganization")
                    else
                      router.push("/admin/addorganization")
                  }} className="block py-2 px-2 text-gray-600 hover:bg-blue-50 rounded-md">
                    Add Organization
                  </a>
                </div>
                <div className="py-1">
                  <a onClick={() =>{
                    if(userData !== null && userData.rolename === "hradmin")
                      router.push("/hradmin/adduser")
                    else
                      router.push("/admin/adduser")
                  }} className="block py-2 px-2 text-gray-600 hover:bg-blue-50 rounded-md">
                    Add User
                  </a>
                </div>
                <div className="py-1">
                  <a onClick={() =>{
                    if(userData !== null && userData.rolename === "hradmin")
                      router.push("/hradmin/addcandidate")
                    else
                      router.push("/admin/addcandidate")
                  }} className="block py-2 px-2 text-gray-600 hover:bg-blue-50 rounded-md">
                    Add Candidate
                  </a>
                </div>
              </div>
            )}
          </li>
          {userData !== null && userData.rolename === "superadmin" && (
            <>
            <li className="mb-2">
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-100 text-blue-800 rounded-md"
            onClick={() => router.push("/admin/accountsdashboard")}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Accounts</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="/hradmin/hires" className="flex items-center space-x-2 p-2 hover:bg-gray-100 text-blue-800 rounded-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span>Clients</span>
            </a>
          </li>
          </>)}
          {
            userData !== null && userData.rolename === "hradmin" && (
              <>
            <li className="mb-2">
            <a href="#" className="flex items-center space-x-2 p-2 hover:bg-gray-100 text-blue-800 rounded-md"
            onClick={() => router.push("/hradmin/accountsdashboard")}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span>Accounts</span>
            </a>
          </li>
          </>
            )
          }
        </ul>
      </div>
    </div>
  );
}
