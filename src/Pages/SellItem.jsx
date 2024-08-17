import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../Components/Axios';

const SellItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sellerName, setSellerName] = useState('');
  const [selling_price, setSelling_price] = useState('');
  const [date, setDate] = useState('');
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [sellingPrice, setSellingPrice] = useState("");


  const today = new Date().toISOString().split('T')[0];

  const fetchSummaries = async () => {
    try {
        const [dailySales, weeklySales, monthlySales, ] = await Promise.all([
            axiosInstance.get('/api/sales-summary/daily/'),
            axiosInstance.get('/api/sales-summary/weekly/'),
            axiosInstance.get('/api/sales-summary/monthly/'),
            
        ]);

        setDailySalesSummary(dailySales.data);
        setWeeklySalesSummary(weeklySales.data);
        setMonthlySalesSummary(monthlySales.data);
       
    } catch (err) {
        setError('Failed to fetch summaries.');
    }
};

useEffect(() => {
    fetchSummaries();
}, []);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axiosInstance.get(`/api/electronics/${id}/`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch item details.');
        setLoading(false);
      }
    };

    const fetchCategoriesAndSubCategories = async () => {
      try {
        const [categoriesResponse, subCategoriesResponse] = await Promise.all([
          axiosInstance.get('/api/categories/'),
          axiosInstance.get('/api/subcategories/')
        ]);
        setCategories(categoriesResponse.data);
        setSubCategories(subCategoriesResponse.data);
       
      } catch (err) {
        setError('Failed to fetch categories or subcategories.');
      }
    };

    const fetchSellers = async () => {
      try {
        const response = await axiosInstance.get('/api/users/');
        setSellers(response.data);
      } catch (err) {
        setError('Failed to fetch sellers.');
      }
    };

    fetchItem();
    fetchCategoriesAndSubCategories();
    fetchSellers();
  }, [id]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item) {
      setError('Item data is not loaded.');
      return;
          }
       const saleData = {
        item_name: item.name,
        main_category: item.main_category,
        sub_category: item.sub_category,
        quantity,
        date,
        selling_price:selling_price * quantity, 
        seller_name: sellerName,
        profit: (selling_price - item.buying_price) * quantity,
      }

    try {
      await axiosInstance.post('/api/sales/', 
       saleData
      );
      await axiosInstance.patch(`/api/electronics/${id}/`, 
        {
          quantity: item.quantity - quantity,
        }
       );
      setError("");
      setQuantity(1);
      setSellingPrice("");
      setDate("");
      setSellerName("");
      navigate('/sell/view-sell');
    } catch (err) {
      setError('Failed to record sale.');
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name || 'N/A';
  };

  const getSubCategoryName = (subCategoryId) => {
    const subCategory = subCategories.find((subCat) => subCat.id === subCategoryId);
    return subCategory?.name || 'N/A';
  };

  return (
    <div className="w-full md:w-2/3 h-full mt-32 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Sell  Item</h1>
      {loading && <p className="text-gray-500">Loading...</p>}
      {!loading && item && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Item Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Item Name</label>
            <p className="border p-2 font-bold rounded">{item.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Category</label>
            <p className="border p-2 font-bold rounded">{getCategoryName(item.main_category)}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Subcategory</label>
            <p className="border p-2 font-bold rounded">{getSubCategoryName(item.sub_category)}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Buying Price</label>
            <p className="border p-2 font-bold rounded">$ {item.buying_price}</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              max={item.quantity}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Selling Price</label>
            <input
              type="number"
              value={selling_price}
              onChange={(e) => setSelling_price(e.target.value)}
              min="1"
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Seller Name</label>
          <div className="select-container">
          <select
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            className="border p-2 rounded w-full h-auto"
            required
          >
            <option value="" disabled>Select Seller</option>
            {sellers.map(seller => (
              <option key={seller.id} value={seller.name}>{seller.name}</option>
            ))}
          </select>
        </div>
          </div>
          
          <button
            type="submit"
            className="btn-primary text-white px-4 py-2 rounded"
          >
            Submit Sale
          </button>
        </form>
      )}
    </div>
  );
};

export default SellItem;
