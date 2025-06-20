import React, { useState } from "react";
import { Calendar } from "./components/Calendar";
import { DateSidebar } from "./components/DateSidebar";
import { Header } from "./components/Header";
import { SelectedDates } from "./components/SelectedDates";
import { getQuickSelectDates } from "./utils/dateUtils";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { Search } from 'lucide-react';

const BookingCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDates((prev) => {
      const isAlreadySelected = prev.some(
        (selectedDate) => selectedDate.toDateString() === date.toDateString()
      );

      if (isAlreadySelected) {
        return prev.filter(
          (selectedDate) => selectedDate.toDateString() !== date.toDateString()
        );
      } else {
        return [...prev, date].sort((a, b) => a.getTime() - b.getTime());
      }
    });
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleQuickSelect = (type: string) => {
    const dates = getQuickSelectDates(type);
    setSelectedDates(dates);
  };

  const handleRemoveDate = (dateToRemove: Date) => {
    setSelectedDates((prev) =>
      prev.filter((date) => date.toDateString() !== dateToRemove.toDateString())
    );
  };

  const handleReset = () => {
    setSelectedDates([]);
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
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
    <div className={`min-h-screen bg-gray-50 p-6 bg-gradient-to-br from-gray-50 to-gray-100 ${darkMode ? 'dark' : ''}`}>
      {/* Main container with wider width to minimize edge distance */}
      <div className="max-w-[95%] mx-auto">
        {/* Header - matched with ClientDashboard */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-normal text-gray-500">Welcome, Serena</h1>
            <p className="text-sm text-gray-500 mt-1">{getCurrentDate()}</p>
          </div>
          <div className="flex items-center space-x-3">
        
            
            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-md">
              <img
                src="/src/assets/images/avatar.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Calendar Header - matched with ClientDashboard style */}
        <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="rounded-t-lg p-2 bg-[#6B72D6]">
            <h2 className="text-xl font-bold text-white ml-1">Select Booking Dates</h2>
          </div>

          {/* Calendar Content */}
          <div className="p-2 bg-white rounded-b-lg">
            <div className="space-y-4">
              {/* Calendar Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Date Sidebar - with consistent card styling */}
                  <div className="bg-white rounded-lg shadow-md p-3 border border-gray-100">
                    <DateSidebar onQuickSelect={handleQuickSelect} />
                  </div>
                  
                  {/* Selected Dates - with consistent card styling */}
                  <div className="bg-white rounded-lg shadow-md p-3 border border-gray-100">
                    <SelectedDates
                      selectedDates={selectedDates}
                      onRemoveDate={handleRemoveDate}
                      onReset={handleReset}
                    />
                  </div>
                </div>

                {/* Calendar - with consistent card styling */}
                <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-3 border border-gray-100">
                  <Calendar
                    currentDate={currentDate}
                    selectedDates={selectedDates}
                    onDateSelect={handleDateSelect}
                    onMonthChange={handleMonthChange}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4">
                <Button 
                  variant="border" 
                  className="text-sm px-4 py-2 shadow-sm hover:shadow transition-shadow duration-300"
                  onClick={handleReset}
                >
                  Reset Dates
                </Button>
                <Button 
                  variant="filled"
                  className="text-sm px-4 py-2 bg-[#6B72D6] hover:bg-[#5a60b8] text-white shadow-sm hover:shadow transition-shadow duration-300"
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;