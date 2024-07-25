import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Adjust the path as needed

const MainComponent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="app-container">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        className="content-container"
        style={{
          marginLeft: sidebarOpen ? '270px' : '0',
          transition: 'margin-left 0.3s ease',
          /* Ensure content adjusts based on screen size */
          '@media (maxWidth: 1024px)': {
            marginLeft: '0',
          },
        }}
      >

      </div>
    </div>
  );
};

export default MainComponent;
