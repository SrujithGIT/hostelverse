import React, { useState, useEffect } from 'react';
import { 
  Utensils, Star, MessageSquare, Clock, Coffee, 
  Sun, Moon, ChevronRight, Send, ThumbsUp, ThumbsDown,
  History, Filter
} from 'lucide-react';

function MessMenu() {
  const [selectedMeal, setSelectedMeal] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [nextMeal, setNextMeal] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showHistory, setShowHistory] = useState(false);
  const [feedbackHistory, setFeedbackHistory] = useState([
    {
      id: 1,
      meal: 'breakfast',
      date: '2024-03-10',
      rating: 4,
      comment: 'The Masala Dosa was excellent today!',
    },
    {
      id: 2,
      meal: 'lunch',
      date: '2024-03-09',
      rating: 3,
      comment: 'Rice was a bit undercooked, but the curry was good.',
    },
    {
      id: 3,
      meal: 'dinner',
      date: '2024-03-09',
      rating: 5,
      comment: 'Loved the Paneer Butter Masala!',
    }
  ]);

  // Mock data for today's menu
  const todayMenu = {
    breakfast: {
      time: '7:30 AM - 9:30 AM',
      items: [
        { name: 'Masala Dosa', isVeg: true },
        { name: 'Sambar', isVeg: true },
        { name: 'Coconut Chutney', isVeg: true },
        { name: 'Boiled Eggs', isVeg: false },
        { name: 'Tea/Coffee', isVeg: true }
      ]
    },
    lunch: {
      time: '12:30 PM - 2:30 PM',
      items: [
        { name: 'Jeera Rice', isVeg: true },
        { name: 'Dal Tadka', isVeg: true },
        { name: 'Mixed Veg Curry', isVeg: true },
        { name: 'Chicken Curry', isVeg: false },
        { name: 'Roti', isVeg: true },
        { name: 'Curd', isVeg: true }
      ]
    },
    dinner: {
      time: '7:30 PM - 9:30 PM',
      items: [
        { name: 'Plain Rice', isVeg: true },
        { name: 'Dal Fry', isVeg: true },
        { name: 'Paneer Butter Masala', isVeg: true },
        { name: 'Fish Curry', isVeg: false },
        { name: 'Roti', isVeg: true },
        { name: 'Sweet', isVeg: true }
      ]
    }
  };

  // Function to determine next meal based on current time
  useEffect(() => {
    const updateNextMeal = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = hours + minutes / 60;

      if (time < 9.5) { // Before 9:30 AM
        setNextMeal('breakfast');
      } else if (time < 14.5) { // Before 2:30 PM
        setNextMeal('lunch');
      } else if (time < 21.5) { // Before 9:30 PM
        setNextMeal('dinner');
      } else {
        setNextMeal('breakfast'); // After 9:30 PM, next meal is tomorrow's breakfast
      }
    };

    updateNextMeal();
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      updateNextMeal();
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getMealIcon = (meal) => {
    switch (meal) {
      case 'breakfast':
        return <Coffee className="w-6 h-6" />;
      case 'lunch':
        return <Sun className="w-6 h-6" />;
      case 'dinner':
        return <Moon className="w-6 h-6" />;
      default:
        return <Utensils className="w-6 h-6" />;
    }
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    // Create new feedback object
    const newFeedback = {
      id: Date.now(),
      meal: selectedMeal,
      date: new Date().toISOString().split('T')[0],
      rating,
      comment
    };

    // Add to feedback history
    setFeedbackHistory(prev => [newFeedback, ...prev]);
    
    // Reset form
    setRating(0);
    setComment('');
    setSelectedMeal('');
    alert('Thank you for your feedback!');
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className="w-4 h-4"
            fill={star <= rating ? 'currentColor' : 'none'}
            color={star <= rating ? '#F59E0B' : '#D1D5DB'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-yellow-600/10"></div>
            <div className="relative p-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                    Today's Mess Menu
                  </h1>
                  <p className="text-lg text-gray-600">View menu and provide feedback</p>
                </div>
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                    showHistory 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  <History className="w-5 h-5" />
                  {showHistory ? 'Show Menu' : 'View History'}
                </button>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-orange-600 to-yellow-600"></div>
          </div>
        </div>

        {showHistory ? (
          // Feedback History Section
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                <History className="w-6 h-6 text-orange-500" />
                Your Feedback History
              </h2>
            </div>
            <div className="space-y-4">
              {feedbackHistory.map((feedback) => (
                <div
                  key={feedback.id}
                  className="border-2 border-gray-100 rounded-xl p-4 hover:border-orange-100 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 capitalize mb-1">{feedback.meal}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {new Date(feedback.date).toLocaleDateString()}
                      </div>
                    </div>
                    {renderStars(feedback.rating)}
                  </div>
                  {feedback.comment && (
                    <p className="mt-2 text-gray-600">{feedback.comment}</p>
                  )}
                </div>
              ))}
              {feedbackHistory.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No feedback submitted yet</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Menu and Feedback Form
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {Object.entries(todayMenu).map(([meal, details]) => (
                <div 
                  key={meal}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ${
                    nextMeal === meal ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${
                          nextMeal === meal ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {getMealIcon(meal)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 capitalize">{meal}</h3>
                          <p className="text-sm text-gray-500">{details.time}</p>
                        </div>
                      </div>
                      {nextMeal === meal && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-medium">
                          Next Meal
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      {details.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setSelectedMeal(meal)}
                      className="mt-4 w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Give Feedback
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Feedback Form */}
            {selectedMeal && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-orange-500" />
                  Feedback for {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}
                </h2>
                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex gap-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-2 rounded-lg transition-all ${
                            rating >= star ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        >
                          <Star className="w-8 h-8" fill={rating >= star ? 'currentColor' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all outline-none"
                      placeholder="Share your thoughts about the meal..."
                    ></textarea>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Submit Feedback
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMeal('')}
                      className="px-4 py-2 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MessMenu;