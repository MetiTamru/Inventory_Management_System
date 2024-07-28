import React from 'react';
import addpic from "./assets/addpic.png";

function AddItem() {
  return (
    <div className=" w-full flex justify-center  h-full mt-44 min-h-screen">
      <div className="bg-white shadow-lg h-auto md:mt-0 rounded-lg p-8 w-full max-w-6xl overflow-auto">
        <div className="text-center mb-8">
          <p className="text-primary text-2xl font-semibold">Add Items to Stock</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {/* Item Photo */}
            <div className="flex flex-col items-center">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Item Photo
              </label>
              <input
                type="file"
                placeholder="Enter item name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Item Name */}
            <div className=''>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Item Name
              </label>
              <input
                type="text"
                placeholder="Enter item name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            {/* Units */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Units
              </label>
              <input
                type="text"
                placeholder="Enter units"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            {/* Supplier Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Supplier Name
              </label>
              <input
                type="text"
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Main Category
              </label>
              <input
                type="text"
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Sub Category
              </label>
              <input
                type="text"
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            
          </div>
          
          {/* Right Column */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {/* Quantity */}
            
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Item Size 
              </label>
              <input
                type="text"
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Supplier 
              </label>
              <input
                type="text"
                placeholder="Enter supplier name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                placeholder="Enter quantity"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
            {/* Buying Price */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Buying Price
              </label>
              <input
                type="number"
                placeholder="Enter buying price"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Selling Price */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Selling Price
              </label>
              <input
                type="number"
                placeholder="Enter selling price"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>

            {/* Status */}
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
                  <span className="ml-2 text-gray-700">Out of Stock</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="btn-primary w-full max-w-xs text-white py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
