import React, { useState } from "react";
import axiosInstance from "../Components/Axios";
import {useAuth} from "../Components/AuthContext"


function SubmitRevenue() {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [recievername, setRecievername] = useState("");
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/api/revenue/',  {
        name :user.name,
        recievername,
        amount,
        date,
        description,
        is_verified: false
      });
      setMessage("Revenue added successfully!");
      setError("");
      
      setName("");
      setAmount("");
      setDate("");
      setDescription("");
    } catch (error) {
      setError("Failed to add revenue.");
      setMessage("");
    }
  };

  return (
    <div className="w-11/12 md:w-2/3 mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Submit Revenue
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Submiter Name</label>
            <p className="border p-2 font-bold rounded">{user.name}</p>
          </div>
        <div>
          <label
            htmlFor="expenseName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Submited To
          </label>
          <input
            type="text"
            id="name"
            value={recievername}
            onChange={(e) => setRecievername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div >
        <label className="block text-gray-700 text-left font-medium mb-2">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
          max={today} 
          required
        />
      </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Sumbited Via
          </label>
          <select
                 id="description"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 required
                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="" disabled>Select Submition Method</option>
                <option value="cash">Cash</option>
                <option value="transfer">Transfer</option>
                
              </select>
          
        </div>
        <button
          type="submit"
          className="btn-primary w-1/2 py-2 px-4  text-white font-semibold rounded-lg transition duration-200"
        >
         Submit Revenue
        </button>
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
}

export default SubmitRevenue;

