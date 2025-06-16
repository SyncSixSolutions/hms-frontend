import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'border' | 'success' | 'rounded';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base = 'px-4 py-2 font-medium transition-colors duration-200';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-2 focus:ring-primary-ring rounded-xl',
    secondary: 'bg-border text-text hover:bg-gray-200 rounded-xl',
    danger: 'bg-red-500 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-300 rounded-xl',
    border: 'border-2 border-primary text-primary bg-bg hover:bg-primary hover:text-bg focus:ring-2 focus:ring-primary-ring rounded-xl',
    success: 'bg-success text-white hover:bg-success-hover focus:ring-2 focus:ring-success-ring rounded-xl',
    rounded: 'bg-[#2D60FF] text-white px-6 py-3 rounded-full text-sm hover:bg-[#254FCF]', // new rounded button
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
