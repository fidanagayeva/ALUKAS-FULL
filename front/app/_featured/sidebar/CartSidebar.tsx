'use client';

import React, { useState } from 'react';
import { FiX, FiTruck, FiShoppingCart, FiEdit2 } from 'react-icons/fi'; 

const CartSidebar = ({ isSidebarOpen, toggleSidebar, cartItems = [], removeFromCart, editCartItem }) => {
  const [editItem, setEditItem] = useState(null);

  const handleEditClick = (item) => {
    setEditItem(item); 
  };

  const handleSaveEdit = () => {
    editCartItem(editItem); 
    setEditItem(null); 
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-lg z-50 transform transition-transform duration-700 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-semibold">
            Shopping Cart ({(cartItems || []).length})
          </h2>
          <button onClick={toggleSidebar} className="text-gray-500 text-xl">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-4 bg-gray-100 border-b">
          <div className="relative flex items-center ml-3 mt-5 mb-5">
            <div className="absolute flex items-center justify-center w-10 h-10 border-2 border-red-500 rounded-full bg-white">
              <FiTruck className="text-red-500 text-lg" />
            </div>
            <div className="flex-1 ml-4">
              <div className="w-[95%] h-1 bg-gray-300 rounded">
                <div className="bg-red-500 h-full rounded" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
          <span className="block mt-2 ml-5 text-sm text-start">
            Spend $100.00 more to enjoy <strong>FREE SHIPPING!</strong>
          </span>
        </div>

        <div className="p-4">
          {(cartItems || []).length > 0 ? (
            cartItems.map(item => (
              <div key={item.id} className="border-b py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <img src={item.image1} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="ml-4">
                    <p className="text-sm font-semibold">{item.title}</p>
                    
                    <p className="text-sm text-gray-500">
                      {item.selectedSize} / {item.selectedColor} / {item.selectedMaterial}
                    </p>

                    <div className="flex items-center">
                      <button
                        onClick={() => editItem ? setEditItem(null) : handleEditClick(item)} 
                        className="text-gray-500 hover:text-black"
                      >
                        <FiEdit2 size={18} />
                      </button>
                      {editItem && editItem.id === item.id && (
                        <div className="ml-4 flex items-center space-x-2">
                          <button
                            onClick={() => setEditItem({ ...editItem, quantity: Math.max(1, editItem.quantity - 1) })}
                            className="border px-2 py-1"
                          >
                            -
                          </button>
                          <span>{editItem.quantity}</span>
                          <button
                            onClick={() => setEditItem({ ...editItem, quantity: editItem.quantity + 1 })}
                            className="border px-2 py-1"
                          >
                            +
                          </button>
                          <button onClick={handleSaveEdit} className="ml-2 px-3 py-1 bg-black text-white rounded">
                            Save
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-red-500">
                    <FiX size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <FiShoppingCart className="w-16 h-16 text-gray-300 mx-auto" />
              <p className="text-black text-lg">Your cart is empty.</p>
            </div>
          )}
        </div>

        <div className="p-4">
          <button className="w-full bg-black text-white py-2">Checkout</button>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default CartSidebar;
