import React from 'react';
import HomeHeader from '../assets/images/HomeHeader.png';
import How1Icon from '../assets/images/how1.png';
import How2Icon from '../assets/images/how2.png';
import How3Icon from '../assets/images/how3.png';
import Vector1 from '../assets/images/Vector 1.png';
import suite1 from '../assets/images/suite1.jpg';
import suite2 from '../assets/images/suite2.jpg';
import suite3 from '../assets/images/suite3.jpg';


const Home: React.FC = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
        {/* Navbar */}
        <nav className="flex items-center justify-between px-20 py-8">
          <h1 className="text-white text-4xl font-parisienne text-[#000957]">OceanView</h1>
            <ul className="flex space-x-8 font-regular" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <li className="text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer text-[#6B7280]">Rooms</li>
            <li className="hover:text-white cursor-pointer text-[#6B7280]">Services & Foods</li>
            <li className="hover:text-white cursor-pointer text-[#6B7280]">Contact Us</li>
            <li className="hover:text-white cursor-pointer text-[#6B7280]">Hotel Policies</li>
            <li className="hover:text-white cursor-pointer text-[#6B7280]">About Us</li>
            </ul>
          <button className="bg-[#2D60FF] hover:bg-[#254FCF] text-white px-6 py-3 rounded-full text-sm">
            Sign up
          </button>
        </nav>
        <header
          className="relative h-[90vh] overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${HomeHeader})`,
            marginTop : '-10px',
            marginLeft: '2px',
            marginRight: '2px',
            borderRadius: '80px 80px 35px 35px', // Custom border radius
          }}
        >
        {/* Hero Content */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-[40%] text-center text-white px-4">
            <h2 className="text-9xl font-extrabold font-parisienne mb-4">Ocean View</h2>
            <p className="text-xl font-light" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Experience luxury, comfort, and hospitality like never before!
            </p>
        </div>

        {/* Booking Panel */}
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[70%] bg-white shadow-2xl rounded-[32px] px-10 py-4 flex items-center justify-between"
          style={{
            boxShadow: '0px 4px 24px 0px #00000026',
            borderRadius: '40px',
          }}
        >
          {/* Booking fields */}
          <div className="flex flex-1 items-center justify-between relative">
            {/* Check-in */}
            <div className="flex items-center gap-2 min-w-[140px]">
              <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#6B7280]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
              </span>
              <div>
          <div
            className="text-xs text-[#6B7280] mb-0.5"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Check-in
          </div>
          <div
            className="text-sm text-[#232323] font-medium"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Feb 25, 2025
          </div>
              </div>
            </div>
            {/* Divider */}
            <div className="h-12 w-px bg-[#E5E7EB] mx-5 relative">
              {/* Nights badge */}
              <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 z-10">
          <span
            className="bg-[#EDEDED] text-[#B1B1B1] text-xs px-4 py-0.5 rounded-full shadow font-medium"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            1night
          </span>
              </div>
            </div>
            {/* Check-out */}
            <div className="flex items-center gap-2 min-w-[140px]">
              <div>
          <div
            className="text-xs text-[#6B7280] mb-0.5"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Check-out
          </div>
          <div
            className="text-sm text-[#232323] font-medium"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Mar 2, 2025
          </div>
              </div>
            </div>
            {/* Divider */}
            <div className="h-12 w-px bg-[#E5E7EB] mx-5" />
            {/* Room */}
            <div className="flex items-center gap-2 min-w-[160px]">
              <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#6B7280]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
              </span>
              <div>
          <div
            className="text-xs text-[#6B7280] mb-0.5"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Room
          </div>
          <div
            className="text-sm text-[#232323] font-medium"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Luxury suite{' '}
            <span
              className="text-[#6B7280] text-xs font-normal ml-1"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Room no : 14
            </span>
          </div>
              </div>
            </div>
            {/* Divider */}
            <div className="h-12 w-px bg-[#E5E7EB] mx-5" />
            {/* Guests */}
            <div className="flex items-center gap-2 min-w-[140px]">
              <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-[#6B7280]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
              </span>
              <div>
          <div
            className="text-xs text-[#6B7280] mb-0.5"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            Guests
          </div>
          <div
            className="text-sm text-[#232323] font-medium"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            2 Adult, 3 Children
          </div>
              </div>
            </div>
          </div>
          {/* Search button */}
          <button
            type="button"
            title="Search"
            className="bg-[#5C4DF4] hover:bg-[#2D60FF] text-white rounded-full w-12 h-12 flex items-center justify-center ml-6 shadow-lg"
            style={{
              boxShadow: '0px 2px 12px 0px #5C4DF440',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </header>      
      
      {/* How it works */}
      <section className="py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">How it work</h2>
        <p className="text-gray-600 mb-24 max-w-3xl mx-auto">
          With OceanView, finding your perfect stay is just a click away, explore and 
          book your dream accommodation without leaving home.
        </p>
        
        <div className="flex justify-between max-w-6xl mx-auto px-4 relative">
          {/* Background wavy line */}
          <div className="absolute w-full top-1/4 -z-10">
            <img src={Vector1} alt="Background wave" className="w-full" />
          </div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center" style={{ maxWidth: '300px' }}>
            <div className="relative mb-16 transform hover:scale-105 transition-transform duration-300">
              {/* Vector background with random rotation */}
              <div className="absolute -z-10 w-full h-full" style={{ transform: 'rotate(15deg) scale(1.5) translateX(-10%)' }}>
                <img src={Vector1} alt="Background wave" className="w-full" style={{ opacity: 0.7 }} />
              </div>
              {/* Blob background */}
              <div className="absolute -z-20 w-44 h-44 bg-gray-100 rounded-full blur-xl opacity-60" 
                  style={{ top: '-20%', left: '-30%' }}></div>
              
              {/* Card */}
              <div className="absolute inset-0 bg-white shadow-lg rounded-3xl transform rotate-3 origin-bottom"></div>
              <div className="relative bg-white shadow-lg p-12 rounded-3xl z-10">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto">
                  <img src={How1Icon} alt="Select Dates" className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute top-0 left-0 w-2 h-2 bg-yellow-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute top-1/4 right-0 w-1 h-1 bg-purple-300 rounded-full transform translate-x-1/2"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Select Your Dates</h3>
            <p className="text-gray-500 text-sm px-4">
              Choose your check-in and check-out<br />
              dates to get started.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center" style={{ maxWidth: '300px' }}>
            <div className="relative mb-16 transform hover:scale-105 transition-transform duration-300">
              {/* Vector background with random rotation */}
              <div className="absolute -z-10 w-full h-full" style={{ transform: 'rotate(-25deg) scale(1.3) translateY(20%)' }}>
                <img src={Vector1} alt="Background wave" className="w-full" style={{ opacity: 0.7 }} />
              </div>
              {/* Blob background */}
              <div className="absolute -z-20 w-52 h-52 bg-gray-200 rounded-full blur-xl opacity-50" 
                  style={{ top: '20%', right: '-40%' }}></div>
              
              {/* Card */}
              <div className="absolute inset-0 bg-white shadow-lg rounded-3xl transform -rotate-2 origin-bottom"></div>
              <div className="relative bg-white shadow-lg p-12 rounded-3xl z-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#92A5EF' }}>
                  <img src={How2Icon} alt="Pick a Room" className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute top-0 left-1/4 w-1 h-1 bg-purple-300 rounded-full"></div>
              <div className="absolute bottom-1/3 right-0 w-2 h-2 bg-pink-200 rounded-full transform translate-x-1/2"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Pick a Room or Suite</h3>
            <p className="text-gray-500 text-sm px-4">
              Browse available rooms and suites<br />
              tailored to your comfort.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center" style={{ maxWidth: '300px' }}>
            <div className="relative mb-16 transform hover:scale-105 transition-transform duration-300">
              {/* Vector background with random rotation */}
              <div className="absolute -z-10 w-full h-full" style={{ transform: 'rotate(40deg) scale(1.4) translateX(10%)' }}>
                <img src={Vector1} alt="Background wave" className="w-full" style={{ opacity: 0.7 }} />
              </div>
              {/* Blob background */}
              <div className="absolute -z-20 w-48 h-48 bg-gray-100 rounded-full blur-xl opacity-60" 
                  style={{ bottom: '-10%', left: '-20%' }}></div>
              
              {/* Card */}
              <div className="absolute inset-0 bg-white shadow-lg rounded-3xl transform rotate-6 origin-bottom"></div>
              <div className="relative bg-white shadow-lg p-12 rounded-3xl z-10">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto">
                  <img src={How3Icon} alt="Confirm Booking" className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute top-1/2 left-0 w-1 h-1 bg-blue-300 rounded-full transform -translate-x-1/2"></div>
              <div className="absolute top-0 right-1/4 w-2 h-2 bg-purple-200 rounded-full transform -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-yellow-300 rounded-full transform translate-x-1/3 translate-y-1/3"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Add Guests & Confirm<br/>Booking</h3>
            <p className="text-gray-500 text-sm px-4">
              Enter guest details, review your stay, and<br />
              complete your reservation in one step.
            </p>
          </div>
        </div>
        
      {/* Rooms & Suites */}
      <section className="py-20 text-center"></section>
        <h2 className="text-5xl font-bold mb-2">Rooms & Suites</h2>
        <p className="text-gray-500 mb-16">find your best way to stay here</p>

        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              {
                img: suite1,
                title: "Premium Suite",
                price: "$199",
                desc: [
                  "Ocean view, king-size bed",
                  "Private balcony",
                  "Complimentary breakfast"
                ]
              },
              {
                img: suite2,
                title: "Deluxe Room",
                price: "$XX",
                desc: [
                  "Spacious room with city view",
                  "King-size bed & mini-bar",
                  "Complimentary breakfast"
                ]
              },
              {
                img: suite3,
                title: "Executive Suite",
                price: "$299",
                desc: [
                  "Luxury amenities",
                  "Living area & workspace",
                  "Free airport pickup"
                ]
              }
            ].map((suite, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-3xl shadow-lg group transform transition-transform hover:scale-[1.02] duration-300"
              >
                <img
                  src={suite.img}
                  alt={suite.title}
                  className="w-full h-[450px] object-cover"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-parisienne text-white mb-2">{suite.title}</h3>
                  <p className="text-lg text-green-400 mb-1">From <span className="font-semibold">{suite.price}</span> per night</p>
                  <ul className="text-white text-sm mb-4">
                    {suite.desc.map((d, i) => (
                      <li key={i} className="mb-1">• {d}</li>
                    ))}
                  </ul>
                  <button className="bg-white/80 hover:bg-white text-[#2D60FF] font-semibold px-6 py-2 rounded-full text-sm transition-colors duration-200">
                    Book now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-12 bg-[#5C4DF4] hover:bg-[#2D60FF] text-white px-12 py-4 rounded-full text-sm font-medium transition-colors duration-300 shadow">
            Show more
          </button>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-xl mb-6">Trusted by Thousands Worldwide</h2>
        <div className="flex justify-center gap-12 text-2xl font-semibold">
          <div>2000+ <p className="text-sm font-normal">Customers</p></div>
          <div>6000+ <p className="text-sm font-normal">Hotel users</p></div>
          <div>125+ <p className="text-sm font-normal">Crew members</p></div>
          <div>10yrs+ <p className="text-sm font-normal">Experience</p></div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Featured Rooms & Suites</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="border p-4 rounded-lg shadow-md">
              <img src={`/assets/images/room${num}.jpg`} alt={`Room ${num}`} className="rounded mb-4" />
              <h3 className="font-semibold mb-2">Room {num}</h3>
              <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 bg-gray-100 flex items-center justify-center">
        <div className="max-w-5xl flex gap-8 items-center">
          <div className="w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Why did you choose us?</h2>
            <ul className="list-disc pl-5 text-left space-y-2">
              <li>Location in the heart of the city</li>
              <li>Perfect for business & leisure trips</li>
              <li>Luxury comfort at affordable rates</li>
              <li>Personalized concierge service</li>
            </ul>
          </div>
          <div className="w-1/2">
            <img src="/assets/images/choose.jpg" alt="Why Choose Us" className="rounded-lg" />
          </div>
        </div>
      </section>

      {/* Explore Sri Lanka */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">Explore Sri Lanka</h2>
        <div className="flex justify-center gap-6">
          {[1, 2, 3, 4].map((num) => (
            <img key={num} src={`/assets/images/sri${num}.jpg`} alt={`Sri Lanka ${num}`} className="w-40 h-32 object-cover rounded-lg" />
          ))}
        </div>
      </section>

      {/* Loyalty Benefits */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-8">Loyalty Benefits</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-12">
          {["Free upgrades", "Late checkout", "Exclusive deals", "Bonus points"].map((benefit, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold text-lg mb-2">{benefit}</h3>
              <p className="text-sm">Enjoy our premium loyalty rewards and perks</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">Gallery</h2>
        <div className="flex justify-center gap-6">
          <img src="/assets/images/gallery.jpg" alt="Gallery" className="rounded-lg w-96 h-60 object-cover" />
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto flex gap-12 items-center">
          <div className="w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" />
              <input type="email" placeholder="Your Email" className="w-full p-2 border rounded" />
              <textarea placeholder="Your Message" rows={4} className="w-full p-2 border rounded"></textarea>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded">Send Message</button>
            </form>
          </div>
          <div className="w-1/2">
            <img src="/assets/images/contact.jpg" alt="Contact" className="rounded-lg" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 OceanView. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
