import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RoomBooking from './pages/RoomBooking';
import Complaints from './pages/Complaints';
import FeePayment from './pages/FeePayment';
import MessMenu from './pages/MessMenu';
import Tracking from './pages/Tracking';
import DashboardLayout from './components/DashboardLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import LeaveRequest from './pages/student/LeaveRequest';
import WardenDashboard from './pages/warden/WardenDashboard';
import MessManagement from './pages/warden/MessManagement';
import LeaveApprovals from './pages/warden/LeaveApprovals';
import ComplaintsManagement from './pages/warden/ComplaintsManagement';
import AttendanceManagement from './pages/warden/AttendanceManagement';
import FeeDefaulters from './pages/warden/FeeDefaulters';
import ScanLeavePass from './pages/watchman/ScanLeavePass';
import VerificationHistory from './pages/watchman/VerificationHistory';
import WatchmanDashboard from './pages/watchman/WatchmanDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard if user tries to access unauthorized route
    switch(user.role) {
      case 'student':
        return <Navigate to="/student/dashboard" />;
      case 'warden':
        return <Navigate to="/warden/dashboard" />;
      case 'watchman':
        return <Navigate to="/watchman/dashboard" />;
      default:
        return <Navigate to="/login" />;
    }
  }

  return children;
};

function App() {
  const { user } = useAuth();
  console.log('Current user in App:', user); // Debug log

  // Redirect authenticated users from root to their dashboard
  const RootRedirect = () => {
    console.log('RootRedirect - Current user:', user); // Debug log
    if (!user) return <LandingPage />;
    
    const dashboardRoutes = {
      student: '/student/dashboard',
      warden: '/warden/dashboard',
      watchman: '/watchman/dashboard'
    };

    const route = dashboardRoutes[user.role] || '/login';
    console.log('RootRedirect - Navigating to:', route); // Debug log
    return <Navigate to={route} replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route path="/student/*" element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="room-booking" element={<RoomBooking />} />
                <Route path="complaints" element={<Complaints />} />
                <Route path="fee-payment" element={<FeePayment />} />
                <Route path="mess-menu" element={<MessMenu />} />
                <Route path="leave-request" element={<LeaveRequest />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Warden Routes */}
        <Route path="/warden/*" element={
          <ProtectedRoute allowedRoles={['warden']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<WardenDashboard />} />
                <Route path="attendance" element={<AttendanceManagement />} />
                <Route path="complaints" element={<ComplaintsManagement />} />
                <Route path="mess" element={<MessManagement />} />
                <Route path="leave-approvals" element={<LeaveApprovals />} />
                <Route path="fee-defaulters" element={<FeeDefaulters />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Watchman Routes */}
        <Route path="/watchman/*" element={
          <ProtectedRoute allowedRoles={['watchman']}>
            <DashboardLayout>
              <Routes>
                <Route path="dashboard" element={<WatchmanDashboard />} />
                <Route path="scan" element={<ScanLeavePass />} />
                <Route path="history" element={<VerificationHistory />} />
              </Routes>
            </DashboardLayout>
          </ProtectedRoute>
        } />

        {/* Catch all route - redirect to appropriate dashboard or login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
