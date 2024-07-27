import React, { useState } from "react";

function AddItem() {
  const [item, setItem] = useState({
    name: "",
    category: "",
    quantity: "",
    price: "",
    description: ""
  });

  const [feedback, setFeedback] = useState({ message: "", success: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    setFeedback({ message: "Item added successfully!", success: true });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">Add New Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-1">Item Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={item.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={item.category}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={item.quantity}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-600 mb-1">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={item.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={item.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Save Item
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={() => setItem({
                name: "",
                category: "",
                quantity: "",
                price: "",
                description: ""
              })}
            >
              Cancel
            </button>
          </div>
        </form>
        {feedback.message && (
          <div
            className={`mt-4 p-3 rounded-md text-center text-white ${
              feedback.success ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddItem;
