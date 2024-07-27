import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Adjust the path as needed

const MainComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="app-container h-screen">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`content-container ${sidebarOpen ? "open" : " "}`}
        
      >

      </div>
    </div>
  );
};

export default MainComponent;
