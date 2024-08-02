import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axiosInstance from '../Components/Axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CashierManagement = () => {
  const [cashiers, setCashiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCashierId, setSelectedCashierId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [itemsPerPage] = useState(10); 
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Use a valid field for initial sort
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchCashiers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        setCashiers(response.data.sort((a, b) => b.id - a.id)); // Sort by ID descending
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cashiers.');
        setLoading(false);
      }
    };

    fetchCashiers();
  }, []);

  const openModal = (userId) => {
    setSelectedCashierId(userId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCashierId(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    if (selectedCashierId) {
      try {
        const response = await axiosInstance.delete(`/api/users/${selectedCashierId}/`);
        console.log('Deleted successfully:', response.data);
        setCashiers(prevCashiers => 
          prevCashiers
            .filter(cashier => cashier.id !== selectedCashierId)
            .sort((a, b) => b.id - a.id) 
        );
        setSuccessMessage('Cashier deleted successfully.');
        setTimeout(() => setSuccessMessage(''), 3000);
        closeModal();
      } catch (error) {
        console.error('Deletion failed:', error.response?.data || error.message);
      }
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); 
  };

  const handleSort = (field) => {
    const newSortOrder = sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(field);
    setSortOrder(newSortOrder);
  };

  const filteredCashiers = cashiers
    .filter(cashier => cashier.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCashiers = filteredCashiers.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cashiers.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="h-full w-full flex flex-col gap-6 bg-gray-100 p-4 md:p-8">
      <div className='bg-white flex flex-col md:flex-row md:justify-between items-center p-3 md:mt-16 mt-16'>
        <h1 className="text-2xl mb-5 font-bold">Cashier Management</h1>
        
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 mb-4 md:mb-0"
        />
        <div className='flex flex-row gap-4'>
          <Link to={"/cashier-management/register"}>
            <button className="btn-primary px-4 py-2 rounded-lg text-white md:ml-4">
              Register Cashier
            </button>
          </Link>
          <button className="btn-secondary border border-purple-700 px-4 py-2 rounded-lg text-black md:ml-4">
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
                  Name 
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                  
                >
                  Email 
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                 
                >
                  Status
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                  onClick={() => handleSort('is_active')}
                >
                  Role {sortBy === 'role' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCashiers.map(cashier => (
                <tr key={cashier.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{cashier.id}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{cashier.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{cashier.email}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{cashier.is_active ? 'Active' : 'Inactive'}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{cashier.role}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                    <div className="flex space-x-2">
                      <Link to={`/cashier-management/edit/${cashier.id}`}>
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">
                          <FaEdit />
                        </button>
                      </Link>
                      <button 
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600" 
                        onClick={() => openModal(cashier.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4">
            <ul className="inline-flex space-x-2">
              {pageNumbers.map(number => (
                <li key={number}>
                  <button 
                    onClick={() => paginate(number)}
                    className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white'}`}
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

export default CashierManagement;
