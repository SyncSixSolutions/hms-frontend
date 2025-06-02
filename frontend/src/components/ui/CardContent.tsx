import React from "react";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children, className = "", ...props }) => (
  <div
    className={`p-4 bg-bg rounded-2xl shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default CardContent;
