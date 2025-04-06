import React from 'react';
import { CreditCard, DollarSign, Receipt, AlertCircle } from 'lucide-react';

function FeePayment() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Fee Payment</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <DollarSign className="w-6 h-6 text-green-600 mr-3" />
            <h3 className="text-lg font-semibold">Total Due</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">₹1,00,000</p>
          <p className="text-gray-600">Current semester</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Receipt className="w-6 h-6 text-blue-600 mr-3" />
            <h3 className="text-lg font-semibold">Last Payment</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">₹15,000</p>
          <p className="text-gray-600">Feb 15, 2024</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-semibold">Due Date</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">Mar 15</p>
          <p className="text-gray-600">10 days remaining</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Make Payment</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input 
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input 
                  type="text"
                  placeholder="**** **** **** ****"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input 
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input 
                type="text"
                placeholder="***"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Pay Now
            </button>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <div className="space-y-4">
            {[
              {
                amount: 800,
                date: '2024-02-15',
                method: 'Credit Card',
                status: 'Completed',
                statusColor: 'text-green-600'
              },
              {
                amount: 500,
                date: '2024-01-10',
                method: 'Bank Transfer',
                status: 'Completed',
                statusColor: 'text-green-600'
              },
              {
                amount: 1000,
                date: '2023-12-05',
                method: 'Debit Card',
                status: 'Completed',
                statusColor: 'text-green-600'
              }
            ].map((payment, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">₹{payment.amount}</h3>
                    <p className="text-sm text-gray-600">{payment.method}</p>
                  </div>
                  <span className={`font-semibold ${payment.statusColor}`}>
                    {payment.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{payment.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeePayment;