import React from 'react';

interface DateSidebarProps {
  onQuickSelect: (type: string) => void;
}

export const DateSidebar: React.FC<DateSidebarProps> = ({ onQuickSelect }) => {
  const quickOptions = [
    { label: 'Today', value: 'today' },
    { label: 'Tomorrow', value: 'tomorrow' },
    { label: 'This Week', value: 'thisWeek' },
    { label: 'Next Week', value: 'nextWeek' },
    { label: 'This Month', value: 'thisMonth' },
    { label: 'Next Month', value: 'nextMonth' },
  ];

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Select</h3>
      <div className="space-y-2">
        {quickOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onQuickSelect(option.value)}
            className="w-full text-left px-4 py-3 text-gray-700 hover:bg-white/30 rounded-lg transition-all duration-200 hover:shadow-sm font-medium"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};