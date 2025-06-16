import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className = "", ...props }) => (
  <label className="flex items-center gap-2 px-2 py-1 cursor-pointer select-none">
    <input
      type="checkbox"
      className={`form-checkbox h-4 w-4 text-primary border-border rounded ${className}`}
      {...props}
    />
    {label && <span className="text-sm text-text">{label}</span>}
  </label>
);

export default Checkbox;
