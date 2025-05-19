import React from 'react';

interface NavbarProps {
  children?: React.ReactNode;
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ children, className = '' }) => (
  <nav className={`w-full bg-white border-b border-border p-4 flex justify-between items-center ${className}`}>
    {children}
  </nav>
);

export default Navbar;
