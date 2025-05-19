import React from 'react';

interface SidebarItemProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, icon, onClick, active }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer hover:bg-accent 
      ${active ? 'bg-accent text-primary' : 'text-muted-foreground'}`}
  >
    {icon}
    <span>{label}</span>
  </div>
);

export default SidebarItem;


