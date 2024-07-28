import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // For edit and delete icons
import { Link } from 'react-router-dom';

const sampleItems = [
  {
    id: 1,
    photo: '/path/to/photo1.jpg',
    itemName: 'Item 1',
    itemSalesName: 'Item Sales 1',
    itemCode: 'CODE123',
    mainCategory: 'Electronics',
    subCategory: 'Mobile',
    brand: 'Brand A',
    unit: 'pcs',
    itemSize: 'Medium',
    supplier: 'Supplier X',
    invoiceNo: 'INV001',
    stockBalance: 50,
    buyingPrice: 20,
    buyingAmount: 1000,
    sellingPrice: 30,
    sellingAmount: 1500,
    status: 'Available',
    date: '2024-07-01',
  },
  // Add more items as needed
];

function ViewItems() {
  const [items, setItems] = useState(sampleItems);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('itemName');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Fetch items from an API or perform other initialization
    // setItems(fetchedItems);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (field) => {
    const order = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(order);
  };

  const filteredItems = items
    .filter(item => item.itemName.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

  return (
    <div className="min-h-screen w-full flex flex-col gap-6 bg-gray-100 p-4 md:p-8">
      <div className='bg-white flex flex-col md:flex-row md:justify-between items-center p-3 md:mt-16 mt-16'>
        <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={handleSearch}
              className="px-4 py-2 border rounded-lg w-full md:w-1/3 mb-4 md:mb-0"
          />
          <div className='flex flex-row gap-4'>
            <Link to={"/manage-items/add-item"}>
              <button className="btn-primary px-4 py-2 rounded-lg text-white md:ml-4">
                Add New Item
              </button>
            </Link>
            <button className="btn-secondary border border-purple-500 px-4 py-2 rounded-lg text-black md:ml-4">
                Export to Execel
            </button>
          </div>
      </div>
      
      <div className=" w-full mx-auto  bg-white shadow-lg rounded-lg p-4 md:p-8 overflow-x-auto">
        

        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr>
              <th className="border-b py-2 px-4 text-left">
                <button onClick={() => handleSort('itemName')} className="flex items-center">
                  Item Name
                  {sortBy === 'itemName' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                </button>
              </th>
              <th className="border-b py-2 px-4 text-left">Photo</th>
              <th className="border-b py-2 px-10 text-left">
                <button onClick={() => handleSort('itemSalesName')} className="flex items-center">
                  Item Sales Name
                  {sortBy === 'itemSalesName' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                </button>
              </th>
              <th className="border-b py-2 px-4 text-left">Item Code</th>
              <th className="border-b py-2 px-4 text-left">Main Category</th>
              <th className="border-b py-2 px-4 text-left">Sub Category</th>
              <th className="border-b py-2 px-4 text-left">Brand</th>
              <th className="border-b py-2 px-4 text-left">Unit</th>
              <th className="border-b py-2 px-4 text-left">Item Size</th>
              <th className="border-b py-2 px-4 text-left">Supplier</th>
              <th className="border-b py-2 px-4 text-left">Invoice No</th>
              <th className="border-b py-2 px-4 text-left">
                <button onClick={() => handleSort('stockBalance')} className="flex items-center">
                  Stock Balance
                  {sortBy === 'stockBalance' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                </button>
              </th>
              <th className="border-b py-2 px-4 text-left">
                <button onClick={() => handleSort('buyingPrice')} className="flex items-center">
                  Buying Price
                  {sortBy === 'buyingPrice' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                </button>
              </th>
              <th className="border-b py-2 px-4 text-left">Buying Amount</th>
              <th className="border-b py-2 px-4 text-left">
                <button onClick={() => handleSort('sellingPrice')} className="flex items-center">
                  Selling Price
                  {sortBy === 'sellingPrice' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                </button>
              </th>
              <th className="border-b py-2 px-4 text-left">Selling Amount</th>
              <th className="border-b py-2 px-4 text-left">Status</th>
              <th className="border-b py-2 px-4 text-left">Date</th>
              <th className="border-b py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td className="border-b py-2 px-4">{item.itemName}</td>
                <td className="border-b py-2 px-4">
                  <img src={item.photo} alt={item.itemName} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="border-b py-2 px-4">{item.itemSalesName}</td>
                <td className="border-b py-2 px-4">{item.itemCode}</td>
                <td className="border-b py-2 px-4">{item.mainCategory}</td>
                <td className="border-b py-2 px-4">{item.subCategory}</td>
                <td className="border-b py-2 px-4">{item.brand}</td>
                <td className="border-b py-2 px-4">{item.unit}</td>
                <td className="border-b py-2 px-4">{item.itemSize}</td>
                <td className="border-b py-2 px-4">{item.supplier}</td>
                <td className="border-b py-2 px-4">{item.invoiceNo}</td>
                <td className="border-b py-2 px-4">{item.stockBalance}</td>
                <td className="border-b py-2 px-4">${item.buyingPrice}</td>
                <td className="border-b py-2 px-4">${item.buyingAmount}</td>
                <td className="border-b py-2 px-4">${item.sellingPrice}</td>
                <td className="border-b py-2 px-4">${item.sellingAmount}</td>
                <td className="border-b py-2 px-4">{item.status}</td>
                <td className="border-b py-2 px-4">{item.date}</td>
                <td className="border-b py-2 px-4 flex gap-2 justify-center md:justify-start">
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewItems;
