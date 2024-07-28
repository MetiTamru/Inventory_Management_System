import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp, faAngleDown, faAngleUp, faCircle, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Nav.css"
const SidebarLink = styled(NavLink)`
  display: flex;
  color: #000;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 17px;
  margin-left:2rem;
  margin:10px;

  transition: all 0.3s ease;

  &:hover {
    
    margin-left:15px;
    cursor: pointer;
  }

  &.active {
   color: #9847be;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
  font-size:15px;
 
`;
const SubnavIcon = styled(Link)`

font-size:15px;
height:80px;
display:flex;
justify-content:flex-start;
align-items:center;
color: grey;
transition: color 0.3s ease;
text-decoration: none;

`;

const DropdownLink = styled(NavLink)`
 
  background: #f5f5f5;
  height: 40px;
  padding-top: 25px;
  gap:5px;
  margin-left: 20px;
  margin-right: 30px;
  
  padding-bottom: 25px;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000;
  font-size: 18px;
  transition: all 0.3s ease;
  text-align: start; 
  
  transition: color 0.3s ease;
  &:hover .active-dot{
   
    cursor: pointer;
    
  }

   &.active .active-dot{
    visibility: visible;
    color: #9847be; 
    text-decoration: none;
    font-size:10px;
    margin-right:5px;
    
  }
 &.active .active-icon{
    
    visibility: visible;
    color: #9847be; 
    text-decoration: none;
    
    border-radius:30px;
    
  }

  .active-dot {
    visibility: hidden;
  }
`;



const DropDownIcons = styled.div`
color:#9f9d9d;
font-size:10px;
`
function SubMenu({ item, isOpen, toggleSubnav }) {
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <SidebarLink
        to={item.path}
        onClick={item.subNav && toggleSubnav}
        activeClassName="active"
        className={isOpen ? "show-icons" : ""}
      >
        <div className="active-sidenav">
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <DropDownIcons>
          {item.subNav && isOpen ? (
            <FontAwesomeIcon icon={faAngleUp} />
          ) : item.subNav ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : null}
        </DropDownIcons>
      </SidebarLink>

      {isOpen &&
        item.subNav.map((subItem, index) => (
          <div className="drop-downs" key={index}>
            <DropdownLink to={subItem.path} activeClassName="active" className={isOpen ? "show-icons" : ""}>
              <SubnavIcon>
                <div className="active-dot">
                  <FontAwesomeIcon icon={faCircle} />
                </div>
                <div className="active-icon">{subItem.icon}</div>
              </SubnavIcon>
              <SidebarLabel>{subItem.title}</SidebarLabel>
            </DropdownLink>
          </div>
        ))}
    </IconContext.Provider>
  );
}

export default SubMenu;
