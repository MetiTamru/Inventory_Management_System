import React, { useState } from 'react';

const Setting = () => {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [currency, setCurrency] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [businessHours, setBusinessHours] = useState({
    open: '',
    close: ''
  });

  const handleSave = () => {
    console.log('Store Name:', storeName);
    console.log('Store Address:', storeAddress);
    console.log('Currency:', currency);
    console.log('Tax Rate:', taxRate);
    console.log('Business Hours:', businessHours);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Store Settings</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Store Name</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Store Address</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={storeAddress}
          onChange={(e) => setStoreAddress(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Currency</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Tax Rate (%)</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          value={taxRate}
          onChange={(e) => setTaxRate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Business Hours</label>
        <div className="flex space-x-4">
          <input
            type="time"
            className="p-2 border border-gray-300 rounded"
            value={businessHours.open}
            onChange={(e) => setBusinessHours({ ...businessHours, open: e.target.value })}
          />
          <input
            type="time"
            className="p-2 border border-gray-300 rounded"
            value={businessHours.close}
            onChange={(e) => setBusinessHours({ ...businessHours, close: e.target.value })}
          />
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-purple-600 text-white py-2 px-4 rounded"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Setting;
