import React from 'react';

interface CardProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => (
  <div className={`p-4 bg-bg text-text border border-border rounded-2xl shadow ${className}`}>
    {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
    {children}
  </div>
);

export default Card;
