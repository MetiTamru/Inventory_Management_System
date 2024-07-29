import React, { useState } from 'react';

function AddSupplier() {
  const [supplier ,setSupplier] = useState({
    name:"",
    email:"",
    phone:"",
    adress:"",
    status:""
  })
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleStatusChange = (e) => {
    setSupplier((prevData) => ({
      ...prevData,
      status: e.target.value, 
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(supplier);
  };

  return (
    <div className="w-full flex justify-center h-full mt-44 min-h-screen">
      <div className="bg-white shadow-lg h-auto rounded-lg p-8 w-full max-w-6xl overflow-auto">
        <div className="text-center mb-8">
          <p className="text-primary text-2xl font-semibold">Add Supplier</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="flex flex-col gap-6 w-full items-center">
            
            {/* Name */}
            <div className=' w-2/3'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                name='name'
                value={supplier.name}
                onChange={handleChange}
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            {/* Email */}
            <div className=' w-2/3'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name='email'
                value={supplier.email}
                onChange={handleChange}
                placeholder="Enter supplier email"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            {/* Phone Number */}
            <div className=' w-2/3'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone Number
              </label>
              <input
                type="number"
                name='phone'
                value={supplier.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            {/* Address */}
            <div className=' w-2/3'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <input
                type="text"
                name='adress'
                value={supplier.adress}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Status */}
            <div className=' w-2/3'>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <div className="flex justify-center gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="available"
                    checked={supplier.status === "available"}
                    onChange={handleStatusChange}
                    className="form-radio text-purple-500"
                  />
                  <span className="ml-2 text-gray-700">Available</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="unavailable"
                    checked={supplier.status === "unavailable"}
                    onChange={handleStatusChange}
                    className="form-radio text-purple-500"
                  />
                  <span className="ml-2 text-gray-700">Unavailable</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8 w-2/3">
              <button
                type="submit"
                onClick={handleSubmit}
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
