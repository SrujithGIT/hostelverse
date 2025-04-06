import React, { useState } from 'react';
import { Utensils, Plus, Edit2, Trash2, X, Check, ChevronRight, ChevronLeft, Star, Filter, Search } from 'lucide-react';

function MessManagement() {
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'feedback'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMeal, setFilterMeal] = useState('all');
  const [filterRating, setFilterRating] = useState('all');

  // Mock data - Replace with actual API data
  const [menuData, setMenuData] = useState({
    monday: {
      breakfast: ['Idli', 'Sambar', 'Coconut Chutney', 'Coffee'],
      lunch: ['Rice', 'Dal', 'Paneer Butter Masala', 'Roti', 'Salad'],
      snacks: ['Tea', 'Biscuits', 'Samosa'],
      dinner: ['Chapati', 'Mixed Vegetable Curry', 'Dal Tadka', 'Rice']
    },
    tuesday: {
      breakfast: ['Poha', 'Jalebi', 'Tea'],
      lunch: ['Jeera Rice', 'Rajma', 'Aloo Gobi', 'Roti'],
      snacks: ['Coffee', 'Pakora'],
      dinner: ['Rice', 'Dal Fry', 'Bhindi Masala', 'Roti']
    },
    // Add more days as needed
  });

  // Mock feedback data - Replace with actual API data
  const feedbacks = [
    {
      id: 1,
      studentName: 'John Smith',
      meal: 'Breakfast',
      rating: 4,
      comment: 'The eggs were perfectly cooked today!',
      date: '2024-03-05',
      time: '08:30 AM'
    },
    {
      id: 2,
      studentName: 'Emma Wilson',
      meal: 'Lunch',
      rating: 3,
      comment: 'Rice was a bit undercooked, but curry was good',
      date: '2024-03-05',
      time: '12:45 PM'
    },
    {
      id: 3,
      studentName: 'Raj Patel',
      meal: 'Dinner',
      rating: 5,
      comment: 'Excellent paneer curry and fresh chapati',
      date: '2024-03-04',
      time: '08:15 PM'
    }
  ];

  const days = [
    { id: 'monday', label: 'Monday', color: 'from-blue-500 to-blue-600' },
    { id: 'tuesday', label: 'Tuesday', color: 'from-purple-500 to-purple-600' },
    { id: 'wednesday', label: 'Wednesday', color: 'from-green-500 to-green-600' },
    { id: 'thursday', label: 'Thursday', color: 'from-yellow-500 to-yellow-600' },
    { id: 'friday', label: 'Friday', color: 'from-red-500 to-red-600' },
    { id: 'saturday', label: 'Saturday', color: 'from-pink-500 to-pink-600' },
    { id: 'sunday', label: 'Sunday', color: 'from-indigo-500 to-indigo-600' }
  ];

  const mealTypes = [
    { id: 'breakfast', label: 'Breakfast', color: 'from-orange-500 to-orange-600', icon: '🌅' },
    { id: 'lunch', label: 'Lunch', color: 'from-green-500 to-green-600', icon: '🍽️' },
    { id: 'snacks', label: 'Snacks', color: 'from-yellow-500 to-yellow-600', icon: '☕' },
    { id: 'dinner', label: 'Dinner', color: 'from-blue-500 to-blue-600', icon: '🌙' }
  ];

  const mealOptions = [
    { value: 'all', label: 'All Meals' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snacks', label: 'Snacks' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const handleAddItem = () => {
    if (newItem.trim()) {
      setMenuData(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [selectedMeal]: [...(prev[selectedDay]?.[selectedMeal] || []), newItem.trim()]
        }
      }));
      setNewItem('');
      setShowAddModal(false);
    }
  };

  const handleDeleteItem = (item) => {
    setMenuData(prev => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedMeal]: prev[selectedDay][selectedMeal].filter(i => i !== item)
      }
    }));
    setShowDeleteConfirm(null);
  };

  const handleEditItem = () => {
    setIsEditing(!isEditing);
  };

  const filteredFeedbacks = feedbacks
    .filter(feedback => 
      filterMeal === 'all' ? true : feedback.meal.toLowerCase() === filterMeal
    )
    .filter(feedback =>
      filterRating === 'all' ? true : feedback.rating === parseInt(filterRating)
    )
    .filter(feedback =>
      feedback.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getAverageRating = (mealType) => {
    const mealFeedbacks = feedbacks.filter(f => f.meal.toLowerCase() === mealType);
    if (mealFeedbacks.length === 0) return 0;
    const sum = mealFeedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / mealFeedbacks.length).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mess Management
            </h1>
            <p className="mt-2 text-gray-600 text-lg">Manage menu and view student feedback</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'menu'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Utensils className="w-5 h-5" />
              Menu Management
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'feedback'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Star className="w-5 h-5" />
              View Feedback
            </button>
          </div>
        </div>

        {activeTab === 'menu' ? (
          <>
            {/* Days Selection */}
            <div className="mb-8 bg-white p-4 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Day</h3>
              <div className="flex overflow-x-auto gap-3 pb-2">
                {days.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                      selectedDay === day.id
                        ? `bg-gradient-to-r ${day.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Meal Type Selection */}
            <div className="mb-8 bg-white p-4 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Meal</h3>
              <div className="flex overflow-x-auto gap-3 pb-2">
                {mealTypes.map((meal) => (
                  <button
                    key={meal.id}
                    onClick={() => setSelectedMeal(meal.id)}
                    className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
                      selectedMeal === meal.id
                        ? `bg-gradient-to-r ${meal.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{meal.icon}</span>
                    {meal.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {days.find(d => d.id === selectedDay)?.label}'s {mealTypes.find(m => m.id === selectedMeal)?.label}
                  </h2>
                  {isEditing && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      <Plus className="w-5 h-5" />
                      Add Item
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {menuData[selectedDay]?.[selectedMeal]?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <span className="text-gray-700 text-lg">{item}</span>
                      {isEditing && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowDeleteConfirm(item)}
                            className="p-2 text-red-500 hover:text-red-600 transition-colors duration-300"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {/* Search and Filter Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by student name or feedback..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Filter className="w-6 h-6 text-gray-400" />
                  <select
                    value={filterMeal}
                    onChange={(e) => setFilterMeal(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {mealOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    {ratingOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Feedback List */}
            <div className="space-y-6">
              {filteredFeedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold text-gray-900">
                            {feedback.studentName}
                          </h2>
                          <span className="px-4 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                            {feedback.meal}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {Array.from({ length: feedback.rating }).map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-gray-600">
                            {new Date(feedback.date).toLocaleDateString()} at {feedback.time}
                          </span>
                        </div>
                        <p className="text-gray-700">{feedback.comment}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Add New Item
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Enter item name"
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              />
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Confirm Delete
                </h3>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                Are you sure you want to delete "{showDeleteConfirm}"?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteItem(showDeleteConfirm)}
                  className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessManagement; 