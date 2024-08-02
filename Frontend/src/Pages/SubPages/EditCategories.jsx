import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../Components/Axios';


function EditCategories() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(`/api/subcategories/${id}`);
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch category details.');
      }
    };fetchCategories();
  },[])

  return (
    <div>EditCategories</div>
  )
}

export default EditCategories