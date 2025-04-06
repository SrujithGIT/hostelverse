import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
  const [isLoading, setIsLoading] = useState(false);

  // Function to get role from email domain
  const getRoleFromEmail = (email) => {
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.includes('student')) return 'student';
    if (lowerEmail.includes('warden')) return 'warden';
    if (lowerEmail.includes('watchman')) return 'watchman';
    return 'student'; // default role
  };

  // Update email and auto-suggest role based on email
  const handleEmailChange = (e) => {
    const email = e.target.value;
    const suggestedRole = getRoleFromEmail(email);
    setFormData({ ...formData, email, role: suggestedRole });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Send login request to the server
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Unable to connect to server. Please try again later.');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (!data.user) {
        throw new Error('User not found. Please register or check your credentials.');
      }

      const { role, fullName, email, _id, room, contactNo } = data.user;

      if (!role) {
        throw new Error('User role not specified. Please contact support.');
      }

      // Save user data and update auth context
      const userData = { 
        _id,
        fullName,
        email,
        role: role.toLowerCase(),
        room,
        contactNo
      };
      login(userData);
      localStorage.setItem('user', JSON.stringify(userData));

      // Navigate to the dashboard based on the user's role
      let targetRoute = '';
      switch (role.toLowerCase()) {
        case 'student':
          targetRoute = '/student/dashboard';
          break;
        case 'warden':
          targetRoute = '/warden/dashboard';
          break;
        case 'watchman':
          targetRoute = '/watchman/dashboard';
          break;
        default:
          throw new Error('Unexpected role encountered.');
      }

      navigate(targetRoute, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Login to Your Account</h2>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span>{successMessage}</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Login As
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="student">Student</option>
              <option value="warden">Warden</option>
              <option value="watchman">Watchman</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <span className="inline-flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <span className="inline-flex items-center">
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Don't have an account?</p>
          <Link
            to="/register"
            className="mt-2 inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Create New Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
