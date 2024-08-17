import React, { useEffect, useState } from 'react';
import transactionimg from "../assets/transaction3.png";
import category from "../assets/category.jfif";
import products from "../assets/products.jfif";
import sale from "../assets/sale.png";
 
import { ToastContainer, toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCartShopping, faCircle, faDollarSign, faHistory, faMinus, faTruck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useAuth } from "../Components/AuthContext"
import axiosInstance from '../Components/Axios';

function Dashboard() {
  const salesData = {
    cashSales: 0,
    checkSales: 0,
    telebirrSales: 0,
    creditSales: 0,
    bankTransferSales: 0,
    totalSales: 0,
  };
  const {user} = useAuth()
  const [subcategory, setSubcategory] =useState([])
  const [sales, setSales] =useState([])
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [items, setItems] =useState([])
  const [loading, setLoading] =useState("")
  const [Error, setError] =useState(null)
  const [data, setData] = useState([]);

  const [todayData, setTodayData] = useState([]);
  const [thisWeekData, setWeekData] = useState([]);
  const [thisMonthData, setMonthData] = useState([]);
  const [totalProfitToday, setTotalProfitToday] = useState([]);
  const [totalProfitThisWeek, setTotalProfitThisWeek] = useState([]);
  const [totalProfitThisMonth, setTotalProfitThisMonth] = useState([]);
  const [totalSalesToday, setTotalSalesToday] = useState([]);
  const [totalSalesThisWeek, setTotalSalesThisWeek] = useState([]);
  const [totalSalesThisMonth, setTotalSalesThisMonth] = useState([]);
  const [ExpenseData, setExpenseData] = useState([]);
  const [todayExpenseData, setTodayExpenseData] = useState([]);
  const [thisWeekExpenseData, setWeekExpenseData] = useState([]);
  const [thisMonthExpenseData, setMonthExpenseData] = useState([]);
  const [totalExpenseToday, setTotalExpenseToday] = useState([]);
  const [totalExpenseThisWeek, setTotalExpenseThisWeek] = useState([]);
  const [totalExpenseThisMonth, setTotalExpenseThisMonth] = useState([]);
  const [totalExpense, setTotalExpense] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  
  const [totalTransaction, setTotalTransaction] = useState(0);
  const [totalProductQuantity, setTotalProductQuantity] = useState(0);
  const [transaction, setTransaction] = useState(0);
  const [totalBuyingToday, setTotalBuyingToday] = useState(0);
  const [buyingData, setBuyingData] = useState([]);
  const [totalSalesAmountToday, setTotalSalesAmountToday] = useState(0);
  setTotalSalesAmountToday
  const handleTotalTransactionUpdate = (newTotalTransaction) => {
    setTotalTransaction(newTotalTransaction);
  };
 
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; 
    setFormattedDate(formattedDate);
    
  }, []);


