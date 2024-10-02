import React, { useState } from "react";
import displayImg from "../Assets/Display.svg";
import downArrow from "../Assets/down.svg";
import "./Dropdown.css";

const Dropdown = ({ options, onGroupByChange, onSortByChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGroupByChange = (event) => {
    onGroupByChange(event.target.value);
  };

  const handleSortByChange = (event) => {
    onSortByChange(event.target.value);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        <img src={displayImg} alt="display" />
        Display
        <img src={downArrow} alt="down" />
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <label>Grouping</label>
            <select onChange={handleGroupByChange}>
              {options[0].values.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="dropdown-section">
            <label>Ordering</label>
            <select onChange={handleSortByChange}>
              {options[1].values.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
