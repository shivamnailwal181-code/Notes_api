import axios from "axios";
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Context/ContextProvider"

export default function Login() {
    const[email,setEmail] = useState("")
    const[password,setpassword] = useState("")
    const navigate = useNavigate()
    const{login} = useAuth()
    

    const handleLogin=async (e)=>{
        e.preventDefault()
        try{
        const response = await axios.post(
            "http://localhost:5000/api/auth/login" ,{email,password}
        );
        if(response.data.success){
            login(response.data.user)
        localStorage.setItem("token",response.data.token)
            navigate('/')
        }
    }
    catch(err){
        console.log(err)
    }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label> 
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm 
               focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              onChange={(e)=>setpassword(e.target.value)}
              id="password"
              placeholder="********"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm 
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-xl 
                       hover:bg-indigo-700 transition-colors shadow-md font-medium"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>

        {/* Extra link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
         
            <Link to="/register" className="text-indigo-600 font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
