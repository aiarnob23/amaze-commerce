"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart, TrendingUp, Eye, ArrowRight, CloudCog } from 'lucide-react';
import { getPopularProducts } from "@/lib/e-commerce";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  color: string[];
  brand: string;
  collectionName: string;
  tags: string[];
  stock: number;
  about: string[];
  rating: number;
  reviews: any[];
  createdAt: string;
  updatedAt: string;
  displayImage: string;
}



export default function PopularProducts() {
  const [popularProducts, setPopularProducts] = useState<any>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getPopularProducts();
        console.log(products);
        setPopularProducts(products);
      } catch (error) {
        console.error("Failed to fetch popular products", error);
      }
    };

    fetchProducts();
  }, []);

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-lg">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Trending Now
          </div>
          <h2 className="text-5xl font-bold text-gradient mb-4">
            Popular Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the most loved items by our community of shoppers
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {popularProducts.map((product: any) => (
            <div
              key={product._id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  src={product.displayImage}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.stock < 10 && (
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      LOW STOCK
                    </span>
                  )}
                  {product.brand && (
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.brand}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${hoveredProduct === product._id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(product._id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${favorites.has(product._id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
                      }`}
                  >
                    <Heart className="w-4 h-4" fill={favorites.has(product._id) ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Category */}
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {product.category}
                </span>

                {/* Product Name */}
                <h3 className="font-bold text-gray-900 text-sm mt-2 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">
                    {product.rating} ({product.reviews?.length || 0} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Stock: {product.stock}
                  </span>
                </div>

                {/* View Product Link */}
                <Link
                  href={`/main/products/singleProduct/${product._id}`}
                  className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-300"
                >
                  View Details
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center">
          <Link href="/main/products/1">
            <button className="inline-flex items-center gap-3 button-gradient hover:scale-105 shadow-lg hover:shadow-xl">
              View All Products
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
