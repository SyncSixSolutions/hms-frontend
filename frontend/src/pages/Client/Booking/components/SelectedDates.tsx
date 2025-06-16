import React from 'react';
import { X, Calendar } from 'lucide-react';

interface SelectedDatesProps {
  selectedDates: Date[];
  onRemoveDate: (date: Date) => void;
  onReset: () => void;
}

export const SelectedDates: React.FC<SelectedDatesProps> = ({
  selectedDates,
  onRemoveDate,
  onReset,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  if (selectedDates.length === 0) {
    return (
      <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="text-center py-8">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No dates selected</p>
          <p className="text-sm text-gray-500 mt-1">Click on calendar dates to add them</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Selected Dates ({selectedDates.length})
        </h3>
        <button
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:bg-white/20 px-3 py-1 rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {selectedDates.map((date, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white/20 rounded-lg px-3 py-2 group hover:bg-white/30 transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">
              {formatDate(date)}
            </span>
            <button
              onClick={() => onRemoveDate(date)}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all"
            >
              <X className="h-4 w-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/20">
        <p className="text-xs text-gray-600">
          Total: {selectedDates.length} day{selectedDates.length !== 1 ? 's' : ''} selected
        </p>
      </div>
    </div>
  );
};