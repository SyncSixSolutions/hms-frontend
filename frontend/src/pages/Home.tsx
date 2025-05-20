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
import sri5 from '../assets/images/sri5.jpg';
import sri6 from '../assets/images/sri6.jpg';
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

// New array for room images
const roomImages = [
  [room1, room2, room3, room4, room5],
  [room2, room3, room4, room5, room6],
  [room3, room4, room5, room6, room1],
  [room4, room5, room6, room1, room2],
  [room5, room6, room1, room2, room3],
  [room6, room1, room2, room3, room4],
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
type CounterAnimationProps = {
  end: number;
  label: string;
  suffix?: string;
};

const CounterAnimation: React.FC<CounterAnimationProps> = ({ end, label, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      let startTime: number | null = null;
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
  const [activeImageIndexes, setActiveImageIndexes] = useState(Array(6).fill(0));

  const prev = () => setCenterIdx((i) => (i === 0 ? suiteData.length - 1 : i - 1));
  const next = () => setCenterIdx((i) => (i === suiteData.length - 1 ? 0 : i + 1));

  // Helper to get the 3 cards to show
  const getVisibleSuites = () => {
    const left = (centerIdx + suiteData.length - 1) % suiteData.length;
    const right = (centerIdx + 1) % suiteData.length;
    return [suiteData[left], suiteData[centerIdx], suiteData[right]];
  };

  // Function to handle image change
  const handleImageChange = (roomIndex: number, imageIndex: number) => {
    const newIndexes = [...activeImageIndexes];
    newIndexes[roomIndex] = imageIndex;
    setActiveImageIndexes(newIndexes);
  };

  const destinations = [
    { name: "Galle forte", time: "19 minutes drive", image: sri4 },
    { name: "Ella", time: "7 hours drive", image: sri5 },
    { name: "Temple of the tooth", time: "5 hours drive", image: sri3 },
    { name: "Sigiriya", time: "19 minutes drive", image: sri2 },
    { name: "Coconut Tree Hill", time: "5 minutes drive", image: sri1 },
    { name: "Kandy", time: "4 hours drive", image: sri6 }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextDestinations = () => {
    if (currentIndex + 4 >= destinations.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(prev => prev + 4);
    }
  };

  const prevDestinations = () => {
    if (currentIndex - 4 < 0) {
      setCurrentIndex(Math.max(0, destinations.length - 4));
    } else {
      setCurrentIndex(prev => prev - 4);
    }
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
            className="mt-16 bg-white text-[#000000] px-8 py-2 rounded-full text-base font-medium shadow-md hover:bg-blue-50 transition-all"
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

      {/* Featured Rooms & Suites */}
      <section className="py-16 flex justify-center">
        <div 
          className="w-full max-w-7xl rounded-3xl px-12 py-14"
          style={{ 
            background: 'linear-gradient(160deg, #F4F7FD 0%, #F6F8FE 35%, #F8FAFF 70%, #FFFFFF 100%)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-4xl font-semibold text-[#1E293B] mb-2">Featured Rooms & Suites</h2>
                <p className="text-gray-500">Popular Rooms to stay that Oceanview recommends for you</p>
              </div>
              <a href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">
                Search more 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-3 mb-10">
              <button className="bg-green-500 text-white px-5 py-2 rounded-full text-sm font-medium">Luxury suite</button>
              <button className="bg-white text-gray-700 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">Business suite</button>
              <button className="bg-white text-gray-700 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">Economy suite</button>
              <button className="bg-white text-gray-700 px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-100">Seasonal offers</button>
            </div>

            {/* Room Grid */}
            <motion.div 
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <motion.div
                  key={num}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: num * 0.05 }}
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.08)" }}
                >
                  {/* Room Image Carousel */}
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {roomImages[num].map((img, imgIndex) => (
                        imgIndex === activeImageIndexes[num] && (
                          <motion.img
                            key={imgIndex}
                            src={img}
                            alt={`Room ${num + 1} - Image ${imgIndex + 1}`}
                            className="w-full h-60 object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )
                      ))}
                    </AnimatePresence>
                    
                    <div className="absolute top-3 left-3 bg-white rounded-md px-2 py-1 flex items-center">
                      <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium">5.0</span>
                    </div>
                    
                    {/* Tags */}
                    <div className="absolute top-3 right-12 flex gap-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.142 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                        </svg>
                        4 Network
                      </span>
                      <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Family
                      </span>
                    </div>
                    
                    {/* Favorite Button */}
                    <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-sm">
                      <svg className="w-4 h-4 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    
                    {/* Image navigation arrows */}
                    <button 
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-md"
                      onClick={() => handleImageChange(num, (activeImageIndexes[num] - 1 + roomImages[num].length) % roomImages[num].length)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button 
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-md"
                      onClick={() => handleImageChange(num, (activeImageIndexes[num] + 1) % roomImages[num].length)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Dots indicator - now interactive */}
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
                      {roomImages[num].map((_, i) => (
                        <button 
                          key={i} 
                          onClick={() => handleImageChange(num, i)}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeImageIndexes[num] ? 'bg-white' : 'bg-white/50 hover:bg-white/70'}`}
                          aria-label={`Show image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Room Details */}
                  <div className="p-5">
                    <h3 className="text-base font-medium mb-3">425 Vine St #339, Seattle, WA 97666</h3>
                    
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex gap-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          3 bathrooms
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          3 bedrooms
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m-2-2h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                          </svg>
                          1200 Sq. Ft
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">Listing Provided by OceanView</div>
                      <div className="text-green-600 font-semibold">$288,000</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Show more button */}
            <div className="flex justify-center mt-12">
              <motion.button
                className="bg-white text-gray-800 border border-gray-200 px-8 py-3 rounded-full text-base font-medium shadow-sm hover:bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                whileTap={{ y: 0 }}
              >
                Show me more
              </motion.button>
            </div>
          </div>
        </div>
      </section>


      {/* Why choose us */}
      <motion.section 
        className="py-24 flex justify-center overflow-hidden bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap">
          {/* Left column - Benefits */}
          <motion.div 
            className="w-full lg:w-1/2 pr-8"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p 
              className="text-sm uppercase tracking-wider text-gray-400 mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              BENEFITS
            </motion.p>
            
            <motion.h2 
              className="text-5xl font-bold mb-12 text-[#1E293B]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Why did you<br />choose us?
            </motion.h2>
            
            {/* Benefit 1 */}
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-xl mb-3">
                Easy access
              </span>
              <h3 className="text-xl font-bold mb-2">Located in the Heart of the City</h3>
              <p className="text-gray-500">Access all key point in the city except wasting time</p>
            </motion.div>
            
            {/* Benefit 2 */}
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-xl mb-3">
                Exposure
              </span>
              <h3 className="text-xl font-bold mb-2">Perfect for Business & Leisure Stays</h3>
              <p className="text-gray-500">Millions of people are searching for unique places to stay around the world</p>
            </motion.div>
            
            {/* Benefit 3 */}
            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="inline-block bg-pink-100 text-pink-700 text-xs font-medium px-2.5 py-1 rounded-xl mb-3">
                Caring
              </span>
              <h3 className="text-xl font-bold mb-2">Personalized Concierge Service</h3>
              <p className="text-gray-500">Our dedicated concierge team is here to cater to your unique needs</p>
            </motion.div>
          </motion.div>

          {/* Right column - Image with testimonials */}
            <motion.div 
            className="w-full lg:w-1/2 relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            >
            <div className="relative">
              {/* Main image - styled as a D-shaped image like in the reference */}
              <motion.div 
              className="overflow-hidden"
              style={{ 
                borderTopLeftRadius: "220px",
                borderTopRightRadius: "0",
                borderBottomRightRadius: "220px",
                borderBottomLeftRadius: "0",
                width: "100%",
                height: "620px"
              }}
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              >
              <motion.img 
                src={chooseUsImg} 
                alt="Why Choose Us" 
                className="w-full h-full object-cover"
                style={{ objectPosition: "right center" }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
              />
              </motion.div>

                {/* Testimonial 1 - Top left */}
                <motion.div 
                  className="absolute top-[10%] -left-16 bg-white rounded-[2.5rem] pr-8 pl-3 py-2 shadow-lg shadow-black/10 flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  {/* Profile image in left corner */}
                  <div className="relative flex-shrink-0 mr-5">
                    <img
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Janith"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {/* Green dot in bottom right, overlapping the image */}
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Janith prabash</p>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-amber-400 text-sm ml-1">5.0</span>
                      <span className="text-gray-400 text-xs ml-1">(122)</span>
                    </div>
                  </div>
                </motion.div>

                {/* Testimonial 2 - Middle right (apply same style as Testimonial 1) */}
                <motion.div 
                className="absolute top-[45%] -right-16 bg-white rounded-[2.5rem] pr-8 pl-3 py-2 shadow-lg shadow-black/10 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
                >
                <div className="relative flex-shrink-0 mr-5">
                <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Nishagi"
                className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div>
                <p className="font-medium text-gray-800 text-sm">Nishagi jeewantha</p>
                <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-amber-400 text-sm ml-1">5.0</span>
                <span className="text-gray-400 text-xs ml-1">(122)</span>
                </div>
                </div>
                </motion.div>

                {/* Testimonial 3 - Bottom left (apply same style as Testimonial 1) */}
                <motion.div 
                className="absolute bottom-[5%] left-[5%] bg-white rounded-[2.5rem] pr-8 pl-3 py-2 shadow-lg shadow-black/10 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.1 }}
                >
                <div className="relative flex-shrink-0 mr-5">
                <img
                src="https://randomuser.me/api/portraits/men/42.jpg"
                alt="Nimna"
                className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                </div>
                <div>
                <p className="font-medium text-gray-800 text-sm">Nimna pathum</p>
                <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-amber-400 text-sm ml-1">5.0</span>
                <span className="text-gray-400 text-xs ml-1">(122)</span>
                </div>
                </div>
                </motion.div>
            </div>
            </motion.div>
        </div>
      </motion.section>

      {/* Explore Sri Lanka */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-6xl font-bold text-[#1E293B] mb-3">Explore Sri Lanka</h2>
            <p className="text-gray-500 text-xl">Discover great places near where you live</p>
          </motion.div>

          {/* Live trending indicator */}
          <motion.div 
            className="flex justify-end mb-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1 }}
          >
            <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 z-20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-600">Live trending destinations</span>
            </div>
          </motion.div>

          {/* Carousel container with proper overflow handling */}
          <div className="relative px-10 py-4">
            <motion.div 
              className="flex gap-5 pb-6 overflow-visible"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                position: 'relative',
              }}
            >
              {/* Use destinations.slice to render only the visible destinations */}
              {destinations.slice(currentIndex, currentIndex + 4).map((destination, index) => (
                <motion.div 
                  key={index}
                  className="min-w-[calc(25%-16px)] flex-shrink-0 relative z-10"
                  whileHover={{ y: -8, zIndex: 30 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                    <img 
                      src={destination.image} 
                      alt={destination.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="text-lg font-semibold">{destination.name}</h3>
                      <p className="text-gray-500 text-sm">{destination.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Previous button */}
            <motion.button 
              className="absolute -left-6 top-1/3 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center z-20"
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 }}
              whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)" 
              }}
              whileTap={{ scale: 0.85, x: -8, rotate: -15 }}
              aria-label="See previous destinations"
              onClick={prevDestinations}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Next button */}
            <motion.button 
              className="absolute -right-6 top-1/3 bg-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center z-20"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.7 }}
              whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)" 
              }}
              whileTap={{ scale: 0.85, x: 8, rotate: 15 }}
              aria-label="See more destinations"
              onClick={nextDestinations}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            {/* Pagination indicators */}
            { <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(destinations.length / 4) }).map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    Math.floor(currentIndex / 4) === idx ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(idx * 4)}
                  whileHover={{ scale: 1.5 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>}
          </div>

          {/* Visual indicator showing which destinations are being displayed */}
          {<motion.div 
            className="text-center mt-4 text-sm text-gray-500 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={currentIndex}
          >
            Showing {currentIndex + 1}-{Math.min(currentIndex + 4, destinations.length)} of {destinations.length} destinations
          </motion.div>}
        </div>
      </section>


      {/* Loyalty Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-3">
              <span className="text-[#1E293B]">Loyalty </span>
              <span className="text-[#5C4DF4]">Benefits</span>
            </h2>
            <p className="text-gray-500 text-lg">Rewarding Your Stay, Every Step of the Way</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Exclusive Discount Rates */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                  src="https://img.freepik.com/free-photo/young-female-with-red-bottle-yellow-background-facial-fit-sport-gym_140725-158570.jpg?semt=ais_hybrid&w=740"
                  alt="Discount icon" 
                  className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1E293B] mb-2">Exclusive Discount Rates</h3>
                  <p className="text-gray-500">Get special pricing on rooms and suites only available to loyalty members.</p>
                </div>
              </div>
            </motion.div>

            {/* Free Room Upgrades */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://img.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg"
                    alt="Room upgrade icon" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1E293B] mb-2">Free Room Upgrades</h3>
                  <p className="text-gray-500">Get complimentary upgrades to better rooms when available.</p>
                </div>
              </div>
            </motion.div>

            {/* Complimentary Food Credits */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg"
                    alt="Food icon" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1E293B] mb-2">Complimentary Food Credits</h3>
                  <p className="text-gray-500">Start your day right or enjoy a free meal on us.</p>
                </div>
              </div>
            </motion.div>

            {/* Loyalty Points Program */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://img.freepik.com/free-vector/loyalty-program-concept_23-2148453058.jpg"
                    alt="Points icon" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1E293B] mb-2">Loyalty Points Program</h3>
                  <p className="text-gray-500">Earn points on every stay and redeem them for rewards or future bookings.</p>
                </div>
              </div>
            </motion.div>

            {/* Personalized Services */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://img.freepik.com/free-photo/hotel-service-bell_23-2148786173.jpg"
                    alt="Services icon" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1E293B] mb-2">Personalized Services</h3>
                  <p className="text-gray-500">Tailored room preferences, amenities, and exclusive concierge assistance.</p>
                </div>
              </div>
            </motion.div>

            {/* Birthday & Anniversary Surprises */}
            <motion.div 
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src="https://img.freepik.com/free-photo/birthday-cake-with-colorful-candles_144627-16745.jpg"
                    alt="Celebration icon" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1E293B] mb-2">Birthday & Anniversary Surprises</h3>
                  <p className="text-gray-500">Special gifts or room decorations to celebrate your important moments.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold text-[#1E293B] mb-3">Gallery</h2>
            <p className="text-gray-500 text-lg">Take a visual journey through <span className="italic font-parisienne text-xl">OceanView</span></p>
          </motion.div>
          
          <motion.div 
            className="bg-[#f0f9f9] rounded-3xl p-8 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main YouTube video player */}
              <motion.div 
                className="w-full lg:w-3/4 relative rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-0 pb-[56.25%]">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-2xl"
                    src="https://www.youtube.com/embed/H1CIBqDeWQ0"
                    title="OceanView Beach Resort"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </motion.div>
                      
              {/* Thumbnails on the right - YouTube videos */}
              <div className="w-full lg:w-1/4 flex flex-row lg:flex-col gap-4">
                {[
                  { id: "UJEUwEJ6gH4", title: "Hotel Introduction" },
                  { id: "hNN9Q3GuWEM", title: "Hotel Showcase" },
                  { id: "cmfeMfdYRFs", title: "Luxury Hotel Experience" },
                  { id: "9I2xta0ahIs", title: "Premium Resort Tour" }
                ].map((video, idx) => (
                  <motion.div 
                    key={idx} 
                    className="relative rounded-xl overflow-hidden w-full h-[120px] cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + (idx * 0.1) }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="relative w-full h-full">
                      {/* YouTube thumbnail image with play button overlay */}
                      <img 
                        src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`} 
                        alt={`${video.title} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                        <motion.div 
                          className="w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          onClick={() => {
                            window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
                          }}
                        >
                          <div className="w-8 h-8 bg-[#5C4DF4] rounded-full flex items-center justify-center pl-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Browse more button */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <button
              className="bg-white border border-gray-200 text-gray-800 px-8 py-3 rounded-full text-base font-medium shadow-sm hover:bg-gray-50"
              style={{
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
              }}
            >
              Browse more
            </button>
          </motion.div>
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
