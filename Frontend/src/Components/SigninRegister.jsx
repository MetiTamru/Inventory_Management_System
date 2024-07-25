import React from 'react';
import { Link } from 'react-router-dom';

function SigninRegister() {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-around bg-gradient-to-b from-purple-600 to-purple-900 text-white'>
      <div className='mb-8 text-3xl font-bold'>
        <p>Mero Electronics</p>
      </div>
      <div className='flex flex-row space-x-12'>
        <Link to="/Authentication/log-in">
          <button className='w-40 rounded-3xl  py-3 bg-white text-purple-700 text-lg  shadow-md transform '>
            Log-in
          </button>
        </Link>
        <Link to="/Authentication/register">
          <button className='w-40 py-3 rounded-3xl bg-white  text-lg  shadow-md transform  text-purple-700 '>
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SigninRegister;
