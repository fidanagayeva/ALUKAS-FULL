'use client';

import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTh, FaThLarge, FaList } from 'react-icons/fa';

interface Product {
  _id: string;
  name: string;
  brand: string;
  size: string;
  minPrice?: number;
  maxPrice?: number;
  oldPrice?: number;
  discount?: number;
  imageUrl: string;
}

const SkeletonCard = () => (
  <div className="border rounded-lg shadow-lg relative overflow-hidden animate-pulse">
    <div className="bg-gray-200 h-48 w-full"></div>
    <div className="p-4">
      <div className="bg-gray-300 h-4 mb-2 w-1/3"></div>
      <div className="bg-gray-300 h-4 mb-4 w-2/3"></div>
      <div className="bg-gray-200 h-4 w-1/2"></div>
    </div>
  </div>
);

export const FilterShop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [view, setView] = useState<'grid3' | 'grid2' | 'list'>('grid3'); 
  const [sortOption, setSortOption] = useState<'az' | 'za'>('az'); 
  const productsPerPage = 8;
  const totalProducts = products.length;

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/filter/cards');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        let data = await response.json();

        data = data.sort((a: Product, b: Product) => {
          if (sortOption === 'az') {
            return a.name.localeCompare(b.name); 
          } else {
            return b.name.localeCompare(a.name); 
          }
        });

        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortOption]); 

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as 'az' | 'za');
  };

  if (loading) {
    return (
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="flex">
      <div className="w-1/4 p-4"></div>

      <div className="p-6 w-3/4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="mr-2">Sort by: </span>
            <select className="border px-2 py-1" value={sortOption} onChange={handleSortChange}>
              <option value="az">Alphabetically, A-Z</option>
              <option value="za">Alphabetically, Z-A</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <FaTh
              onClick={() => setView('grid3')}
              className={`cursor-pointer ${view === 'grid3' ? 'text-black' : 'text-gray-400'}`}
            />
            <FaThLarge
              onClick={() => setView('grid2')}
              className={`cursor-pointer ${view === 'grid2' ? 'text-black' : 'text-gray-400'}`}
            />
            <FaList
              onClick={() => setView('list')}
              className={`cursor-pointer ${view === 'list' ? 'text-black' : 'text-gray-400'}`}
            />
          </div>
        </div>

        <div
          className={
            view === 'grid3'
              ? 'grid grid-cols-1 md:grid-cols-3 gap-4'
              : view === 'grid2'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-6' 
              : 'space-y-4'
          }
        >
          {currentProducts.map((product) => (
            <div 
              key={product._id} 
              className={`border-white relative overflow-hidden ${view === 'grid2' ? 'w-full h-[25rem]' : ''} ${view === 'list' ? 'w-full h-[30rem]' : ''}`}
            >
              {product.discount && (
                <div className="absolute top-0 left-0 bg-red-600 text-white text-xs px-2 py-1 z-10">
                  -{product.discount}%
                </div>
              )}

              <img
                src={product.imageUrl}
                alt={product.name}
                className={`w-full ${view === 'grid2' ? 'h-[20rem]' : 'h-[17rem]'} object-cover`}
              />

              <div className="p-4 text-center">
                <p className="text-sm text-gray-600">{product.brand}</p>
                <h3 className="text-lg font-sans">{product.name}</h3>
                <div className="mt-2">
                  {product.minPrice !== undefined && (
                    <span className="text-xl font-sans text-black">
                      ${product.minPrice.toFixed(2)}
                    </span>
                  )}
                  {product.maxPrice && (
                    <span className="text-gray-500 text-sm ml-2">
                      - ${product.maxPrice.toFixed(2)}
                    </span>
                  )}
                  {product.oldPrice && (
                    <span className="text-gray-500 text-sm line-through ml-2">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-3 py-1 bg-white border-white hover:border-black hover:border"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border ${
                currentPage === index + 1 ? 'border-black' : 'border-white'
              } hover:border-black`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-white hover:border-black hover:border"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
