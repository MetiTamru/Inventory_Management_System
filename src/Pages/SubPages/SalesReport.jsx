import React, { useState, useEffect } from 'react';
import { faCalendarDay, faCalendarWeek, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SalesReport = () => {
  const [data, setData] = useState(0);
  const [todaySales, setTodaySales] = useState(0);
  const [weeklySales, setWeeklySales] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/sales/`);
      
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
   
    const totalSalesToday = todayFiltered.reduce((acc, item) => acc + parseFloat(item.selling_price), 0);
    const totalSalesThisWeek = weekFiltered.reduce((acc, item) => acc + parseFloat(item.selling_price), 0);
    const totalSalesThisMonth = monthFiltered.reduce((acc, item) => acc + parseFloat(item.selling_price), 0);

   
   
    setTodaySales(totalSalesToday);
    setWeeklySales(totalSalesThisWeek);
    setMonthlySales(totalSalesThisMonth);

   
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      displayData();
    }
  }, [data]);


  return (
    <div className="max-w-6xl h-full mt-28 mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">Sales Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-b from-[#c684d0] via-[#eaceee] to-[#c684d0] text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faCalendarDay} className="text-3xl mr-3" />
            <h2 className="text-2xl font-semibold">Today's Sales</h2>
          </div>
          <p className="text-4xl font-bold">${todaySales}</p>
          <Link to="/manage-items/sales-report/today" className="text-blue-200 hover:text-white text-sm mt-3 inline-block transition-colors duration-200">
            View Details
          </Link>
        </div>

        <div className="bg-gradient-to-b from-[#c684d0] via-[#eaceee] to-[#c684d0] text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faCalendarWeek} className="text-3xl mr-3" />
            <h2 className="text-2xl font-semibold">This Week's Sales</h2>
          </div>
          <p className="text-4xl font-bold">${weeklySales}</p>
          <Link to="/manage-items/sales-report/this-week" className="text-blue-200 hover:text-white text-sm mt-3 inline-block transition-colors duration-200">
            View Details
          </Link>
        </div>

        <div className="bg-gradient-to-b from-[#c684d0] via-[#eaceee] to-[#c684d0] text-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faCalendarAlt} className="text-3xl mr-3" />
            <h2 className="text-2xl font-semibold">This Month's Sales</h2>
          </div>
          <p className="text-4xl font-bold">${monthlySales}</p>
          <Link to="/manage-items/sales-report/this-month" className="text-blue-200 hover:text-white text-sm mt-3 inline-block transition-colors duration-200">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
