import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    selected?: string;
    placeholder?: string;
    onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    selected,
    placeholder = 'Select an option',
    onSelect,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    const selectedLabel = options.find((opt) => opt.value === selected)?.label;

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="w-full px-4 py-2 border rounded-3xl flex justify-between items-center bg-bg border-border hover:border-primary cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary-ring focus:outline-none transition duration-150 ease-in-out"
            >
                <span className="text-text">{selectedLabel || placeholder}</span>
                <ChevronRight
                    className={`h-4 w-4 text-text transition-transform duration-200 ${isOpen ? 'rotate-90' : 'rotate-0'
                        }`}
                />
            </button>

            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-bg border border-border rounded-3xl shadow-lg max-h-60 overflow-auto animate-fade-in">
                    {options.map((option) => (
                        <li
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className="block px-4 py-2 w-full hover:bg-primary-hover cursor-pointer transition-colors duration-200 text-text"
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>

    );
};

export default Dropdown;
