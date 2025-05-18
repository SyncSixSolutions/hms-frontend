import React from 'react';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-bg text-text ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
