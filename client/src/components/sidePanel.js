import React from "react";
import "./sidePanel.css"; // Import styles
import logo from "../logo.svg"; // Replace with your logo

const SidePanel = () => {
  return (
    <div className="side-panel">
      <img src={logo} alt="Logo" className="logo" />
      <p>
        This system streamlines FYP management, making it easier for students and supervisors to collaborate.
      </p>
    </div>
  );
};

export default SidePanel;
