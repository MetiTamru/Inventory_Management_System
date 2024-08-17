import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

function TodaysTransactions() {
  const [data, setData] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const [todayBuyingData, setTodayBuyingData] = useState([]);
  const [totalProfitToday, setTotalProfitToday] = useState(0);
  const [totalSalesToday, setTotalSalesToday] = useState(0);
  const [ExpenseData, setExpenseData] = useState([]);
  const [todayExpenseData, setTodayExpenseData] = useState([]);
  const [totalBuyingToday, setTotalBuyingToday] = useState(0);
  const [totalExpenseToday, setTotalExpenseToday] = useState(0);
  const [buyingData, setBuyingData] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const [transaction, setTransaction] = useState(0);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setFormattedDate(formattedDate);
  }, []);

 

  const fetchExpense = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/expenses/`);
      const ExpenseData = await response.json();
      setExpenseData(ExpenseData);
      const totalExpense = ExpenseData.reduce((acc, item) => acc + parseFloat(item.amount), 0);
      setTotalExpenseToday(totalExpense);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/sales/`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
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
    const totalProfitToday = todayFiltered.reduce((acc, item) => acc + parseFloat(item.profit), 0);
    const totalSalesToday = todayFiltered.reduce((acc, item) => acc + parseFloat(item.selling_price), 0);

    const todayFilteredExpense = ExpenseData.filter((item) => isToday(item.date));
    const todayFilteredBuying = buyingData.filter((item) => isToday(item.date_added));

    const totalExpenseToday = todayFilteredExpense.reduce((acc, item) => acc + parseFloat(item.amount), 0);
    const totalBuyingToday = todayFilteredBuying.reduce((acc, item) => acc + parseFloat(item.buying_price), 0);
    const totalTransaction = todayFiltered.length + todayFilteredExpense.length +  todayFilteredBuying.length

    
    setTotalSalesToday(todayFiltered.length);
    setTotalBuyingToday(todayFilteredBuying.length);
    setTotalExpenseToday(todayFilteredExpense.length);
   
    setTransaction(totalTransaction)
  
    setTodayBuyingData(todayFilteredBuying);
    setTodayExpenseData(todayFilteredExpense);
    setTotalExpenseToday(totalExpenseToday)
    setTotalBuyingToday(totalBuyingToday);
    setTotalSalesToday(totalSalesToday);
    setTotalProfitToday(totalProfitToday);
    setTodayData(todayFiltered);
  };

  useEffect(() => {
    fetchExpense();
    fetchData();
    fetchBuying();
  }, []);

  useEffect(() => {
    if (data.length > 0 || ExpenseData.length > 0 || buyingData.length > 0) {
      displayData();
    }
  }, [data, ExpenseData, buyingData]);

  return (
    <div className="p-4 w-full  h-full mt-32 min-h-screen bg-gray-100">
      <div className="bg-white p-8 text-left shadow-sm rounded-lg mb-8">
        
        <p className="text-gray-500">/ Transaction Today</p>
      </div>
      <div className="flex flex-row gap-4 justify-around mr-6">
        <div className="flex flex-col h-60 justify-around w-1/3 bg-gradient-to-b from-[#c684d0] via-[#eaceee] to-[#c684d0] text-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-xl font-semibold">Selling</div>
          <div>
            <p className="text-2xl font-bold">${totalSalesToday}</p>
            <p>Today's Sales</p>
          </div>
        </div>
        <div className="flex flex-col h-60 justify-around w-1/3 bg-gradient-to-b from-[#c684d0] via-[#eaceee] to-[#c684d0] text-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-xl font-semibold">Buying</div>
          <div>
            <p className="text-2xl font-bold">${totalBuyingToday}</p>
            <p>Today's Purchases</p>
          </div>
        </div>
        <div className="flex flex-col h-60 justify-around  w-1/3 bg-gradient-to-b from-[#c684d0] via-[#eaceee] to-[#c684d0] text-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-xl font-semibold">Expense</div>
          <div>
            <p className="text-2xl font-bold">${totalExpenseToday}</p>
            <p>Today's Expenses</p>
          </div>
        </div>
      </div>
      {/* Detailed Transactions Section */}
      <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-xl font-semibold mb-4">Todays Transaction Details</div>
     {/* Expense Details */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#c684d0] border-b border-gray-300 pb-2 mb-4">Expenses</h3>
          <ul className="space-y-4">
          {todayExpenseData.length > 0 ? todayExpenseData.map((item, index) => (
              <li key={index} className="flex justify-between">
                <p>
                  <strong><FontAwesomeIcon icon={faCircle} className='text-xs text-[#c684d0] mr-2'/>    {item.name} </strong> spent   $ <strong>{item.amount}</strong> for <strong>{item.description}</strong>
                </p>
              </li>
            )) : <li>No expense data available</li>}
          </ul>
        </div>

        {/* Buying Details */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-[#c684d0] border-b border-gray-300 pb-2 mb-4">Buying</h3>
          <ul className="space-y-4">
          {todayBuyingData.length > 0 ? todayBuyingData.map((item, index) => (
              <li key={index} className="flex justify-between">
                <p>
                  <strong><FontAwesomeIcon icon={faCircle} className='text-xs text-[#c684d0] mr-2'/>    {item.name} </strong> is added to stock with an amount of $ <strong>{item.buying_price}</strong> 
                </p>
              </li>
            )) : <li>No purchase data available</li>}
            
          </ul>
        </div>

        {/* Sales Details */}
        <div>
          <h3 className="text-xl font-semibold text-[#c684d0] border-b border-gray-300 pb-2 mb-4">Sales</h3>
          <ul className="space-y-4">
          {todayData.length > 0 ? todayData.map((item, index) => (
              <li key={index} className="flex justify-between">
                <p>
                  <strong><FontAwesomeIcon icon={faCircle} className='text-xs text-[#c684d0] mr-2'/>    {item.item_name} </strong> is sold  with an amount of $ <strong>{item.selling_price}</strong> 
                </p>
              </li>
            )) : <li>No Sales data available</li>}
            
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodaysTransactions;
