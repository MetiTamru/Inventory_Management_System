import React from 'react'
import transaction from "../assets/transaction3.png";
import sale from "../assets/sale.png";

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
       <div className="flex flex-row items-center justify-center  sm:w-1/2 lg:w-1/4">
          <div className="text-start mr-4">
            <p className="text-2xl font-bold text-purple-500">456</p>
            <p className="text-sm">Total Sales</p>
          </div>
          <div>
            <img src={sale} alt="Sale" className="h-16" />
          </div>
     
        </div>
        <div className="flex flex-row items-center justify-center sm:w-1/2 lg:w-1/4 mb-2">
          <div className="text-start ">
            <p className="text-2xl font-bold text-purple-500">200</p>
            <p className="text-sm">Total Transaction</p>
          </div>
          <div>
            <img src={transaction} alt="Category" className="h-16" />
          </div>
        </div>
       
       
      </div>
       {/* list o sales section */}
       <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead >
            <tr className="bg-purple-300">
              <th className="py-2 px-4 border-b border-purple-100 text-center">Date</th>
              <th className="py-2 px-4 border-b border-gray-200 text-center">Time</th>
              <th className="py-2 px-4 border-b border-purple-200 text-center">Amount</th>
              <th className="py-2 px-4 border-b border-purple-200 text-center">Customer Name</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">{transaction.date}</td>
                <td className="py-2 px-4 border-b border-gray-200">{transaction.time}</td>
                <td className="py-2 px-4 border-b border-gray-200">${transaction.amount.toFixed(2)}</td>
                <td className="py-2 px-4 border-b border-gray-200">{transaction.customerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default SalesManagement