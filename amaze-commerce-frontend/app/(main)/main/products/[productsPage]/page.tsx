"use client"
import Pagination from "@/components/pagination/pagination";
import { getAllProducts } from "@/lib/e-commerce";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Products({
  params,
}: {
  params: { productsPage: string };
}) {
  const page = parseInt(params.productsPage);
  const perPage = 20;

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [viewMode, setViewMode] = useState<string>("grid");

  // Mock categories for demo - replace with actual categories
  const categories = ["all", "electronics", "clothing", "books", "home", "sports"];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "$0 - $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-250", label: "$100 - $250" },
    { value: "250+", label: "$250+" }
  ];
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name", label: "Name: A to Z" },
    { value: "newest", label: "Newest First" }
  ];

  // Fetch all products initially
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch all products without pagination for filtering
        const { products, totalPages } = await getAllProducts(1, 1000); // Get large number to get all products
        setAllProducts(products);
      } catch (error) {
        setError("Failed to fetch products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => 
        product.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply price range filter
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(p => {
        if (p === "250+") return [250, Infinity];
        return parseInt(p);
      });
      
      if (priceRange === "250+") {
        filtered = filtered.filter(product => product.price >= 250);
      } else {
        const minPrice = parseInt(priceRange.split("-")[0]);
        const maxPrice = parseInt(priceRange.split("-")[1]);
        filtered = filtered.filter(product => 
          product.price >= minPrice && product.price <= maxPrice
        );
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        // Assuming products have a createdAt or similar field
        filtered.sort((a, b) => new Date(b.createdAt || b._id).getTime() - new Date(a.createdAt || a._id).getTime());
        break;
      case "featured":
      default:
        // Keep original order or sort by some featured logic
        break;
    }

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / perPage));
  }, [allProducts, selectedCategory, priceRange, sortBy, perPage]);

  // Get products for current page
  const getCurrentPageProducts = () => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  // Handle page change for pagination
  const handlePageChange = (newPage: number) => {
    window.location.href = `/main/products/${newPage}`;
  };

  // Get current page products
  const currentProducts = getCurrentPageProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Discover Amazing Products
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Explore our curated collection of premium products designed to elevate your lifestyle
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Advanced Filter Section */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

            {/* Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">View</label>
                <div className="flex rounded-xl border-2 border-gray-200 p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${viewMode === "grid"
                        ? "bg-indigo-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 ${viewMode === "list"
                        ? "bg-indigo-500 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              )}
              {priceRange !== "all" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                  Price: {priceRanges.find(r => r.value === priceRange)?.label}
                  <button
                    onClick={() => setPriceRange("all")}
                    className="ml-2 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {loading ? "Loading..." : `${filteredProducts.length} Products Found`}
            </h2>
            <div className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </div>
          </div>

          {/* Products Grid/List */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="mt-4 text-center text-lg font-semibold text-gray-600">
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-red-600 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h3>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 max-w-md mx-auto">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange("all");
                    setSortBy("featured");
                  }}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            <div className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "space-y-6"
            }>
              {currentProducts.map((product: any) => (
                <div
                  key={product._id}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden ${viewMode === "list" ? "flex" : ""
                    }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-48 h-48" : "h-80"} overflow-hidden`}>
                    <Image
                      src={product.displayImage}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 ${viewMode === "list" ? "flex-1 flex flex-col justify-between" : ""}`}>
                    <div>
                      <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                        {product.body}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-2xl font-bold text-indigo-600">
                        ${product.price}
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${(product.price * 1.2).toFixed(2)}
                        </span>
                      </div>
                      <Link
                        href={`/main/products/singleProduct/${product._id}`}
                        className="group/button bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                      >
                        <span>View</span>
                        <svg className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>

                    {/* Rating Stars (Mock) */}
                    <div className="flex items-center mt-3 space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced Pagination Section */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-16 flex justify-center">
              <Pagination
                totalPages={totalPages}
                initialPage={page}
                pageChangeFn="handlePageChange" 
              />
            </div>
        )}
      </div>
    </div>
  );
}