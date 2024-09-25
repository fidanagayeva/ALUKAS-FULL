'use client';

import React, { useEffect, useState } from 'react';
import { Filter } from '../Filter'; 
import { FaChevronLeft, FaChevronRight, FaTh, FaThLarge, FaList } from 'react-icons/fa';

interface Product {
  _id: string;
  name: string;
  brand: string;
  size: string;
  price?: number;
  imageUrl: string;
  discount?: number;
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
  const [selectedSize, setSelectedSize] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [view, setView] = useState<'grid3' | 'grid2' | 'list'>('grid3'); 
  const [sortOption, setSortOption] = useState<'az' | 'za'>('az'); 
  const productsPerPage = 8; 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (selectedSize) queryParams.append('size', selectedSize); 

        queryParams.append('page', currentPage.toString()); 
        queryParams.append('limit', productsPerPage.toString()); 

        const response = await fetch(`http://localhost:3001/api/filter/cards?${queryParams.toString()}`);
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
  }, [selectedSize, currentPage, sortOption]); 

  const totalPages = Math.ceil(products.length / productsPerPage); 

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); 
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

  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="flex justify-center">
      <div className="w-1/4 p-4">
        <Filter setSelectedSize={setSelectedSize} />
      </div>

      <div className="pl-24 p-6 w-3/4">
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
                  <span className="text-xl font-sans text-black">{product.price?.toFixed(2)}</span>
                  {product.discount && (
                    <span className="text-gray-500 text-sm line-through ml-2">
                      ${(product.price! * (1 + product.discount / 100)).toFixed(2)}
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
              className={`px-3 py-1 border ${currentPage === index + 1 ? 'border-black' : 'border-white'} hover:border-black`}
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
