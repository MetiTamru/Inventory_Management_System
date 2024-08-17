import React, { useState, useEffect } from 'react';

const MonthlySale = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalProfitToday, setTotalProfitToday] = useState(0);
  const [totalSalesToday, setTotalSalesToday] = useState(0);
 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}api/sales/`);

      const data = await response.json();
      
      setSalesData(data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };
  const parseDate = (dateString) => new Date(dateString + 'T00:00:00');

  const isThisMonth = (dateString) => {
    const today = new Date();
    const targetDate = parseDate(dateString);

    return (
      today.getMonth() === targetDate.getMonth() &&
      today.getFullYear() === targetDate.getFullYear()
    );
  };


  const displayData = () => {
    const MonthlyFiltered = salesData.filter((item) => isThisMonth(item.date));
    const totalProfitToday = MonthlyFiltered.reduce((acc, item) => acc + parseFloat(item.profit), 0);
    const totalSalesToday = MonthlyFiltered.reduce((acc, item) => acc + parseFloat(item.selling_price), 0);

    const totalQuantity = MonthlyFiltered.reduce((acc, item) => acc + parseFloat(item.quantity), 0);

    

    setTotalQuantity(totalQuantity)
    setTotalSalesToday(MonthlyFiltered.length); 
    setTotalSalesToday(totalSalesToday);
    setTotalProfitToday(totalProfitToday);
    setMonthlyData(MonthlyFiltered);
  };

  useEffect(() => {
   
    fetchData();
    
  }, []);

  useEffect(() => {
    if (salesData.length > 0 ) {
      displayData();
    }
  }, [salesData]);


  

  return (
    <div className="p-6 w-full bg-gray-100 h-screen mt-36">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Monthly Sales Report</h1>

        {/* Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-b from-[#c684d0] via-[#eaceee] to-[#c684d0] p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-2xl font-bold text-green-700">${totalSalesToday.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-b from-[#c684d0] via-[#eaceee] to-[#c684d0] p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Quantity</h2>
            <p className="text-2xl font-bold text-blue-700">{totalQuantity}</p>
          </div>
          <div className="bg-gradient-to-b from-[#c684d0] via-[#eaceee] to-[#c684d0] p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Profit</h2>
            <p className="text-2xl font-bold text-red-700">${totalProfitToday.toFixed(2)}</p>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
    <thead className="bg-gray-200 border-b border-gray-300">
      <tr>
        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item Name</th>
        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
        <th className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller Name</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {monthlyData.map((item) => (
        <tr key={item.id}>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.item_name}</td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.selling_price}</td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.profit}</td>
          <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.seller_name}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
};

export default MonthlySale;
