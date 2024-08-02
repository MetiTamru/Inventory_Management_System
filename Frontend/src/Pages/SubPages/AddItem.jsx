import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Components/Axios';

function AddItem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [items, setItems] = useState({
    name: "",
    size: "",
    main_category: "",
    sub_category: "",
    quantity: 1,
    buying_price: "",
    
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/categories/');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch category details.');
      }
    };

    const fetchSubCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/subcategories/');
        setSubCategories(response.data);
      } catch (err) {
        setError('Failed to fetch subcategory details.');
      }
    };

    fetchCategories();
    fetchSubCategories();
  }, []);

  useEffect(() => {
    if (items.main_category) {
      const filtered = subCategories.filter(
        (subCategory) => subCategory.main_category === parseInt(items.main_category)
      );
      setFilteredSubCategories(filtered);
    }
  }, [items.main_category, subCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItems(prevItems => ({
      ...prevItems,
      [name]: name === 'main_category' || name === 'sub_category' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (id) {
        await axiosInstance.put(`/api/electronics/${id}/`, {
          name: items.name,
          code: items.code,
          size: items.size,
          status: items.status,
          main_category: items.main_category,
          sub_category: items.sub_category,
        });

        await axiosInstance.put(`/api/stocks/${id}/`, {
          quantity: items.quantity,
          units: items.units,
          buying_price: items.buying_price,
          selling_price: items.selling_price,
          invoice_number: items.code,
          status: items.status,
        });
        alert('Item updated successfully!');
      } else {
        await axiosInstance.post('/api/electronics/', {
          name: items.name,
          code: items.code,
          size: items.size,
          status: items.status,
          main_category: parseInt(items.main_category),
          sub_category: parseInt(items.sub_category),
        });

        await axiosInstance.post('/api/stocks/', {
          quantity: items.quantity,
          units: items.units,
          buying_price: items.buying_price,
          selling_price: items.selling_price,
          invoice_number: items.code,
          status: items.status,
        });
        alert('Item registered successfully!');
      }
      navigate('/manage-items/view-items');
    } catch (err) {
      console.error('Request error:', err.response ? err.response.data : err.message);
      setError(`Failed to save item details: ${err.response ? err.response.data : err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center h-full mt-44 min-h-screen">
      <div className="bg-white shadow-lg h-auto md:mt-0 rounded-lg p-8 w-full max-w-6xl overflow-auto">
        <div className="text-center mb-8">
          <p className="text-primary text-2xl font-semibold">Add Items to Stock</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {/* Item Name */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Item Name</label>
              <input
                type="text"
                name="name"
                value={items.name}
                onChange={handleChange}
                placeholder="Enter item name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
           
           
            {/* Main Category */}
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
            </div>
            {/* Sub Category */}
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
            </div>
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            {/* Size */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Item Size</label>
              <input
                type="text"
                name="size"
                value={items.size}
                onChange={handleChange}
                placeholder="Enter item size"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>
           
            {/* Quantity */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={items.quantity}
                onChange={handleChange}
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
                name='buying_price'
                value={items.buying_price}
                onChange={handleChange}
                placeholder="Enter buying price"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
            </div>

            
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            onClick={handleSubmit}
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
