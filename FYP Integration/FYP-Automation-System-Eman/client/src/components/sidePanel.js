import React, { useState } from "react";
import "./sidePanel.css"; // Import styles
import logo from "../logo.svg"; // Replace with your logo

const SidePanel = () => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-panel ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-button" onClick={togglePanel}>
        {isOpen ? "Close" : "Open"}
      </button>
      {isOpen && (
        <>
          <img src={logo} alt="Logo" className="logo" />
          <p>
            This system streamlines FYP management, making it easier for students and supervisors to collaborate.
          </p>
        </>
      )}
    </div>
  );
};

export default SidePanel;
