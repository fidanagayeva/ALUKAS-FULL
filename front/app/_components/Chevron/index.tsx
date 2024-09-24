'use client';

import React, { useEffect, useState } from 'react';

const Chevron = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / documentHeight) * 100;
      setScrollPercentage(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const fillPercentage = `${scrollPercentage}%`;
  const cursorColor = `rgb(${255 - scrollPercentage * 2.55}, ${255 - scrollPercentage * 2.55}, ${255 - scrollPercentage * 2.55})`;

  return (
    <div
      className="fixed bottom-5 right-5 w-12 h-12 rounded-full flex items-center justify-center"
      style={{
        cursor: 'pointer',
        background: `linear-gradient(to top, black ${fillPercentage}, white ${fillPercentage})`,
        zIndex: 9999 
      }}
    >
      <div className="w-3 h-3 border-r-2 border-b-2 border-gray-500 transform rotate-45"></div>
    </div>
  );
};

export default Chevron;
