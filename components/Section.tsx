
import React, { useState, ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6 bg-white shadow-lg rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 text-left bg-gray-100 hover:bg-gray-200 focus:outline-none transition-colors duration-150"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </button>
      {isOpen && (
        <div className="p-5 border-t border-gray-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default Section;
    