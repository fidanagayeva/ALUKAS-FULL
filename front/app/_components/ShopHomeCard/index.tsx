import React from 'react';

const ShopCard = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 px-4 md:px-[3.5rem] py-8">
      <div className="relative w-full md:max-w-96 h-[17rem] overflow-hidden text-left group">
        <img
          src="https://demo-alukas.myshopify.com/cdn/shop/files/alk1_1.webp?v=1712128482"
          alt="2024 Fashion"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 text-white">
          <h2 className="text-[0.9rem]">2024 Fashion</h2>
          <h3 className="text-2xl font-sans">Just Launched <br /> Desk The Hals</h3>
          <p className="mt-4">SHOP NOW</p>
          <div className="h-0.5 bg-white w-0 group-hover:w-[5.5rem] transition-all duration-300 mt-1"></div>
        </div>
      </div>

      <div className="relative w-full md:w-96 h-[17rem] overflow-hidden text-left group">
        <img
          src="https://demo-alukas.myshopify.com/cdn/shop/files/alk1_2.jpg?v=1711684410"
          alt="Flat Discount"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 text-white">
          <h2 className="text-[0.9rem]">Flat Discount</h2>
          <h3 className="text-2xl font-sans">Necklaces & <br /> Body Jewels</h3>
          <p className="mt-4">SHOP NOW</p>
          <div className="h-0.5 bg-white w-0 group-hover:w-[5.5rem] transition-all duration-300 mt-1"></div>
        </div>
      </div>

      <div className="relative w-full md:w-96 h-[17rem] overflow-hidden text-left group">
        <img
          src="https://demo-alukas.myshopify.com/cdn/shop/files/alk1_3.jpg?v=1711684399"
          alt="New Collection"
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 text-white">
          <h2 className="text-[0.9rem]">New Collection</h2>
          <h3 className="text-2xl font-sans">Jewelry & <br /> Charm Rings</h3>
          <p className="mt-4">SHOP NOW</p>
          <div className="h-0.5 bg-white w-0 group-hover:w-[5.5rem] transition-all duration-300 mt-1"></div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
