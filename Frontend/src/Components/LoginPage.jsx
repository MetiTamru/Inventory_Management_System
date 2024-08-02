import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/login2.png';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: ""
  });
  const { setUser } = useAuth(); 
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUser(formData); 
    navigate('/');
    console.log(formData);
  };

  return (
    <div className='login-container w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b  text-white'
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='mb-8 text-3xl font-bold'>
        <p>Sign into your Account</p>
      </div>
      <div className='bg-white text-gray-800 p-8'>
        <label htmlFor="email" className='block mb-2 text-start'>Email</label>
        <input
          type="email"
          id="email"
          name='email'
          value={formData.email}
          onChange={handleChange}
          className='w-full p-2 mb-2 border-b-2 border-gray-300 focus:border-purple-700 focus:bg-purple-100 focus:outline-none'
        />
        <label htmlFor="password" className='block text-lg text-start mb-2'>Password</label>
        <input
          type="password"
          id="password"
          name='password'
          value={formData.password}
          onChange={handleChange}
          className='w-full p-2 mb-2 border-b-2 border-gray-300 focus:border-purple-700 focus:bg-purple-100 focus:outline-none'
        />

        <div className='flex flex-col'>
          <label htmlFor="role" className='block text-start text-lg mb-1'>Role</label>
          <select
            name="role"
            id="role"
            value={formData.role}
            onChange={handleChange}
            className='w-full p-2 mb-2 border-b-2 border-gray-300 focus:border-purple-700 focus:outline-none'>
            <option value="" disabled>Select role</option>
            <option value="admin">Admin</option>
            
            <option value="cashier">Cashier</option>
          </select>
        </div>
        <Link to="#" className='text-purple-700 hover:underline text-end'>
          <p>Forget password?</p>
        </Link>
      </div>
      <div className='mt-6 flex flex-col space-y-4'>
        <button 
          onClick={handleSubmit}
          className='w-64 px-6 py-2 bg-purple-700 hover:bg-purple-600 text-lg rounded-lg shadow-md transform hover:scale-105 transition-transform'>
          Login
        </button>
        
      </div>
       
    </div>
  );
}

export default LoginPage;
