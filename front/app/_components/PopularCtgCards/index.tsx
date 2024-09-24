'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface BlogCard {
  _id: string;
  title: string;
  imageUrl: string;
}

interface ApiResponse {
  blogs: BlogCard[];
}

const PopularCards = () => {
  const [cards, setCards] = useState<BlogCard[]>([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get<ApiResponse>('http://localhost:3001/api/cards');
        setCards(response.data.blogs);
        console.log("Fetched cards: ", response.data.blogs); 
      } catch (error) {
        console.error("Error fetching cards", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-4xl font-sans text-center mb-8">Popular Categories</h2>
      <div className="flex justify-center items-center space-x-6 flex-wrap">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <div key={card._id} className="flex flex-col items-center mb-8">
              <div className="overflow-hidden h-44 w-44 rounded-full">
              <img src={`${card?.imageUrl}`} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform hover:scale-110" />
              </div>
              <p className="mt-4 text-sm font-medium">{card.title.toUpperCase()}</p>
            </div>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </div>
    </div>
  );
};

export default PopularCards;
