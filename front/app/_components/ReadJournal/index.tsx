"use client";

export default function ReadJournal() {
    return (
        <div className="p-[2rem] mt-16">
            <h2 className="text-center font-sans text-4xl">Read Journal</h2>
            <p className="text-center text-[1.1rem] text-gray-500 mb-8 mt-2">
                Latest trends and inspirations in fashion design.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                <div className="card bg-white overflow-hidden">
                    <div className="relative overflow-hidden group">
                        <img
                            src="https://demo-alukas.myshopify.com/cdn/shop/articles/3.jpg?v=1711695248&width=533"
                            alt=""
                            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm">
                            ACCESSORIES
                        </span>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                        <p className="text-sm text-gray-500">POST BY ALUKAS SHOPIFY - MAR 06 2024</p>
                        <h3 className="text-xl font-semibold">Selective Styles Help your look</h3>
                        <a href="#" className="relative inline-block text-black">
                            <span className="relative group">
                                Continue Reading
                                <span className="block absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
                            </span>
                        </a>
                    </div>
                </div>

                <div className="card bg-white overflow-hidden">
                    <div className="relative overflow-hidden group">
                        <img
                            src="https://demo-alukas.myshopify.com/cdn/shop/articles/2.jpg?v=1711695314&width=533"
                            alt=""
                            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm">
                            ACCESSORIES
                        </span>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                        <p className="text-sm text-gray-500">POST BY ALUKAS SHOPIFY - MAR 06 2024</p>
                        <h3 className="text-xl font-semibold">How to Style a Quiff</h3>
                        <a href="#" className="relative inline-block text-black">
                            <span className="relative group">
                                Continue Reading
                                <span className="block absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
                            </span>
                        </a>
                    </div>
                </div>

                <div className="card bg-white overflow-hidden">
                    <div className="relative overflow-hidden group">
                        <img
                            src="https://demo-alukas.myshopify.com/cdn/shop/articles/1.jpg?v=1711695328&width=533"
                            alt=""
                            className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute top-2 left-2 bg-gray-800 text-white px-2 py-1 text-sm">
                            ACCESSORIES
                        </span>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                        <p className="text-sm text-gray-500">POST BY ALUKAS SHOPIFY - MAR 06 2024</p>
                        <h3 className="text-xl font-semibold">Christmas Gift Guide</h3>
                        <a href="#" className="relative inline-block text-black">
                            <span className="relative group">
                                Continue Reading
                                <span className="block absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all duration-300 ease-in-out group-hover:w-full"></span>
                            </span>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    );
}
