import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import axiosInstance from '../../Components/Axios';
import Modal from 'react-modal';
import * as XLSX from 'xlsx';

Modal.setAppElement('#root');

const ViewSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [itemsPerPage] = useState(10); 
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id'); 
  const [sortOrder, setSortOrder] = useState('desc'); 
  
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axiosInstance.get('/api/sales/');
        const [categoriesResponse, subCategoriesResponse] = await Promise.all([
          axiosInstance.get('/api/categories/'),
          axiosInstance.get('/api/subcategories/')
        ]);
        setCategories(categoriesResponse.data);
        setSubCategories(subCategoriesResponse.data);
        setSales(response.data.sort((a, b) => {
          if (sortOrder === 'asc') {
            return a[sortBy] > b[sortBy] ? 1 : -1;
          } else {
            return a[sortBy] < b[sortBy] ? 1 : -1;
          }
        }));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sales.');
        setLoading(false);
      }
    };

    fetchSales();
  }, [sortBy, sortOrder]); 

  const openModal = (saleId) => {
    setSelectedSaleId(saleId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedSaleId(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    if (selectedSaleId) {
      try {
        const response = await axiosInstance.delete(`/api/sales/${selectedSaleId}/`);
        console.log('Deleted successfully:', response.data);
        setSales(prevSales => 
          prevSales
            .filter(sale => sale.id !== selectedSaleId)
            .sort((a, b) => {
              if (sortOrder === 'asc') {
                return a[sortBy] > b[sortBy] ? 1 : -1;
              } else {
                return a[sortBy] < b[sortBy] ? 1 : -1;
              }
            })
        );
        setSuccessMessage('Sale deleted successfully.');
        setTimeout(() => setSuccessMessage(''), 3000);
        closeModal();
      } catch (error) {
        console.error('Deletion failed:', error.response?.data || error.message);
      }
    }
  };
  const exportToExcel = (data, fileName) => {
    if (!data || data.length === 0) {
      console.error("No data available to export");
      return;
    }
  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const handleExport = () => {
    if (sales && sales.length > 0) {
      exportToExcel(sales, 'Sales Data');
    } else {
      console.error("No Sales available to export");
    }
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); 
  };

  const handleSort = (field) => {
    const newSortOrder = sortBy === field && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(field);
    setSortOrder(newSortOrder);
  };

  const filteredSales = sales
    .filter(sale => sale.item_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSales = filteredSales.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sales.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="h-full w-full flex flex-col gap-6 bg-gray-100 p-4 md:p-8">
      <div className='bg-white flex flex-col md:flex-row md:justify-between items-center p-3 md:mt-16 mt-16'>
        <h1 className="text-2xl  mb-5 font-bold">Sales Record</h1>
        
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 mb-4 md:mb-0"
        />
        <div className='flex flex-row gap-4'>
          <button className="btn-secondary border border-purple-700 px-4 py-2 rounded-lg text-black md:ml-4" onClick={handleExport}>
            Export to Excel
          </button>
        </div>
      </div>
     
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                  onClick={() => handleSort('id')}
                >
                  ID {sortBy === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                >
                  Item Name 
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                >
                  Category 
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                >
                  Subcategory
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                >
                  Quantity
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                >
                  Seller Name
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                >
                  Date
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                >
                  Selling Price 
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                >
                  Profit
                </th>
                
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSales.map(sale => {
                const mainCategory = categories.find(cat => cat.id === sale.main_category)?.name || 'Unknown';
                const subCategory = subCategories.find(sub => sub.id === sale.sub_category)?.name || 'Unknown';

                return (                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{sale.id}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{sale.item_name}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{mainCategory}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{subCategory}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{sale.quantity}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{sale.seller_name}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{sale.date}</td> 
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{sale.selling_price}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{sale.profit}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">
                      <div className="flex space-x-2">
                        
                        <button 
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600" 
                          onClick={() => openModal(sale.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <ul className="inline-flex space-x-2">
              {pageNumbers.map(number => (
                <li key={number}>
                  <button 
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-[#a46cc6] text-white' : 'bg-white'}`}
                  >
                    {number}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex flex-col h-24  items-center justify-center p-4 bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        style={{
          content: {
            maxHeight: '300px', 
            height: 'auto', 
            overflowY: 'auto',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '100%',
            margin: 'auto',
            background: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-4">Are you sure you want to delete this cashier?</p>
        <div className="flex justify-end space-x-2">
          <button 
            onClick={closeModal} 
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete} 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ViewSales;
