import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axiosInstance from '../../Components/Axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [categoriesResponse, subCategoriesResponse] = await Promise.all([
          axiosInstance.get('/api/categories/'),
          axiosInstance.get('/api/subcategories/')
        ]);
        setCategories(categoriesResponse.data);
        setSubCategories(subCategoriesResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories or subcategories.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const openModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedCategoryId(null);
    setModalIsOpen(false);
  };

  const handleDelete = async () => {
    if (selectedCategoryId) {
      try {
        await axiosInstance.delete(`/api/categories/${selectedCategoryId}/`);
        setCategories(categories.filter(category => category.id !== selectedCategoryId));
        closeModal();
        alert('Category deleted successfully!');
      } catch (error) {
        setError('Failed to delete category.');
      }
    }
  };

  return (
    <div className=" h-full w-full flex flex-col gap-6 bg-gray-100 p-4 md:p-8 mt-32">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Link to="/manage-items/add-category">
          <button className="btn-primary text-white px-4 py-2 rounded-md flex items-center">
            <FaPlus className="mr-2" /> Add Category
          </button>
        </Link>
      </div>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold">ID</th>
                <th className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold">Name</th>
                <th className="py-3 px-4 border-b border-gray-200 text-center text-sm font-semibold">Subcategories</th>
                <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => {
               
                const filteredSubCategories = subCategories.filter(sub => sub.main_category === category.id);

                return (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{category.id}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">{category.name}</td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">
                      <ul className="list-disc list-inside">
                        {filteredSubCategories.map(sub => (
                          <li key={sub.id}>{sub.name}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 text-sm">
                      <div className="flex space-x-2">
                        <Link to={`/manage-items/edit-category/${category.id}`}>
                          <button className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600">
                            <FaEdit />
                          </button>
                        </Link>
                        <button 
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600" 
                          onClick={() => openModal(category.id)}
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
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        className="fixed inset-0 flex items-center justify-center p-4"
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
        <p className="mb-4">Are you sure you want to delete this category?</p>
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

export default CategoryManagement;
