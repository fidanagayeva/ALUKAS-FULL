"use client";

import { useState, useEffect } from "react";

export default function ContactAdmin() {
  const [contactData, setContactData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/contacts");
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/contacts/${id}`, {
        method: "DELETE",
      });

      const updatedData = contactData.filter((item) => item._id !== id);
      setContactData(updatedData);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const filteredData = contactData.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-sans text-center mb-4">Contact Admin</h2>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b text-left">Name</th>
              <th className="p-2 border-b text-left">Email</th>
              <th className="p-2 border-b text-left">Subject</th>
              <th className="p-2 border-b text-left">Comment</th>
              <th className="p-2 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No data available.
                </td>
              </tr>
            ) : (
              filteredData.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.email}</td>
                  <td className="p-2">{item.subject}</td>
                  <td className="p-2">{item.comment}</td>
                  <td className="p-2 text-center">
                    <button
                      className="text-red-500"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
