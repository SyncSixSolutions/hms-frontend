import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Existing imports
import HomeHeader from '../assets/images/HomeHeader.png';
import How1Icon from '../assets/images/how1.png';
import How2Icon from '../assets/images/how2.png';
import How3Icon from '../assets/images/how3.png';
import Vector1 from '../assets/images/Vector 1.png';
import suite1 from '../assets/images/suite1.jpg';
import suite2 from '../assets/images/suite2.jpg';
import suite3 from '../assets/images/suite3.jpg';

// Add these new imports for other sections
import room1 from '../assets/images/room1.jpg';
import room2 from '../assets/images/room2.jpg';
import room3 from '../assets/images/room3.jpg';
import room4 from '../assets/images/room4.jpg';
import room5 from '../assets/images/room5.jpg';
import room6 from '../assets/images/room6.jpg';
import chooseUsImg from '../assets/images/choose.jpg';
import sri1 from '../assets/images/sri1.jpg';
import sri2 from '../assets/images/sri2.jpg';
import sri3 from '../assets/images/sri3.jpg';
import sri4 from '../assets/images/sri4.jpg';
import galleryImg from '../assets/images/gallery.jpg';
import contactImg from '../assets/images/contact.jpg';


const suiteData = [
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
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// Simplified scroll animation hook
function useScrollAnimation(threshold = 0.2) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return [ref, controls];
}

// Update the CounterAnimation component
const CounterAnimation = ({ end, label, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      let startTime = null;
      const animationDuration = 2000; // 2 seconds
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / animationDuration, 1);
        
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [inView, end]);
  
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      ref={ref}
    >
      <div className="relative flex items-center">
        <motion.span className="text-5xl font-extrabold text-[#1E293B]">
          {count}
        </motion.span>
        <motion.span 
          className="text-4xl font-bold text-[#5C4DF4] ml-1"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: 1.5, 
            type: "spring",
            stiffness: 400
          }}
        >
          {suffix}
        </motion.span>
      </div>
      <motion.p 
        className="text-lg font-medium text-gray-500 mt-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

