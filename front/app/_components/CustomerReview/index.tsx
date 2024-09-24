"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

export default function CustomerReview() {
    return (
        <div
            className="w-full bg-cover bg-center py-8"
            style={{
                backgroundImage: `url('https://demo-alukas.myshopify.com/cdn/shop/files/alk_bg_testi.jpg?v=1711954099')`,
            }}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-center text-4xl font-sans mb-10">Customer Review</h2>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="p-8 bg-white shadow-md flex flex-col items-start h-full min-h-[15rem]">
                            <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-4">
                                &#8220;
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-left">
                                Alukas is my favourite store
                            </h4>
                            <p className="text-gray-600 mb-4 text-left">
                                Great products and designs and such great quality, they always
                                wash up well no matter how many times I wash them.
                            </p>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-gray-500 italic mb-4 text-left">- Donald Duck -</p>
                                <div className="flex">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar key={i} className="h-5 w-5 text-orange-500" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="p-8 bg-white shadow-md flex flex-col items-start h-full min-h-[18.7rem]">
                            <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-4">
                                &#8220;
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-left">
                                Beautiful products
                            </h4>
                            <p className="text-gray-600 mb-4 text-left">
                                Beautiful clothes. I always get complements. Good quality and
                                items wash well.
                            </p>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-gray-500 italic mb-4 text-left">- Niamh Oxley -</p>
                                <div className="flex">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar key={i} className="h-5 w-5 text-orange-500" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="p-8 bg-white shadow-md flex flex-col items-start h-full min-h-[15rem]">
                            <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-4">
                                &#8220;
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-left">
                                Lovely products
                            </h4>
                            <p className="text-gray-600 mb-4 text-left">
                                Great products and designs and such great quality, they always
                                wash up well no matter how many times I wash them.
                            </p>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-gray-500 italic mb-4 text-left">- Mary Green -</p>
                                <div className="flex">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar key={i} className="h-5 w-5 text-orange-500" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="p-8 bg-white shadow-md flex flex-col items-start h-full min-h-[15rem]">
                            <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold mb-4">
                                &#8220;
                            </div>
                            <h4 className="text-xl font-bold mb-4 text-left">
                                Lovely products
                            </h4>
                            <p className="text-gray-600 mb-4 text-left">
                                Great products and designs and such great quality, they always
                                wash up well no matter how many times I wash them.
                            </p>
                            <div className="flex justify-between items-center w-full">
                                <p className="text-gray-500 italic mb-4 text-left">- Siarhei Dzenisenka -</p>
                                <div className="flex">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar key={i} className="h-5 w-5 text-orange-500" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                </Swiper>
            </div>
        </div>
    );
}
