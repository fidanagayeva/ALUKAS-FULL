'use client';

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/api/users/login"; 
      const response = await axios.post(url, data);  
      localStorage.setItem("token", response.data.token); 
      if(response.status === 200) {
        router.push("/home"); 
      }
      else  {
        alert('Error occured');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[400px] rounded-lg shadow-2xl p-8 bg-white">
        <h1 className="text-3xl font-bold mb-5 text-center text-black">Login</h1>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className="w-full p-3 mb-4 rounded-md bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className="w-full p-3 mb-4 rounded-md bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none"
          />
          {error && (
            <div className="w-full p-3 mb-4 rounded-md bg-red-600 text-white text-center">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 mb-2 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition duration-200"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold mb-4 text-black">First Time Here?</h2>
          <p className="text-lg mb-4 text-gray-700">Create an account and join our community today!</p>
          <Link href="/signup">
            <button
              type="button"
              className="w-full px-6 py-3 bg-gray-200 text-black font-bold rounded-md hover:bg-gray-300 transition duration-200"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
