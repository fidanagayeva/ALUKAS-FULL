'use client';

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/api/users"; // Ensure this URL matches your backend
      const response = await axios.post(url, data);

      if (response.status === 201) {
        router.push("/login"); 
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle server-side errors
        setError(error.response.data.message);
      } else if (error.request) {
        // Handle network errors
        setError("No response from server. Please try again later.");
      } else {
        // Handle other errors
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[350px] rounded-lg shadow-lg p-6 bg-white border border-gray-300">
        <h1 className="text-2xl font-semibold text-center mb-4">Welcome Back</h1>
        <p className="text-center text-gray-700 mb-6">Login to access your account</p>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <h2 className="text-xl font-bold mb-6">Create Your Account</h2>

          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            required
            className="w-full mb-4 p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            required
            className="w-full mb-4 p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className="w-full mb-4 p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="••••••••••"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className="w-full mb-4 p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none"
          />

          {error && (
            <div className="w-full mb-4 p-3 bg-red-500 text-white rounded-md text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full p-3 mb-4 bg-black text-white rounded-md font-bold hover:bg-gray-800 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">Already have an account?</p>
        <Link href="/login">
          <button
            type="button"
            className="w-full p-3 bg-gray-200 text-black rounded-md font-semibold hover:bg-gray-300 transition mt-2"
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;