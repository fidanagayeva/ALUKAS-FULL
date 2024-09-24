'use client';

import React, { useEffect, useState } from 'react';
import { FaTimes, FaSyncAlt, FaSearch, FaStar, FaFire, FaUser } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import CartSidebar from '../../_featured/sidebar/CartSidebar'; 

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('Gold');
  const [selectedMaterial, setSelectedMaterial] = useState('Gold');
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      const itemToAdd = {
        ...selectedItem,
        quantity,
        selectedSize,
        selectedColor,
        selectedMaterial,
      };

      setCartItems(prevItems => {
        const existingItem = prevItems.find(cartItem => cartItem.id === itemToAdd.id);
        if (existingItem) {
          return prevItems.map(cartItem =>
            cartItem.id === itemToAdd.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          );
        }
        return [...prevItems, itemToAdd];
      });
      handleCloseModal();
      setIsSidebarOpen(true); 
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleNavigateToHome = () => {
    router.push('/home');
  };

  return (
    <div className="wishlist-page-container px-8 mt-10 mb-10">
      <h2 className="text-4xl font-sans text-center mb-8">Wishlist</h2>

      <div className="breadcrumb flex items-center justify-center space-x-2 py-4 text-black">
        <a className="text-gray-500 cursor-pointer" onClick={handleNavigateToHome}>Home</a>
        <FiChevronRight className="text-gray-500" />
        <a className="text-gray-500 cursor-pointer">Pages</a>
        <FiChevronRight className="text-gray-500" />
        <span>Wishlist</span>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-4 gap-8 mt-10">
          {wishlist.map(item => (
            <div key={item.id} className="relative group wishlist-item p-4 border rounded-lg">
              <img
                src={item.image1}
                alt={item.title}
                className="main-image w-full h-[300px] object-cover transition-all duration-700 ease-in-out group-hover:hidden"
              />
              <img
                src={item.image2}
                alt={item.title}
                className="hover-image hidden group-hover:block w-full h-[300px] object-cover transition-all duration-700 ease-in-out"
              />

              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="absolute top-2 right-2 p-2 bg-white border border-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaTimes className="text-black text-[1.2rem] cursor-pointer" />
              </button>

              <div className="absolute top-14 right-2 flex flex-col space-y-2 hidden group-hover:flex transition-all duration-300">
                <button className="border border-white bg-white rounded-full p-2 shadow-md hover:shadow-lg">
                  <FaSyncAlt className="text-black text-[1.2rem] cursor-pointer" />
                </button>
                <button
                  className="border border-white bg-white rounded-full p-2 shadow-md hover:shadow-lg"
                  onClick={() => handleOpenModal(item)}
                >
                  <FaSearch className="text-black text-[1.2rem] cursor-pointer" />
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="text-[1.1rem] font-sans">{item.title}</p>
                <p className="text-[1.1rem] font-sans">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">Your wishlist is empty.</p>
      )}

      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white w-[80%] h-[80%] max-h-[700px] flex shadow-lg">
            <div className="w-1/2 p-4 flex items-center justify-center">
              <img
                src={selectedItem.image1}
                alt={selectedItem.title}
                className="max-w-full h-auto object-contain"
              />
            </div>

            <div className="w-1/2 p-8 overflow-y-auto custom-scrollbar">
              <h3 className="text-3xl font-semibold">{selectedItem.title}</h3>

              <div className="flex items-center space-x-4 my-2">
                <div className="flex items-center space-x-1">
                  {Array(5).fill().map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  <FaUser className="text-gray-500" />
                  <p className="text-gray-500 text-sm">2 reviews</p>
                </div>
                <div className="flex items-center space-x-1">
                  <FaFire className="text-red-500" />
                  <p className="text-sm text-red-500">22 sold in last 20 hours</p>
                </div>
              </div>

              <p className="text-xl">${selectedItem.price}</p>

              <p className="text-gray-600 my-2">{selectedItem.description}</p>

              <div className="flex items-center space-x-2 my-4">
                <p className="text-sm">Size:</p>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border border-gray-300 rounded ${selectedSize === size ? 'bg-black text-white' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2 my-4">
                <p className="text-sm">Color:</p>
                {[
                  { color: 'Gold', className: 'bg-yellow-400' },
                  { color: 'Gray', className: 'bg-gray-400' }
                ].map(({ color, className }) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full border-2 ${className} ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>

              <div className="mt-4">
                <p className="text-sm mb-2">Material: {selectedMaterial}</p>
                <div className="flex space-x-2">
                  {['Gold', 'Silver', 'Bronze'].map((material) => (
                    <button
                      key={material}
                      className={`border border-gray-300 px-4 py-2 ${selectedMaterial === material ? 'bg-black text-white' : ''}`}
                      onClick={() => setSelectedMaterial(material)}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center my-4">
                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="border px-4 py-2">-</button>
                <span className="px-4">{quantity}</span>
                <button onClick={() => setQuantity(prev => prev + 1)} className="border px-4 py-2">+</button>
              </div>

              <button
                onClick={handleAddToCart}
                className="mt-6 w-full bg-black text-white py-2 rounded"
              >
                Add to Cart
              </button>

              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 bg-white border border-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <FaTimes className="text-black text-[1.2rem] cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      )}

      <CartSidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export default Wishlist;

