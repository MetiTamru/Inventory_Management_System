import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt,faTruck,  faChartBar, faCogs, faChartLine, faCreditCard,  faListAlt, faBoxes, faReceipt, faCashRegister, faBoxOpen, faCubes, faFileInvoice, faUserTie, faCalendarAlt, faUndo, faChartPie, faAreaChart, faUsersCog, faBell, faExclamationTriangle, faEnvelopeOpenText, faUserFriends, faGift, faCog, faExchangeAlt, faUserPlus, faSearch, faMoneyBill1Wave, faFileInvoiceDollar, faFolderPlus, faFolder, faShoppingCart} from "@fortawesome/free-solid-svg-icons";


export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <FontAwesomeIcon icon={faTachometerAlt} />,
    roles: ["admin","cashier"],
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
        roles: ["admin"],

      },
      { 
        title: 'Add Category',
        path: '/manage-items/add-category',
        icon: <FontAwesomeIcon icon={faFolder} />,
        roles: ["admin", "cashier"],

      }, 
      
    ],
  },
 
  {
    title: 'Add Expense',
    path: '/expenses/add',
    icon: <FontAwesomeIcon icon={faMoneyBill1Wave} />,
    roles: ["cashier"],
  },
  {
        title: 'Sales Reports',
        path: '/sales-report',
        icon: <FontAwesomeIcon icon={faChartLine} />,
        roles: ["admin"],
  },
  {
    title: 'Expenses',
    path: '/expenses',
    icon: <FontAwesomeIcon icon={faMoneyBill1Wave} />,
    roles: ["admin"],
    subNav: [
      
      {
        title: 'Add Expenses',
        path: '/expenses/add',
        icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
        roles: ["admin"],
      },
      
    ],
  },
  {
    title: 'Sell',
    path: '/sell',
    icon: <FontAwesomeIcon icon={faShoppingCart} />,
    roles: ["admin","cashier"],
    subNav: [
      {
        title: 'View Sales ',
        path: '/sell/view-sell',
        icon: <FontAwesomeIcon icon={faChartLine} />,
        roles: ["admin"],
      },]
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
