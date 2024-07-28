import React from 'react';
import addpic from "./assets/addpic.png";

function AddSupplier() {
  return (
    <div className=" w-2/3 flex justify-center  h-full mt-44 min-h-screen">
      <div className="bg-white shadow-lg h-auto md:mt-0 rounded-lg p-8 w-full max-w-6xl overflow-auto">
        <div className="text-center mb-8">
          <p className="text-primary text-2xl font-semibold">Add Supplier</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="flex flex-col  gap-6 w-full  items-center">
            {/* Item Photo */}
           

            {/*  Name */}
            <div className=''>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                 Name
              </label>
              <input
                type="text"
                placeholder="Enter item name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            {/* Supplier email */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm  font-bold mb-2">
                Status
              </label>
              <div className="flex justify-center gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="available"
                    className="form-radio text-purple-500"
                  />
                  <span className="ml-2 text-gray-700">Available</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="out_of_stock"
                    className="form-radio text-purple-500"
                  />
                  <span className="ml-2 text-gray-700">Unavailable</span>
                </label>
              </div>
            </div>
            <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="btn-primary w-full max-w-xs text-white py-2 px-8 rounded-lg transition-colors duration-200"
          >
            Add 
          </button>
        </div>
          </div>
      
        </div>
        
      </div>
    </div>
  );
}

export default AddSupplier;
