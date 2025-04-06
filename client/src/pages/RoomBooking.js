import React, { useState } from 'react';
import { Building2, Calendar, Users, Search, Filter, X, Check } from 'lucide-react';

function RoomBooking() {
  const [selectedFloor, setSelectedFloor] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Mock data - Replace with actual API data
  const totalFloors = 12;
  const roomsPerFloor = 20;
  
  const floors = Array.from({ length: totalFloors }, (_, i) => ({
    floor: i + 1,
    rooms: Array.from({ length: roomsPerFloor }, (_, j) => ({
      id: `${i + 1}-${j + 1}`,
      number: `${i + 1}${String(j + 1).padStart(2, '0')}`,
      type: j % 3 === 0 ? 'Single' : j % 3 === 1 ? 'Double' : 'Triple',
      totalBeds: j % 3 === 0 ? 1 : j % 3 === 1 ? 2 : 3,
      occupiedBeds: Math.floor(Math.random() * (j % 3 === 0 ? 2 : j % 3 === 1 ? 3 : 4)), // Random occupancy for demo
      restrictions: {
        years: j % 4 === 0 ? ['1st Year'] : 
               j % 4 === 1 ? ['2nd Year'] : 
               j % 4 === 2 ? ['3rd Year'] : ['4th Year']
      }
    }))
  }));

  const yearOptions = [
    { value: 'all', label: 'All Years' },
    { value: '1', label: '1st Year' },
    { value: '2', label: '2nd Year' },
    { value: '3', label: '3rd Year' },
    { value: '4', label: '4th Year' }
  ];

  const floorOptions = [
    { value: 'all', label: 'All Floors' },
    ...Array.from({ length: totalFloors }, (_, i) => ({
      value: String(i + 1),
      label: `Floor ${i + 1}`
    }))
  ];

  const getAvailableRoomsCount = (floor) => {
    return floor.rooms.filter(room => room.occupiedBeds < room.totalBeds).length;
  };

  const filteredFloors = floors.filter(floor => 
    selectedFloor === 'all' || floor.floor === parseInt(selectedFloor)
  );

  const getTotalAvailableRooms = () => {
    return floors.reduce((total, floor) => 
      total + floor.rooms.filter(room => room.occupiedBeds < room.totalBeds).length, 0
    );
  };

  const handleRoomClick = (room) => {
    if (room.occupiedBeds < room.totalBeds) {
      setSelectedRoom(room);
      setShowBookingModal(true);
    }
  };

  const handleBookRoom = (e) => {
    e.preventDefault();
    // Add API call to book room here
    setShowBookingModal(false);
    setSelectedRoom(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
              <div className="relative p-8">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Room Booking
                  </h1>
                  <p className="text-xl text-gray-600">Find and book your hostel room</p>
                </div>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by room number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              >
                {floorOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              >
                {yearOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Floors and Rooms Section */}
        <div className="space-y-8">
          {filteredFloors.map((floor) => (
            <div key={floor.floor} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Floor {floor.floor}</h2>
                    <p className="text-gray-600">{getAvailableRoomsCount(floor)} rooms available</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {floor.rooms
                    .filter(room => 
                      room.number.toLowerCase().includes(searchTerm.toLowerCase()) &&
                      (selectedYear === 'all' || room.restrictions.years.includes(`${selectedYear}${selectedYear === '1' ? 'st' : selectedYear === '2' ? 'nd' : selectedYear === '3' ? 'rd' : 'th'} Year`))
                    )
                    .map((room) => (
                      <div
                        key={room.id}
                        onClick={() => handleRoomClick(room)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          room.occupiedBeds < room.totalBeds
                            ? 'border-green-200 bg-green-50 cursor-pointer'
                            : 'border-red-200 bg-red-50 opacity-50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-lg font-semibold">Room {room.number}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            room.occupiedBeds < room.totalBeds
                              ? 'bg-green-200 text-green-800'
                              : 'bg-red-200 text-red-800'
                          }`}>
                            {room.occupiedBeds < room.totalBeds ? 'Available' : 'Full'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{room.type}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-600">
                            {room.totalBeds - room.occupiedBeds} of {room.totalBeds} beds available
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          For: {room.restrictions.years.join(', ')}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {showBookingModal && selectedRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Book Room {selectedRoom.number}
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleBookRoom} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Details</label>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p className="text-gray-600">Type: {selectedRoom.type}</p>
                    <p className="text-gray-600">Available Beds: {selectedRoom.totalBeds - selectedRoom.occupiedBeds} of {selectedRoom.totalBeds}</p>
                    <p className="text-gray-600">For: {selectedRoom.restrictions.years.join(', ')}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-in Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (in months)</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    required
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomBooking;