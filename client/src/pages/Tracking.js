import React from 'react';
import { Users, UserCheck, Clock, MapPin } from 'lucide-react';

function Tracking() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Real-Time Student Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Users className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold">Total Students</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">250</p>
          <p className="text-gray-600">Registered</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <UserCheck className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold">Present</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">185</p>
          <p className="text-gray-600">In hostel</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-yellow-600 mr-3" />
            <h3 className="text-lg font-semibold">On Leave</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">45</p>
          <p className="text-gray-600">Approved absence</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold">Unaccounted</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">20</p>
          <p className="text-gray-600">Need attention</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Floor-wise Occupancy</h2>
          <div className="space-y-4">
            {[
              { floor: 'Ground Floor', total: 60, present: 45 },
              { floor: 'First Floor', total: 65, present: 50 },
              { floor: 'Second Floor', total: 65, present: 48 },
              { floor: 'Third Floor', total: 60, present: 42 }
            ].map((floor, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{floor.floor}</h3>
                  <span className="text-sm text-gray-600">
                    {floor.present}/{floor.total} present
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(floor.present/floor.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                student: 'John Doe',
                action: 'Check-in',
                time: '10:30 AM',
                location: 'Main Gate',
                status: 'success'
              },
              {
                student: 'Jane Smith',
                action: 'Check-out',
                time: '10:15 AM',
                location: 'Main Gate',
                status: 'warning'
              },
              {
                student: 'Mike Johnson',
                action: 'Leave Request',
                time: '10:00 AM',
                location: 'Room B-205',
                status: 'info'
              },
              {
                student: 'Sarah Williams',
                action: 'Return',
                time: '9:45 AM',
                location: 'Main Gate',
                status: 'success'
              }
            ].map((activity, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{activity.student}</h3>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{activity.time}</p>
                    <p className="text-sm text-gray-600">{activity.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Student Location Map</h2>
        <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
          <p className="text-gray-500">Interactive map view would be displayed here</p>
        </div>
      </div>
    </div>
  );
}

export default Tracking;