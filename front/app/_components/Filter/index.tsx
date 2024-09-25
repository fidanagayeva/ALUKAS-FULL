'use client';

import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

export const Filter = () => {
    const [showCollections, setShowCollections] = useState(true);
    const [showPrice, setShowPrice] = useState(true);
    const [showMaterial, setShowMaterial] = useState(true);
    const [showColor, setShowColor] = useState(true);
    const [showSize, setShowSize] = useState(true);
    const [showAvailability, setShowAvailability] = useState(true);
    const [showTags, setShowTags] = useState(true);

    const [price, setPrice] = useState(1570);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState([]);
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedSize, setSelectedSize] = useState(''); 

    useEffect(() => {
        const fetchFilteredData = async () => {
            const queryParams = new URLSearchParams();

            if (selectedSize) queryParams.append('size', selectedSize);
            if (selectedMaterial.length > 0) queryParams.append('material', selectedMaterial.join(','));
            if (selectedColor) queryParams.append('color', selectedColor);

            const response = await fetch(`http://localhost:3001/api/filter/cards?${queryParams.toString()}`);
            const data = await response.json();
            // Burada backend-dən gələn datanı işləyə bilərsiniz
            console.log('Filtered products:', data);
        };

        fetchFilteredData();
    }, [selectedSize, selectedMaterial, selectedColor]);

    const toggleCollections = () => setShowCollections(!showCollections);
    const togglePrice = () => setShowPrice(!showPrice);
    const toggleMaterial = () => setShowMaterial(!showMaterial);
    const toggleColor = () => setShowColor(!showColor);
    const toggleSize = () => setShowSize(!showSize);
    const toggleAvailability = () => setShowAvailability(!showAvailability);
    const toggleTags = () => setShowTags(!showTags);

    const formatPrice = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    const toggleSelection = (list, setList, item) => {
        setList((prev) =>
            prev.includes(item)
                ? prev.filter((m) => m !== item)
                : [...prev, item]
        );
    };

    const colors = ['black', 'blue', 'yellow', 'green', 'red', 'gray', 'beige'];

    return (
        <div className="w-64 p-4">
            <div>
                <div className="flex justify-between items-center cursor-pointer" onClick={toggleCollections}>
                    <span className="text-2xl font-serif">Collections</span>
                    <span className={`transition-transform duration-300 ${showCollections ? 'rotate-180' : ''}`}>
                        {showCollections ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                </div>
                {showCollections && (
                    <ul className="mt-2 space-y-1 text-[1rem] font-serif text-gray-600">
                        <li className="mb-2 transform transition-transform hover:translate-x-2">All collections</li>
                        <li className="mb-2 transform transition-transform hover:translate-x-2">Art by Saviola</li>
                        <li className="mb-2 transform transition-transform hover:translate-x-2">Middle of North</li>
                        <li className="mb-2 transform transition-transform hover:translate-x-2">Morden</li>
                        <li className="mb-2 transform transition-transform hover:translate-x-2">Original</li>
                        <li className="mb-2 transform transition-transform hover:translate-x-2">Royal Love</li>
                    </ul>
                )}
            </div>

            <hr className="my-4" />

            <div>
                <div className="flex justify-between items-center cursor-pointer" onClick={togglePrice}>
                    <span className="text-2xl font-serif">Price</span>
                    <span>
                        {showPrice ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                </div>
                {showPrice && (
                    <div className="mt-4">
                        <div className="relative w-full h-6 flex items-center">
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 bg-white border-2 border-black rounded-full z-10"></div>

                            <input
                                type="range"
                                min="0"
                                max="1570"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full appearance-none bg-transparent h-2 rounded-full cursor-pointer z-0"
                                style={{ position: 'relative' }}
                            />

                            <style jsx>{`
                                input[type='range']::-webkit-slider-thumb {
                                    -webkit-appearance: none;
                                    appearance: none;
                                    width: 16px;
                                    height: 16px;
                                    border-radius: 50%;
                                    background: black; /* Black thumb */
                                    border: 2px solid black;
                                }

                                input[type='range']::-moz-range-thumb {
                                    width: 16px;
                                    height: 16px;
                                    border-radius: 50%;
                                    background: black; /* Black thumb */
                                    border: 2px solid black;
                                }

                                input[type='range']::-ms-thumb {
                                    width: 16px;
                                    height: 16px;
                                    border-radius: 50%;
                                    background: black; /* Black thumb */
                                    border: 2px solid black;
                                }
                            `}</style>

                            <div
                                className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full z-0"
                                style={{
                                    background: `linear-gradient(to right, black ${(price / 1570) * 100}%, gray 0%)`,
                                    left: '0',
                                    width: '100%',
                                }}
                            />
                        </div>
                        <div className="mt-2 space-y-1 text-[1rem] font-serif text-black">
                            Price: $0.00 - ${formatPrice(price)}
                        </div>
                    </div>
                )}
            </div>

            <hr className="my-4" />

            <div>
                <div className="flex justify-between items-center cursor-pointer" onClick={toggleSize}>
                    <span className="text-2xl font-serif">Size</span>
                    <span className={`transition-transform duration-300 ${showSize ? 'rotate-180' : ''}`}>
                        {showSize ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                </div>
                {showSize && (
                    <div className="mt-2 grid grid-cols-4 gap-2">
                        {['S', 'M', 'L', '12', '14', '16'].map((size, index) => (
                            <div
                                key={index}
                                className={`border border-gray-400 rounded-sm p-2 text-center cursor-pointer transition-all duration-200 hover:bg-black hover:text-white ${selectedSize === size ? 'bg-black text-white' : ''}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <hr className="my-4" />

            <div>
                <div className="flex justify-between items-center cursor-pointer" onClick={toggleAvailability}>
                    <span className="text-2xl font-serif">Availability</span>
                    <span className={`transition-transform duration-300 ${showAvailability ? 'rotate-180' : ''}`}>
                        {showAvailability ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                </div>
                {showAvailability && (
                    <ul className="mt-2 space-y-1 text-[1rem] font-serif text-gray-600">
                        {['In stock', 'Out of stock'].map((availability, index) => (
                            <li key={index} className="flex items-center mb-2 cursor-pointer" onClick={() => toggleSelection(selectedAvailability, setSelectedAvailability, availability)}>
                                <div className={`w-4 h-4 mr-2 border-[1px] ${selectedAvailability.includes(availability) ? 'bg-black' : 'bg-white'} border-gray-200 rounded-sm flex justify-center items-center`}>
                                    {selectedAvailability.includes(availability) && <FaCheck className="text-white" />}
                                </div>
                                {availability} <span className="ml-auto">({index === 0 ? 45 : 6})</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <hr className="my-4" />

            <div>
                <div className="flex justify-between items-center cursor-pointer" onClick={toggleTags}>
                    <span className="text-2xl font-serif">Tags</span>
                    <span className={`transition-transform duration-300 ${showTags ? 'rotate-180' : ''}`}>
                        {showTags ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                </div>
                {showTags && (
                    <ul className="mt-2 space-y-1 text-[1rem] font-serif text-gray-600">
                        {['Bags', 'Black', 'Blue', 'Brand', 'Fashion', 'Gold', 'Green', 'Hat', 'Jewelry', 'Men', 'Mens', 'Modern', 'Rings', 'Shirts', 'Silver', 'Sweater', 'White', 'Women'].map((tag, index) => (
                            <li key={index} className="flex items-center mb-2 cursor-pointer" onClick={() => toggleSelection(selectedTags, setSelectedTags, tag)}>
                                <div className={`w-4 h-4 mr-2 border-[1px] ${selectedTags.includes(tag) ? 'bg-black' : 'bg-white'} border-gray-200 rounded-sm flex justify-center items-center`}>
                                    {selectedTags.includes(tag) && <FaCheck className="text-white" />}
                                </div>
                                {tag} <span className="ml-auto">({Math.floor(Math.random() * 30) + 1})</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <hr className="my-4" />

            <div className="mt-4">
                <a href="">
                    <img src="https://cdn.shopify.com/s/files/1/0691/9307/2864/files/banner-shop.jpg?v=1711798181" alt="" className="w-full h-auto" />
                </a>
            </div>
        </div>
    );
};
