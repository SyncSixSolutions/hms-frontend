import React from 'react';

interface TabNavProps {
  children: React.ReactNode;
  className?: string;
}

const TabNav: React.FC<TabNavProps> = ({ children, className = '' }) => (
  <div className={`flex space-x-4 border-b border-border p-2 ${className}`}>
    {children}
  </div>
);

export default TabNav;
