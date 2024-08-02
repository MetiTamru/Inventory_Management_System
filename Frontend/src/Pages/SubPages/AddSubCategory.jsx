import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../Components/Axios';

const AddSubCategory = () => {
  const { id } = useParams(); // Get ID from URL params (if editing)
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    main_category: "",
  });


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/api/categories/');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch category details.');
      }
    };fetchCategories();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'main_category' || name === 'sub_category' ? parseInt(value) : value,
    }));
    
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        
        await axiosInstance.put(`/api/categories/${id}/`, formData);
        alert('Category updated successfully!');
      } else {
        
        await axiosInstance.post('/api/subcategories/', formData);
        alert('subcategory registered successfully!');
      }
      navigate('/manage-items/categories/'); // Redirect after success
    } catch (err) {
      setError('Failed to save category details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-2/3 mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Edit Category' : 'Add Category'}</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
       
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
       
        <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Main Category</label>
              <select
                name="main_category"
                value={formData.main_category}
                onChange={handleChange}
                className="w-full mb-3 p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select main category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
       
        <div className="flex flex-col justify-center sm:flex-row w-full gap-4">
          <div>
          <button
          type="submit"
          className="btn-primary flex-1 w-full text-white p-2 rounded-md"
        >
          {id ? 'Edit SubCategory' : 'Add SubCategory'}
        </button>
          </div>
       
        {!id && (
          <Link to="/manage-items/add-category">
            <button
              type="button"
              className="border border-purple-900 flex-1 w-full text-black p-2 rounded-md"
            >
              Add Category
            </button>
          </Link>
        )}
      </div>

        
      </form>
    </div>
  );
};

export default AddSubCategory;
