import React from 'react';
import transaction from "../assets/transaction3.png";
import category from "../assets/category.jfif";
import products from "../assets/products.jfif";
import sale from "../assets/sale.png";
import cart from "../assets/cart1.png";
import cash from "../assets/cash6.jfif";

import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCartShopping, faDollarSign, faMinus } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const salesData = {
    cashSales: 0,
    checkSales: 0,
    telebirrSales: 0,
    creditSales: 0,
    bankTransferSales: 0,
    totalSales: 0,
  };
  const reportData = [
    { title: "Today's Sales", value: '$1,000' },
    { title: "This Month's Sales", value: '$20,000' },
    { title: "Profit", value: '$5,000' },
    { title: "Top Selling Item", value: 'Product A' },
    { title: "Total Buying", value: '$15,000' },
    { title: "Total Selling", value: '$30,000' },
  ];
  const tableData = [
    {
      supplier: 'Supplier A',
      category: 'Category 1',
      product: 'Product X',
      quantity: 100,
      purchaseRate: 20.50,
      salesRate: 30.75,
    },
    {
      supplier: 'Supplier B',
      category: 'Category 2',
      product: 'Product Y',
      quantity: 150,
      purchaseRate: 15.75,
      salesRate: 25.00,
    },
    {
      supplier: 'Supplier C',
      category: 'Category 3',
      product: 'Product Z',
      quantity: 200,
      purchaseRate: 10.00,
      salesRate: 20.00,
    },
    // Add more data as needed
  ];
  
  const categoryData = [
    { name: 'Category A', sales: 400 },
    { name: 'Category B', sales: 300 },
    { name: 'Category C', sales: 300 },
    { name: 'Category D', sales: 200 },
  ];
  
  // Calculate the total sales
  const totalSales = categoryData.reduce((sum, item) => sum + item.sales, 0);
  
 const cartIcon =   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ">
 <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
  
  const dollarSign = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>


  return (
    <div className="p-4 w-full h-full mt-32 min-h-screen">
      <div className="flex flex-wrap justify-around shadow-md bg-white  p-6">
      <div className="flex flex-row md:gap-2 items-center justify-center sm:w-1/2 lg:w-1/4 mb-2">
          <div className="text-start ">
            <p className="primary text-2xl font-bold ">200</p>
            <p className="text-sm">Todays Transaction</p>
          </div>
          <div>
            <img src={transaction} alt="Category" className="h-16" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center sm:w-1/2 lg:w-1/4 mb-2">
          <div className="text-start ">
            <p className="primary text-2xl font-bold ">200</p>
            <p className="text-sm">Total Categories</p>
          </div>
          <div>
            <img src={category} alt="Category" className="h-16" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center pl-3 mb-3 sm:w-1/2 lg:w-1/4">
          <div className="text-start mr-4">
            <p className="primary text-2xl font-bold ">170</p>
            <p className="text-sm">Total Products</p>
          </div>
          <div>
            <img src={products} alt="Products" className="h-16" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center  sm:w-1/2 lg:w-1/4">
          <div className="text-start mr-4">
            <p className="primary text-2xl font-bold ">456</p>
            <p className="text-sm">Total Sales</p>
          </div>
          <div>
            <img src={sale} alt="Sale" className="h-16" />
          </div>
     
        </div>
      </div>

{/*******                  ****** */}
<div className='flex flex-col md:flex-row gap-6 mt-8'>
  <div className='flex flex-col w-full gap-6 md:w-3/4'>
    <div className='flex flex-col md:flex-row gap-6'>
      {/**Todays sales  */}
    <div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Sales | <span className='text-sm text-gray-400'>Today</span></p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
    <div>{cartIcon}<div className="nav-cart-count">60</div> </div>
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">$100</p>
      <p className="text-purple-400 text-sm  mt-1">Top Selling Items</p>
    </div>
  </div>
</div>
 {/**Todays profite  */}
<div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700"> Expenses | <span className='text-sm text-gray-400'>Today</span></p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-6">
    
    <div className='flex flex-row'><FontAwesomeIcon icon={faDollarSign} size="2x"  /><FontAwesomeIcon icon={faMinus} className='text-red-500 font-bold'/><p className='text-red-500 font-bold '>2</p> </div>
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">$100</p>
      <p className="text-purple-400 text-sm mt-1">View expense report</p>
    </div>
  </div>
</div>
    </div>
    <div className="bg-white shadow-md rounded-sm p-10 w-full flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Profits | <span className='text-sm text-gray-400'>Today</span></p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
  <FontAwesomeIcon icon={faDollarSign} size="2x"  />
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">$100</p>
      <p className="text-gray-600  mt-1"></p>
    </div>
  </div>
</div>
{/**monthly sale */}
    <div className="bg-white shadow-md rounded-sm p-10 w-full flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Monthly Sales</p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
  <div>{cartIcon}</div>
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">$2800</p>
      <p className="text-purple-400 text-sm mt-1">Top Selling Items this month</p>
    </div>
  </div>
</div>

{/** Hosted/collected */}
<div className='flex flex-col md:flex-row gap-6'>
      {/**Todays sales  */}
    <div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Total buying</p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
  <FontAwesomeIcon icon={faCartShopping} size="2x"   />
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">$100</p>
      <p className="text-purple-400  text-sm mt-1">view detail</p>
    </div>
  </div>
</div>
<div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Total profit</p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
  <FontAwesomeIcon icon={faDollarSign} size="2x"  />
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">$100</p>
      
    </div>
  </div>
</div>

 {/**Todays profite  */}
 

    </div>

<div className="bg-white shadow-md rounded-sm p-10 w-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xl font-semibold text-gray-800">Sales Report | <span className='text-sm text-gray-400'>Today</span></p>
        <div className="flex items-center gap-2 text-blue-400">
          <i className="fas fa-calendar-day text-sm"></i> {/* Calendar icon */}
          <p className="text-sm text-gray-400">July 26, 2024</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(salesData).map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm font-semibold text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
            <p className="text-lg font-bold text-gray-900">${value.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
  <div className='w-full md:w-1/4'>
  <div className="flex items-center gap-4 p-10 border-b border-gray-200 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg bg-white">
  <div className="bg-purple-400 text-white p-3 rounded-full flex items-center justify-center">
    
  </div>
  <div className="flex-1">
    <p className='font-semibold text-gray-800 text-lg'>Recent activity</p>
    <i className="fas fa-truck text-xl"></i> 
    <p className="">New Purchase</p>
    <p className="text-gray-600 text-sm">Order received for <span className="font-bold text-purple-600">50 units</span> at <span className="font-bold text-blue-600">$1500</span></p>
  </div>
  <p className="text-gray-400 text-sm">30 mins ago</p>
</div>

    <div className='mt-4'>
    <div className="bg-white shadow-md rounded-sm p-10 flex flex-col gap-4">
  <div className="flex items-center justify-between mb-4">
    <p className="text-xl font-semibold text-gray-800">Sales Report/ <span className='text-sm text-gray-400'>This month</span> </p>
    <div className="flex items-center gap-2 text-gray-500">
      <i className="fas fa-calendar-day text-sm"></i> {/* Calendar icon */}
      <p className="text-sm text-gray-400">July 2024</p>
    </div>
  </div>
  <div className="flex flex-col  gap-6">
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex-1">
      <p className="text-sm font-semibold text-gray-700">Total Buying</p>
      <p className=" text-2xl text-gray-500 font-bold">$30,000</p>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex-1">
      <p className="text-sm font-semibold text-gray-700">Total Sales</p>
      <p className="text-2xl font-bold text-gray-500">$10,000</p>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex-1">
      <p className="text-sm font-semibold text-gray-700">Total Profit</p>
      <p className="text-2xl font-bold text-gray-500">$200</p>
    </div>
  </div>
 
</div>

    </div>
  </div>
</div>

   
    </div>
  );
}

export default Dashboard;