const Home: React.FC = () => {
  const [centerIdx, setCenterIdx] = useState(1);

  const prev = () => setCenterIdx((i) => (i === 0 ? suiteData.length - 1 : i - 1));
  const next = () => setCenterIdx((i) => (i === suiteData.length - 1 ? 0 : i + 1));

  // Helper to get the 3 cards to show
  const getVisibleSuites = () => {
    const left = (centerIdx + suiteData.length - 1) % suiteData.length;
    const right = (centerIdx + 1) % suiteData.length;
    return [suiteData[left], suiteData[centerIdx], suiteData[right]];
  };

  
  return (
    <div className="font-sans">
      {/* Hero Section */}
      {/* Navbar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-20 py-8"
      >
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-parisienne text-[#000957]"
        >
          OceanView
        </motion.h1>
        <motion.ul 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex space-x-8 font-regular" 
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {["Home", "Rooms", "Services & Foods", "Contact Us", "Hotel Policies", "About Us"].map((item, i) => (
            <motion.li 
              key={item}
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  transition: { delay: 0.1 * i, duration: 0.4 } 
                }
              }}
              className={`cursor-pointer ${item === "Home" ? "text-white" : "hover:text-white text-[#6B7280]"}`}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
        <motion.button 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05, backgroundColor: "#254FCF" }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#2D60FF] text-white px-6 py-3 rounded-full text-sm"
        >
          Sign up
        </motion.button>
      </motion.nav>

      <header
        className="relative h-[90vh] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url(${HomeHeader})`,
          marginTop : '-10px',
          marginLeft: '2px',
          marginRight: '2px',
          borderRadius: '80px 80px 35px 35px',
        }}
      >
        {/* Hero Content */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-9xl font-extrabold font-parisienne mb-4">
            Ocean View
          </h2>
          <p className="text-xl font-light" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Experience luxury, comfort, and hospitality like never before!
          </p>
        </motion.div>

        {/* Booking Panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, type: "spring", stiffness: 120 }}
          className="absolute left-0 right-0 bottom-8 mx-auto w-[80%] max-w-5xl bg-white shadow-2xl rounded-[32px] px-10 py-4 flex items-center justify-between"
          style={{
            boxShadow: '0px 4px 24px 0px #00000026',
            borderRadius: '40px',
          }}
        >
          {/* Booking fields */}
          <div className="flex flex-1 items-center justify-between relative gap-6">
            {/* Check-in */}
            <div className="flex items-center gap-2 min-w-[140px]">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <div className="text-xs text-[#6B7280] mb-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>Check-in</div>
                <div className="text-sm text-[#232323] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>Feb 25, 2025</div>
              </div>
            </div>
            {/* Divider & Nights */}
            <div className="h-12 w-px bg-[#E5E7EB] mx-2 relative">
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#EDEDED] text-[#B1B1B1] text-xs px-4 py-0.5 rounded-full shadow font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>1night</span>
            </div>
            {/* Check-out */}
            <div className="flex flex-col min-w-[140px]">
              <div className="text-xs text-[#6B7280] mb-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>Check-out</div>
              <div className="text-sm text-[#232323] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>Mar 2, 2025</div>
            </div>
            {/* Divider */}
            <div className="h-12 w-px bg-[#E5E7EB] mx-2" />
            {/* Room */}
            <div className="flex items-center gap-2 min-w-[160px]">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              <div>
                <div className="text-xs text-[#6B7280] mb-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>Room</div>
                <div className="text-sm text-[#232323] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Luxury suite <span className="text-[#6B7280] text-xs font-normal ml-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>Room no : 14</span>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="h-12 w-px bg-[#E5E7EB] mx-2" />
            {/* Guests */}
            <div className="flex items-center gap-2 min-w-[140px]">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </span>
              <div>
                <div className="text-xs text-[#6B7280] mb-0.5" style={{ fontFamily: 'Montserrat, sans-serif' }}>Guests</div>
                <div className="text-sm text-[#232323] font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>2 Adult, 3 Children</div>
              </div>
            </div>
          </div>
          {/* Search button */}
          <button
            type="button"
            title="Search"
            className="bg-[#5C4DF4] hover:bg-[#2D60FF] text-white rounded-full w-12 h-12 flex items-center justify-center ml-6 shadow-lg"
            style={{ boxShadow: '0px 2px 12px 0px #5C4DF440' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </motion.div>
      </header>      
      
      {/* How it works */}
      <section className="py-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeUp} className="text-5xl font-bold mb-6">How it work</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-600 mb-24 max-w-3xl mx-auto">
            With OceanView, finding your perfect stay is just a click away, explore and 
            book your dream accommodation without leaving home.
          </motion.p>
        </motion.div>
        
        <div className="flex justify-between max-w-6xl mx-auto px-4 relative">
          {/* Background wavy line */}
          <motion.div 
            className="absolute w-full top-1/4 -z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
          >
            <img src={Vector1} alt="Background wave" className="w-full" />
          </motion.div>
          
          {/* Step 1 */}
          <motion.div 
            className="flex flex-col items-center" 
            style={{ maxWidth: '300px' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="relative mb-16"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {/* Vector background with random rotation */}
              <motion.div 
                className="absolute -z-10 w-full h-full" 
                style={{ transform: 'rotate(15deg) scale(1.5) translateX(-10%)' }}
                animate={{ 
                  rotate: [15, 12, 15, 18, 15],
                  scale: [1.5, 1.52, 1.5]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 10, 
                  ease: "easeInOut" 
                }}
              >
                <img src={Vector1} alt="Background wave" className="w-full" style={{ opacity: 0.7 }} />
              </motion.div>
              
              {/* Rest of step 1 content */}
              <div className="absolute inset-0 bg-white shadow-lg rounded-3xl transform rotate-3 origin-bottom"></div>
              <div className="relative bg-white shadow-lg p-12 rounded-3xl z-10">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto">
                  <img src={How1Icon} alt="Select Dates" className="h-8 w-8" />
                </div>
              </div>
              <motion.div 
                className="absolute top-0 left-0 w-2 h-2 bg-yellow-300 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.div>
              <motion.div 
                className="absolute top-1/4 right-0 w-1 h-1 bg-purple-300 rounded-full transform translate-x-1/2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              ></motion.div>
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >Select Your Dates</motion.h3>
            <motion.p 
              className="text-gray-500 text-sm px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Choose your check-in and check-out<br />
              dates to get started.
            </motion.p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="flex flex-col items-center" 
            style={{ maxWidth: '300px' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="relative mb-16"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {/* Vector background with random rotation */}
              <motion.div 
                className="absolute -z-10 w-full h-full" 
                style={{ transform: 'rotate(-25deg) scale(1.3) translateY(20%)' }}
                animate={{ 
                  rotate: [-25, -22, -25, -28, -25],
                  scale: [1.3, 1.32, 1.3]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 10, 
                  ease: "easeInOut" 
                }}
              >
                <img src={Vector1} alt="Background wave" className="w-full" style={{ opacity: 0.7 }} />
              </motion.div>
              
              {/* Rest of step 2 content */}
              <div className="absolute inset-0 bg-white shadow-lg rounded-3xl transform -rotate-2 origin-bottom"></div>
              <div className="relative bg-white shadow-lg p-12 rounded-3xl z-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#92A5EF' }}>
                  <img src={How2Icon} alt="Pick a Room" className="h-8 w-8" />
                </div>
              </div>
              <motion.div 
                className="absolute top-0 left-1/4 w-1 h-1 bg-purple-300 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-1/3 right-0 w-2 h-2 bg-pink-200 rounded-full transform translate-x-1/2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.7 }}
              ></motion.div>
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >Pick a Room or Suite</motion.h3>
            <motion.p 
              className="text-gray-500 text-sm px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Browse available rooms and suites<br />
              tailored to your comfort.
            </motion.p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="flex flex-col items-center" 
            style={{ maxWidth: '300px' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="relative mb-16"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {/* Vector background with random rotation */}
              <motion.div 
                className="absolute -z-10 w-full h-full" 
                style={{ transform: 'rotate(40deg) scale(1.4) translateX(10%)' }}
                animate={{ 
                  rotate: [40, 37, 40, 43, 40],
                  scale: [1.4, 1.42, 1.4]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 10, 
                  ease: "easeInOut" 
                }}
              >
                <img src={Vector1} alt="Background wave" className="w-full" style={{ opacity: 0.7 }} />
              </motion.div>
              
              {/* Card */}
              <div className="absolute inset-0 bg-white shadow-lg rounded-3xl transform rotate-6 origin-bottom"></div>
              <div className="relative bg-white shadow-lg p-12 rounded-3xl z-10">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto">
                  <img src={How3Icon} alt="Confirm Booking" className="h-8 w-8" />
                </div>
              </div>
              <motion.div 
                className="absolute top-1/2 left-0 w-1 h-1 bg-blue-300 rounded-full transform -translate-x-1/2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              ></motion.div>
              <motion.div 
                className="absolute top-0 right-1/4 w-2 h-2 bg-purple-200 rounded-full transform -translate-y-1/2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-0 right-0 w-1 h-1 bg-yellow-300 rounded-full transform translate-x-1/3 translate-y-1/3"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.9 }}
              ></motion.div>
            </motion.div>
            <motion.h3 
              className="text-xl font-semibold mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >Add Guests & Confirm<br/>Booking</motion.h3>
            <motion.p 
              className="text-gray-500 text-sm px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Enter guest details, review your stay, and<br />
              complete your reservation in one step.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* Rooms & Suites */}
      <motion.section 
        className="py-16 text-center bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div className="container mx-auto px-4">
          <motion.h2 
            className="text-5xl font-bold mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Suites
          </motion.h2>
          
          <motion.p 
            className="text-gray-500 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            find your best way to stay here
          </motion.p>
          
          <div className="relative flex items-center justify-center max-w-7xl mx-auto">
            {/* Left Button */}
            <motion.button
              onClick={prev}
              className="absolute left-0 z-10 bg-white shadow-lg rounded-full w-20 h-20 flex items-center justify-center text-3xl text-gray-500 hover:bg-gray-100 transition-all"
              style={{ 
                top: '50%', 
                transform: 'translateY(-50%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}
              aria-label="Previous"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)" 
              }}
              whileTap={{ 
                scale: 0.98, 
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)" 
              }}
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            {/* Cards */}
            <motion.div 
              className="flex gap-8 mx-24 w-full justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {getVisibleSuites().map((suite, idx) => (
                  <motion.div
                    key={suite.title}
                    layout
                    initial={{ 
                      opacity: 0, 
                      x: idx === 0 ? -30 : idx === 2 ? 30 : 0,
                      y: 30 
                    }}
                    animate={{ 
                      opacity: idx === 1 ? 1 : 0.75, 
                      scale: idx === 1 ? 1.1 : 0.9,
                      x: 0,
                      y: 0,
                      transition: { 
                        type: "spring",
                        stiffness: 260,
                        damping: 24,
                        delay: idx * 0.1
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: idx === 0 ? -30 : idx === 2 ? 30 : 0,
                      transition: { duration: 0.3 } 
                    }}
                    className={`relative rounded-[24px] overflow-hidden shadow-lg bg-white transition-all duration-500`}
                    style={{
                      width: idx === 1 ? 360 : 300,
                      height: idx === 1 ? 480 : 400,
                      minWidth: idx === 1 ? 360 : 300,
                      maxWidth: idx === 1 ? 360 : 300,
                      boxShadow: idx === 1 ? '0 12px 40px rgba(0,0,0,0.15)' : '0 2px 12px rgba(0,0,0,0.08)',
                      zIndex: idx === 1 ? 2 : 1
                    }}
                  >
                    <motion.img
                      src={suite.img}
                      alt={suite.title}
                      className="w-full h-full object-cover"
                      style={{ 
                        borderRadius: 24,
                        filter: idx !== 1 ? 'brightness(0.9)' : 'brightness(1)'
                      }}
                      whileHover={{ scale: idx === 1 ? 1.05 : 1.02 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                    
                    {/* Overlay only on center card */}
                    {idx === 1 && (
                      <motion.div 
                        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <motion.h3 
                          className="text-4xl font-parisienne text-white mb-2"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
                        >{suite.title}</motion.h3>
                        
                        <motion.p 
                          className="text-lg text-green-400 mb-1"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                        >
                          From <span className="font-semibold">{suite.price}</span> per night
                        </motion.p>
                        
                        <motion.ul 
                          className="text-white text-sm mb-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          {suite.desc.map((d, i) => (
                            <motion.li 
                              key={i} 
                              className="mb-1"
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
                            >• {d}</motion.li>
                          ))}
                        </motion.ul>
                      </motion.div>
                    )}
                    
                    {/* Add title for side cards */}
                    {idx !== 1 && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 bg-black/60 text-white py-3 px-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                      >
                        <h3 className="text-sm font-medium">{suite.title}</h3>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Right Button */}
            <motion.button
              onClick={next}
              className="absolute right-0 z-10 bg-white shadow-lg rounded-full w-20 h-20 flex items-center justify-center text-3xl text-gray-500 hover:bg-gray-100 transition-all"
              style={{ 
                top: '50%', 
                transform: 'translateY(-50%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
              }}
              aria-label="Next"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)" 
              }}
              whileTap={{ 
                scale: 0.98, 
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)" 
              }}
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
          
          {/* Show more button */}
          <motion.button
            className="mt-16 bg-white text-[#2D60FF] px-8 py-2 rounded-full text-base font-medium shadow-md hover:bg-blue-50 transition-all"
            style={{
              boxShadow: '0 4px 16px #5C4DF420',
              color: '#2D60FF',
              fontWeight: 500,
              minWidth: 140
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 8px 20px #5C4DF440'
            }}
            whileTap={{ scale: 0.98 }}
          >
            Show more
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Trusted Section */}
      <motion.section 
        className="py-20 bg-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2 
            className="text-5xl font-bold mb-4 text-[#1E293B]"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Trusted by Thousands Worldwide
          </motion.h2>
          
          <motion.p
            className="text-gray-600 mb-20 max-w-3xl mx-auto text-lg"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From unforgettable stays to seamless bookings — see how we're making an impact.
          </motion.p>
          
            <motion.div 
            className="grid grid-cols-4 gap-10 max-w-8xl mx-auto bg-white rounded-3xl py-10 px-16"
            style={{ 
              boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(0, 0, 0, 0.03)',
              borderRadius: '2rem'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            >
            {/* 2000+ Customers */}
            <CounterAnimation end={2000} label="Customers" />

            {/* 6000+ Active Users */}
            <CounterAnimation end={6000} label="Active users" />

            {/* 125+ Crew members */}
            <CounterAnimation end={125} label="Crew members" />

            {/* 10yrs+ Experience */}
            <CounterAnimation end={10} label="Experience" suffix="yrs+" />
            </motion.div>
        </div>
      </motion.section>

      {/* Featured Rooms */}
      <motion.section 
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-3xl font-semibold text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Featured Rooms & Suites
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
          {[
            {img: room1, num: 1},
            {img: room2, num: 2},
            {img: room3, num: 3},
            {img: room4, num: 4},
            {img: room5, num: 5},
            {img: room6, num: 6}
          ].map(({img, num}) => (
            <motion.div 
              key={num} 
              className="border p-4 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: num * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
            >
              <img src={img} alt={`Room ${num}`} className="rounded mb-4" />
              <h3 className="font-semibold mb-2">Room {num}</h3>
              <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why choose us */}
      <motion.section 
        className="py-16 bg-gray-100 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl flex gap-8 items-center">
          <motion.div 
            className="w-1/2"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Why did you choose us?</h2>
            <ul className="list-disc pl-5 text-left space-y-2">
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >Location in the heart of the city</motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >Perfect for business & leisure trips</motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >Luxury comfort at affordable rates</motion.li>
              <motion.li 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >Personalized concierge service</motion.li>
            </ul>
          </motion.div>
          <motion.div 
            className="w-1/2"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={chooseUsImg} alt="Why Choose Us" className="rounded-lg" />
          </motion.div>
        </div>
      </motion.section>

      {/* Explore Sri Lanka */}
      <motion.section 
        className="py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl font-semibold mb-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Explore Sri Lanka
        </motion.h2>
        <div className="flex justify-center gap-6">
          {[
            {img: sri1, num: 1},
            {img: sri2, num: 2},
            {img: sri3, num: 3},
            {img: sri4, num: 4}
          ].map(({img, num}) => (
            <motion.img 
              key={num} 
              src={img} 
              alt={`Sri Lanka ${num}`} 
              className="w-40 h-32 object-cover rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: num * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
            />
          ))}
        </div>
      </motion.section>

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
      <motion.section 
        className="py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-3xl font-semibold mb-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Gallery
        </motion.h2>
        <div className="flex justify-center gap-6">
          <motion.img 
            src={galleryImg} 
            alt="Gallery" 
            className="rounded-lg w-96 h-60 object-cover"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          />
        </div>
      </motion.section>

      {/* Contact Us */}
      <motion.section 
        className="py-16 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto flex gap-12 items-center">
          <motion.div 
            className="w-1/2"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <form className="space-y-4">
              <motion.input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-2 border rounded" 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
              />
              <motion.input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-2 border rounded" 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
              />
              <motion.textarea 
                placeholder="Your Message" 
                rows={4} 
                className="w-full p-2 border rounded"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
              ></motion.textarea>
              <motion.button 
                className="bg-indigo-600 text-white px-4 py-2 rounded"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                whileHover={{ scale: 1.05, backgroundColor: "#4338ca" }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
          <motion.div 
            className="w-1/2"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src={contactImg} alt="Contact" className="rounded-lg" />
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>&copy; 2025 OceanView. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
