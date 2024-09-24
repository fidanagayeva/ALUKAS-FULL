'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from 'next/navigation';
import { FaRegHeart, FaSyncAlt, FaSearch } from 'react-icons/fa';

interface TrendyItem {
    _id: string;
    name: string;
    price: number;
    discount?: string;
    image1: string;
    image2: string;
    label?: string;
    description?: string;
}

export default function TrendyCollection() {
    const [trendyItems, setTrendyItems] = useState<TrendyItem[]>([]);
    const [wishlist, setWishlist] = useState<TrendyItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTrendyItems = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/trendy');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setTrendyItems(result);
            } catch (error) {
                setError('Failed to load trendy items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchTrendyItems();
    }, []);

    useEffect(() => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const handleAddToWishlist = (item: TrendyItem) => {
        if (!wishlist.some(wishItem => wishItem._id === item._id)) {
            setWishlist([...wishlist, item]);
        }
    };

    const handleViewDetails = (item: TrendyItem) => {
        router.push(`/home/${item._id}`);
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="trendy-collection-container px-8 mt-10 mb-[7rem]">
            <h2 className="text-4xl font-sans text-center">Trendy Collection</h2>
            <p className="text-[1.2rem] font-sans text-gray-600 text-center mb-8">
                Collect your loves with our newest arrivals.
            </p>

            {trendyItems.length > 0 ? (
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    pagination={{ clickable: true }}
                    className="trendy-swiper"
                >
                    {trendyItems.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div className="relative group" onClick={() => handleViewDetails(item)}>
                                <img
                                    src={item.image1}
                                    alt={item.name}
                                    className="main-image w-full h-[300px] object-cover transition-all duration-700 ease-in-out group-hover:hidden"
                                />
                                <img
                                    src={item.image2}
                                    alt={item.name}
                                    className="hover-image hidden group-hover:block w-full h-[300px] object-cover transition-all duration-700 ease-in-out"
                                />
                                {item.label && (
                                    <span className="absolute top-2 left-2 bg-[#F8BA26] text-white font-bold px-2 py-1 text-sm">
                                        {item.label}
                                    </span>
                                )}
                                <div className="absolute top-2 right-2 hidden group-hover:flex flex-col space-y-2 transition-all duration-300">
                                    <button
                                        className="border border-white bg-white rounded-full p-2 shadow-md hover:shadow-lg"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToWishlist(item);
                                        }}
                                    >
                                        <FaRegHeart className="text-black text-[1rem]" />
                                    </button>
                                    <button className="border border-white bg-white rounded-full p-2 shadow-md hover:shadow-lg">
                                        <FaSyncAlt className="text-black text-[1rem]" />
                                    </button>
                                    <button className="border border-white bg-white rounded-full p-2 shadow-md hover:shadow-lg">
                                        <FaSearch className="text-black text-[1rem]" />
                                    </button>
                                </div>
                                <div className="text-center mt-4">
                                    <p className="text-sm text-gray-500">{item.brand}</p>
                                    <p className="text-[1.1rem] font-sans">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.description || 'No Description Available'}</p>
                                    <p className="text-[1.1rem] font-sans">${item.price}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-center text-gray-500">No items available</p>
            )}
        </div>
    );
}

