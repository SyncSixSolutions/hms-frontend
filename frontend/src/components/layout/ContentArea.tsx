import React from 'react';

interface ContentAreaProps {
  children: React.ReactNode;
  className?: string;
}

const ContentArea: React.FC<ContentAreaProps> = ({ children, className = '' }) => (
  <main className={`flex-1 p-6 ${className}`}>
    {children}
  </main>
);

export default ContentArea;
