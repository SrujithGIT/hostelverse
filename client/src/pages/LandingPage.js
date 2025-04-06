import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, Users, Shield, Clock, 
  BookOpen, Coffee, Key, CheckCircle 
} from 'lucide-react';

function LandingPage() {
  const features = [
    { icon: Users, title: "Student Management", description: "Efficiently manage student records and accommodation" },
    { icon: Shield, title: "Security System", description: "Advanced leave management and entry tracking" },
    { icon: Coffee, title: "Mess Management", description: "Digital menu planning and feedback system" },
    { icon: Key, title: "Room Allocation", description: "Smart room booking and management" },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Content */}
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Building2 className="w-20 h-20 text-blue-600 animate-float" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in">
              Hostel
              <span className="text-blue-600">Verse</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up">
              Transform your hostel management with our comprehensive digital solution.
              <span className="block mt-2 text-blue-600 font-semibold">
                Smart · Efficient · Secure
              </span>
            </p>

            <div className="flex justify-center mb-16 animate-fade-in-up">
              <Link
                to="/login"
                className="px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
              >
                Get Started
                <Clock className="w-5 h-5 animate-spin-slow" />
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 