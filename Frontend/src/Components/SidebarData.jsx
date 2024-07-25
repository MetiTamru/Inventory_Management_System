import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faCaretDown,faArchive , faUsers, faTruck, faSearch,  faCheckCircle, faCartShopping, faChartBar, faStar, faListCheck, faCheckToSlot ,faCogs,faClipboardList,faTasks,faBox, faUserAlt, faPlus, faCirclePlus, faUser, faBook, faUserCheck, faList, faPlusCircle, faChartColumn, faChartLine, faCreditCard, faFileInvoiceDollar, faListAlt, faBoxes, faReceipt, faCashRegister, faBoxOpen, faCubes, faFileInvoice, faUserTie, faCalendarAlt, faUndo, faChartPie, faAreaChart, faUsersCog, faBell, faExclamationTriangle, faEnvelopeOpenText, faUserFriends, faGift, faCog, faExchangeAlt} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <FontAwesomeIcon icon={faTachometerAlt} />,
  },
  {
    title: 'Sales Management',
    path: '/sales-managment',
    icon: <FontAwesomeIcon icon={faReceipt} />,

    subNav: [
      {
        title: 'Sales Overview',
        path: '/sales-managment/sales-overview',
        icon: <FontAwesomeIcon icon={faReceipt} />,
      },
      {
        title: 'New Sale',
        path: '/sales-managment/new-sales',
        icon: <FontAwesomeIcon icon={faCashRegister} />,
      },
      {
        title: 'Sales Reports',
        path: '/sales-managment/sales-report',
        icon: <FontAwesomeIcon icon={faChartLine} />,
      },
    ],
  },
  {
    title: 'Inventory Management',
    path: '/inventory-managment',
    icon: <FontAwesomeIcon icon={faBoxOpen} />,
    subNav: [
      {
        title: 'Product List',
        path: '/inventory-management/product-list',
        icon: <FontAwesomeIcon icon={faBoxOpen} />,
      },
      {
        title: 'Stock Levels',
        path: '/inventory-management/stock-level',
        icon: <FontAwesomeIcon icon={faCubes} />,
      },
      {
        title: 'Suppliers',
        path: '/inventory-management/suppliers',
        icon: <FontAwesomeIcon icon={faTruck} />,
      },
      {
        title: 'Purchase Orders',
        path: '/inventory-management/purchase-orders',
        icon: <FontAwesomeIcon icon={faFileInvoice} />,
      },
    ],
  },
  {
    title: 'Employee Management',
    path: '/employe-management',
    icon: <FontAwesomeIcon icon={faUserTie} />,
    subNav: [
      {
        title: 'Employee List',
        path: '/employe-management/emloyee-list',
        icon: <FontAwesomeIcon icon={faUserTie} />,
      },
      {
        title: 'Performance Tracking',
        path: '/employe-management/performance-tracking',
        icon: <FontAwesomeIcon icon={faChartBar} />,
      },
      {
        title: 'Shift Management',
        path: '/employe-management/shift-management',
        icon: <FontAwesomeIcon icon={faCalendarAlt} />,
      },
      
    ],
  },
  {
    title: 'Transaction Management',
    path: '/transaction-management',
    icon: <FontAwesomeIcon icon={faExchangeAlt} />,
    subNav: [
      {
        title: 'Transaction List',
        path: '/transaction-management/transactio-list',
        icon: <FontAwesomeIcon icon={faListAlt} />,
      },
      {
        title: 'Refunds and Returns',
        path: '/transaction-management/refund-and-return',
        icon: <FontAwesomeIcon icon={faUndo} />,
      },
      {
        title: 'Payment Methods',
        path: '/transaction-management/payment-methods',
        icon: <FontAwesomeIcon icon={faCreditCard} />,
      },
    ],
  },
  {
    title: 'Reports and Analytics',
    path: '/reports-and-analytics',
    icon: <FontAwesomeIcon icon={faChartBar} />,
    subNav: [
      {
        title: 'Sales Reports',
        path: '/reports-and-analytics/sales-reports',
        icon: <FontAwesomeIcon icon={faChartPie} />,
      },
      {
        title: 'Inventory Reports',
        path: '/reports-and-analytics/inventory-reports',
        icon: <FontAwesomeIcon icon={faBoxes} />,
      },
      {
        title: 'Employee Reports',
        path: '/reports-and-analytics/employee-reports',
        icon: <FontAwesomeIcon icon={faAreaChart} />,
      },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <FontAwesomeIcon icon={faCog} />,
    subNav: [
      {
        title: 'Store Settings',
        path: '/settings/store-setting',
        icon: <FontAwesomeIcon icon={faCogs} />,
      },
      {
        title: 'User Roles and Permissions',
        path: '/settings/user-role-and-permissions',
        icon: <FontAwesomeIcon icon={faUsersCog} />,
      },
      {
        title: 'Notification Settings',
        path: '/settings/notification-setting',
        icon: <FontAwesomeIcon icon={faBell} />,
      },
    ],
  },

  {
    title: 'Notifications and Alerts',
    path: '/notification-and-alert',
    icon: <FontAwesomeIcon icon={faBell} />,
    subNav: [
      {
        title: 'Alerts List',
        path: '/notification-and-alert/alert-list',
        icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
      },
      {
        title: 'Notification Preferences',
        path: '/notification-and-alert/notification-preference',
        icon: <FontAwesomeIcon icon={faEnvelopeOpenText} />, // Invoice or payment related icon
      },
      
      
    ],
  },
  {
    title: 'Customer Management',
    path: '/customer-managemenet',
    icon: <FontAwesomeIcon icon={faUserFriends} />,
    subNav: [
      {
        title: 'Customer List',
        path: '/customer-managemenet/customer-list',
        icon: <FontAwesomeIcon icon={faUserFriends} />,
      },
      {
        title: 'Loyalty Programs',
        path: '/customer-managemenet/loyality-programs',
        icon: <FontAwesomeIcon icon={faGift} />, // Invoice or payment related icon
      },
      
      
    ],
  },
];
