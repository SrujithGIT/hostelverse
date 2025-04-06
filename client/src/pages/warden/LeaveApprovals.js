import React, { useState } from 'react';
import { Calendar, Phone, User, Clock, Check, X, ChevronRight, ChevronLeft, ClipboardCheck, Clock3, XCircle, FileCheck2 } from 'lucide-react';

function LeaveApprovals() {
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock data - Replace with actual API data
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      room: 'A-101',
      parentName: 'Jane Doe',
      parentContact: '+91 9876543210',
      startDate: '2024-03-15',
      endDate: '2024-03-18',
      reason: 'Family function',
      status: 'pending',
      submittedDate: '2024-03-10'
    },
    {
      id: 2,
      studentName: 'Alice Smith',
      room: 'B-205',
      parentName: 'Robert Smith',
      parentContact: '+91 8765432109',
      startDate: '2024-03-20',
      endDate: '2024-03-22',
      reason: 'Medical checkup',
      status: 'approved',
      submittedDate: '2024-03-12'
    },
    {
      id: 3,
      studentName: 'Bob Johnson',
      room: 'C-301',
      parentName: 'Mary Johnson',
      parentContact: '+91 7654321098',
      startDate: '2024-03-25',
      endDate: '2024-03-27',
      reason: 'Personal work',
      status: 'rejected',
      submittedDate: '2024-03-14'
    },
    {
      id: 4,
      studentName: 'Sarah Wilson',
      room: 'D-102',
      parentName: 'Michael Wilson',
      parentContact: '+91 9876543211',
      startDate: '2024-03-28',
      endDate: '2024-03-30',
      reason: 'Sister\'s wedding ceremony',
      status: 'pending',
      submittedDate: '2024-03-25'
    },
    {
      id: 5,
      studentName: 'Raj Patel',
      room: 'A-205',
      parentName: 'Amit Patel',
      parentContact: '+91 8876543212',
      startDate: '2024-04-01',
      endDate: '2024-04-03',
      reason: 'Religious festival at hometown',
      status: 'pending',
      submittedDate: '2024-03-26'
    },
    {
      id: 6,
      studentName: 'Emily Brown',
      room: 'C-404',
      parentName: 'David Brown',
      parentContact: '+91 7776543213',
      startDate: '2024-04-05',
      endDate: '2024-04-07',
      reason: 'Medical emergency - Dental surgery',
      status: 'pending',
      submittedDate: '2024-03-27'
    }
  ]);

  const statusOptions = [
    { 
      id: 'all', 
      label: 'All Requests', 
      color: 'from-gray-500 to-gray-600',
      icon: FileCheck2,
      bgColor: 'bg-gray-500',
      lightBg: 'bg-gray-50'
    },
    { 
      id: 'pending', 
      label: 'Pending', 
      color: 'from-yellow-500 to-yellow-600',
      icon: Clock3,
      bgColor: 'bg-yellow-500',
      lightBg: 'bg-yellow-50'
    },
    { 
      id: 'approved', 
      label: 'Approved', 
      color: 'from-green-500 to-green-600',
      icon: ClipboardCheck,
      bgColor: 'bg-green-500',
      lightBg: 'bg-green-50'
    },
    { 
      id: 'rejected', 
      label: 'Rejected', 
      color: 'from-red-500 to-red-600',
      icon: XCircle,
      bgColor: 'bg-red-500',
      lightBg: 'bg-red-50'
    }
  ];

  const handleApprove = (id) => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: 'approved' } : request
      )
    );
    setSelectedRequest(null);
  };

  const handleReject = (id) => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: 'rejected' } : request
      )
    );
    setSelectedRequest(null);
  };

  const filteredRequests = selectedStatus === 'all' 
    ? leaveRequests 
    : leaveRequests.filter(request => request.status === selectedStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'approved': return '✅';
      case 'rejected': return '❌';
      default: return '';
    }
  };

  // Calculate counts
  const getRequestCount = (status) => {
    return status === 'all' 
      ? leaveRequests.length 
      : leaveRequests.filter(r => r.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
              <div className="relative p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                      Leave Approvals
                    </h1>
                    <p className="text-xl text-gray-600">Manage student leave requests</p>
                  </div>
                  <div className="grid grid-cols-4 gap-4 w-full md:w-auto">
                    {statusOptions.map(status => (
                      <div 
                        key={status.id}
                        className={`${status.lightBg} rounded-2xl p-4 text-center transition-transform duration-300 hover:scale-105`}
                      >
                        <div className="flex flex-col items-center">
                          {React.createElement(status.icon, {
                            className: `w-6 h-6 mb-2 ${status.bgColor} text-white rounded-lg p-1`,
                          })}
                          <span className="text-2xl font-bold text-gray-900">
                            {getRequestCount(status.id)}
                          </span>
                          <span className="text-sm text-gray-600 whitespace-nowrap">
                            {status.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            </div>
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter by Status</h3>
          <div className="flex overflow-x-auto gap-3 pb-2">
            {statusOptions.map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                  selectedStatus === status.id
                    ? `bg-gradient-to-r ${status.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {React.createElement(status.icon, {
                  className: "w-5 h-5",
                  strokeWidth: 2
                })}
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Leave Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{request.studentName}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)} {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Room: {request.room}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {Math.ceil((new Date(request.endDate) - new Date(request.startDate)) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Leave Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Reason</h4>
                      <p className="text-gray-900">{request.reason}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h4 className="text-sm font-medium text-gray-500 mb-1">Parent Information</h4>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-900">{request.parentName}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-900">{request.parentContact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                  Submitted on: {new Date(request.submittedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaveApprovals; 