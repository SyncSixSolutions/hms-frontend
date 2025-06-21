import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  minDateToday?: boolean; // Enables auto min-date for date fields
}

const Input: React.FC<InputProps> = ({ label, minDateToday, type, ...props }) => {
  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="mb-2 p-2">
      {label && (
        <label className="block mb-1 text-sm font-medium text-text">
          {label}
        </label>
      )}
      <input
        className="w-full px-3 py-2 border border-border rounded-3xl shadow-sm bg-bg text-text 
                   hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary-ring 
                   focus:outline-none transition duration-150 ease-in-out"
        type={type}
        min={type === "date" && minDateToday ? todayDate : props.min}
        {...props}
      />
    </div>
  );
};

export default Input;
