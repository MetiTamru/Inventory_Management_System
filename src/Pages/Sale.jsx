import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../Components/Axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Sale = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('itemName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState('');
  const [selectedItemsId, setSelectedItemsId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axiosInstance.get('/api/electronics/');
        setItems(response.data);
        setLoading(false);
        const [categoriesResponse, subCategoriesResponse] = await Promise.all([
          axiosInstance.get('/api/categories/'),
          axiosInstance.get('/api/subcategories/')
        ]);
        setCategories(categoriesResponse.data);
        setSubCategories(subCategoriesResponse.data);
        console.log('Fetched categories:', categoriesResponse.data); 
        console.log('Fetched subcategories:', subCategoriesResponse.data);

      } catch (err) {
        setError('Failed to fetch items.');
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

 

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); 
  };

  const handleSort = (field) => {
    const order = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(order);
  };

  
  const handleSubCategoryClick = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
  };

  const handleShowAll = () => {
    setSelectedSubCategory(null);
  };

  const filteredItems = items
    .filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedSubCategory === null || selectedSubCategory === item.sub_category)
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="h-full w-full flex flex-col gap-6 bg-gray-100 p-4 md:p-8">
      <div className=' bg-white flex flex-col md:flex-row md:justify-between items-center p-3 md:mt-16 mt-16'>
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 mb-4 md:mb-0 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className='filter-container w-full md:w-1/2 '>
          <div className='flex flex-nowrap gap-4'>
          <button
              onClick={handleShowAll}
              className={`btn-secondary border px-4 py-2 rounded-lg text-black ${selectedSubCategory === null ? 'bg-[#a46cc6] text-white' : 'border-[#a46cc6]'}`}
            >
              All
            </button>
            {subCategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => handleSubCategoryClick(sub.id)}
                className={`btn-secondary border px-4 py-2 rounded-lg text-black ${selectedSubCategory === sub.id ? 'bg-[#a46cc6]  text-white' : 'border-[#a46cc6]'}`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">ID</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">Name</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">Size</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">Main Category</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">Sub Category</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">Quantity</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">Buying Price</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(item => {
                const mainCategory = categories.find(cat => cat.id === item.main_category)?.name || 'Unknown';
                const subCategory = subCategories.find(sub => sub.id === item.sub_category)?.name || 'Unknown';

                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{item.id}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{item.name}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{item.size}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{mainCategory}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{subCategory}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{item.quantity}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{item.buying_price}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm flex gap-2">
                      <div className="flex space-x-2">
                        <Link to={`/sell-item/${item.id}`}>                        <button class="bg-green-500 text-white font-bold py-1 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out" >
                      <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10V3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1zM21 3v7a1 1 0 01-1 1h-7a1 1 0 01-1-1V3a1 1 0 011-1h7a1 1 0 011 1zM16 15l-4 4m0 0l-4-4m4 4V8" />
                      </svg>
                      Sell
                    </button>
                      </Link>
                   

                    </div>
                    <div className="flex space-x-2">
                      <Link to={`/exchange/${item.id}`}>
                          <button className="bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out">
                              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v6h6M20 20v-6h-6M4 10l16-6M20 14l-16 6" />
                              </svg>
                              Exchange
                          </button>
                      </Link>
                  </div>

                  </td>
                </tr>
              );
            })}

            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 mx-1 rounded ${
                  currentPage === index + 1 ? 'bg-[#a46cc6] text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
         </div>

        </div>
        
        
      )}

    
    </div>
  );
};

export default Sale;
