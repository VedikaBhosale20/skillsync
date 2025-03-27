'use client' 
import React from 'react';
import { 
  Users, 
  Briefcase, 
  FileText, 
  BarChart2, 
  Settings, 
  PlusCircle,
  Workflow
} from 'lucide-react';
import { icons } from 'antd/es/image/PreviewGroup';

export default function SuperAdminDashboard() {
  const dashboardStats = [
    { 
      icon: Users, 
      title: 'Total Candidates', 
      value: '1,254',
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      icon: Briefcase, 
      title: 'Open Positions', 
      value: '42',
      color: 'bg-green-100 text-green-600'
    },
    { 
      icon: FileText, 
      title: 'Interviews Scheduled', 
      value: '87',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const quickActions = [
    { 
      icon: PlusCircle, 
      title: 'Add A Client', 
      description: 'Create a new client profile' 
    },
    { 
      icon: BarChart2, 
      title: 'Recruitment Analytics', 
      description: 'View hiring metrics' 
    },
    { 
      icon: Settings, 
      title: 'System Configuration', 
      description: 'Manage System settings' 
    },
    {
      icon: Workflow,
      title: 'Post a Job',
      description: 'Create a new job listing'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Superadmin Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive HR Recruitment Management Platform
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {dashboardStats.map((stat, index) => (
            <div 
              key={index} 
              className={`${stat.color} p-6 rounded-xl shadow-md transition hover:scale-105`}
            >
              <div className="flex items-center space-x-4">
                <stat.icon size={48} />
                <div>
                  <p className="text-lg font-semibold">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <div 
                key={index} 
                className="border rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="flex justify-center mb-4">
                  <action.icon size={54} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                <p className="text-gray-600">{action.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}