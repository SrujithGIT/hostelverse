import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, Calendar, ClipboardCheck, CreditCard, 
  MessageSquare, Utensils, Users, LogOut, 
  LayoutDashboard, FileText, Bell, QrCode,
  Clock, Settings
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Define role-specific menu items
  const roleMenuItems = {
    student: [
      { icon: LayoutDashboard, title: "Dashboard", path: "/student/dashboard" },
      { icon: Building2, title: "Room Booking", path: "/student/room-booking" },
      { icon: MessageSquare, title: "Complaints", path: "/student/complaints" },
      { icon: CreditCard, title: "Fee Payment", path: "/student/fee-payment" },
      { icon: Utensils, title: "Mess Menu", path: "/student/mess-menu" },
      { icon: FileText, title: "Leave Request", path: "/student/leave-request" },
    ],
    warden: [
      { icon: LayoutDashboard, title: "Dashboard", path: "/warden/dashboard" },
      { icon: Calendar, title: "Attendance Management", path: "/warden/attendance" },
      { icon: MessageSquare, title: "Complaints Management", path: "/warden/complaints" },
      { icon: Utensils, title: "Mess Management", path: "/warden/mess" },
      { icon: FileText, title: "Leave Approvals", path: "/warden/leave-approvals" },
      { icon: CreditCard, title: "Fee Defaulters", path: "/warden/fee-defaulters" },
    ],
    watchman: [
      { icon: LayoutDashboard, title: "Dashboard", path: "/watchman/dashboard" },
      { icon: QrCode, title: "Scan Leave Pass", path: "/watchman/scan" },
      { icon: Clock, title: "Verification History", path: "/watchman/history" },
    ]
  };

  // Get menu items based on user role
  const menuItems = roleMenuItems[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link to={`/${user?.role}/dashboard`} className="flex items-center">
              <Building2 className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">HostelVerse</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.fullName?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <div className="font-semibold">{user?.fullName}</div>
                <div className="text-sm text-gray-600 capitalize">{user?.role}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-red-600 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout; 