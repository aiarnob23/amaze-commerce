"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import { getUserCart } from "@/lib/e-commerce";
import withAuth from "@/lib/hoc/withAuth";
import { useEffect, useState } from "react";

const Cart = () => {
  const { user } = useAuth();
  const [cartData, setCartData] = useState<any>(null);
    const fetchCartData = async () => {
      try {
        if (user) {
          const data = await getUserCart(user._id); 
          setCartData(data);
        }
      } catch (error) {
        console.error("Failed to fetch cart data:", error);
      }
    };
  useEffect(() => {
    fetchCartData();
  }, [user])

  
  
  console.log(cartData);


  return <div className="min-h-screen">{
   cartData && cartData.cartItems.map((item : any) => <div key={item._id}>{item.title}</div>)
  }</div>;
};

export default withAuth(Cart);