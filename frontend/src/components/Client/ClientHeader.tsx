import React from "react";
import defaultProfileImage from "../../assets/images/profile_image.jpeg";

interface ClientHeaderProps {
  userName: string;
  date: string;
  profileImageUrl?: string;
  onSearchChange?: (value: string) => void;
  onProfileClick?: () => void;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({
  userName,
  date,
  profileImageUrl,
  onSearchChange,
  onProfileClick,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange?.(e.target.value);
  };

  return (
    <div className="flex justify-between items-center mb-6 md:flex-row flex-col md:items-center items-start">
      <div>
        <h1 className="text-2xl font-medium text-gray-700">
          Welcome, {userName}
        </h1>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
      <div className="flex items-center md:mt-0 mt-4">
        <div className="relative mr-4">
          <input
            type="search"
            placeholder="Search"
            className="pl-4 pr-10 py-2 rounded-lg border border-gray-200 w-64 focus:outline-none focus:ring-2 transition-all"
            style={
              {
                "--tw-ring-color": "#6B72D6",
                focusRingColor: "#6B72D6",
              } as React.CSSProperties & { "--tw-ring-color": string }
            }
            onChange={handleSearchChange}
          />
          <div className="absolute right-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div
          className="w-10 h-10 overflow-hidden rounded-full cursor-pointer hover:ring-2 transition-all"
          style={
            { "--tw-ring-color": "#6B72D6" } as React.CSSProperties & {
              "--tw-ring-color": string;
            }
          }
          onClick={onProfileClick}
        >
          <img
            src={profileImageUrl || defaultProfileImage}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://via.placeholder.com/40x40/6B72D6/ffffff?text=${userName.charAt(
                0
              )}`;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;
