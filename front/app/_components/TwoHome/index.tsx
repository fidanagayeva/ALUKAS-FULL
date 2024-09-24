import React from 'react';

const TwoHome = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 px-2 md:px-[0.5rem] py-8">
      <div className="relative w-full md:max-w-[50%] h-[24rem] overflow-hidden text-left group">
        <img
          src="https://demo-alukas.myshopify.com/cdn/shop/files/alk1_4.jpg?v=1710149492"
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute top-16 left-8 text-black">
          <h3 className="text-3xl font-sans">New Bangles <br /> Collection</h3>
          <h2 className="text-[1rem] text-gray-600">Catch the highlight</h2>
          <p className="mt-4">SHOP NOW</p>
          <div className="h-0.5 bg-black w-0 group-hover:w-[5.5rem] transition-all duration-300 mt-1"></div>
        </div>
      </div>

      <div className="relative w-full md:max-w-[50%] h-[24rem] overflow-hidden text-left group">
        <img
          src="https://demo-alukas.myshopify.com/cdn/shop/files/alk1_5.jpg?v=1710149492"
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute top-16 left-8 text-black">
          <h3 className="text-3xl font-sans">Culture of<br /> Ring Design</h3>
          <h2 className="text-[1rem] text-gray-600">Pasha de Cartier Collection.</h2>
          <p className="mt-4">SHOP NOW</p>
          <div className="h-0.5 bg-black w-0 group-hover:w-[5.5rem] transition-all duration-300 mt-1"></div>
        </div>
      </div>
    </div>
  );
};

export default TwoHome;
