import React from 'react';

const Header: React.FC = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // For demo purposes, using a hardcoded name
  const username = 'Nishagi';

  return (
    <div className="flex justify-between items-center mb-4 px-4 py-3">
      <div>
        <h1 className="text-2xl font-medium text-slate-700">Welcome, {username}</h1>
        <p className="text-sm text-slate-500">{formattedDate}</p>
      </div>
      <div className="h-10 w-10 rounded-full overflow-hidden bg-orange-100">
        <img
          src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Header;