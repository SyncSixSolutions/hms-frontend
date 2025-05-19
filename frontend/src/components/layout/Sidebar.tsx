import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ children, className = '' }) => (
  <aside className={`w-64 bg-white border-r border-border p-4 ${className}`}>
    {children}
  </aside>
);

export default Sidebar;

