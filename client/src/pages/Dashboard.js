import React from 'react';
import { Building2, Bell, BarChart3 } from 'lucide-react';

function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm">
          <Building2 className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Room Status</h3>
          <p className="text-gray-600">Current room occupancy</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <Bell className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Notifications</h3>
          <p className="text-gray-600">Recent updates</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow-sm">
          <BarChart3 className="w-8 h-8 text-orange-600 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Statistics</h3>
          <p className="text-gray-600">Monthly overview</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 