import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import PasswordInput from '../../components/Input/PasswordInput.jsx';
import { validateEmail } from '../../utils/helper.js';
import axiosIntance from "../../utils/axiosInstance.js";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {e.preventDefault();
  
    if (!validateEmail(email)) {
      setError("Masukkan email yang valid");
      return;
    }
    
    if (!password) {
      setError("Masukkan password");
      return;
    }
    
    setError("");
    
    // Login API Call
    try {
      const response = await axiosIntance.post("/login", {
        email: email,
        password: password
      });
      
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Kesalahan tidak terduga terjadi. Harap coba lagi.");
      }
    }
  };
  
  return (
    <>
    <Navbar/>
    
    <div className="flex items-center justify-center mt-20">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleLogin}>
          <h4 className="text-2xl mb-7">Login</h4>
          <input 
            type="text" 
            placeholder="Email" 
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
          
          <button type="submit" className="btn-primary">
            Login
          </button>
          <p className="text-sm text-center mt-4">
            Belum punya akun?{" "}
            <Link to="/signup" className="underline font-medium text-primary hover:text-blue-700">Buat akun</Link>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;