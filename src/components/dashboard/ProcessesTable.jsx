import React from 'react';

export default function ProcessesTable() {
  const processes = [
    { id: '01', role: 'Full Stack Developer', type: 'Full', applicants: '2,935', status: 'AI Interview' },
    { id: '02', role: 'Back-End Developer', type: 'Custom', applicants: '1,442', status: 'Resume Analysis' },
    { id: '03', role: 'Cloud Engineer', type: 'Test', applicants: '891', status: 'HR Interview' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-500">Processes</h2>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
        </svg>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th className="p-2">
              
            </th>
            <th className="p-2">Number</th>
            <th className="p-2">Role</th>
            <th className="p-2">Type</th>
            <th className="p-2">Applicants</th>
            <th className="p-2">Status</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id} className="border-t text-gray-400">
              <td className="p-2">
                <input type="checkbox" className="rounded" />
              </td>
              <td className="p-2">{process.id}</td>
              <td className="p-2">{process.role}</td>
              <td className="p-2">{process.type}</td>
              <td className="p-2">{process.applicants}</td>
              <td className="p-2">{process.status}</td>
              <td className="p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                </svg>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}