import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt,faTruck,  faChartBar, faCogs, faChartLine, faCreditCard,  faListAlt, faBoxes, faReceipt, faCashRegister, faBoxOpen, faCubes, faFileInvoice, faUserTie, faCalendarAlt, faUndo, faChartPie, faAreaChart, faUsersCog, faBell, faExclamationTriangle, faEnvelopeOpenText, faUserFriends, faGift, faCog, faExchangeAlt, faUserPlus, faSearch} from "@fortawesome/free-solid-svg-icons";


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <FontAwesomeIcon icon={faTachometerAlt} />,
    roles: ["admin", "seller", "manager"],
  },
  {
    title: 'Manage Items',
    path: '/manage-items',
    icon: <FontAwesomeIcon icon={faReceipt} />,
    roles: ["admin", "seller", "manager"],

    
    subNav: [
      {
        title: 'Items List',
        path: '/manage-items/view-items',
        icon: <FontAwesomeIcon icon={faReceipt} />,
        roles: ["admin", "seller", "manager"],

      },
      {
        title: 'Add Item',
        path: '/manage-items/add-item',
        icon: <FontAwesomeIcon icon={faCashRegister} />,
        roles: ["admin", "seller", "manager"],

      },
      {
        title: 'Sales Reports',
        path: '/sales-management/sales-report',
        icon: <FontAwesomeIcon icon={faChartLine} />,
        roles: ["admin", "seller", "manager"],

      },
    ],
  },
  {
    title: 'Inventory Management',
    path: '/inventory-management',
    icon: <FontAwesomeIcon icon={faBoxOpen} />,
    roles: ["admin", "manager"],
    subNav: [

  
      {
        title: 'Suppliers',
        path: '/inventory-management/suppliers',
        icon: <FontAwesomeIcon icon={faTruck} />,
        roles: ["admin", "manager"],
      },
      {
        title: 'Add Supplier',
        path: '/inventory-management/add-supplier',
        icon: <FontAwesomeIcon icon={faUserPlus} />,
        roles: ["admin", "manager"],
      },
    ],
  },
  {
    title: 'Employee Management',
    path: '/employe-management',
    icon: <FontAwesomeIcon icon={faUserTie} />,
    roles: ["admin", "manager"],
    subNav: [
      {
        title: 'Employee List',
        path: '/employe-management/emloyee-list',
        icon: <FontAwesomeIcon icon={faUserTie} />,
        roles: ["admin", "manager"],
      },
      {
        title: 'Performance Tracking',
        path: '/employe-management/performance-tracking',
        icon: <FontAwesomeIcon icon={faChartBar} />,
        roles: ["admin", "manager"],
      },
      {
        title: 'Shift Management',
        path: '/employe-management/shift-management',
        icon: <FontAwesomeIcon icon={faCalendarAlt} />,
        roles: ["admin", "manager"],
      },
      
    ],
  },
  {
    title: 'Check Availablity',
    path: '/check-availablity',
    icon: <FontAwesomeIcon icon={faSearch} />,
    roles: ["admin", "manager"],
   
  },
  {
    title: 'Reports and Analytics',
    path: '/reports-and-analytics',
    icon: <FontAwesomeIcon icon={faChartBar} />,
    roles: ["admin", "manager"],
    subNav: [
      {
        title: 'Sales Reports',
        path: '/reports-and-analytics/sales-reports',
        icon: <FontAwesomeIcon icon={faChartPie} />,
        roles: ["admin", "manager"],
      },
      {
        title: 'Inventory Reports',
        path: '/reports-and-analytics/inventory-reports',
        icon: <FontAwesomeIcon icon={faBoxes} />,
        roles: ["admin", "manager"],
      },
      {
        title: 'Employee Reports',
        path: '/reports-and-analytics/employee-reports',
        icon: <FontAwesomeIcon icon={faAreaChart} />,
        roles: ["admin", "manager"],
      },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <FontAwesomeIcon icon={faCog} />,
    roles: ["admin"],
    subNav: [
      {
        title: 'Store Settings',
        path: '/settings/store-setting',
        icon: <FontAwesomeIcon icon={faCogs} />,
        roles: ["admin"],
      },
      {
        title: 'User Roles and Permissions',
        path: '/settings/user-role-and-permissions',
        icon: <FontAwesomeIcon icon={faUsersCog} />,
        roles: ["admin"],
      },
      {
        title: 'Notification Settings',
        path: '/settings/notification-setting',
        icon: <FontAwesomeIcon icon={faBell} />,
        roles: ["admin"],
      },
    ],
  },

  {
    title: 'Notifications and Alerts',
    path: '/notification-and-alert',
    icon: <FontAwesomeIcon icon={faBell} />,
    roles: ["admin", "manager"],
    subNav: [
      {
        title: 'Alerts List',
        path: '/notification-and-alert/alert-list',
        icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
        roles: ["admin", "manager"],
      },
      {
        title: 'Notification Preferences',
        path: '/notification-and-alert/notification-preference',
        icon: <FontAwesomeIcon icon={faEnvelopeOpenText} />, 
        roles: ["admin", "manager"],

      },
      
      
    ],
  },
  {
    title: 'Customer Management',
    path: '/customer-managemenet',
    icon: <FontAwesomeIcon icon={faUserFriends} />,
    roles: ["admin", "seller"],
    subNav: [
      {
        title: 'Customer List',
        path: '/customer-managemenet/customer-list',
        icon: <FontAwesomeIcon icon={faUserFriends} />,
        roles: ["admin", "seller"],
      },
      {
        title: 'Loyalty Programs',
        path: '/customer-managemenet/loyality-programs',
        icon: <FontAwesomeIcon icon={faGift} />, 
        roles: ["admin", "seller"],
      },
      
      
    ],
  },
];
