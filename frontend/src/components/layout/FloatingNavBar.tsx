import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaCalendarAlt, FaUser, FaUsers, FaCog } from "react-icons/fa";

interface NavItem {
    label: string;
    icon: React.ReactNode;
    path: string;
}

interface FloatingNavBarProps {
    role: "admin" | "user" | "manager"; // Add/adjust roles as needed
}

const navItemsByRole: Record<string, NavItem[]> = {
    admin: [
        {
            label: "Dashboard",
            icon: <FaTachometerAlt />,
            path: "/dashboard",
        },
        {
            label: "Users",
            icon: <FaUsers />,
            path: "/users",
        },
        {
            label: "Settings",
            icon: <FaCog />,
            path: "/settings",
        },
        {
            label: "Profile",
            icon: <FaUser />,
            path: "/profile",
        },
    ],
    user: [
        {
            label: "Dashboard",
            icon: <FaTachometerAlt />,
            path: "/dashboard",
        },
        {
            label: "Reservation",
            icon: <FaCalendarAlt />,
            path: "/reservation",
        },
        {
            label: "Profile",
            icon: <FaUser />,
            path: "/profile",
        },
    ],
    manager: [
        {
            label: "Dashboard",
            icon: <FaTachometerAlt />,
            path: "/dashboard",
        },
        {
            label: "Reservation",
            icon: <FaCalendarAlt />,
            path: "/reservation",
        },
        {
            label: "Users",
            icon: <FaUsers />,
            path: "/users",
        },
        {
            label: "Profile",
            icon: <FaUser />,
            path: "/profile",
        },
    ],
};

const FloatingNavBar: React.FC<FloatingNavBarProps> = ({ role }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = navItemsByRole[role] || [];

    return (
        <div
            className={`
                fixed left-0 top-1/2 -translate-y-1/2
                flex flex-col items-center
                bg-primary-500 text-white shadow-lg z-50
                w-12
                rounded-r-3xl
                justify-center
                transition-all
                duration-300
            `}
            style={{
                height: `${navItems.length * 64 + 32}px`,
                minHeight: "min-content",
                maxHeight: "90vh",
                paddingTop: "16px",
                paddingBottom: "16px",
            }}
        >
            <ul className="flex flex-col gap-2 w-full">
                {navItems.map((item) => (
                    <li
                        key={item.path}
                        className={`
                            flex flex-col items-center justify-center
                            py-4 cursor-pointer
                            transition-colors duration-200
                            ${location.pathname === item.path ? "bg-gray-900" : ""}
                        `}
                        onClick={() => navigate(item.path)}
                        title={item.label}
                    >
                        <span className="text-xl hover:text-primary-700">{item.icon}</span>
                        <span className="text-xs mt-1 block md:hidden">{item.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FloatingNavBar;