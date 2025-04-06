import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Users, 
  FileText, 
  AlertTriangle,
  ArrowRight,
  Calendar
} from 'lucide-react';

function WatchmanDashboard() {
  // Mock data for today's statistics
  const todayStats = {
    totalVerifications: 15,
    approved: 10,
    rejected: 3,
    pending: 2,
    medicalLeave: 5,
    personalLeave: 6,
    academicLeave: 4
  };

  // Mock data for recent verifications
  const recentVerifications = [
    {
      id: 1,
      studentName: 'PERALA HEMANTH',
      rollNumber: '22071A0549',
      leaveType: 'Medical Leave',
      fromDate: '2024-03-15',
      toDate: '2024-03-18',
      reason: 'Dental surgery appointment',
      status: 'approved',
      verifiedOn: '2024-03-10 14:30'
    },
    {
      id: 2,
      studentName: 'RAHUL KUMAR',
      rollNumber: '22071A0550',
      leaveType: 'Personal Leave',
      fromDate: '2024-03-20',
      toDate: '2024-03-22',
      reason: 'Sister\'s wedding ceremony',
      status: 'approved',
      verifiedOn: '2024-03-10 12:15'
    },
    {
      id: 3,
      studentName: 'PRIYA SHARMA',
      rollNumber: '22071A0551',
      leaveType: 'Academic Leave',
      fromDate: '2024-03-05',
      toDate: '2024-03-07',
      reason: 'Attending technical conference',
      status: 'rejected',
      verifiedOn: '2024-03-10 09:45'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return (
          <span className="flex items-center gap-1 text-green-700 bg-green-50 px-2 py-1 rounded-full text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 text-red-700 bg-red-50 px-2 py-1 rounded-full text-sm">
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-yellow-700 bg-yellow-50 px-2 py-1 rounded-full text-sm">
            <Clock className="w-4 h-4" />
            Pending
          </span>
        );
    }
  };

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Watchman Dashboard</h1>
        <p className="text-gray-600">Today's leave request verification overview</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Total Verifications Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Total Verifications</h3>
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {todayStats.totalVerifications}
          </div>
          <p className="text-sm text-gray-500">Requests processed today</p>
        </div>

        {/* Leave Types Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Leave Types</h3>
            <FileText className="w-6 h-6 text-purple-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Medical Leave</span>
              <span className="text-purple-600 font-semibold">{todayStats.medicalLeave}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Personal Leave</span>
              <span className="text-purple-600 font-semibold">{todayStats.personalLeave}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Academic Leave</span>
              <span className="text-purple-600 font-semibold">{todayStats.academicLeave}</span>
            </div>
          </div>
        </div>

        {/* Verification Status Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Status Breakdown</h3>
            <AlertTriangle className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Approved</span>
              <span className="text-green-600 font-semibold">{todayStats.approved}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Rejected</span>
              <span className="text-red-600 font-semibold">{todayStats.rejected}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending</span>
              <span className="text-yellow-600 font-semibold">{todayStats.pending}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Verifications Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Recent Verifications</h2>
            <p className="text-sm text-gray-500">Latest leave request verifications</p>
          </div>
          <Link 
            to="/watchman/verification-history" 
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentVerifications.map((verification) => (
                <tr key={verification.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{verification.studentName}</div>
                    <div className="text-sm text-gray-500">{verification.rollNumber}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{verification.leaveType}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(verification.fromDate).toLocaleDateString()} - {new Date(verification.toDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatTime(verification.verifiedOn)}
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(verification.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WatchmanDashboard; 