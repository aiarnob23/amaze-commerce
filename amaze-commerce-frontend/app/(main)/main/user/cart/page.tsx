"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import { deleteCartItem, getUserCart } from "@/lib/e-commerce";
import withAuth from "@/lib/hoc/withAuth";
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
    <div className="min-h-screen flex flex-row justify-evenly container mx-auto">
      {/* cart products div */}
      <div>
        {loading ? (
          ''
        ) : cartData && cartData.items && cartData.items.length > 0 ? (
          <div>
            {cartData.items.map((item: any) => (
              <div
                className="gap-12 my-10 p-6 rounded-lg shadow-md shadow-zinc-200 text-xl text-gray-600 flex flex-row items-center justify-center"
                key={item._id}
              >
                <div>
                  <img
                    height={300}
                    width={300}
                    alt="product-image"
                    src={item.displayImage}
                  />
                </div>
                <div className="flex  flex-col gap-4">
                  <div className="text-2xl font-semibold">{item.title}</div>
                  <div className="text-indigo-400">
                    <span>Quantity: </span>
                    {item.quantity}
                  </div>
                  <div className="text-indigo-400">
                    Product Price : ${item.price}
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelCartItem(item?.product)}
                      className="btn btn-error text-xl text-white"
                    >
                      Remove from cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      {/* payment div */}
      <div>
        <div className="flex flex-col items-center mt-6 px-4 border-2 pt-6 pb-8 rounded-lg shadow-xl shadow-gray-300 w-[460px] gap-4">
          <p className="text-3xl font-semibold">Subtotal</p>
          <p className="text-xl font-bold text-gray-600">
            $ {cartData?.totalPrice?.toFixed(3)}
          </p>
          {cartData?.items?.length > 0 ? (
            <Link href='/auth/payment' className="w-full btn px-4 rounded-lg bg-yellow-400 text-xl font-bold">
              Proceed to checkout
            </Link>
          ) : (
            <button disabled className="w-full btn px-4 rounded-lg bg-yellow-400 text-xl font-bold">
              Proceed to checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Cart);