const fetchExpense = async () => {
    try {
      const Expenseresponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/expenses/`);

      
      const ExpenseData = await Expenseresponse.json();
      setExpenseData(ExpenseData);
      const totalExpense = ExpenseData.reduce((acc, item) => acc + parseFloat(item.amount), 0);
      setTotalExpense(totalExpense)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }; 

  
  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/sales/`);
      
      const data = await response.json();

      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const fetchBuying = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/electronics/`);

      const data = await response.json();
      setBuyingData(data);
    } catch (error) {
      console.error('Error fetching buying data:', error);
    }
  };


  const parseDate = (dateString) => {
    return new Date(dateString + 'T00:00:00'); 
  };

  const isToday = (dateString) => {
    const today = new Date();
    const targetDate = parseDate(dateString);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    return today.getTime() === targetDate.getTime();
  };

  const isThisWeek = (dateString) => {
    const today = new Date();
    const targetDate = parseDate(dateString);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); 

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); 

    return targetDate >= startOfWeek && targetDate <= endOfWeek;
  };

  const isThisMonth = (dateString) => {
    const today = new Date();
    const targetDate = parseDate(dateString);

    return (
      today.getMonth() === targetDate.getMonth() &&
      today.getFullYear() === targetDate.getFullYear()
    );
  };

  
  const displayData = () => {
    const todayFiltered = data.filter((item) => isToday(item.date));
    const weekFiltered = data.filter((item) => isThisWeek(item.date));
    const monthFiltered = data.filter((item) => isThisMonth(item.date));
    const totalProfitToday = todayFiltered.reduce((acc, item) => acc + parseFloat(item.profit), 0);
    const totalProfitThisWeek = weekFiltered.reduce((acc, item) => acc + parseFloat(item.profit), 0);
    const totalProfitThisMonth = monthFiltered.reduce((acc, item) => acc + parseFloat(item.profit), 0);
    const totalSalesToday = todayFiltered.reduce((acc, item) => acc + parseFloat(item.selling_price), 0);
    const totalSalesAmountToday = todayFiltered.reduce((acc, item) => acc + parseFloat(item.quantity), 0);
    const totalSalesThisWeek = weekFiltered.reduce((acc, item) => acc + parseFloat(item.selling_price), 0);
    const totalSalesThisMonth = monthFiltered.reduce((acc, item) => acc + parseFloat(item.selling_price), 0);

    const todayFilteredExpense = ExpenseData.filter((item) => isToday(item.date));
    const weekFilteredExpense = ExpenseData.filter((item) => isThisWeek(item.date));
    const monthFilteredExpense = ExpenseData.filter((item) => isThisMonth(item.date));
    const totalExpenseToday = todayFilteredExpense.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    const totalExpenseThisWeek = weekFilteredExpense.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    const totalExpenseThisMonth = monthFilteredExpense.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    const todayFilteredBuying = buyingData.filter((item) => isToday(item.date_added));
    const totalBuyingToday = todayFilteredBuying.reduce((acc, item) => acc + parseFloat(item.buying_price), 0);
    const totalTransaction = todayFiltered.length + todayFilteredExpense.length +  todayFilteredBuying.length

    setTotalBuyingToday(todayFilteredBuying);
    setTransaction(totalTransaction)
    setTotalSalesAmountToday(totalSalesAmountToday)

    setTodayExpenseData(todayFilteredExpense);
    setWeekExpenseData(weekFilteredExpense);
    setMonthExpenseData(monthFilteredExpense);
    setTotalExpenseToday(totalExpenseToday);
    setTotalExpenseThisWeek(totalExpenseThisWeek);
    
    setTotalExpenseThisMonth(totalExpenseThisMonth);

    setTodayData(todayFiltered);
    setWeekData(weekFiltered);
    setMonthData(monthFiltered);
    setTotalProfitToday(totalProfitToday);
    setTotalProfitThisWeek(totalProfitThisWeek);

    setTotalProfitThisMonth(totalProfitThisMonth);
    setTotalSalesToday(totalSalesToday);
    setTotalSalesThisWeek(totalSalesThisWeek);
    setTotalSalesThisMonth(totalSalesThisMonth);

   
  };
  useEffect(() => {
    fetchBuying();
  }, []);

  useEffect(() => {
    if (buyingData.length > 0) {
      displayData();
    }
  }, [ExpenseData]);
  useEffect(() => {
    fetchExpense();
  }, []);

  useEffect(() => {
    if (ExpenseData.length > 0) {
      displayData();
    }
  }, [ExpenseData]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      displayData();
    }
  }, [data]);

  useEffect(() => {
    const ProductQuantity = async () => {
      try {
        const itemsResponse = await axiosInstance.get('/api/electronics/');
        setItems(itemsResponse.data);
        const totalQuantity = itemsResponse.data.reduce((acc, item) => acc + parseFloat(item.quantity), 0);
        setTotalProductQuantity(totalQuantity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    ProductQuantity();
  }, []);
  


  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axiosInstance.get('/api/subcategories/');
        const Salesresponse = await axiosInstance.get('/api/sales/');
       
    
        setSales(Salesresponse.data)
        setSubcategory(response.data.sort((a, b) => b.id - a.id)); 
        setLoading(false);
        
        const total = Salesresponse.data.reduce((total, sale) => {
          const price = parseFloat(sale.selling_price || 0);
           
          return total + price;
        }, 0);

        const totalProfit = Salesresponse.data.reduce((total, sale) => {
          const price = parseFloat(sale.profit || 0);
          
          return total + price;
        }, 0);

        setTotalProfit(totalProfit)
        
        setTotalSellingPrice(total);
      } catch (err) {
        setError('Failed to fetch cashiers.');
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);



  const addSubcategory = async (newSubcategory) => {
    try {
      const response = await axiosInstance.post('/api/subcategories/', newSubcategory);
      setSubcategory([...subcategory, response.data]); 
      toast.success('New subcategory added!'); 
    } catch (error) {
      toast.error('Failed to add subcategory');
      console.error('Error adding subcategory:', error);
    }
  };

  
 
  
 const cartIcon =   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 ">
 <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg>
  
  

  return (
    <div className="p-4 w-full h-full mt-32 min-h-screen">
      {user.role === 'admin' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 
        lg:grid-cols-4 gap-4 p-6 shadow-md bg-white">
        
       <Link
         to="/todays-transaciton"
         className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
       >
         <div className="text-start">
           <p className="primary text-2xl font-bold">{transaction}</p>
           <p className="text-sm">Today's Transaction</p>
         </div>
         <div>
           <img src={transactionimg} alt="Transaction" className=" h-16" />
         </div>
       </Link>
     
     
       <Link
         to="/manage-items/categories"
         className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
       >
         <div className="text-start">
           <p className="primary text-2xl font-bold">{subcategory.length}</p>
           <p className="text-sm">Total Categories</p>
         </div>
         <div>
           <img src={category} alt="Products" className=" h-16" />
         </div>
       </Link>
     
       <Link
         to="/manage-items/view-items"
         className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
       >
         <div className="text-start">
           <p className="primary text-2xl font-bold">{totalProductQuantity}</p>
           <p className="text-sm">Total Products</p>
         </div>
         <div>
           <img src={products} alt="Products" className=" h-16" />
         </div>
       </Link>
     
       <Link
         to="/sell/view-sell"
         className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
       >
         <div className="text-start">
           <p className="primary text-2xl font-bold">{totalSalesAmountToday}</p>
           <p className="text-sm">Today's Selling</p>
         </div>
         <div>
           <img src={sale} alt="Sale" className="h-16" />
         </div>
       </Link>
     </div>
      ):(<div className="grid grid-cols-1 sm:grid-cols-2 
        lg:grid-cols-4 gap-4 p-6 shadow-md bg-white">
        
       <div
         to="/todays-transaciton"
         className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
       >
         <div className="text-start">
           <p className="primary text-2xl font-bold">{transaction}</p>
           <p className="text-sm">Today's Transaction</p>
         </div>
         <div>
           <img src={transactionimg} alt="Transaction" className="h-16" />
         </div>
       </div>
     
     
       <div
         to="/manage-items/categories"
         className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
       >
         <div className="text-start">
           <p className="primary text-2xl font-bold">{subcategory.length}</p>
           <p className="text-sm">Total Categories</p>
         </div>
         <div>
           <img src={category} alt="Products" className="h-16" />
         </div>
       </div>
     
       <div
         to="/manage-items/view-items"
         className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
       >
         <div className="text-start">
           <p className="primary text-2xl font-bold">{totalProductQuantity}</p>
           <p className="text-sm">Total Products</p>
         </div>
         <div>
           <img src={products} alt="Products" className="h-16" />
         </div>
       </div>
     
       <div
         to="/sell/view-sell"
         className="flex flex-row items-center justify-between p-4 bg-gray-100 rounded-lg"
       >
         <div className="text-start">
           <p className="primary text-2xl font-bold">{totalSalesAmountToday}</p>
           <p className="text-sm">Todays Selling</p>
         </div>
         <div>
           <img src={sale} alt="Sale" className="h-16" />
         </div>
       </div>
     </div>)}
   


{/*******                  ****** */}

<div className='flex flex-col md:flex-row gap-6 mt-8'>
  <div className='flex flex-col w-full gap-6 md:w-3/4'>
    <div className='flex flex-col md:flex-row gap-6'>
      {/**Todays sales  */}
      {user.role === 'admin' ? (
         <div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
         <div className="text-center mb-4">
           <p className="text-xl text-start font-semibold text-gray-700">Sales | <span className='text-sm text-gray-400'>Today</span></p>
         </div>
         <div className="flex  md:flex-row  items-center text gap-4">
           <div>{cartIcon}<div className="nav-cart-count">{todayData.length}</div> </div>
           <div className=" ml-5 ">
             <p className="text-2xl font-bold text-start text-gray-800">${totalSalesToday}</p>
             <Link to={"/manage-items/sales-report/today"}>
             <p className="text-[#a46cc6] text-sm  mt-1">View Details</p>
             </Link>
             
           </div>
         </div>
       </div>
  
):(
  <div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Sales | <span className='text-sm text-gray-400'>Today</span></p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
    <div>{cartIcon}<div className="nav-cart-count">{todayData.length}</div> </div>
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalSalesToday}</p>
      
      
    </div>
  </div>
</div>
)}
   
 {/**Todays profite  */}
 {user.role === 'admin' ? (
  <div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700"> Expenses | <span className='text-sm text-gray-400'>Today</span></p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-6">
    
    <div className='flex flex-row'><FontAwesomeIcon icon={faDollarSign} size="2x"  /><FontAwesomeIcon icon={faMinus} className='font-bold'/> </div>
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalExpenseToday}</p>
      <Link to={"/expenses"}>
      <p className="text-[#a46cc6] text-sm  mt-1">View Details</p>
      </Link>
    </div>
  </div>
</div>

 ):(
  <div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700"> Expenses | <span className='text-sm text-gray-400'>Today</span></p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-6">
    
    <div className='flex flex-row'><FontAwesomeIcon icon={faDollarSign} size="2x"  /><FontAwesomeIcon icon={faMinus} className='font-bold'/> </div>
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalExpenseToday}</p>
      
    </div>
  </div>
</div>
 )}

    </div>
    <div className="bg-white shadow-md rounded-sm p-10 w-full flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Profits | <span className='text-sm text-gray-400'>Today</span></p>
  </div>
  
  <div className="flex  md:flex-row  items-center text gap-4">
  <FontAwesomeIcon icon={faDollarSign} size="2x"  />
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalProfitToday - totalExpenseToday}</p>
      
    </div>
  </div>
</div>
<div className='flex flex-col md:flex-row gap-6'>
  {user.role === 'admin' ? (
    <div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
    <div className="text-center mb-4">
      <p className="text-xl text-start font-semibold text-gray-700">Sales | <span className='text-sm text-gray-400'>Weekly</span></p>
    </div>
    <div className="flex  md:flex-row  items-center text gap-4">
      <div>{cartIcon} </div>
      <div className=" ml-5 ">
        <p className="text-2xl font-bold text-start text-gray-800">${totalSalesThisWeek}</p>
        <Link to={"/manage-items/sales-report/this-week"}>
        <p className="text-[#a46cc6] text-sm  mt-1">View Details</p>
        </Link>
      </div>
    </div>
  </div>
  ):(
    <div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Sales | <span className='text-sm text-gray-400'>Weekly</span></p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
    <div>{cartIcon} </div>
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalSalesThisWeek}</p>
      
    </div>
  </div>
</div>
  )}

{/** weekly expense */}
<div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Expense | <span className='text-sm text-gray-400'>Weekly</span></p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
   <div className='flex flex-row'><FontAwesomeIcon icon={faDollarSign} size="2x"  /><FontAwesomeIcon icon={faMinus} className='font-bold'/> </div>
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalExpenseThisWeek}</p>
      
    </div>
  </div>
</div>
</div>
{/**monthly sale */}
{user.role === "admin" ? (
  <div className="bg-white shadow-md rounded-sm p-10 w-full flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Monthly Sales</p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
  <div>{cartIcon}</div>
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalSalesThisMonth}</p>
      <Link to={"/manage-items/sales-report/this-month"}>
      <p className="text-[#a46cc6] text-sm  mt-1">View Details</p>
      </Link>
    </div>
  </div>
</div>

):(
  <div className="bg-white shadow-md rounded-sm p-10 w-full flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Monthly Sales</p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
  <div>{cartIcon}</div>
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalSalesThisMonth}</p>
      
    </div>
  </div>
</div>
)}
    
<div className="bg-white shadow-md rounded-sm p-10 w-full flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Profits | <span className='text-sm text-gray-400'>Monthly</span></p>
  </div>
  
  <div className="flex  md:flex-row  items-center text gap-4">
  <FontAwesomeIcon icon={faDollarSign} size="2x"  />
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalProfitThisMonth}</p>
      <p className="text-gray-600  mt-1"></p>
    </div>
  </div>
</div>
{/** Hosted/collected */}
<div className='flex flex-col md:flex-row gap-6'>
      {/**Todays sales  */}
      {user.role === "admin" ? (
         <div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
         <div className="text-center mb-4">
           <p className="text-xl text-start font-semibold text-gray-700">Total selling</p>
         </div>
         <div className="flex  md:flex-row  items-center text gap-4">
         <FontAwesomeIcon icon={faCartShopping} size="2x"   />
           <div className=" ml-5 ">
             <p className="text-2xl font-bold text-start text-gray-800">${totalSellingPrice}</p>
             <Link to={"/sell/view-sell"}>
             <p className="text-[#a46cc6] text-sm  mt-1">View Details</p>
             </Link>
           </div>
         </div>
       </div>

      ):(
        <div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
        <div className="text-center mb-4">
          <p className="text-xl text-start font-semibold text-gray-700">Total selling</p>
        </div>
        <div className="flex  md:flex-row  items-center text gap-4">
        <FontAwesomeIcon icon={faCartShopping} size="2x"   />
          <div className=" ml-5 ">
            <p className="text-2xl font-bold text-start text-gray-800">${totalSellingPrice}</p>
           
          </div>
        </div>
      </div>
      )}
   
<div className="bg-white shadow-md rounded-sm p-10 w-full md:w-1/2 flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Total profit</p>
  </div>
  <div className="flex  md:flex-row  items-center text gap-4">
  <FontAwesomeIcon icon={faDollarSign} size="2x"  />
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalProfit}</p>
      
    </div>
  </div>
</div>
<div className="bg-white shadow-md rounded-sm p-10 w-full flex flex-col">
  <div className="text-center mb-4">
    <p className="text-xl text-start font-semibold text-gray-700">Total Expenses</p>
  </div>
  
  <div className="flex  md:flex-row  items-center text gap-4">
  <FontAwesomeIcon icon={faDollarSign} size="2x"  />
    <div className=" ml-5 ">
      <p className="text-2xl font-bold text-start text-gray-800">${totalExpense}</p>
      <p className="text-gray-600  mt-1"></p>
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
          <p className="text-sm text-gray-400">{formattedDate}</p>
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
  <div className="flex items-center gap-4 p-10 border-b border-gray-200 rounded-lg transition-transform duration-300  bg-white">
  
  <div className="flex-1 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="mb-6 flex items-center space-x-4">
        <p className='text-2xl font-semibold text-gray-800'>Recent Activity</p>
        <FontAwesomeIcon icon={faHistory} className="text-3xl text-gray-600" />
      </div> 
      <div className="space-y-6">
        {/* New Sale */}
        <div>
          <p className='text-xl font-bold text-gray-700 mb-2'>New Sale</p>
          {todayData.length > 0 ? (
            <ul className="space-y-4">
              {todayData.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border border-gray-300">
                  <FontAwesomeIcon icon={faCircle} className='text-xs text-[#c684d0] mr-2' />
                  <p>
                    <strong className="font-semibold text-gray-800">{item.quantity} {item.item_name}</strong> was sold for 
                    <strong className="font-semibold text-gray-800"> ${item.selling_price}</strong>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No sales data available</p>
          )}
        </div>
        <div>
          <p className='text-xl font-bold text-gray-700 mb-2'>New Purchase</p>
          {totalBuyingToday.length > 0 ? (
            <ul className="space-y-4">
              {totalBuyingToday.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border border-gray-300">
                  <FontAwesomeIcon icon={faCircle} className='text-xs text-[#c684d0] mr-2' />
                  <p>
                    <strong className="font-semibold text-gray-800"> {item.name}</strong> added to stock for 
                    <strong className="font-semibold text-gray-800"> ${item.buying_price}</strong>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No purchase data available</p>
          )}
        </div>
         <div>
          <p className='text-xl font-bold text-gray-700 mb-2'>New Expense</p>
          {todayExpenseData.length > 0 ? (
            <ul className="space-y-4">
              {todayExpenseData.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border border-gray-300">
                  <FontAwesomeIcon icon={faCircle} className='text-xs text-[#c684d0] mr-2' />
                  <p>
                    <strong className="font-semibold text-gray-800">{item.name}</strong> spent 
                    <strong className="font-semibold text-gray-800"> ${item.amount}</strong> on 
                    <strong className="font-semibold text-gray-800"> {item.description}</strong>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No expense data available</p>
          )}
        </div>
        <p className="text-gray-400 text-sm mt-6 text-center">{formattedDate}</p>
        </div>
         </div>
</div>

    <div className='mt-4'>
    <div className="bg-white shadow-md rounded-sm p-10 flex flex-col gap-4">
  <div className="flex items-center justify-between mb-4">
    <p className="text-xl font-semibold text-gray-800">Sales Report/ <span className='text-sm text-gray-400'>This month</span> </p>
    <div className="flex items-center gap-2 text-gray-500">
      <i className="fas fa-calendar-day text-sm"></i> {/* Calendar icon */}
      <p className="text-sm text-gray-400">{formattedDate}</p>
    </div>
  </div>
  <div className="flex flex-col  gap-6">
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex-1">
      <p className="text-sm font-semibold text-gray-700">Total Expense</p>
      <p className=" text-2xl text-gray-500 font-bold">${totalExpenseThisMonth}</p>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex-1">
      <p className="text-sm font-semibold text-gray-700">Total Sales</p>
      <p className="text-2xl font-bold text-gray-500">${totalSalesThisMonth}</p>
    </div>
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm flex-1">
      <p className="text-sm font-semibold text-gray-700">Total Profit</p>
      <p className="text-2xl font-bold text-gray-500">${totalProfitThisMonth}</p>
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
