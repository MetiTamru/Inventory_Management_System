import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Components/Axios';
import Modal from 'react-modal';
import { FaTrash } from 'react-icons/fa';
import * as XLSX from 'xlsx';

Modal.setAppElement('#root');

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [itemsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('desc'); 

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axiosInstance.get('/api/expenses/');
        setExpenses(response.data.sort((a, b) => b.id - a.id)); 
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch expenses.');
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const openModal = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedExpenseId(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    if (selectedExpenseId) {
      try {
        const response = await axiosInstance.delete(`/api/expenses/${selectedExpenseId}/`);
        console.log('Deleted successfully:', response.data);
        setExpenses((prevExpenses) =>
          prevExpenses
            .filter((expense) => expense.id !== selectedExpenseId)
            .sort((a, b) => b.id - a.id)
        );
        setSuccessMessage('Expense deleted successfully.');
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
    if (expenses && expenses.length > 0) {
      exportToExcel(expenses, 'Expense Data');
    } else {
      console.error("No expenses available to export");
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

  const filteredExpenses = expenses
    .filter((expense) => expense.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    const handleVerify = async (expenseId) => {
      try {
        
        await axiosInstance.patch(`/api/expenses/${expenseId}/`, { is_verified: true });
    
        
        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === expenseId ? { ...expense, is_verified: true } : expense
          )
        );
        
        setSuccessMessage('Expense verified successfully.');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Verification failed:', error.response?.data || error.message);
      }
    };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(expenses.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="h-full w-full flex flex-col gap-6 bg-gray-100 p-4 md:p-8">
      <div className='bg-white flex flex-col md:flex-row md:justify-between items-center p-3 md:mt-16 mt-16'>
        <h1 className="text-2xl mb-5 font-bold">Expense Management</h1>
        
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-lg w-full md:w-1/3 mb-4 md:mb-0"
        />
        <div className='flex flex-row gap-4'>
          
          <button className="btn-secondary border border-purple-700 px-4 py-2 rounded-lg text-black md:ml-4"  onClick={handleExport}>
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
                 Submitter's Name 
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                  
                >
                  Amount 
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                 
                >
                  Date
                </th>
                <th 
                  className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold cursor-pointer"
                 
                >
                  Expense Reason
                </th>
                
                <th className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold">Verify</th>
                <th className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold">Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map(expense => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{expense.id}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{expense.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{expense.amount}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{expense.date}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">{expense.description}</td>
                 
                  
                  <td className="py-3 px-4 border-b border-gray-200 text-sm">
                  {expense.is_verified ? (
                    <button className="bg-green-500 text-white px-2 py-1 rounded-md" disabled>
                      Verified
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => handleVerify(expense.id)}
                    >
                      Verify
                    </button>
                  )}
                  </td>
                  <td>
                  <button 
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600" 
                        onClick={() => openModal(expense.id)}
                      >
                        <FaTrash />
                      </button>
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
        <p className="mb-4">Are you sure you want to delete this expense?</p>
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

export default Expenses;
