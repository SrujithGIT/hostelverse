import React, { useState } from 'react';
import { Calendar, DollarSign, Clock, User, Phone, AlertTriangle, Building, CreditCard, ArrowUpRight, Filter, Search } from 'lucide-react';

function FeeDefaulters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDays, setFilterDays] = useState('all');

  // Mock data - Replace with actual API data
  const defaulters = [
    {
      id: 1,
      studentName: 'John Smith',
      roomNumber: 'A-101',
      parentName: 'Michael Smith',
      parentContact: '+91 9876543210',
      dueAmount: 25000,
      daysOverdue: 15,
      lastPaymentDate: '2024-02-15',
      lastPaymentAmount: 15000,
      totalFee: 40000,
      semester: '4th Semester',
      course: 'B.Tech Computer Science',
      status: 'first_notice'
    },
    {
      id: 2,
      studentName: 'Emma Wilson',
      roomNumber: 'B-205',
      parentName: 'Robert Wilson',
      parentContact: '+91 8765432109',
      dueAmount: 35000,
      daysOverdue: 30,
      lastPaymentDate: '2024-01-30',
      lastPaymentAmount: 10000,
      totalFee: 45000,
      semester: '6th Semester',
      course: 'B.Tech Electronics',
      status: 'second_notice'
    },
    {
      id: 3,
      studentName: 'Raj Patel',
      roomNumber: 'C-303',
      parentName: 'Amit Patel',
      parentContact: '+91 7654321098',
      dueAmount: 40000,
      daysOverdue: 45,
      lastPaymentDate: '2024-01-15',
      lastPaymentAmount: 5000,
      totalFee: 45000,
      semester: '2nd Semester',
      course: 'B.Tech Mechanical',
      status: 'final_notice'
    }
  ];

  const getStatusInfo = (status, daysOverdue) => {
    switch (status) {
      case 'first_notice':
        return {
          label: 'First Notice',
          color: 'from-yellow-500 to-yellow-600',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-700',
          borderColor: 'border-yellow-200'
        };
      case 'second_notice':
        return {
          label: 'Second Notice',
          color: 'from-orange-500 to-orange-600',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700',
          borderColor: 'border-orange-200'
        };
      case 'final_notice':
        return {
          label: 'Final Notice',
          color: 'from-red-500 to-red-600',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200'
        };
      default:
        return {
          label: 'Pending',
          color: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200'
        };
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Defaulters' },
    { value: '15', label: '15+ Days' },
    { value: '30', label: '30+ Days' },
    { value: '45', label: '45+ Days' }
  ];

  const filteredDefaulters = defaulters
    .filter(defaulter => 
      filterDays === 'all' ? true : defaulter.daysOverdue >= parseInt(filterDays)
    )
    .filter(defaulter =>
      defaulter.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      defaulter.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-orange-600/10"></div>
              <div className="relative p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div>
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-3">
                      Fee Defaulters
                    </h1>
                    <p className="text-xl text-gray-600">Track and manage student fee dues</p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
                    <div className="bg-red-50 rounded-2xl p-4 text-center">
                      <CreditCard className="w-6 h-6 text-red-500 mx-auto mb-2" />
                      <span className="text-2xl font-bold text-gray-900">
                        {defaulters.length}
                      </span>
                      <span className="text-sm text-gray-600 block">Total Defaulters</span>
                    </div>
                    <div className="bg-orange-50 rounded-2xl p-4 text-center">
                      <AlertTriangle className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                      <span className="text-2xl font-bold text-gray-900">
                        {defaulters.filter(d => d.status === 'final_notice').length}
                      </span>
                      <span className="text-sm text-gray-600 block">Critical Cases</span>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-4 text-center">
                      <CreditCard className="w-6 h-6 text-green-500 mx-auto mb-2" />
                      <span className="text-2xl font-bold text-gray-900">
                        ₹{defaulters.reduce((sum, d) => sum + d.dueAmount, 0).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600 block">Total Due</span>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-4 text-center">
                      <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                      <span className="text-2xl font-bold text-gray-900">
                        {Math.max(...defaulters.map(d => d.daysOverdue))}
                      </span>
                      <span className="text-sm text-gray-600 block">Max Days Due</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-red-600 to-orange-600"></div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by student name or room number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Filter className="w-6 h-6 text-gray-400" />
              <select
                value={filterDays}
                onChange={(e) => setFilterDays(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Defaulters List */}
        <div className="space-y-6">
          {filteredDefaulters.map((defaulter) => {
            const statusInfo = getStatusInfo(defaulter.status);
            return (
              <div
                key={defaulter.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          {defaulter.studentName}
                        </h2>
                        <span className={`px-4 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{defaulter.roomNumber}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{defaulter.semester}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{defaulter.daysOverdue} days overdue</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">₹{defaulter.dueAmount.toLocaleString()} due</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className={`p-4 rounded-xl border ${statusInfo.borderColor} ${statusInfo.bgColor}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Fee:</span>
                          <span className="font-medium">₹{defaulter.totalFee.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Payment:</span>
                          <span className="font-medium">₹{defaulter.lastPaymentAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Payment Date:</span>
                          <span className="font-medium">{new Date(defaulter.lastPaymentDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border ${statusInfo.borderColor} ${statusInfo.bgColor}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Parent Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{defaulter.parentName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{defaulter.parentContact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{defaulter.course}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${statusInfo.color}`}
                        style={{ width: `${(defaulter.lastPaymentAmount / defaulter.totalFee) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-500">Payment Progress</span>
                      <span className="text-sm font-medium text-gray-700">
                        {Math.round((defaulter.lastPaymentAmount / defaulter.totalFee) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FeeDefaulters; 