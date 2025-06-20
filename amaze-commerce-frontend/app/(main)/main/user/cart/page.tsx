"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import { deleteCartItem, getUserCart } from "@/lib/e-commerce";
import withAuth from "@/lib/hoc/withAuth";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const Cart = () => {
  const { user, setLoading, loading } = useAuth();
  const [cartData, setCartData] = useState<any>(null);

  const fetchCartData = useCallback(async () => {
    setLoading(true);
    try {
      if (user) {
        const data = await getUserCart(user._id);
        setCartData(data.cartItems);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
      setLoading(false);
    }
  }, [user, setLoading]);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const handleDelCartItem = async (productId: any) => {
    const res = await deleteCartItem(user?._id, productId);
    fetchCartData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Your Shopping Cart
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review your selected items and proceed to checkout when ready
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8">
              <div className="flex items-center space-x-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                <span className="text-lg text-gray-600">Loading your cart...</span>
              </div>
            </div>
          </div>
        ) : cartData && cartData.items && cartData.items.length > 0 ? (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="xl:col-span-2 space-y-6">
              {cartData.items.map((item: any) => (
                <div
                  key={item._id}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 group hover:shadow-3xl transition-all duration-500"
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Product Image */}
                    <div className="relative lg:w-48 lg:h-48 w-full h-64 flex-shrink-0">
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 h-full">
                        <Image
                          src={item.displayImage}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                          {item.title}
                        </h3>
                        {item.category && (
                          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-semibold rounded-full">
                            {item.category}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-600 font-medium">Quantity:</span>
                            <div className="flex items-center space-x-3">
                              <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-xl font-bold text-lg">
                                {item.quantity}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-gray-600 font-medium">Price:</span>
                            <div className="text-3xl font-bold text-indigo-600">
                              ${item.price}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDelCartItem(item?.product)}
                          className="group/btn bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 self-start"
                        >
                          <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="font-semibold">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Items ({cartData.items.length})</span>
                    <span className="font-semibold">${cartData?.totalPrice?.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-600 font-medium">Tax</span>
                    <span className="font-semibold">${(cartData?.totalPrice * 0.08)?.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-3xl font-bold text-indigo-600">
                      ${(cartData?.totalPrice * 1.08)?.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link href="/auth/payment" passHref>
                  <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xl font-bold py-4 rounded-xl hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <span>Proceed to Checkout</span>
                  </button>
                </Link>

                <div className="mt-6 text-center">
                  <Link href="/main/products/1" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-300">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

            
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-12 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-lg text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
              </p>
              <Link href="/main/products/1">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-lg font-semibold px-8 py-4 rounded-xl hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(Cart);