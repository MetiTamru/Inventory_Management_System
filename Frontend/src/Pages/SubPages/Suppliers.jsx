import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // For edit and delete icons
import { Link } from 'react-router-dom';

const supplier = [
  {
    id: 1,
    name:"Samuel",
    Email: 'supplier@gmail.co',
    phone: "0915452672",
    address: 'Addis Abeba',
    status: 'Available',
  },
  // Add more items as needed
];

function Suppliers() {
  const [items, setItems] = useState(supplier);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    
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
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
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
            <Link to={"/inventory-management/add-supplier"}>
              <button className="btn-primary px-4 py-2 rounded-lg text-white md:ml-4">
                Add Supplier
              </button>
            </Link>
            <button className="btn-secondary border border-purple-500 px-4 py-2 rounded-lg text-black md:ml-4">
                Export to Execel
            </button>
          </div>
      </div>
      
      <div className=" w-full mx-auto   bg-white shadow-lg rounded-lg p-4 md:p-8 overflow-x-auto">
        

        <table className="w-full border-collapse  text-sm md:text-base">
          <thead className=''>
            <tr>
              <th className="border-b py-2 px-4 ">
                <button onClick={() => handleSort('itemName')} className="flex items-center pl-7">
                   Name
                  {sortBy === 'itemName' && (sortOrder === 'asc' ? ' 🔼' : ' 🔽')}
                </button>
              </th>
              
              <th className="border-b py-2 px-10 text-left">
                Email
              </th>
              <th className="border-b py-2 px-4 text-left">Phone Number</th>
              <th className="border-b py-2 px-4 text-left">Address</th>
             
              <th className="border-b py-2 px-4 text-left">Status</th>
              <th className="border-b py-2 px-4 text-left">Actions</th>
            </tr>
            
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td className="border-b py-2 px-4">{item.name}</td>
                
                <td className="border-b py-2 px-4">{item.Email}</td>
                <td className="border-b py-2 px-4">{item.phone}</td>
                <td className="border-b py-2 px-4">{item.address}</td>
                <td className="border-b py-2 px-4">{item.status}</td>
                
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

export default Suppliers;
