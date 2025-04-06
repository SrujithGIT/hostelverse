import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Clock, Send, Search, Filter, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Complaints() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [studentId, setStudentId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch complaints on component mount
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('https://hostelverse-server.vercel.app/api/complaints/student/' + studentId);
      if (!response.ok) {
        throw new Error('Failed to fetch complaints');
      }
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching complaints:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'resolved':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !description || !studentId) {
      setError('Title, description, and studentId are required');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const complaintData = {
        title,
        description,
        studentId
      };

      console.log('Submitting complaint:', complaintData);

      const response = await fetch('https://hostelverse-server.vercel.app/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(complaintData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to submit complaint');
      }
      
      // Reset form
      setTitle('');
      setDescription('');
      setStudentId('');

      // Show success message
      alert('Complaint submitted successfully!');
      
      // Refresh complaints list
      await fetchComplaints();
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to submit complaint. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredComplaints = complaints
    .filter(complaint => filterStatus === 'all' || complaint.status === filterStatus)
    .filter(complaint => 
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
          <div className="relative p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Complaints & Maintenance
            </h1>
            <p className="text-lg text-gray-600">Submit and track your maintenance requests</p>
          </div>
          <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Submit Complaint Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Submit New Complaint</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                required
                disabled={isLoading}
              >
                <option value="">Select a title</option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Furniture">Furniture</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Enter your student ID"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Please describe the issue in detail..."
                required
                disabled={isLoading}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Complaint
                </>
              )}
            </button>
          </form>
        </div>

        {/* Complaints List */}
        <div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Complaints</h2>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Complaints List */}
            <div className="space-y-4">
              {filteredComplaints.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No complaints found
                </div>
              ) : (
                filteredComplaints.map((complaint) => (
                  <div
                    key={complaint._id}
                    className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-100 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{complaint.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{complaint.description}</p>
                      </div>
                      <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                        {getStatusIcon(complaint.status)}
                        {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1)}
                      </span>
                    </div>
                    {complaint.wardenResponse && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600">{complaint.wardenResponse}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                      <span>Submitted on {new Date(complaint.date).toLocaleDateString()}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Complaints;
