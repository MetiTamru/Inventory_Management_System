import React from 'react';
import { useAuth } from '../Components/AuthContext';

function UserProfile() {
  const { setUser } = useAuth();

  const { user } = useAuth();
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  const handleLogout = () => {
    
    setUser({ email: '', role: '', name: '' });
    localStorage.removeItem('user');
    window.location.href= "/Authentication/log-in"
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg w-11/12 md:w-1/2 py-10">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-white">
          {user.name[0]}
        </div>
        <h2 className="text-2xl text-[#9847be] font-semibold mt-4">{capitalizeFirstLetter(user.name)}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className=" font-semibold mt-2">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
      </div>
      <div className="mt-6 flex flex-col space-y-4 w-full">
        
        <button className="px-6 py-2 border border-purple-600 text-gray-800 rounded-lg hover:bg-gray-100 transition" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
