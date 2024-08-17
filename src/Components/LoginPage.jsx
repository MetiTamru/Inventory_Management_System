import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from './Axios';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setUser } = useAuth(); 
    const navigate = useNavigate()

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/jwt/create/', {
                email,
                password
            });
            console.log(response.data)
            const { access, refresh } = response.data;
            
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            await userDetail(email)

           
            
        } catch (err) {
            setError('Invalid email or password');
        }
    };
    const userDetail = async (email) => {
        try {
          const response = await axiosInstance.get(`/api/user-detail/?email=${email}`);
    
          console.log("Raw response data:", response.data);
    
          let data;
          if (typeof response.data === 'string') {
            data = JSON.parse(response.data);
            console.log(typeof data);
          } else {
            data = response.data;
          }
    
          console.log("Parsed data:", data);
    
          const userData = data[0];
          if (userData && userData.fields) {
            console.log("Fields data:", userData.fields);
            const { name, role } = userData.fields;
            const lowerCaseRole = role.toLowerCase();
    
            localStorage.setItem('userRole', lowerCaseRole);
            localStorage.setItem('name', name);
    
            console.log("Role:", lowerCaseRole);
            console.log("Name:", name);
            
            
            setUser({ email, role: lowerCaseRole, name });
           
                navigate("/")
           
          } else {
            console.error("Unexpected data structure or fields is undefined");
          }
    
        } catch (err) {
          console.error("Error fetching user details:", err);
          setError('Invalid email or password');
        }
      };

    return (
        <div className="bg-login-gradient flex justify-center items-center w-screen min-h-screen">
        <div className="form-container w-11/12 md:w-1/3">
            <h2 className="text-3xl font-bold text-center text-black mb-6">
                Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                <div className="form-group relative">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                        placeholder=" "
                    />
                    <label htmlFor="email" className="form-label text-black">Email</label>
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon  text-[#a46cc6]" />
                </div>
                <div className="form-group relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        
                        onChange={(e) => setPassword(e.target.value) }
                        required
                        className="form-input"
                        placeholder=" "
                    />
                    <label htmlFor="password" className="form-label text-black">Password</label>
                    <div 
                        onClick={handleTogglePassword}>
                        {showPassword ? (
                             <FontAwesomeIcon icon={faEyeSlash} className="input-icon text-[#a46cc6]" />
                        ):(
                             <FontAwesomeIcon icon={faEye} className="input-icon text-[#a46cc6]" />

                        )}
                       
                       

                    </div>
                   
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="button w-2/3 rounded-lg mt-10 bg-[#a46cc6]"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    </div>
        );
};

export default LoginPage;
