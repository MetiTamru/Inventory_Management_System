import React from 'react';
import supplier from "../assets/supplier.png";
import category from "../assets/category.jfif";
import products from "../assets/products.jfif";
import sale from "../assets/sale.png";
import {Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

function Dashboard() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
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
  
  // Add percentage to the data
  const dataWithPercentage = categoryData.map(item => ({
    ...item,
    percentage: (item.sales / totalSales * 100).toFixed(2),
  }));
  
  const COLORS = ['#4DB6AC', '#B39DDB', '#FFBB28', '#FF8042']; // Colors for the bars
  
  return (
    <div className="p-4 w-full h-full mt-28 min-h-screen">
      <div className="flex flex-wrap justify-around shadow-md bg-white  p-6">
        <div className="flex flex-row items-center justify-center sm:w-1/2 lg:w-1/4 pl-2 mb-2">
          <div className="text-start">
            <p className="text-2xl font-bold text-purple-500">60</p>
            <p className="text-sm">Total Suppliers</p>
          </div>
          <div>
            <img src={supplier} alt="Supplier" className="h-16" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center sm:w-1/2 lg:w-1/4 mb-2">
          <div className="text-start ">
            <p className="text-2xl font-bold text-purple-500">200</p>
            <p className="text-sm">Total Categories</p>
          </div>
          <div>
            <img src={category} alt="Category" className="h-16" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center pl-3 mb-3 sm:w-1/2 lg:w-1/4">
          <div className="text-start mr-4">
            <p className="text-2xl font-bold text-purple-500">170</p>
            <p className="text-sm">Total Products</p>
          </div>
          <div>
            <img src={products} alt="Products" className="h-16" />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center  sm:w-1/2 lg:w-1/4">
          <div className="text-start mr-4">
            <p className="text-2xl font-bold text-purple-500">456</p>
            <p className="text-sm">Total Sales</p>
          </div>
          <div>
            <img src={sale} alt="Sale" className="h-16" />
          </div>
     
        </div>
      </div>
      <div className="p-4 w-full mt-8">
      <p className=" text-lg font-semibold mb-4">Product Chart</p>
      <div className="w-full h-64 sm:w-1/2 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#4DB6AC" />
            <Bar dataKey="uv" fill="#B39DDB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-4 w-full mt-8">
      <h2 className="text-lg font-semibold mb-4">Category Sales Percentage</h2>
      <div className="flex flex-col space-y-2">
        {dataWithPercentage.map((item, index) => (
          <div key={index} className="flex items-center justify-start">
            <span className="w-1/3 text-center text-sm font-medium text-gray-700">{item.name}</span>
            <div className="w-2/3  bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-teal-500 h-full rounded-full"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700 flex-shrink-0">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
    </div>
    <div className="p-4 w-full mt-8">
      <h2 className="text-lg font-semibold mb-4">Product Inventory</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple-400 text-white">
            <tr>
             
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Product</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Quantity</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Purchase Rate</th>
              <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider">Sales Rate</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.map((item, index) => (
              <tr key={index}>
                
                <td className="px-4 py-2 whitespace-nowrap">{item.category}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item.product}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item.quantity}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item.purchaseRate.toFixed(2)}</td>
                <td className="px-4 py-2 whitespace-nowrap">{item.salesRate.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default Dashboard;
