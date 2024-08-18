import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Components/Axios';

const RegisterCashier = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    is_active: true,
    role:""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      
      const fetchCashier = async () => {
        try {
          const response = await axiosInstance.get(`/api/users/${id}/`);
          setFormData(response.data);
        } catch (err) {
          setError('Failed to fetch cashier details.');
        }
      };

      fetchCashier();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true); 
  
    console.log('Form Data:', formData); 
    
    try {
      let response;
      
      if (id) {
        response = await axiosInstance.put(`/api/users/${id}/`, formData);
        alert('Cashier updated successfully!');
      } else {
        response = await axiosInstance.post('/auth/users/', formData);
        alert('Cashier registered successfully!');
      }
      
      console.log('Response:', response); 
      
      navigate('/cashier-management'); 
    } catch (err) {
      console.error('Error:', err.response || err.message); 
      setError('Failed to save cashier details.'); 
    } finally {
      setLoading(false); 
    }
  };
  
  
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-[#783f9c]"></div>
      <p className="ml-4  text-[#783f9c]">Loading...</p>
    </div>
  );
  

    
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Cashier' : 'Register Cashier'}</h1>
        {error && <p className="text-red-500">{error}</p>}
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            {!id && (
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Status</label>
              <select
                name="is_active"
                value={formData.is_active}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>Select role</option>
                <option value="Admin">Admin</option>
                <option value="Cashier">Cashier</option>
              </select>
            </div>
            <button
              type="submit"
              className="btn-primary w-1/2 text-white p-2 rounded-md"
            >
              {id ? 'Update Cashier' : 'Register Cashier'}
            </button>
          </form>
        )}
      </div>
    );
  };


export default RegisterCashier;
