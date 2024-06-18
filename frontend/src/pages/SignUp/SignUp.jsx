import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import PasswordInput from '../../components/Input/PasswordInput.jsx';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js'; 

const SignUp = () => {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!name) {
      setError("Masukkan nama kamu");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Masukkan email yang valid");
      return;
    }
    
    if (!password) {
      setError("Masukkan password");
      return;
    }
    
    setError("");
    
    // Sign Up API Call
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password
      });
      
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }
      
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Sign up error: ", error); 
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Kesalahan tidak terduga terjadi. Harap coba lagi.");
      }
    }
  };
  
  return (
    <>
      <Navbar />
    
      <div className="flex items-center justify-center mt-20">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">Sign Up</h4>
            <input 
              type="text" 
              placeholder="Nama" 
              className="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Buat Akun
            </button>
            
            <p className="text-sm text-center mt-4">
              Sudah punya akun?{" "}
              <Link to="/login" className="underline font-medium text-primary hover:text-blue-700">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;