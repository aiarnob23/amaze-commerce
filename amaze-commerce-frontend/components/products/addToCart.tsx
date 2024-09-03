"use client";

import { useAuth } from "@/app/provider/AuthProvider";
import { addToCart } from "@/lib/e-commerce";
import { useState } from "react";

export default function AddToCart({ product }: { product: any }) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState<number | 1>(1);
  const [quantityError, setQuantityError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
        window.location.replace("/auth/login");
        return;
    }
    setQuantityError("");
    handleAddToCart(product?._id);
  };

  const handleAddToCart = async (id: any) => {
    console.log(id);
    if (product?.stock < quantity) {
      setQuantityError("Insufficient quantity!");
      return;
    } else {
      const res = await addToCart(user?._id, id, product?.name, product?.displayImage, quantity);
    }
  };

  return (
    <div className="flex flex-col gap-3 border-2 p-4 rounded-lg border-gray-3 shadow-2xl">
      <div>
        <p className="text-2xl font-bold">
          <sup>$ </sup>
          {product?.price}
        </p>
      </div>
      <div>
        <p>
          Delivery within <span className="text-green-600">24hrs</span>
        </p>
      </div>
      <div>
        <p className="text-green-600">In Stock</p>
      </div>
      <div>
        <p>
          <span className="text-green-800 text-xl">{product.stock} </span>
          available
        </p>
      </div>
      <div>
        <p>{product.category} category</p>
      </div>
      <div>
        <p>Ships from : Amaze Group</p>
      </div>
      <div>
        <p>Sold by : Amaze Group</p>
      </div>
      <div>
        <p>
          Returns <span className="text-green-600">30-day</span>
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit} action="">
          <div>
            <label htmlFor="quantity">Quantity: </label>
            <input
              defaultValue={1}
              className=" border-2 input-sm rounded-lg border-gray-400 mb-4"
              type="number"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <div>
              {quantityError && (
                <p className="text-red-500 mb-2">{quantityError}</p>
              )}
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="btn  bg-orange-400 w-full text-center rounded-lg text-sm"
            >
              Add to Cart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
