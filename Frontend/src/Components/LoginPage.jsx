import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/img2.png';
import img2 from '../assets/img1.png';
import google from '../assets/google.png';
import facebook from '../assets/facebook.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faHeadphones, faHeadphonesAlt, faHeadphonesSimple, faLessThan } from "@fortawesome/free-solid-svg-icons";

function LoginPage() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-600 to-purple-900 text-white'>
      <div className='mb-8 text-3xl font-bold'>
        <p>Sign into your Account</p>
      </div>
      <div className='bg-white text-gray-800  p-8'>
        <label htmlFor="email" className='block mb-2 text-start'>Email</label>
        <input
            type="email"
            id="email"
            className='w-full p-2 mb-2 border-b-2 border-gray-300 focus:border-purple-700 focus:bg-purple-100 focus:outline-none'
            />
        <label htmlFor="password" className='block text-lg text-start mb-2'>Password</label>
        <input
            type="password"
            id="password"
            className='w-full p-2 mb-2 border-b-2 border-gray-300 focus:border-purple-700 focus:bg-purple-100 focus:outline-none'
            />
        <Link to="#" className='text-purple-700 hover:underline text-end'>
          <p>Forget password?</p>
        </Link>
      </div>
      <div className='mt-6 flex flex-col space-y-4'>
        <button className='w-64 px-6 py-2 bg-purple-700 hover:bg-purple-600 text-lg rounded-lg shadow-md transform hover:scale-105 transition-transform'>
          Login
        </button>
        <button className='w-64 px-6 py-2 bg-white text-purple-700 hover:bg-gray-100 text-lg rounded-lg shadow-md flex items-center justify-center transform hover:scale-105 transition-transform'>
          <img src={google} alt="Google" className='w-6 rounded-md h-6 mr-2' />
          Connect with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
