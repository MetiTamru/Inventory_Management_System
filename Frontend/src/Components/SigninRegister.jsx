import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/logreg.png';
function SigninRegister() {
  return (
    <div className='registartion-page h-screen w-full flex flex-col items-center justify-around bg-gradient-to-b text-white' 
    style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='mb-8 text-3xl font-bold'>
        <p>Mero Electronics</p>
      </div>
      <div className='flex flex-row space-x-12'>
        <Link to="/Authentication/log-in">
          <button className='btn-primary w-40 rounded-3xl  py-3  text-white text-lg  shadow-md transform '>
            Log-in
          </button>
        </Link>
        <Link to="/Authentication/register">
          <button className='btn-primary w-40 py-3 rounded-3xl  text-white  text-lg  shadow-md transform   '>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SigninRegister;
