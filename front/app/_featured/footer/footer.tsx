import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import { BsFacebook, BsInstagram, BsYoutube, BsTiktok } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="bg-white w-full border-t border-gray-200">
      <div className="bg-gray-100 py-20 text-center">
        <h2 className="text-2xl md:text-4xl mb-6">Subscribe Newsletter</h2>
        <p className="text-sm md:text-[1.1rem] text-gray-700 mb-8">
          Sign up to our Newsletter and get the discount code.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="email"
            placeholder="Your email address..."
            className="px-3 py-3 border-2 border-black w-[20rem] md:w-[29rem]"
          />
          <button className="bg-black text-white px-10 py-4 w-[20rem] md:w-auto">
            SUBSCRIBE
          </button>
        </div>
      </div>

      <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <img src="https://demo-alukas.myshopify.com/cdn/shop/files/free-shipping.jpg?v=1712656231" alt="Free Shipping" className="mx-auto mb-4" />
          <p className="font-semibold">Free Shipping</p>
          <p className="text-gray-600 text-sm">For all Orders Over $100</p>
        </div>
        <div>
          <img src="https://demo-alukas.myshopify.com/cdn/shop/files/returns.jpg?v=1712656231" alt="30 Days Returns" className="mx-auto mb-4" />
          <p className="font-semibold">30 Days Returns</p>
          <p className="text-gray-600 text-sm">For an Exchange Product</p>
        </div>
        <div>
          <img src="https://demo-alukas.myshopify.com/cdn/shop/files/secured-payment.jpg?v=1712656231" alt="Secured Payment" className="mx-auto mb-4" />
          <p className="font-semibold">Secured Payment</p>
          <p className="text-gray-600 text-sm">Payment Cards Accepted</p>
        </div>
        <div>
          <img src="https://demo-alukas.myshopify.com/cdn/shop/files/support.jpg?v=1712656037" alt="Support 24/7" className="mx-auto mb-4" />
          <p className="font-semibold">Support 24/7</p>
          <p className="text-gray-600 text-sm">Contact us Anytime</p>
        </div>
      </div>

      <hr className="mb-7" />
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">

        <div>
          <img
            src="https://demo-alukas.myshopify.com/cdn/shop/files/alk_logo_footer.png?v=1714702294&width=533"
            alt="Alukas Logo"
          />
          <p className="text-sm text-gray-600 mt-4 hover:translate-x-1 transition-transform">
            Gold & Diamonds
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">About Alukas</h4>
          <ul className="space-y-4 text-sm text-gray-700">
            <li className="hover:translate-x-3 transition-transform">About Us</li>
            <li className="hover:translate-x-3 transition-transform">Core Values</li>
            <li className="hover:translate-x-3 transition-transform">Careers</li>
            <li className="hover:translate-x-3 transition-transform">Press Releases</li>
            <li className="hover:translate-x-3 transition-transform">Blog</li>
            <li className="hover:translate-x-3 transition-transform">Sitemap</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Our Company</h4>
          <ul className="space-y-4 text-sm text-gray-700">
            <li className="hover:translate-x-3 transition-transform">Shopping App</li>
            <li className="hover:translate-x-3 transition-transform">Be An Affiliate</li>
            <li className="hover:translate-x-3 transition-transform">Advertise Your Product</li>
            <li className="hover:translate-x-3 transition-transform">Media Enquiries</li>
            <li className="hover:translate-x-3 transition-transform">Other Services</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Store Details</h4>
          <ul className="space-y-4 text-sm text-gray-700">
            <div className="flex items-center mb-2">
              <FaPhoneAlt className="text-4xl bg-gray-200 p-2 rounded-full mr-4" />
              <span className="text-lg">( +800 ) 1234 56</span>
            </div>
            <li className="flex items-center transition-transform">
              502 New Design Str,<br /> Melbourne, Australia
            </li>
            <li className="flex items-center transition-transform">
              Alukas@domain.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <BsInstagram className="text-xl" />
            <BsTiktok className="text-xl" />
            <BsYoutube className="text-xl" />
            <BsFacebook className="text-xl" />
          </div>
        </div>

      </div>

      <div className="bg-white py-4 border-t border-gray-200 mt-10">
        <div className="container mx-auto flex flex-col items-center justify-center text-center text-sm text-gray-600">
          <div className="flex justify-center space-x-4 mb-4">
            <img src="https://demo-alukas.myshopify.com/cdn/shop/files/alk_payment.png?v=1711955031" alt="Payment Methods" className="h-8" />
          </div>
          <p>&copy; Alukas all rights reserved. Powered by Besky.</p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
