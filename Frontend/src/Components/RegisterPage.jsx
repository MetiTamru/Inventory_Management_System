import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-purple-900 text-white'>
      <div className='mb-8 text-3xl font-bold'>
        <p>Create a New Account</p>
      </div>
      <div className='bg-white text-start text-gray-800 rounded-lg shadow-lg p-8 w-3/4 md:w-1/2'>
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col'>
            <label htmlFor="username" className='block text-lg mb-1'>Username</label>
            <input
              type="text"
              name='name'
              id="username"
              value={formData.name}
              onChange={handleChange}
              className='w-full p-2 mb-2 border-b-2 border-gray-300 focus:border-purple-700 focus:outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="email" className='block text-lg mb-1'>Email</label>
            <input
              type="email"
              id="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full p-2 mb-2 border-b-2 border-gray-300 focus:border-purple-700 focus:outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="password" className='block text-lg mb-1'>Password</label>
            <input
              type="password"
              id="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full p-2 mb-2 border-b-2 border-gray-300 focus:border-purple-700 focus:outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="confirm-password" className='block text-lg mb-1'>Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full p-2 mb-2 border-b-2 border-gray-300 focus:border-purple-700 focus:outline-none'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="role" className='block text-lg mb-1'>Role</label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className='w-full p-2 mb-2 border-b-2 border-gray-300 focus:border-purple-700 focus:outline-none'>
              <option value="" disabled>Select role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="cashier">Cashier</option>
            </select>
          </div>
        </div>
        <div className='text-center mt-4'>
          <Link to="/Authentication/log-in" className='text-purple-700 hover:underline'>
            <p>Already have an account? Log in</p>
          </Link>
        </div>
      </div>
      <div className='mt-6'>
        <button
          onClick={handleSubmit}
          className='w-64 px-6 py-2 bg-purple-700 hover:bg-purple-800 text-lg rounded-lg shadow-md transform hover:scale-105 transition-transform'>
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
