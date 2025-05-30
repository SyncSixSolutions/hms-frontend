import React from 'react';

const Footer: React.FC = () => (
    <footer className="w-full py-4 text-center bg-gray-100 text-gray-600 text-sm z-10">
        &copy; {new Date().getFullYear()} @NovaSynergy. All rights reserved.
    </footer>
);

export default Footer;
