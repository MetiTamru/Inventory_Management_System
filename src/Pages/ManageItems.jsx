import React, { useEffect, useState } from 'react'
import box from "../assets/box.jfif";
import products from "../assets/products.jfif";
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import {useAuth } from "../Components/AuthContext"
import axiosInstance from '../Components/Axios';
function SalesManagement() {

  const {user} = useAuth()
  const [items ,setItems ] =useState([])
  const [data ,setData ] =useState([])
  const [totalProductQuantity ,setTotalProductQuantity ] =useState([])
  const [stockoutItems ,setStockoutItems ] =useState([])
  const [totalSalesToday ,setTotalSalesToday ] =useState(0)
  const [totalSales ,setTotalSales ] =useState(0)
  const [todayData, setTodayData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/sales/`);
        const data = await response.json();
        setData(data);
  
        const totalSales = data.reduce((acc, item) => acc + parseFloat(item.selling_price), 0);
        setTotalSales(totalSales);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const ProductQuantity = async () => {
      try {
        const itemsResponse = await axiosInstance.get('/api/electronics/');
        setItems(itemsResponse.data);
        const filteredItems = itemsResponse.data.filter(item => parseFloat(item.quantity) <= 0);
        setStockoutItems(filteredItems)
        const totalQuantity = itemsResponse.data.reduce((acc, item) => acc + parseFloat(item.quantity), 0);
        setTotalProductQuantity(totalQuantity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    ProductQuantity();
  }, []);
  
  const parseDate = (dateString) => new Date(dateString + 'T00:00:00');

  const isToday = (dateString) => {
    const today = new Date();
    const targetDate = parseDate(dateString);
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);
    return today.getTime() === targetDate.getTime();
  };

  const displayData = () => {
    const todayFiltered = data.filter((item) => isToday(item.date));
    
    const totalSalesToday = todayFiltered.reduce((acc, item) => acc + parseFloat(item.selling_price), 0);


    setTotalSalesToday(totalSalesToday);
    setTodayData(todayFiltered);
  };

 
  useEffect(() => {
    if (data.length > 0 ) {
      displayData();
    }
  }, [data]);



 
  return (
    <div className='p-4 w-full h-full mt-28 min-h-screen'>
       {user.role === 'admin' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-6 shadow-md bg-white">
          <Link
            to="/manage-items/view-items"
            className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
          >
            <div className="text-start">
              <p className="primary text-2xl font-bold">{totalProductQuantity}</p>
              <p className="text-sm">Total Items</p>
            </div>
            <div>
              <img src={products} alt="Transaction" className="h-16" />
            </div>
          </Link>

          <Link
            to="/manage-items/view-items"
            className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
          >
            <div className="text-start">
              <p className="primary text-2xl font-bold">{stockoutItems.length}</p>
              <p className="text-sm">Stock-Out Items</p>
            </div>
            <div>
              <img src={box} alt="Products" className="h-16" />
            </div>
          </Link>
        </div>
      ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-6 shadow-md bg-white">
        <div className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg">
          <div className="text-start">
              <p className="primary text-2xl font-bold">{stockoutItems.length}</p>
              <p className="text-sm">Stock-Out Items</p>
            </div>
            <div>
              <img src={box} alt="Products" className="h-16" />
            </div>
        </div>
        <div className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg" >
        <div className="text-start">
              <p className="primary text-2xl font-bold">{totalProductQuantity}</p>
              <p className="text-sm">Total Items</p>
            </div>
            <div>
              <img src={products} alt="Transaction" className="h-16" />
            </div>
        </div>
        </div>
      )}


       
       <div className="p-6">
  
  <div className="mb-4">
    <h1 className="text-2xl font-bold">Item Management Dashboard</h1>
  </div>

  {/* Summary Widgets */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
    
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Total Sales</h2>
      <p className="text-2xl  text-[#c684d0]">${totalSales}</p>
    </div>
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-xl font-semibold">Low Stock Alerts</h2>
      {stockoutItems.map(item =>(
        <ul>
        <li><FontAwesomeIcon icon={faCircle} className='text-xs text-[#c684d0] mr-2'/> <strong>{item.name} </strong>Is out of stock!</li>
        
        </ul>
      ))}
      
     
    </div>
  </div>

  {/* Quick Access Buttons */}
  {user.role === 'admin' ?(
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
  ):(
    <div className=''>
    <div className="mb-6 flex flex-row md:flex-row gap-4 items-center justify-center">
      <Link to="/manage-items/add-item">
      <button className="btn-primary text-white py-2 px-4 rounded-lg ">
        Add New Item
      </button>
      </Link>
      
      
      
      
    </div>
    </div>
  )}
  
  
  
  {/* Recent Items or Activity */}
  <div className="bg-white p-6 shadow-lg rounded-lg mb-6 border border-gray-200">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Items Sold</h2>
  {todayData.length > 0 ? (
    <ul className="space-y-3">
      {todayData.map(item => (
        <li key={item.id} className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          <div className="flex items-center">
            <span className="font-semibold text-gray-700">{item.item_name}</span>
            <span className="ml-2 text-sm text-gray-500">- Sold on {item.date}</span>
          </div>
          <span className="text-gray-600 text-sm">${item.selling_price}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No items sold today.</p>
  )}
</div>


  
</div>

    </div>
  )
}

export default SalesManagement