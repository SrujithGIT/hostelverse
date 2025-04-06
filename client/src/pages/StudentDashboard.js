import React from 'react';
import { Calendar, Building2, CreditCard, MessageSquare, FileText, Utensils, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function StudentDashboard() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Student Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Fee Payment Card */}
          <Link to="/student/fee-payment" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <CreditCard className="w-6 h-6 text-green-600 mr-3" />
              <h3 className="text-lg font-semibold">Fee Status</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">₹1,00,000</p>
            <div className="flex items-center mt-2 text-sm text-red-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span>Due by Mar 15</span>
            </div>
          </Link>

          {/* Room Status Card */}
          <Link to="/student/room" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Building2 className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold">Room Status</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">A-101</p>
            <p className="text-sm text-gray-600 mt-2">2nd Floor, Block A</p>
          </Link>

          {/* Mess Menu Card */}
          <Link to="/student/mess-menu" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Utensils className="w-6 h-6 text-orange-600 mr-3" />
              <h3 className="text-lg font-semibold">Today's Menu</h3>
            </div>
            <p className="text-xl font-medium text-gray-900">Lunch</p>
            <p className="text-sm text-gray-600 mt-2">12:30 PM - 2:30 PM</p>
          </Link>

          {/* Complaints Card */}
          <Link to="/student/complaints" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <MessageSquare className="w-6 h-6 text-purple-600 mr-3" />
              <h3 className="text-lg font-semibold">Complaints</h3>
            </div>
            <p className="text-3xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-600 mt-2">Active complaints</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Payment */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Payment</h2>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">₹15,000</h3>
                  <p className="text-sm text-gray-600">Feb 15, 2024</p>
                </div>
                <span className="text-green-600 font-medium">Completed</span>
              </div>
            </div>
            <Link 
              to="/student/fee-payment"
              className="mt-4 inline-block text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View payment history
            </Link>
          </div>

          {/* Recent Complaint */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Complaint</h2>
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Plumbing Issue</h3>
                  <p className="text-sm text-gray-600">Reported on Feb 20, 2024</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">In Progress</span>
              </div>
            </div>
            <Link 
              to="/student/complaints"
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

export default StudentDashboard; 