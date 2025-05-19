import React from 'react';

interface TabItemProps {
  label: string;
  active?: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-t font-medium ${
      active ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-primary'
    }`}
  >
    {label}
  </button>
);

export default TabItem;
