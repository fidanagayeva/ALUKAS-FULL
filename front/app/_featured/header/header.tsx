import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiUser, FiShoppingCart, FiHeart, FiChevronDown, FiPhone, FiMapPin } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import CartSidebar from '../sidebar/CartSidebar';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const searchInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user') || '{}');
    if (data && data.email) {
      setUser(data);
    }
  }, []);

  const handleCloseSearch = () => {
    setShowSearchOverlay(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleNavigateToContact = () => {
    router.push('/contact');
  };

  const handleNavigateToHome = () => {
    router.push('/home');
  };

  const handleNavigateToShop = () => {
    router.push('/shop');
  };

  const handleNavigateToadmin = () => {
    router.push('/admin');
  };

  const handleNavigateTowishlist = () => {
    router.push('/wishlist');
  };

  return (
    <>
      <div className="bg-black text-white text-sm flex justify-between px-8 py-2">
        <div className="flex space-x-6">
          <div className="flex items-center">
            <span>English</span>
            <FiChevronDown className="ml-1 text-gray-500" />
          </div>
          <div className="flex items-center">
            <span>United States (USD $)</span>
            <FiChevronDown className="ml-1 text-gray-500" />
          </div>
          <a href="#">
            Summer Sale 15% off!
          </a>
          <a href="#" className="underline">
            Shop Now!
          </a>
        </div>
        <div className="flex space-x-6">
          <a href="#">Store Location</a>
          <a href="#">Contact</a>
          <a href="#">About</a>
          <a href="#">Gift Cards</a>
        </div>
      </div>

      <div className="flex justify-between items-center py-4 px-8 bg-white border-b">
        <div className="flex items-center border h-[3rem] border-gray-400 p-2">
          <input
            type="text"
            placeholder="Search Products"
            className="outline-none px-2"
          />
          <FiSearch className="text-xl text-gray-500" />
        </div>

        <div className="text-center">
          <img src="https://demo-alukas.myshopify.com/cdn/shop/files/alk_logo_footer.png?v=1714702294&width=533" alt="" />
        </div>

        <div className="flex items-center space-x-6">
          <FiUser className="text-xl cursor-pointer" onClick={handleNavigateToadmin} />

          <div className="relative">
            <FiHeart className="text-xl cursor-pointer" onClick={handleNavigateTowishlist}/>
          </div>

          <div className="relative">
            <FiShoppingCart className="text-xl cursor-pointer" onClick={toggleSidebar} />
            <span className="absolute top-[-8px] right-[-8px] text-xs bg-black text-white rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center py-4 px-8 bg-white border-t">
        <div className="relative group">
          <a href="#" className="flex items-center">
            BROWSE CATEGORIES <FiChevronDown className="ml-1 text-gray-500" />
          </a>
        </div>
        <div className="flex space-x-6 justify-center">
          <div className="relative group">
            <a className="hover:text-black flex items-center cursor-pointer" onClick={handleNavigateToHome}>
              HOME <FiChevronDown className="ml-1 text-gray-500" />
            </a>
            <div className="absolute left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300"></div>

            <div
              className="absolute top-[1.6rem] hidden group-hover:block pt-2 w-64 bg-white shadow-lg border z-50"
              onMouseEnter={() => document.getElementById('dropdown').classList.remove('hidden')}
              onMouseLeave={() => document.getElementById('dropdown').classList.add('hidden')}
            >
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v1 - Default
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v2 - Classic
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v3 - Mega Shop
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v4 - Handmade
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v5 - Minimal
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v6 - Grid Showcase
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v7 - Simple
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v8 - Modern
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v9 - Collection
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v10 - LookBook
                  <div className="w-full h-[1px]"></div>
                </li><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v11 - Landing
                  <div className="w-full h-[1px]"></div>
                </li><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v12 - Instagram
                  <div className="w-full h-[1px]"></div>
                </li><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v13 - Fashion 1
                  <div className="w-full h-[1px]"></div>
                </li><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v14 - Fashion 2
                  <div className="w-full h-[1px]"></div>
                </li><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v15 - Fashion 3
                  <div className="w-full h-[1px]"></div>
                </li><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Home v16 - RTL
                  <div className="w-full h-[1px]"></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <a href="#" className="hover:text-black flex items-center" onClick={handleNavigateToShop}>
              SHOP <FiChevronDown className="ml-1 text-gray-500" />
            </a>
            <div className="absolute left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300"></div>
          </div>
          <div className="relative group">
            <a href="#" className="hover:text-black flex items-center">
              PRODUCT <FiChevronDown className="ml-1 text-gray-500" />
            </a>
            <div className="absolute left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300"></div>
          </div>
          <div className="relative group">
            <a className="hover:text-black flex items-center cursor-pointer">
              PAGES <FiChevronDown className="ml-1 text-gray-500" />
            </a>
            <div className="absolute left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300"></div>

            <div
              className="absolute top-[1.6rem] hidden group-hover:block pt-2 w-64 bg-white shadow-lg border z-50"
              onMouseEnter={() => document.getElementById('dropdown').classList.remove('hidden')}
              onMouseLeave={() => document.getElementById('dropdown').classList.add('hidden')}
            >
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  About us V1
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  About us V2
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  About me
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleNavigateToContact}>
                  Contact
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Store location
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Career
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Brands
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Compare
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Timeline
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  FAQ
                  <div className="w-full h-[1px]"></div>
                </li><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Recently viewed products
                  <div className="w-full h-[1px]"></div>
                </li><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  404 error
                  <div className="w-full h-[1px]"></div>
                </li><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  My account
                  <div className="w-full h-[1px]"></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <a className="hover:text-black flex items-center cursor-pointer">
              BLOGS <FiChevronDown className="ml-1 text-gray-500" />
            </a>
            <div className="absolute left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300"></div>

            <div
              className="absolute top-[1.6rem] hidden group-hover:block pt-2 w-64 bg-white shadow-lg border z-50"
              onMouseEnter={() => document.getElementById('dropdown').classList.remove('hidden')}
              onMouseLeave={() => document.getElementById('dropdown').classList.add('hidden')}
            >
              <ul className="py-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Grid 2 columns
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Grid 3 columns
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Grid 4 columns
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Post left sidebar
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Post right sidebar
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Post list view
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Single post
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Pagination loadmore
                  <div className="w-full h-[1px]"></div>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Pagination Infinite scrolling
                  <div className="w-full h-[1px]"></div>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative group">
            <a href="#" className="hover:text-black flex items-center">
              BUY ALLUKAS! <FiChevronDown className="ml-1 text-gray-500" />
            </a>
            <div className="absolute left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transform origin-left transition-transform duration-300"></div>
          </div>
        </div>

        <div className="flex space-x-6 items-center">
          <div className="flex items-center space-x-2">
            <FiPhone className="text-xl text-gray-500" />
            <span>(+800) 1234 56</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMapPin className="text-xl text-gray-500" />
            <span>Our Stores</span>
          </div>
        </div>
      </div>

      {showSearchOverlay && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white flex flex-col items-center justify-center z-50">
          <div className="w-full max-w-2xl">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for products"
              className="w-full text-center py-2 text-xl border-b border-gray-300 focus:outline-none"
            />
          </div>
          <button
            className="text-3xl mt-4"
            onClick={handleCloseSearch}
          >
            &times;
          </button>
        </div>
      )}

      <CartSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
};

export default Header;
