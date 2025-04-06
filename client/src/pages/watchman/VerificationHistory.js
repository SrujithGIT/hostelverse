import React from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

function VerificationHistory() {
  // Mock data for verification history
  const verificationHistory = [
    {
      id: 1,
      studentName: 'PERALA HEMANTH',
      rollNumber: '22071A0549',
      leaveType: 'Medical Leave',
      fromDate: '2024-03-15',
      toDate: '2024-03-18',
      reason: 'Dental surgery appointment',
      status: 'approved',
      parentName: 'John Doe',
      parentContact: '+91 9876543210',
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
      parentName: 'Rahul\'s Father',
      parentContact: '+91 9876543211',
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
      parentName: 'Priya\'s Mother',
      parentContact: '+91 9876543212',
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
            <AlertCircle className="w-4 h-4" />
            Pending
          </span>
        );
    }
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Verification History</h1>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Leave Request Verification History</h2>
          <p className="text-sm text-gray-500 mt-1">Complete history of leave request verifications</p>
        </div>

        <div className="space-y-4 p-4">
          {verificationHistory.map((verification) => (
            <div
              key={verification.id}
              className="border-2 border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{verification.studentName}</h3>
                  <p className="text-sm text-gray-500">{verification.rollNumber}</p>
                </div>
                {getStatusBadge(verification.status)}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">{verification.leaveType}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(verification.fromDate).toLocaleDateString()} - {new Date(verification.toDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Parent Contact</p>
                  <p className="text-sm text-gray-600">{verification.parentName}</p>
                  <p className="text-sm text-gray-600">{verification.parentContact}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-3">
                <span className="font-medium">Reason: </span>
                {verification.reason}
              </p>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                Verified on {formatDateTime(verification.verifiedOn)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VerificationHistory; 