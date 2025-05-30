import React, { useState } from "react";
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
}

const navLinksByRole: Record<string, NavLink[]> = {
  guest: [
    { label: "Home", href: "/" },
    { label: "Room", href: "/room" },
    { label: "Services & Foods", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = navLinksByRole[role] || navLinksByRole.guest;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-gray-800">
            MyLogo
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                {forWhat === "signIn" && (
                  <Button variant="primary" onClick={onSignIn}>
                    Sign In
                  </Button>
                )}
                {forWhat === "signUp" && (
                  <Button variant="primary" onClick={onSignUp}>
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
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white shadow-md">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="block text-gray-700 hover:bg-gray-100 rounded-md px-3 py-2"
              onClick={() => setIsOpen(false)}
            >
              {label}
            </a>
          ))}

          {!isAuthenticated ? (
            <>
              {forWhat === "signIn" && (
                <Button variant="primary" className="w-full" onClick={onSignIn}>
                  Sign In
                </Button>
              )}
              {forWhat === "signUp" && (
                <Button variant="primary" className="w-full" onClick={onSignUp}>
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
    </nav>
  );
};

export default NavBarComponent;
