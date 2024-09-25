'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AiOutlineQuestionCircle, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineShareAlt, AiOutlineHeart, AiOutlineReload, AiOutlineCloudUpload } from 'react-icons/ai';
import { RiRulerLine } from 'react-icons/ri';
import Footer from '@/app/_featured/footer/footer';
import Header from '@/app/_featured/header/header';

interface ProductDetail {
    _id: string;
    name: string;
    price: number;
    discount?: string;
    image1: string;
    image2: string;
    label?: string;
    description?: string;
}

export default function DetailPage() {
    const { slug } = useParams();
    const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        if (slug) {
            const fetchProductDetail = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/trendy/${slug}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch product details');
                    }
                    const result = await response.json();
                    setProductDetail(result);
                    setSelectedImage(result.image1);
                } catch (error) {
                    setError('Error loading product details.');
                } finally {
                    setLoading(false);
                }
            };
            fetchProductDetail();
        }
    }, [slug]);

    const handleImageClick = (image: string, index: number) => {
        setSelectedImage(image);
        setActiveImageIndex(index);
    };

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const handleMouseMove = (e: React.MouseEvent) => {
        const { offsetX, offsetY, target } = e.nativeEvent;
        const { width, height } = target.getBoundingClientRect();
        const xPercent = Math.min(Math.max((offsetX / width) * 100, 0), 100);
        const yPercent = Math.min(Math.max((offsetY / height) * 100, 0), 100);

        setZoomStyle({
            display: 'block',
            backgroundPosition: `${xPercent}% ${yPercent}%`,
            top: `${e.clientY - 150}px`,
            left: `${e.clientX - 150}px`,
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({ display: 'none' });
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    if (!productDetail) {
        return <p className="text-center text-gray-500">Product not found.</p>;
    }

    return (
        <>
            <Header />
            <div className="container mx-auto px-0 py-8">
                <div className="flex">
                    <div className="sticky top-4 self-start h-screen flex items-start w-1/2">
                        <div className="flex flex-col space-y-4">
                            <img
                                src={productDetail.image1}
                                alt={productDetail.name}
                                className={`cursor-pointer w-[4.375rem] h-[4.375rem] object-cover ${activeImageIndex === 0 ? 'border-black border-2' : 'border'}`}
                                onClick={() => handleImageClick(productDetail.image1, 0)}
                            />
                            <img
                                src={productDetail.image2}
                                alt={productDetail.name}
                                className={`cursor-pointer w-[4.375rem] h-[4.375rem] object-cover ${activeImageIndex === 1 ? 'border-black border-2' : 'border'}`}
                                onClick={() => handleImageClick(productDetail.image2, 1)}
                            />
                        </div>
                        <div className="relative ml-4 overflow-hidden">
                            <img
                                src={selectedImage || productDetail.image1}
                                alt="Selected large image"
                                className="w-[35rem] h-[35rem] transition-opacity duration-500"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                style={{ cursor: 'none' }}
                            />
                            <div
                                className="absolute w-[9rem] h-[9rem] rounded-full bg-no-repeat bg-cover border-2 shadow-2xl overflow-hidden pointer-events-none"
                                style={{
                                    ...zoomStyle,
                                    backgroundImage: `url(${selectedImage || productDetail.image1})`,
                                    backgroundSize: '700%',
                                }}
                            />
                        </div>
                    </div>

                    <div className="w-1/2 pl-8">
                        <h1 className="text-3xl font-sans text-gray-900">{productDetail.name}</h1>
                        <div className="flex items-center mt-2">
                            <span className="text-2xl font-sans text-gray-900">${productDetail.price}</span>
                            {productDetail.discount && (
                                <span className="text-lg font-sans text-gray-400 line-through ml-3">
                                    ${productDetail.discount}
                                </span>
                            )}
                        </div>
                        <p className="text-[0.95rem] text-gray-600 mt-4 leading-normal">
                            {productDetail.description}
                        </p>

                        <div className="flex items-center mt-5 space-x-6 text-[0.95rem] text-gray-700">
                            <button className="flex items-center hover:text-gray-700">
                                <RiRulerLine className="w-5 h-5 mr-1" />
                                Size Guide
                            </button>
                            <button className="flex items-center hover:text-gray-700">
                                <AiOutlineQuestionCircle className="w-5 h-5 mr-1" />
                                Ask a Question
                            </button>
                            <button className="flex items-center hover:text-gray-700">
                                <AiOutlineShareAlt className="w-5 h-5 mr-1" />
                                Share
                            </button>
                        </div>

                        <hr className='mt-5' />

                        <h3 className="text-[15px] font-medium text-black mt-6">Add your personalization</h3>
                        <p className="text-[15px] text-gray-500 mt-4 mb-2">
                            Add your name, note, or upload your customized idea image to personalize your item.
                            Custom items cannot be returned or exchanged.
                        </p>

                        <textarea
                            placeholder="Customize note"
                            className="w-full border p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 mb-2"
                            style={{ height: '3.5rem', lineHeight: '2rem' }}
                        ></textarea>

                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                placeholder="No file chosen"
                                className="w-[27rem] border p-2 text-sm focus:outline-none focus:ring-0"
                                readOnly
                                style={{ height: '3.5rem', lineHeight: '2rem' }}
                            />
                            <label
                                htmlFor="file-upload"
                                className="text-sm w-[11rem] bg-gray-200 p-2 hover:bg-gray-300 flex items-center cursor-pointer justify-center border-l-0"
                                style={{ height: '3.5rem', lineHeight: '2rem' }}
                            >
                                <AiOutlineCloudUpload className="w-6 h-6 mr-1" />
                                Upload image
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                            />
                        </div>

                        <p className="text-sm text-gray-500">
                            Hurry Up! Only <strong className='text-red-600'>10</strong> left in stock!
                        </p>

                        <div className="flex items-center mt-3 mb-3">
                            <div className="h-[5px] w-16 rounded-lg bg-red-500"></div>
                            <div className="h-[5px] w-full rounded-lg bg-gray-300"></div>
                        </div>

                        <div className="flex items-center justify-between mt-7 space-x-4">
                            <div className="flex items-center">
                                <button
                                    onClick={handleDecrement}
                                    className="border px-4 py-2 bg-white hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="border w-11 text-center px-2 py-2 bg-white hover:bg-gray-300"
                                />
                                <button
                                    onClick={handleIncrement}
                                    className="border px-4 py-2 bg-white hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>

                            <button className="bg-black text-white font-semibold py-3 px-8 text-sm hover:bg-gray-900 flex-grow">
                                ADD TO CART
                            </button>

                            <div className="flex space-x-2">
                                <button className="border p-2 hover:bg-gray-100">
                                    <AiOutlineHeart className="w-5 h-5 text-gray-700" />
                                </button>
                                <button className="border p-2 hover:bg-gray-100">
                                    <AiOutlineReload className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-5 flex items-center">
                            <input type="checkbox" className="mr-2" />
                            <label className="text-sm text-gray-600">
                                I agree with <span className="text-black cursor-pointer">Terms & Conditions</span>
                            </label>
                        </div>

                        <div className="mt-5">
                            <button className="bg-gray-200 font-semibold text-gray-700 w-full py-3 text-sm">
                                BUY IT NOW
                            </button>
                        </div>

                        <div className="mt-5 border-t pt-4 text-[15px] text-gray-700">

                            <div className="flex items-start mb-3">
                                <AiOutlineCheckCircle className="w-5 h-5 mt-2 mr-2 text-gray-500" />
                                <div>
                                    <p>Pickup available at <span className="text-black font-medium">Shop location</span>. Usually ready in 24 hours.</p>
                                    <a href="#" className="text-gray-500">View store information</a>
                                </div>
                            </div>

                            <div className="flex items-start mb-3">
                                <AiOutlineClockCircle className="w-5 h-5 mt-2 mr-2 text-gray-500" />
                                <p>
                                    Estimate delivery times: <span className="font-medium">12-26 days</span> (International), <span className="font-medium">3-6 days</span> (United States).
                                </p>
                            </div>

                            <div className="flex items-start mb-3">
                                <AiOutlineReload className="w-5 h-5 mr-2 text-gray-500" />
                                <p>
                                    Return within <span className="font-medium">45 days</span> of purchase. Duties & taxes are non-refundable.
                                </p>
                            </div>

                            <hr className='mt-5' />

                            <div className="mt-5 text-2sm">
                                <p className='mb-3 text-black font-serif'>Sku: <span className="text-gray-500">Alukas</span></p>
                                <p className='mb-3 text-black font-serif'>Available: <span className="text-gray-500">Instock</span></p>
                                <p className='mb-3 text-black font-serif'>Vendor: <span className="text-gray-500">Bcbgmaxazria</span></p>
                                <p className='mb-3 text-black font-serif'>Collections:<span className="text-gray-500"> Accessories, Bracelets, Charms & Dangles, Earrings, Rings, Shop</span></p>
                            </div>
                            <div className="bg-white border border-gray-300 p-4">
                                <h3 className="text-[15px] font-semibold mb-4 flex justify-center">
                                    Guarantee safe checkout
                                </h3>
                                <div className="flex justify-center">
                                    <img
                                        src="https://demo-alukas.myshopify.com/cdn/shop/files/trust_badge.png?v=1712024964&width=533"
                                        alt="Payment Icons"
                                        className="w-[20rem] h-auto"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}