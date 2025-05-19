import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'border' | 'success';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const base = 'px-4 py-2 rounded-xl font-medium transition-colors duration-200';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-2 focus:ring-primary-ring',
    secondary: 'bg-border text-text hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-300',
    border: 'border-2 border-primary text-primary bg-bg hover:bg-primary hover:text-bg focus:ring-2 focus:ring-primary-ring',
    success: 'bg-success text-white hover:bg-success-hover focus:ring-2 focus:ring-success-ring',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
