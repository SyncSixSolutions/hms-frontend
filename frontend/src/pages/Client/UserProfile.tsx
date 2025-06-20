import React, { useState } from 'react';
import { Button } from '../../components/ui';
import { Search, CreditCard, Wallet } from 'lucide-react';

const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '+94 71 123 5174',
    gender: '',
    country: '',
    language: '',
    email: 'danidaniels@gmail.com'
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
    <div className="min-h-screen bg-gray-50 p-6"> {/* Minimal padding */}
      {/* Main container with wider width to minimize edge distance */}
      <div className="max-w-[95%] mx-auto">
        {/* Header - now aligned with card below */}
        <div className="flex justify-between items-center mb-3"> {/* Reduced margin */}
          <div>
            <h1 className="text-2xl font-normal text-gray-500">Welcome, Serena</h1>
            <p className="text-sm text-gray-500 mt-1">{getCurrentDate()}</p>
          </div>
          <div className="flex items-center space-x-3"> {/* Reduced spacing */}
            {/* Search Bar */}
            <div className="relative bg-white rounded-full shadow-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-3 py-2 w-56 rounded-full bg-white text-gray-600 text-sm border-none focus:outline-none focus:ring-1 focus:ring-gray-200"
              />
            </div>
            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-sm">
              <img
                src="/src/assets/images/avatar.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>      

        {/* Manage Account Section - same alignment as header */}
        <div className="rounded-lg overflow-hidden">
          {/* My Dashboard Header */}
          <div className="rounded-t-lg p-2 bg-[#6B72D6]"> {/* Reduced padding */}
            <h2 className="text-xl font-bold text-white ml-1">Manage Account</h2> {/* Added small left margin */}
          </div>

          {/* Profile Card */}
          <div className="p-2 bg-white rounded-b-lg"> {/* Further reduced padding */}
            <div className="flex items-center justify-between mb-4"> {/* Reduced margin */}
              <div className="flex items-center gap-2"> {/* Reduced gap */}
                <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden"> {/* Reduced size */}
                  <img 
                    src="/src/assets/images/avatar.jpg" 
                    alt="Serina Williams" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Dani daniels</h3>
                  <p className="text-gray-600">dani@gmail.com</p>
                </div>
              </div>
              <button className="bg-[#6B72D6] text-white font-medium px-4 py-1 rounded text-lg focus:outline-none transition-colors hover:bg-[#5a60b8]">
                  Edit
              </button>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3"> {/* Further reduced gap and margin */}
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>              
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 bg-gray-50"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Mobile number (Local)</label>              
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 bg-gray-50"
                />
              </div>            
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>              
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full pl-2 pr-8 py-2 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 bg-gray-50 text-gray-400"
                >
                  <option value="">Your Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>            
              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Country</label>              
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full pl-2 pr-8 py-2 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 bg-gray-50 text-gray-400"
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
                <label className="block text-sm font-medium text-gray-500 mb-1">Language</label>              
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full pl-2 pr-8 py-2 border-0 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 bg-gray-50 text-gray-400"
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
              <h4 className="text-lg font-semibold text-gray-800 mb-2">My email Address</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-50 rounded-xl p-1 flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#6B72D6]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{formData.email}</p>
                  <p className="text-gray-500 text-sm">1 month ago</p>
                </div>
              </div>
              <button className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-500 bg-green-100 rounded hover:bg-green-200 transition-colors">
                + Add Email Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;