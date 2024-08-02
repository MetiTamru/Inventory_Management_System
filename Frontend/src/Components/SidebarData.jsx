import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt,faTruck,  faChartBar, faCogs, faChartLine, faCreditCard,  faListAlt, faBoxes, faReceipt, faCashRegister, faBoxOpen, faCubes, faFileInvoice, faUserTie, faCalendarAlt, faUndo, faChartPie, faAreaChart, faUsersCog, faBell, faExclamationTriangle, faEnvelopeOpenText, faUserFriends, faGift, faCog, faExchangeAlt, faUserPlus, faSearch, faMoneyBill1Wave, faFileInvoiceDollar, faFolderPlus, faFolder} from "@fortawesome/free-solid-svg-icons";


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <FontAwesomeIcon icon={faTachometerAlt} />,
    roles: ["admin", "cashier"],
  },
  {
    title: 'Manage Items',
    path: '/manage-items',
    icon: <FontAwesomeIcon icon={faReceipt} />,
    roles: ["admin", "cashier"],

    
    subNav: [
      {
        title: 'Items List',
        path: '/manage-items/view-items',
        icon: <FontAwesomeIcon icon={faReceipt} />,
        roles: ["admin"],

      },
      {
        title: 'Add Item',
        path: '/manage-items/add-item',
        icon: <FontAwesomeIcon icon={faCashRegister} />,
        roles: ["admin", "cashier"],

      },
      {
        title: 'Categories',
        path: '/manage-items/categories',
        icon: <FontAwesomeIcon icon={faFolderPlus} />,
        roles: ["admin", "cashier"],

      },
      {
        title: 'Add Item',
        path: '/manage-items/add-category',
        icon: <FontAwesomeIcon icon={faFolder} />,
        roles: ["admin", "cashier"],

      }, 
      {
        title: 'Sales Reports',
        path: '/manage-items/sales-report',
        icon: <FontAwesomeIcon icon={faChartLine} />,
        roles: ["admin", "cashier"],

      },
    ],
  },
 
  
  
  {
    title: 'Expenses',
    path: '/expenses',
    icon: <FontAwesomeIcon icon={faMoneyBill1Wave} />,
    roles: ["admin", "cashier"],
    subNav: [
      {
        title: 'View Expenses',
        path: '/expenses/view',
        icon: <FontAwesomeIcon icon={faListAlt} />,
        roles: ["admin"],
      },
      {
        title: 'Add Expenses',
        path: '/expenses/add',
        icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
        roles: ["cashier","admin"],
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
    roles: ["admin"],
    subNav: [
      {
        title: 'Alerts List',
        path: '/notification-and-alert/alert-list',
        icon: <FontAwesomeIcon icon={faExclamationTriangle} />,
        roles: ["admin"],
      },
      {
        title: 'Notification Preferences',
        path: '/notification-and-alert/notification-preference',
        icon: <FontAwesomeIcon icon={faEnvelopeOpenText} />, 
        roles: ["admin"],

      },
      
      
    ],
  },
  {
    title: 'Cashier Management',
    path: '/cashier-management',
    icon: <FontAwesomeIcon icon={faUserFriends} />,
    roles: ["admin"],
    subNav: [
      
      {
        title: 'Register Cashier',
        path: '/cashier-management/register',
        icon: <FontAwesomeIcon icon={faUserPlus} />, 
        roles: ["admin"],
      },
      
      
    ],
  },
];
