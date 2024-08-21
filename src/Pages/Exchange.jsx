import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../Components/Axios';
import {useAuth} from "../Components/AuthContext"

const Exchange = () => {

  const { user } = useAuth();


  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sellerName, setSellerName] = useState('');
  const [date, setDate] = useState('');
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [additional_payment, setAdditional_payment] = useState("");
  const [new_item_name, setNewItem_name] = useState("");
  const [payment_method, setPayment_method] = useState("");
  const [size, setSize] = useState('');
  const [commission_amount, setCommission_amount] = useState('');
 
  const [estimated_exchange_price, setEstimated_exchange_price] = useState("");
  const [successMessage, setMessage] = useState("");
  const [items, setItems] = useState({
    name: "",
    size: "",
    main_category: "",
    sub_category: "",
    quantity: quantity,
    buying_price: "",
    
  });

  const today = new Date().toISOString().split('T')[0];

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

  useEffect(() => {
    if (items.main_category) {
      const filtered = subCategories.filter(
        (subCategory) => subCategory.main_category === parseInt(items.main_category)
      );
      setFilteredSubCategories(filtered);
    }
  }, [items.main_category, subCategories]);


  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [successMessage]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item) {
      setError('Item data is not loaded.');
      return;
    }

    const sellingPrice = (parseFloat(estimated_exchange_price) || 0) + (parseFloat(additional_payment) || 0);

    const saleData = {
     
    };

    try {
      await axiosInstance.post(`/api/electronics/`, {
        name: new_item_name,
        size: items.size,
        quantity,
        buying_price: estimated_exchange_price,
        main_category: parseInt(items.main_category),
        sub_category: parseInt(items.sub_category),
    });
      await axiosInstance.post('/api/exchange/', {
        item_name: item.name,
        main_category: parseInt(item.main_category),
        sub_category: parseInt(item.sub_category),
        new_item_name,
        quantity,
        date,
        commission_amount,
        payment_method,
        estimated_exchange_price,
        additional_payment: additional_payment * quantity, 
        seller_name: user.name,
        profit: ((sellingPrice - parseFloat(item.buying_price)) * quantity) - commission_amount,
        new_item_main_category: parseInt(items.main_category),
        new_item_sub_category: parseInt(items.sub_category),
      });
      console.log(saleData.new_item_main_category)
      await axiosInstance.patch(`/api/electronics/${id}/`, {
        quantity: item.quantity - quantity,
      });

     

      setError("");
      setQuantity(1);
      setEstimated_exchange_price("");
      setDate("");
      setSellerName("");
      setMessage("Exchanged Item Successfully")
    } catch (err) {
      setError('Failed to record exchange.');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItems(prevItems => ({
      ...prevItems,
      [name]: name === 'main_category' || name === 'sub_category' ? parseInt(value) : value,
    }));
  
    
    setError(prevErrors => ({
      ...prevErrors,
      [name]: value.trim() === '' && name !== 'main_category' && name !== 'sub_category' && name !== 'quantity' && name !== 'buying_price',
    }));
  };


  return (
    <div className="w-full  h-full mt-32 p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">Exchange Item</h1>
    {loading && <p className="text-gray-500">Loading...</p>}
    {!loading && item && (
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        
        <h2 className="text-2xl font-semibold mb-4">Item Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-gray-700 text-left font-medium mb-2">Exchanged Item Name</label>
            <input
              type="name"
              value={new_item_name}
              onChange={(e) => setNewItem_name(e.target.value)}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Main Category</label>
              <select
                name="main_category"
                value={items.main_category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select main category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {error.main_category && <p className="text-red-500 text-sm">Please select a main category.</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Sub Category</label>
              <select
                name="sub_category"
                value={items.sub_category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled={!items.main_category}
              >
                <option value="">Select subcategory</option>
                {filteredSubCategories.map(subCategory => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </option>
                ))}
              </select>
              {error.sub_category && <p className="text-red-500 text-sm">Please select a subcategory.</p>}

            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Item Size</label>
              <input
                type="text"
                name="size"
                value={items.size}
                required
                onChange={handleChange}
                placeholder="Enter item size"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
                        {error.size && <p className="text-red-500 text-sm">Please fill out this field.</p>}

            </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Estimated Exchange Price</label>
            <input
              type="number"
              value={estimated_exchange_price}
              onChange={(e) => setEstimated_exchange_price(e.target.value)}
              min="1"
              className="border p-2 rounded w-full"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Additional Payment</label>
            <input
              type="number"
              value={additional_payment}
              onChange={(e) => setAdditional_payment(e.target.value)}
              min="0"
              className="border p-2 rounded w-full"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Commission Amount</label>
            <input
              type="number"
              value={commission_amount}
              onChange={(e) => setCommission_amount(e.target.value)}
              min="0"
              className="border p-2 rounded w-full"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Payment Method</label>
            <div className="select-container">
              <select
                value={payment_method}
                onChange={(e) => setPayment_method(e.target.value)}
                className="border p-2 rounded w-full h-auto"
                required
              >
                <option value="" disabled>Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="transfer">Transfer</option>
                <option value="debt">Debt</option>
              </select>
            </div>
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
            <p className="border p-2 font-bold rounded">{user.name}</p>
          </div>
          <div>
          <button
          type="submit"
          className="btn-primary w-2/3  text-white px-4 py-2 rounded mt-8"
        >
          Submit Sale
        </button>
          </div>
         
        </div>
        
        {successMessage && (
        <div className="text-green-500  success-message">
          {successMessage}
        </div>
      )}
      </form>
    )}
  </div>
  
  );
};

export default Exchange;


