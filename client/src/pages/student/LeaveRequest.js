import React, { useState } from 'react';
import { Calendar, Clock, FileText, Send, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

function LeaveRequest() {
  const [formData, setFormData] = useState({
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
    parentContact: '',
    parentName: '',
  });

  const [leaveHistory, setLeaveHistory] = useState([
    {
      id: 1,
      leaveType: 'Medical Leave',
      fromDate: '2024-03-15',
      toDate: '2024-03-18',
      reason: 'Dental surgery appointment',
      status: 'approved',
      parentName: 'John Doe',
      parentContact: '+91 9876543210',
      appliedOn: '2024-03-10'
    },
    {
      id: 2,
      leaveType: 'Personal Leave',
      fromDate: '2024-03-20',
      toDate: '2024-03-22',
      reason: 'Sister\'s wedding ceremony',
      status: 'pending',
      parentName: 'John Doe',
      parentContact: '+91 9876543210',
      appliedOn: '2024-03-18'
    },
    {
      id: 3,
      leaveType: 'Academic Leave',
      fromDate: '2024-03-05',
      toDate: '2024-03-07',
      reason: 'Attending technical conference',
      status: 'rejected',
      parentName: 'John Doe',
      parentContact: '+91 9876543210',
      appliedOn: '2024-03-01'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new leave request object
    const newLeaveRequest = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0]
    };

    // Add to leave history
    setLeaveHistory(prev => [newLeaveRequest, ...prev]);

    // Reset form
    setFormData({
      leaveType: '',
      fromDate: '',
      toDate: '',
      reason: '',
      parentContact: '',
      parentName: '',
    });

    // Show success message
    alert('Leave request submitted successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'rejected':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Leave Request</h1>
              <p className="text-gray-600">Submit new leave request and view history</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leave Request Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Submit Leave Request</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
                <select
                  name="leaveType"
                  value={formData.leaveType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">Select leave type</option>
                  <option value="Medical Leave">Medical Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Academic Leave">Academic Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent's Name</label>
                <input
                  type="text"
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter parent's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent's Contact</label>
                <input
                  type="tel"
                  name="parentContact"
                  value={formData.parentContact}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter parent's contact number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Leave</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter reason for leave"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Request
              </button>
            </form>
          </div>

          {/* Leave History */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Leave History</h2>
            <div className="space-y-4">
              {leaveHistory.map((leave) => (
                <div
                  key={leave.id}
                  className="border-2 border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{leave.leaveType}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(leave.status)}`}>
                      {getStatusIcon(leave.status)}
                      {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{leave.reason}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Applied on {new Date(leave.appliedOn).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveRequest; 