import React, { useState } from 'react';
import { Users, CheckCircle2, Calendar, School, GraduationCap, UserCheck, CalendarRange } from 'lucide-react';

function AttendanceManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Mock data - Replace with actual API data
  const attendanceData = {
    totalStudents: 150,
    onLeave: 10,
    get present() {
      return this.totalStudents - this.onLeave;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <School className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
              <p className="mt-1 text-gray-600">Monitor and manage student attendance records</p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <CalendarRange className="w-5 h-5 text-blue-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-0 bg-transparent focus:outline-none focus:ring-0 text-gray-700"
            />
          </div>
        </div>

        {/* Statistics Cards - Vertical Layout */}
        <div className="space-y-6">
          {/* Total Students Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-gray-600 mb-1">Total Students</p>
                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-bold text-gray-900">{attendanceData.totalStudents}</p>
                    <p className="text-gray-500 mb-1">students</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Present Students Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-gray-600 mb-1">Present Today</p>
                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-bold text-gray-900">{attendanceData.present}</p>
                    <p className="text-gray-500 mb-1">students</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300"
                    style={{ width: `${(attendanceData.present / attendanceData.totalStudents) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round((attendanceData.present / attendanceData.totalStudents) * 100)}% of total students
                </p>
              </div>
            </div>
          </div>

          {/* On Leave Card */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-medium text-gray-600 mb-1">On Leave</p>
                  <div className="flex items-end gap-2">
                    <p className="text-4xl font-bold text-gray-900">{attendanceData.onLeave}</p>
                    <p className="text-gray-500 mb-1">students</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-300"
                    style={{ width: `${(attendanceData.onLeave / attendanceData.totalStudents) * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {Math.round((attendanceData.onLeave / attendanceData.totalStudents) * 100)}% of total students
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceManagement; 