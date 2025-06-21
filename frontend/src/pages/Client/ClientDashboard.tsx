import React from "react";

import Button from "../../components/ui/Button";
import ClientHeader from "../../components/Client/ClientHeader";

import dashboardCar from "../../assets/images/dashboeard_car2.avif";
import dashboardRoom from "../../assets/images/dashboard_home.jpg";
import dashboardPool from "../../assets/images/dashboard_pool.jpg";
import dashboardTherapy from "../../assets/images/dashboard_therapy.jpg";
import visaLogo from "../../assets/images/visa-logo.png";
import mastercardLogo from "../../assets/images/mastercard-logo.png";
import { FloatingNavBar } from "../../components/layout";


const ClientDashboard: React.FC = () => {
  // Mock data - in a real app, this would come from API/state
  const userData = {
    name: "Serena",
    date: "Tue, 07 June 2022",
    duePayment: "7400 kr",
  };

  const bookingData = {
    location: "Main Floor Lounge",
    roomTitle: "Room near the ocean end",
    details: [
      "Breakfast and Dinner ( Gold meal plan )",
      "Room 2 Beds 1 Bath",
      "Duration : From 12th June 2025 to 15th June 2025",
      "Oil therapy - 13th June 5:00 pm",
    ],
  };

  const paymentMethods = [
    { last4: "4224", type: "visa" },
    { last4: "4224475754", type: "mastercard" },
  ];

  // Handler functions for the header
  const handleSearchChange = (value: string) => {
    console.log("Search value:", value);
    // Implement search functionality here
  };

  const handleProfileClick = () => {
    console.log("Profile clicked");
    // Implement profile navigation here
  };

  const handleAddPayment = () => {
    console.log("Add payment clicked");
    // Implement add payment functionality here
  };

  const handleRentHire = () => {
    console.log("Rent/Hire clicked");
    // Implement rent/hire functionality here
  };

  return (
    <div className="max-w-6xl mx-auto p-5 font-sans text-gray-800">
      <FloatingNavBar role={
        "user"
      }/>
      {/* Header Component */}
      <ClientHeader
        userName={userData.name}
        date={userData.date}
        onSearchChange={handleSearchChange}
        onProfileClick={handleProfileClick}
      />

      {/* Dashboard Title */}
      <div
        className="text-white p-4 rounded-lg mb-6"
        style={{ backgroundColor: "#6B72D6" }}
      >
        <h2 className="text-xl font-medium">My Dashboard</h2>
      </div>

      {/* Bookings Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">
          Your bookings and reservations
        </h3>

        <div className="flex md:flex-row flex-col">
          <div className="md:w-64 w-full md:h-60 h-48 md:mr-6 mb-6 md:mb-0">
            <img
              src={dashboardRoom}
              alt="Ocean view room"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex-1">
            <p className="text-sm mb-1" style={{ color: "#6B72D6" }}>
              {bookingData.location}
            </p>
            <h4
              className="text-2xl font-medium mb-4"
              style={{ color: "#4A4E7A" }}
            >
              {bookingData.roomTitle}
            </h4>

            <ul className="mb-4">
              {bookingData.details.map((detail, index) => (
                <li key={index} className="pl-4 relative mb-2 text-gray-700">
                  <span
                    className="absolute left-0"
                    style={{ color: "#6B72D6" }}
                  >
                    •
                  </span>
                  {detail}
                </li>
              ))}
            </ul>

            <a
              href="#"
              className="text-sm hover:underline"
              style={{ color: "#6B72D6" }}
            >
              Add more Reservations
            </a>

            <div className="flex mt-5 overflow-x-auto pb-2">
              <div className="w-28 h-20 rounded-lg overflow-hidden mr-3 shrink-0 relative group">
                <img
                  src={dashboardPool}
                  alt="Swimming Pool"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Swimming Pool
                </span>
              </div>
              <div className="w-28 h-20 rounded-lg overflow-hidden mr-3 relative shrink-0 group">
                <img
                  src={dashboardTherapy}
                  alt="Therapy"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Therapy
                </span>
              </div>
              <div className="w-28 h-20 rounded-lg overflow-hidden mr-3 shrink-0 relative group">
                <img
                  src={dashboardCar}
                  alt="Vehicles"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs text-center py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Vehicles
                </span>
              </div>
              <div className="w-28 h-20 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 hover:bg-gray-200 cursor-pointer transition-colors">
                <div className="text-2xl" style={{ color: "#6B72D6" }}>
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment and Vehicle Sections */}
      <div className="flex gap-6 mb-6 md:flex-row flex-col">
        <div className="bg-white rounded-lg shadow-sm p-6 flex-1">
          <h3 className="text-lg font-medium mb-4">Payment methods</h3>

          <div className="mb-4">
            {paymentMethods.map((card, index) => (
              <div key={index} className="flex items-center mb-3">
                {card.type === "visa" ? (
                  <div className="w-12 h-8 mr-3 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded shadow-sm">
                    <img
                      src={visaLogo}
                      alt="Visa"
                      className="h-5 w-auto"
                      onError={(e) => {
                        // Fallback to external Visa logo if local file doesn't exist
                        e.currentTarget.src =
                          "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg";
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-8 mr-3 flex-shrink-0 flex items-center justify-center bg-white border border-gray-200 rounded shadow-sm">
                    <img
                      src={mastercardLogo}
                      alt="Mastercard"
                      className="h-5 w-auto"
                      onError={(e) => {
                        // Fallback to external Mastercard logo if local file doesn't exist
                        e.currentTarget.src =
                          "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg";
                      }}
                    />
                  </div>
                )}
                <span className="text-gray-700">
                  {index === 0 ? "1992********" : "1542********"}
                  {card.last4}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mb-4 cursor-pointer hover:text-gray-700">
            click here to change payment methods
          </p>

          <Button
            variant="border"
            onClick={handleAddPayment}
            className="text-sm"
          >
            Add Payment
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 flex-1 relative overflow-hidden">
          {/* Background car image */}
          <div className="absolute inset-0 opacity-10">
            <img
              src={dashboardCar}
              alt="Vehicle background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10">
            <h3 className="text-lg font-medium mb-4">
              Need to rent / hire a vehicle?
            </h3>
            <p className="text-gray-700 mb-1">
              Do you need to rent vehicle for the days you stay
            </p>
            <p className="text-gray-700 mb-4">
              Pick the vehicles who are associated with our hotel NOW !
            </p>

            <Button
              variant="border"
              onClick={handleRentHire}
              className="text-sm"
            >
              Rent / Hire
            </Button>
          </div>
        </div>
      </div>

      {/* Footer with Due Payments */}
      <div className="bg-gray-100 rounded-lg p-4 flex justify-between items-center">
        <div>
          <span className="text-gray-700">Due Payments : </span>
          <span className="font-bold" style={{ color: "#6B72D6" }}>
            {userData.duePayment}
          </span>
        </div>
        <div>
          <a
            href="#"
            className="text-sm hover:underline"
            style={{ color: "#6B72D6" }}
          >
            View full bill here
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;