import AddToCart from "@/components/products/addToCart";
import { getProductById, getRelatedProducts } from "@/lib/e-commerce";
import Image from "next/image";
import Link from "next/link";

export default async function SingleProduct({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await getProductById(id);
  const relatedProducts = await getRelatedProducts(product?.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/main/products/1" className="hover:text-indigo-600 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{product?.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 mb-20">
          {/* Product Images */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
                  <Image
                    height={600}
                    width={600}
                    src={product?.displayImage}
                    alt={product?.name}
                    className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Image Gallery Thumbnails (Mock - you can implement actual multiple images) */}
                <div className="flex space-x-4 mt-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-all duration-300 cursor-pointer">
                      <Image
                        src={product?.displayImage}
                        alt={`${product?.name} view ${i}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info & Add to Cart */}
          <div className="space-y-8">
            {/* Product Details Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full">
                    {product?.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'} fill-current`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">({product?.rating})</span>
                  </div>
                </div>
                
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {product?.name}
                </h1>
                
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {product?.description}
                </p>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="text-4xl font-bold text-indigo-600">
                    ${product?.price}
                  </div>
                  <div className="text-xl text-gray-500 line-through">
                    ${((product?.price || 0) * 1.3).toFixed(2)}
                  </div>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                    Save 23%
                  </div>
                </div>
              </div>

              {/* Product Attributes */}
              <div className="space-y-6 mb-8">
                {/* Brand */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="text-gray-600 font-medium">Brand</span>
                  <span className="font-semibold text-indigo-600">{product?.brand}</span>
                </div>

                {/* Colors */}
                {product?.color && (
                  <div>
                    <span className="text-gray-600 font-medium mb-3 block">Available Colors</span>
                    <div className="flex space-x-3">
                      {product.color.map((color: string, index: number) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform duration-300"
                          style={{ backgroundColor: color.toLowerCase() }}
                          title={color}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {product?.tags && (
                  <div>
                    <span className="text-gray-600 font-medium mb-3 block">Tags</span>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart Section */}
              <div className="border-t border-gray-200 pt-8">
                <AddToCart product={product} />
              </div>
            </div>

            {/* Additional Features */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Why Choose This Product?</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Free Shipping</h4>
                    <p className="text-sm text-gray-600">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Quality Guarantee</h4>
                    <p className="text-sm text-gray-600">30-day money back</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Fast Delivery</h4>
                    <p className="text-sm text-gray-600">2-3 business days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        {product?.about && (
          <div className="mb-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Product Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.about.map((item: string, index: number) => (
                  <div key={index} className="flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                You Might Also Like
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover more amazing products from the same category
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {relatedProducts.slice(0, 8).map((relatedProduct: any) => (
                <Link
                  href={`/main/products/singleProduct/${relatedProduct._id}`}
                  key={relatedProduct._id}
                  className="group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                    <div className="relative overflow-hidden">
                      <Image
                        src={relatedProduct.displayImage}
                        height={300}
                        width={300}
                        alt={relatedProduct.name}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-indigo-600">
                          ${relatedProduct.price}
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      
                      <button className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        View Details
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Customer Reviews Section (Mock) */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                      U{i}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-800">User {i}</h4>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, j) => (
                          <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    "Amazing product quality! Exceeded my expectations. Fast delivery and excellent customer service. Highly recommended!"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}