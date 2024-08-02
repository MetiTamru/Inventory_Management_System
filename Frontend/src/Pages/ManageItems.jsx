import React from 'react'
import transaction from "../assets/transaction3.png";
import box from "../assets/box.jfif";
import products from "../assets/products.jfif";
import sale from "../assets/sale.png";
import {Link} from "react-router-dom"
function SalesManagement() {
  const transactions = [
    {
      id: 1,
      date: '2024-07-23',
      time: '14:30',
      amount: 150.0,
      customerName: 'John Doe',
    },
    {
      id: 2,
      date: '2024-07-22',
      time: '16:00',
      amount: 200.0,
      customerName: 'Jane Smith',
    },
    {
      id: 3,
      date: '2024-07-21',
      time: '10:15',
      amount: 75.0,
      customerName: 'Alice Johnson',
    },
  ];
  
  return (
    <div className='p-4 w-full h-full mt-28 min-h-screen'>
       <div className="flex flex-wrap justify-around shadow-md bg-white  p-6">
        <div className="flex flex-row gap-12 md:gap-4 items-center justify-center sm:w-1/2 lg:w-1/4  mb-2">
          <div className="text-start ">
            <p className=" primary text-2xl font-bold ">60</p>
            <p className="text-sm">Total Items</p>
          </div>
          <div>
            <img src={products} alt="Supplier" className="h-16" />
          </div>
        </div>
        <div className="flex flex-row md:gap-2 items-center justify-center sm:w-1/2 lg:w-1/4 mb-2">
          <div className="text-start ">
            <p className="primary text-2xl font-bold ">200</p>
            <p className="text-sm">Todays Transaction</p>
          </div>
          <div>
            <img src={transaction} alt="Category" className="h-16" />
          </div>
        </div>
        <div className="flex flex-row gap-14  md:gap-2 items-center justify-center  mb-3 sm:w-1/2 lg:w-1/4">
          <div className="text-start">
            <p className="primary text-2xl font-bold ">170</p>
            <p className="text-sm">Total Sales</p>
          </div>
          <div>
            <img src={sale} alt="Products" className="h-16" />
          </div>
        </div>
        <div className="flex flex-row md:gap-2 items-center justify-center   sm:w-1/2 lg:w-1/4">
          <div className="text-start ">
            <p className="primary text-2xl font-bold ">456</p>
            <p className="text-sm">Outof Stock Items</p>
          </div>
          <div>
            <img src={box} alt="Sale" className="h-16" />
          </div>
     
        </div>
      </div>

       
       <div className="p-6">
  
  <div className="mb-4">
    <h1 className="text-2xl font-bold">Item Management Dashboard</h1>
  </div>

  {/* Summary Widgets */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
    
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-xl font-semibold">Total Sales</h2>
      <p className="text-2xl">$12,345</p>
    </div>
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-xl font-semibold">Low Stock Alerts</h2>
      <ul>
        <li>Item A - 5 units left</li>
        <li>Item B - 3 units left</li>
      </ul>
    </div>
  </div>

  {/* Quick Access Buttons */}
  <div className=''>
  <div className="mb-6 flex flex-row md:flex-row gap-4 items-center justify-center">
    <Link to="/manage-items/add-item">
    <button className="btn-primary text-white py-2 px-4 rounded-lg ">
      Add New Item
    </button>
    </Link>
    
    <Link to="/manage-items/view-items">
    <button className="border border-purple-500 text-black py-2 px-4 rounded-lg">
      View Items List
    </button>
    </Link>
    
    
  </div>
  </div>
  

  {/* Recent Items or Activity */}
  <div className="bg-white p-4 shadow rounded-lg mb-6">
    <h2 className="text-xl font-semibold">Recent Items Added</h2>
    <ul>
      <li>Item X - Added on 07/28/2024</li>
      <li>Item Y - Added on 07/27/2024</li>
    </ul>
  </div>

  
</div>

    </div>
  )
}

export default SalesManagement