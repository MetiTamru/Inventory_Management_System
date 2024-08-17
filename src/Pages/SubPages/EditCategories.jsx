import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Components/Axios';
import { useParams,useNavigate } from 'react-router-dom';

const EditCategoryPage = () => {
  const { id } = useParams(); 
  const [category, setCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const [categoriesResponse, subCategoriesResponse] = await Promise.all([
          axiosInstance.get(`/api/categories/${id}/`),
          axiosInstance.get('/api/subcategories/')
        ]);

        setCategory(categoriesResponse.data);

     
        const relatedSubCategories = subCategoriesResponse.data.filter(
          sub => sub.main_category === categoriesResponse.data.id
        );

        setSubCategories(relatedSubCategories);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch category details or subcategories.');
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id]);

  const handleCategoryChange = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleSubCategoryChange = (e, subId) => {
    setSubCategories(
      subCategories.map(sub =>
        sub.id === subId ? { ...sub, name: e.target.value } : sub
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/api/categories/${id}/`, {
        name: category.name,
      });
      
      await Promise.all(
        subCategories.map(sub =>
          axiosInstance.put(`/api/subcategories/${sub.id}/`, {
            name: sub.name,
            main_category: id,
          })
        )
      );
      alert('Category and subcategories updated successfully!');
      navigate("/manage-items/categories")
    } catch (err) {
      setError('Failed to update category.');
    }
  };

  return (
    <div className="edit-category-page p-4">
      <h1 className="text-2xl mb-5 font-bold">Edit Category</h1>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && category && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block mb-2">Category Name:</label>
            <input
              type="text"
              id="categoryName"
              value={category.name}
              onChange={handleCategoryChange}
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="subcategories" className="block mb-2">Subcategories:</label>
            {subCategories.map(sub => (
              <input
                key={sub.id}
                type="text"
                value={sub.name}
                onChange={(e) => handleSubCategoryChange(e, sub.id)}
                className="px-4 py-2 border rounded-lg mb-3 w-full"
              />
            ))}
          </div>

          <button type="submit" className="btn-primary text-white px-4 py-2 rounded-md">
            Update Category
          </button>
        </form>
      )}
    </div>
  );
};

export default EditCategoryPage;
