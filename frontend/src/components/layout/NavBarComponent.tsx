import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui";
import { Bell } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface NavBarProps {
  role?: "guest" | "user" | "admin";
  isAuthenticated?: boolean;
  forWhat?: "signIn" | "signUp" | "profile";
  onSignIn?: () => void;
  onSignUp?: () => void;
  onProfileClick?: () => void;
  profileImageUrl?: string;
  activeLink?: string; // New prop to highlight active nav link
}

const navLinksByRole: Record<string, NavLink[]> = {
  guest: [
    { label: "Home", href: "/" },
    { label: "Rooms", href: "/rooms" },
    { label: "Services & Foods", href: "/services" },
    { label: "Contact Us", href: "/contact" },
    { label: "Hotel Policies", href: "/policies" },
    { label: "About Us", href: "/about" },
  ],
  user: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Bookings", href: "/bookings" },
  ],
  admin: [
    { label: "Admin Panel", href: "/admin" },
    { label: "Users", href: "/admin/users" },
  ],
};

const NavBarComponent: React.FC<NavBarProps> = ({
  role = "guest",
  isAuthenticated = false,
  forWhat = "signIn",
  onSignIn,
  onSignUp,
  onProfileClick,
  profileImageUrl,
  activeLink = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = navLinksByRole[role] || navLinksByRole.guest;

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-10 md:px-20 py-6 md:py-8 bg-white shadow-md"
    >
      {/* Logo */}
      <motion.h1
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-4xl font-parisienne text-[#000957]"
      >
        OceanView
      </motion.h1>

      {/* Desktop Navigation */}
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="hidden md:flex space-x-8"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {navLinks.map((item, i) => (
          <motion.li
            key={item.label}
            variants={{
              hidden: { opacity: 0, y: -10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.1 * i, duration: 0.4 },
              },
            }}
            className={`cursor-pointer text-base font-medium transition ${
              activeLink.toLowerCase() === item.label.toLowerCase()
                ? "text-blue-600 font-semibold"
                : "text-[#6B7280] hover:text-blue-500"
            }`}
          >
            <a href={item.href}>{item.label}</a>
          </motion.li>
        ))}
      </motion.ul>

      {/* Right Side Buttons or Profile */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="hidden md:flex items-center space-x-4"
      >
        {!isAuthenticated ? (
          <>
            {forWhat === "signIn" && (
              <Button variant="rounded" onClick={onSignIn}>
                Sign In
              </Button>
            )}
            {forWhat === "signUp" && (
              <Button variant="rounded" onClick={onSignUp}>
                Sign Up
              </Button>
            )}
          </>
        ) : (
          <>
            <button className="relative p-2 text-gray-600 hover:text-gray-800">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>
            <button onClick={onProfileClick}>
              <img
                src={profileImageUrl || "/default-profile.png"}
                alt="Profile"
                className="h-8 w-8 rounded-full object-cover border"
              />
            </button>
          </>
        )}
      </motion.div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-gray-900"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md px-4 py-4 space-y-2 md:hidden">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`block rounded-md px-3 py-2 ${
                activeLink.toLowerCase() === label.toLowerCase()
                  ? "text-blue-600 font-semibold bg-blue-50"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </a>
          ))}

          {!isAuthenticated ? (
            <>
              {forWhat === "signIn" && (
                <Button variant="rounded" className="w-full" onClick={onSignIn}>
                  Sign In
                </Button>
              )}
              {forWhat === "signUp" && (
                <Button variant="rounded" className="w-full" onClick={onSignUp}>
                  Sign Up
                </Button>
              )}
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <img
                src={profileImageUrl || "/default-profile.png"}
                className="w-8 h-8 rounded-full"
                alt="Profile"
              />
              <span className="text-gray-700 font-medium">My Profile</span>
            </div>
          )}
        </div>
      )}
    </motion.nav>
  );
};

export default NavBarComponent;
