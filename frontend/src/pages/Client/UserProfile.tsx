import React, { useState } from 'react';
import { Button } from '../../components/ui';

const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '+94 7639524043',
    gender: '',
    country: '',
    language: '',
    email: 'serena@gmail.com'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-1">Welcome, Serena</h1>
          <p className="text-gray-500">{getCurrentDate()}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img 
              src="/src/assets/images/avatar.jpg" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Manage Account Section */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Purple Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4">
          <h2 className="text-2xl font-semibold text-white">Manage Account</h2>
        </div>

        {/* Profile Card */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                <img 
                  src="/src/assets/images/avatar.jpg" 
                  alt="Serina Williams" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Serina Williams</h3>
                <p className="text-gray-600">serena@gmail.com</p>
              </div>
            </div>
            <Button variant="rounded" className="bg-purple-500 hover:bg-purple-600">
              Edit
            </Button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Your Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile number (Local)</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 text-gray-400"
              >
                <option value="">Your Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 text-gray-400"
              >
                <option value="">Your Country</option>
                <option value="sri-lanka">Sri Lanka</option>
                <option value="india">India</option>
                <option value="usa">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="canada">Canada</option>
                <option value="australia">Australia</option>
              </select>
            </div>

            {/* Language */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 text-gray-400"
              >
                <option value="">Your Primary Language</option>
                <option value="english">English</option>
                <option value="sinhala">Sinhala</option>
                <option value="tamil">Tamil</option>
                <option value="hindi">Hindi</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
              </select>
            </div>
          </div>

          {/* Email Address Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">My email Address</h4>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{formData.email}</p>
                <p className="text-gray-500 text-sm">1 month ago</p>
              </div>
            </div>
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
              + Add Email Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;