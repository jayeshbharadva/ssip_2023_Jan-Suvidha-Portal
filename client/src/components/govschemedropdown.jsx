// CustomSelect.js
import React, { useState, useEffect } from 'react';

function CustomSelect({ listname, options, onSelectedChange, initialSelectedValues }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Set initial selected values when component mounts
    if (initialSelectedValues) {
      setSelectedValues(initialSelectedValues);
    }
  }, [initialSelectedValues]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((v) => v !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleApply = () => {
    onSelectedChange(selectedValues);
    setIsOpen(false);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left font-sans">
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex justify-between w-full p-4 border rounded-md shadow-sm z-50"
        id="dropdown-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <span className="font-bold text-lg">{listname}</span>
        <span className={`ml-2 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="p-2">
            <input
              type="text"
              className="w-full border p-2 mb-2 rounded-md"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filteredOptions.map((option) => (
              <label
                key={option}
                className={`flex items-center justify-between px-4 py-2 text-sm leading-5 text-gray-700 cursor-pointer hover:bg-gray-100 ${selectedValues.includes(option) ? 'bg-gray-200' : ''}`}
              >
                <span>{option}</span>
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 accent-[#19514F] bg-[#19514F]"
                  checked={selectedValues.includes(option)}
                  onChange={() => selectOption(option)}
                />
              </label>
            ))}
          </div>
          <button
            className="apply-button w-full p-2 text-white bg-[#19514F] rounded-md"
            onClick={handleApply}
            disabled={selectedValues.length === 0}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
