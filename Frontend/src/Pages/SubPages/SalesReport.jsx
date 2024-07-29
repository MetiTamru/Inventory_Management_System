import React from 'react'

function SalesReports() {
  return (
    <div><div className="p-4">
    <h2 className="text-xl font-bold mb-4">Sales Report</h2>
    
    {/* Summary Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Total Sales</h3>
        <p className="text-2xl font-bold">$10,000</p>
      </div>
      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Average Sale Amount</h3>
        <p className="text-2xl font-bold">$50</p>
      </div>
      <div className="bg-gray-100 p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Number of Transactions</h3>
        <p className="text-2xl font-bold">200</p>
      </div>
    </div>
    
    {/* Top-Selling Items Section */}
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">Top-Selling Items</h3>
      <ul>
        <li className="flex justify-between py-2 border-b">
          <span>Item A</span>
          <span>$500</span>
        </li>
        <li className="flex justify-between py-2 border-b">
          <span>Item B</span>
          <span>$400</span>
        </li>
        {/* Add more items as needed */}
      </ul>
    </div>
    
    {/* Sales Data Table */}
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Sales Data</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Quantity Sold</th>
            <th className="border p-2">Unit Price</th>
            <th className="border p-2">Total Sales</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">07/25/2024</td>
            <td className="border p-2">Item A</td>
            <td className="border p-2">10</td>
            <td className="border p-2">$50</td>
            <td className="border p-2">$500</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  </div>
  </div>
  )
}

export default SalesReports