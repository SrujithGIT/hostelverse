import React, { useState, useEffect } from 'react';

function ComplaintsManagement() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://hostelverse-server.vercel.app/api/complaints');
      if (!response.ok) {
        throw new Error('Failed to fetch complaints');
      }
      const data = await response.json();
      setComplaints(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      setLoading(true);
      const response = await fetch(`https://hostelverse-server.vercel.app/api/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Refresh the complaints list
      await fetchComplaints();
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Complaints</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading complaints...</div>
      ) : (
        <div className="space-y-4">
          {complaints && complaints.length > 0 ? (
            complaints.map(complaint => (
              <div key={complaint._id} className="border p-4 rounded shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-lg">{complaint.title}</h2>
                    <p className="text-gray-600 mt-1">{complaint.description}</p>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Student ID: {complaint.studentId}</p>
                      <p>Date: {new Date(complaint.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <select
                      value={complaint.status}
                      onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No complaints found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ComplaintsManagement;
