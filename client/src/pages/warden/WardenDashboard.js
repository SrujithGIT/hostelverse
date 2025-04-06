import React from 'react';
import { Users, Building2, Calendar, MessageSquare, CreditCard, AlertCircle, FileText, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

function WardenDashboard() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome, Warden</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Students Card */}
          <Link to="/warden/attendance" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">Students</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">150</p>
            <p className="text-sm text-gray-600 mt-2">Total students</p>
          </Link>

          {/* Fee Defaulters Card */}
          <Link to="/warden/fee-defaulters" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold">Fee Defaulters</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">8</p>
            <div className="flex items-center mt-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>Action Required</span>
            </div>
          </Link>

          {/* Complaints Card */}
          <Link to="/warden/complaints" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold">Complaints</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">5</p>
            <p className="text-sm text-gray-600 mt-2">Pending resolution</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Fee Defaulters */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Fee Defaulters</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">John Smith</h3>
                    <p className="text-sm text-gray-600">Room A-101</p>
                    <p className="text-sm font-medium text-red-600">Due: ₹15,000</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">30 days overdue</span>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Emma Wilson</h3>
                    <p className="text-sm text-gray-600">Room B-205</p>
                    <p className="text-sm font-medium text-red-600">Due: ₹12,000</p>
                  </div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-sm">15 days overdue</span>
                </div>
              </div>
            </div>
            <Link 
              to="/warden/fee-defaulters"
              className="mt-4 inline-block text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all defaulters
            </Link>
          </div>

          {/* Recent Complaints */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Plumbing Issue</h3>
                    <p className="text-sm text-gray-600">Room C-303</p>
                    <p className="text-sm text-gray-600">Reported: Feb 20, 2024</p>
                  </div>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Electrical Issue</h3>
                    <p className="text-sm text-gray-600">Room D-404</p>
                    <p className="text-sm text-gray-600">Reported: Feb 19, 2024</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">In Progress</span>
                </div>
              </div>
            </div>
            <Link 
              to="/warden/complaints"
              className="mt-4 inline-block text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all complaints
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WardenDashboard; 