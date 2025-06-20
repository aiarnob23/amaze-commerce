"use client";

import { getSearchResults } from "@/lib/e-commerce";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setAnimateCards(false);
      try {
        const data = await getSearchResults(searchTerm);
        setProducts(data);
        // Trigger animation after data loads
        setTimeout(() => setAnimateCards(true), 100);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchProducts();
    }
  }, [searchTerm]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
          <div className="w-full h-64 bg-gray-200 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 min-h-[600px]">
      {/* Header Section */}
      {searchTerm && (
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Search Results
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Showing results for{" "}
            <span className="font-semibold text-indigo-600">"{searchTerm}"</span>
          </p>
          {!loading && products.length > 0 && (
            <div className="inline-flex items-center bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-gray-700">
                {products.length} product{products.length !== 1 ? "s" : ""} found
              </span>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {loading && <LoadingSkeleton />}

      {/* Products Grid */}
      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {products.map((product: any, index: number) => (
            <Link
              href={`/main/products/singleProduct/${product._id}`}
              key={product._id}
              className={`group block transform transition-all duration-500 hover:scale-105 ${
                animateCards ? "animate-flip" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 overflow-hidden relative">
                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Image container with enhanced styling */}
                <div className="relative overflow-hidden rounded-xl mb-4 bg-gray-50">
                  <Image
                    src={product.displayImage}
                    height={300}
                    width={300}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Product info */}
                <div className="relative z-10">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-200">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gradient">
                      ${product.price}
                    </span>
                    
                    {/* Call to action */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-sm font-medium text-indigo-600 flex items-center">
                        View Details
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && products.length === 0 && searchTerm && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">No Results Found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            We couldn't find any products matching "{searchTerm}". Try searching with different keywords or browse our categories.
          </p>
          <button className="button-gradient inline-flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" />
            </svg>
            Browse Categories
          </button>
        </div>
      )}

      {/* Initial state when no search term */}
      {!searchTerm && (
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gradient mb-4">Ready to Search</h2>
          <p className="text-gray-600 text-lg">Enter a search term to discover amazing products</p>
        </div>
      )}
    </div>
  );
}