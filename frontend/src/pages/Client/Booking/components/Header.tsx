import React from "react";

import profile from "./../../../../assets/images/avatar.jpg";

interface HeaderProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="flex items-center justify-end w-full p-3 bg-gray-100">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3  backdrop-blur-sm px-4 py-2 ">
          <div className="relative">
            <div className="flex flex-row items-center">
              
              <div className="h-10 w-10 rounded-full overflow-hidden bg-orange-100">
                <img
                  src={profile}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
