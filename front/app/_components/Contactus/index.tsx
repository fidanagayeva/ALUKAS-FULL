"use client";

import { useState } from "react";

export default function ContactUs({ setContactData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData({
      name: "",
      email: "",
      subject: "",
      comment: "",
    });

    try {
      const response = await fetch("http://localhost:3001/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const newContact = await response.json();

      setContactData((prevData) => [...prevData, newContact]);
    } catch (error) {
      console.error("Error posting contact data:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      <h2 className="text-4xl font-sans text-center mt-6 mb-6">
        Have a question? Contact us!
      </h2>
      <form className="w-full max-w-4xl" onSubmit={handleSubmit}>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 px-2">
            <input
              className="block w-full bg-white text-gray-900 border border-gray-300 py-4 px-3 focus:outline-none"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name} 
              onChange={handleChange}
              required
              style={{ borderRadius: "0px" }}
            />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <input
              className="block w-full bg-white text-gray-900 border border-gray-300 py-4 px-3 focus:outline-none"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email} 
              onChange={handleChange}
              required
              style={{ borderRadius: "0px" }}
            />
          </div>
        </div>
        <div className="mb-4 px-2">
          <input
            className="block w-full bg-white text-gray-900 border border-gray-300 py-4 px-3 focus:outline-none"
            type="text"
            placeholder="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{ borderRadius: "0px" }}
          />
        </div>
        <div className="mb-6 px-2">
          <textarea
            className="block w-full bg-white text-gray-900 border border-gray-300 py-4 px-3 focus:outline-none"
            rows="6"
            placeholder="Write Your Comment..."
            name="comment"
            value={formData.comment} 
            onChange={handleChange}
            required
            style={{ borderRadius: "0px" }}
          ></textarea>
        </div>
        <div className="flex items-center justify-center px-2">
          <button
            className="w-full bg-black text-white font-semibold py-4 focus:outline-none hover:bg-gray-800 transition-all"
            type="submit"
            style={{ borderRadius: "0px" }}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
