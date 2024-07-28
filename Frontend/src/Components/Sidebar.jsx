// Sidebar.js
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faSearch } from "@fortawesome/free-solid-svg-icons";
import me from "../assets/me.jpg";

const Nav = styled.div`
  background: #f5f5f5;
  height: 70px;
  display: flex;
  border-radius: 20px;
  color: #00007d;
  width: 280px;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const Icon = styled.div`
  font-size: 20px;
  color: #9847be;
  margin-left: 1rem;
`;

const NavIcon = styled.div`
  margin-left: 2rem;
  text-decoration: none;
  font-size: 20px;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #fff;
  width: 280px;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  position: fixed;
  top: 80px;
  left: ${({ isOpen }) => (isOpen ? "0" : "-280px")};
  transition: 0.3s ease;
  z-index: 10;
  overflow-y: auto;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const RightSidebar = styled.div`
  width: ${({ isOpen }) => (isOpen ? "400px" : "0")};
  background: #f5f4f4;
  overflow-x: hidden;
  transition: width 0.3s ease;
  height: 40px;
  position: fixed;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  right: 0;
  z-index: 100;
  justify-content: end;
  margin-right: 1rem;
`;

const SearchInput = styled.input`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #9847be;
  margin-left: 10px;
`;

function Sidebar({ isOpen, toggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  const currentUserRole = "admin";

  const filteredSidebarData = SidebarData.filter((item) => {
    if (!item.roles) {
      return true;
    }
    if (item.roles.includes(currentUserRole)) {
      return true;
    }
    return false;
  });

  return (
    <>
      <Nav className="flex flex-col">
        <NavIcon className="">
          <div className="flex ">
            <div>
              <p className="font-bold">
                {" "}
                Sell<span className="logo">Wise</span>
              </p>
            </div>

            <div className="ml-28">
              <Icon onClick={() => toggleSidebar(!isOpen)}>
                {isOpen ? (
                  <FontAwesomeIcon icon={faAngleLeft} className="cursor-pointer" />
                ) : (
                  <FaBars className="cursor-pointer" />
                )}
              </Icon>
            </div>
          </div>
        </NavIcon>
      </Nav>
      <RightSidebar isOpen={isOpen}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={faSearch} className="cursor-pointer" />
          <SearchInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="focus:bg-purple-100 cursor-pointer border-purple-500"
          />
        </div>
        <img src={me} alt="profile-here" className="w-10 h-10 rounded-full" />
      </RightSidebar>

      <SidebarNav isOpen={isOpen} ref={sidebarRef} className="flex flex-col h-full overflow-hidden">
        {/* Profile Section */}
        <div className="profile-container mr-5 ml-5 mt-3 p-5 rounded-xl flex flex-row items-center">
          <img src={me} alt="profile-here" className="w-14 h-14 rounded-full" />
          <div className="ml-3">
            <p className="font-bold">Meti Tamiru</p>
            <span className="text-sm text-gray-500">Description Here</span>
          </div>
        </div>

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
      </SidebarNav>
    </>
  );
}

export default Sidebar;
