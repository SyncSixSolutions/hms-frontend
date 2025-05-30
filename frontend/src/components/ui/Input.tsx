import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => (
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
      {...props}
    />
  </div>
);

export default Input;
