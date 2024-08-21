import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Components/Axios';
import { useAuth } from '../../Components/AuthContext';
function AddItem() {

  const {user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [errors, setErrors] = useState({
    name: false,
    size: false,
    main_category: false,
    sub_category: false,
    quantity: false,
    buying_price: false,
  });
  
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [items, setItems] = useState({
    name: "",
    size: "",
    main_category: "",
    sub_category: "",
    quantity: 1,
    buying_price: "",
    added_by: user.name,
    
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axiosInstance.get(`/api/electronics/${id}/`);
        setItems(response.data);
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

    

    fetchItem();
    fetchCategoriesAndSubCategories();
    
  }, [id]);



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
  
    
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: value.trim() === '' && name !== 'main_category' && name !== 'sub_category' && name !== 'quantity' && name !== 'buying_price',
    }));
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    let hasErrors = false;
  const newErrors = {
    name: items.name.trim() === '',
    size: !items.quantity ,
    main_category: !items.main_category,
    sub_category: !items.sub_category,
    quantity: items.quantity <= 0,
    buying_price: items.buying_price <= 0,
  };

  if (Object.values(newErrors).includes(true)) {
    setErrors(newErrors);
    hasErrors = true;
  }

  if (hasErrors) {
    setLoading(false);
    return;
  }
    try {
      if (id) {
        await axiosInstance.put(`/api/electronics/${id}/`, {
          name: items.name,
          size: items.size,
          quantity: items.quantity,
          buying_price: items.buying_price,
          main_category: parseInt(items.main_category),
          sub_category: parseInt(items.sub_category),
          added_by:user.name,
        });

        
        alert('Item updated successfully!');
      } else {
        await axiosInstance.post('/api/electronics/', {
          name: items.name,
          size: items.size,
          quantity: items.quantity,
          buying_price: items.buying_price,
          main_category: parseInt(items.main_category),
          sub_category: parseInt(items.sub_category),
          added_by:user.name,
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
    <div className="w-full flex items-start h-full mt-36 ">
      <div className="bg-white shadow-lg h-auto md:mt-0 rounded-lg p-8 w-full max-w-6xl overflow-auto">
        <div className="text-center mb-8">
          <p className="text-primary text-2xl font-semibold">{id ? 'Update Item' : 'Add Item to Stock'}</p>
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
                required
                placeholder="Enter item name"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
                        {errors.name && <p className="text-red-500 text-sm">Please fill out this field.</p>}

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
              {errors.main_category && <p className="text-red-500 text-sm">Please select a main category.</p>}
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
              {errors.sub_category && <p className="text-red-500 text-sm">Please select a subcategory.</p>}

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
                required
                onChange={handleChange}
                placeholder="Enter item size"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 bg-gray-50 focus:outline-none focus:border-purple-500"
              />
                        {errors.size && <p className="text-red-500 text-sm">Please fill out this field.</p>}

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
                        {errors.quantity && <p className="text-red-500 text-sm">Quantity must be greater than 0.</p>}

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
                        {errors.buying_price && <p className="text-red-500 text-sm">Buying price must be greater than 0.</p>}

            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-left font-medium mb-2">Added By</label>
            <p className="border p-2 font-bold rounded">{user.name}</p>
          </div>
            
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-primary w-full max-w-xs text-white py-2 px-4 rounded-lg transition-colors duration-200"
          >
           {id ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItem;
