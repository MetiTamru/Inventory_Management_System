import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from '../Components/AuthContext';
import { faAngleLeft, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo01.jpg";
import { Link } from "react-router-dom";


const Nav = styled.div`
  background: #f5f5f5;
  height: 70px;
  display: flex;
  border-radius: 20px;
  color: #00007d;
  width: 250px;
  position: fixed;
  top: 0;
  z-index: 1000;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 20px;
  color: #9847be;
  margin-left: 1rem;
  cursor: pointer;
`;

const NavIcon = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const SidebarNav = styled.nav`
  background: #fff;
  width: 250px;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  position: fixed;
  top: 80px;
  left: ${({ isOpen }) => (isOpen ? "0" : "-250px")};
  transition: 0.3s ease;
  z-index: 10;
  overflow-y: auto;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;


function Sidebar({ userRole, isOpen, toggleSidebar }) {
  const { user } = useAuth();
  const { setUser } = useAuth();

  console.log('User:', user); 
  console.log('Sidebar open state:', isOpen);
  const [openIndex, setOpenIndex] = useState(null);
  const sidebarRef = useRef(null);

  const toggleSubNav = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      if (window.innerWidth < 900) {
        toggleSidebar(false);
      }
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredSidebarData = SidebarData.map((item) => {
    const filteredSubNav = item.subNav
      ? item.subNav.filter((subItem) => {
          if (!subItem.roles) {
            return true;
          }
          return subItem.roles.includes(user.role);
        })
      : [];

    if (!item.roles || item.roles.includes(user.role)) {
      return { ...item, subNav: filteredSubNav };
    }
    return null;
  }).filter((item) => item !== null);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  const handleLogout = () => {
    
    setUser({ email: '', role: '', name: '' });
    localStorage.removeItem('user');
    window.location.href= "/Authentication/log-in"
  };


  return (
    <>
      <Nav className="flex flex-col">
        <NavIcon>
          <div >
            <img src={logo} alt="Logo" style={{ height: "55px",
              marginTop: "10px",
             width: "100px",
             marginLeft:"10px" }} />
          </div>
          <Icon onClick={() => toggleSidebar(!isOpen)} className="mt-3">
            {isOpen ? (
              <FontAwesomeIcon icon={faAngleLeft} />
            ) : (
              <FaBars />
            )}
          </Icon>
        </NavIcon>
      </Nav>
      
      <SidebarNav isOpen={isOpen} ref={sidebarRef} className="flex flex-col h-full overflow-hidden">
        {/* Profile Section */}
        <Link to={"/user-profile"}>
        
        <div className="profile-container  ml-5 mr-5 mt-3 p-5 rounded-xl flex flex-row items-center gap-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-white">
          {user.name[0]}
        </div>
        <div className="ml-4">
          <p className="font-bold text-lg text-gray-800">{capitalizeFirstLetter(user.name)}</p>
          <span className="text-sm text-gray-500">{user.role}</span>
        </div>
        </div>
        </Link>
        

        {/* Sidebar Items */}
        <SidebarWrap className="flex-1 sidebar-wrap">
          {filteredSidebarData.map((item, index) => (
            <SubMenu
              item={item}
              key={index}
              isOpen={openIndex === index}
              toggleSubnav={() => toggleSubNav(index)}
            />
          ))}
        </SidebarWrap>
        <div className="sidebar-logout mt-auto mb-3 py-2 px-4 flex items-center gap-4 rounded-lg cursor-pointer" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span>Logout</span>
      </div>
      </SidebarNav>
    </>
  );
}

export default Sidebar;
