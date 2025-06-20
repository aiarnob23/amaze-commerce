"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import Pagination from "@/components/pagination/pagination";
import DeleteProduct from "@/components/products/deleteProduct";
import BasicBreadcrumbs from "@/components/ui/breadcrumbs";
import { getAllProducts } from "@/lib/e-commerce";
import withAdminAuth from "@/lib/hoc/withAdminAuth";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { 
  Package, 
  Plus, 
  Edit3, 
  Eye, 
  DollarSign, 
  Package2, 
  Search,
  Filter,
  Grid3X3,
  List,
  ShoppingCart
} from "lucide-react";

const Products = ({ params }: { params: { productsPage: string } }) => {
  const { user } = useAuth();
  const page = parseInt(params.productsPage);
  const perPage = 12;
  const [products, setProducts] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { products, totalPages } = await getAllProducts(page, perPage);
      setProducts(products);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, user]);

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/30 via-white to-purple-50/30 py-6 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <BasicBreadcrumbs />
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-white">
                  <Package size={32} />
                  <div>
                    <p className="text-indigo-100 mt-1">Manage your product inventory</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="p-6 bg-gray-50/50 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products, brands, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none transition-colors duration-200"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-all duration-200">
                    <Filter size={18} />
                    <span>Filter</span>
                  </button>
                  
                  <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-indigo-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Grid3X3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-indigo-500 text-white' 
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Products Grid */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
            : 'space-y-4'
        }`}>
          {filteredProducts.map((product: any) => (
            viewMode === 'grid' ? (
              <div key={product?._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.displayImage || '/placeholder-image.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Eye size={16} className="text-gray-600" />
                  </div>
                  {product.stock && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.stock} in stock
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-green-600" />
                      <span className="text-xl font-bold text-green-600">{product.price}</span>
                    </div>
                    {product.category && (
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link href={`/admin/products/editProduct/${product._id}`} className="flex-1">
                      <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 hover:scale-105">
                        <Edit3 size={16} />
                        <span className="font-medium">Edit</span>
                      </button>
                    </Link>
                    <DeleteProduct id={product?._id} />
                  </div>
                </div>
              </div>
            ) : (
              <div key={product?._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200">
                <div className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={product.displayImage || '/placeholder-image.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <DollarSign size={14} className="text-green-600" />
                              <span className="text-lg font-bold text-green-600">{product.price}</span>
                            </div>
                            {product.category && (
                              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
                                {product.category}
                              </span>
                            )}
                            {product.stock && (
                              <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 ml-4">
                          <Link href={`/admin/products/editProduct/${product._id}`}>
                            <button className="flex items-center space-x-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200">
                              <Edit3 size={14} />
                              <span className="text-sm font-medium">Edit</span>
                            </button>
                          </Link>
                          <DeleteProduct id={product?._id} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Package size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? `No products match "${searchTerm}"` : "You haven't added any products yet."}
              </p>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <Pagination
                totalPages={totalPages}
                initialPage={page}
                pageChangeFn={"handleAdminProductsPageChange"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAdminAuth(Products);