import { useState } from "react";
import { Calendar } from "./components/Calendar";
import { DateSidebar } from "./components/DateSidebar";
import { Header } from "./components/Header";
import { SelectedDates } from "./components/SelectedDates";
import { getQuickSelectDates } from "./utils/dateUtils";
import BackGround from "./../../../assets/images/calender-background.png";

function App() {
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

  return (
    <div className={`bg-gray-100 ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto  bg-gray-200">
        {/* Content */}
        <div className="relative z-10">
          <Header darkMode={darkMode} onDarkModeToggle={handleDarkModeToggle} />
          <div className="flex items-center space-x-4 p-5 mt-2 bg-gray-100">
            <h1 className="text-2xl font-bold text-gray-800">Select Dates</h1>
          </div>
          <div
            className=" max-w-7xl h-screen  px-0 py-4 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${BackGround})`,
            }}
          >
            <div className="m-10 bg-white rounded-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  <DateSidebar onQuickSelect={handleQuickSelect} />
                  <SelectedDates
                    selectedDates={selectedDates}
                    onRemoveDate={handleRemoveDate}
                    onReset={handleReset}
                  />
                </div>

                {/* Calendar */}
                <div className="lg:col-span-3">
                  <Calendar
                    currentDate={currentDate}
                    selectedDates={selectedDates}
                    onDateSelect={handleDateSelect}
                    onMonthChange={handleMonthChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
