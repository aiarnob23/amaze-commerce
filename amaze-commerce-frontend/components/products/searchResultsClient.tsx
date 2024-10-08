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

  useEffect(() => {
      const fetchProducts = async () => {
      const data = await getSearchResults(searchTerm);
      setProducts(data);
    };

    fetchProducts();
  }, [searchTerm]);

  return (
    <div className="container mx-auto min-h-[400px]">
        {products.length > 0 ? (
          <div className="mt-14">
            <h2 className="text-gray-600 font-semibold text-xl">
              Results
            </h2>
            <div className="flex flex-wrap gap-8 mt-8">
              {products.map((product: any) => (
                <Link
                  href={`/main/products/singleProduct/${product._id}`}
                  className="shadow-slate-200 p-4 rounded-lg shadow-xl"
                  key={product._id}
                >
                  <div>
                    <Image
                      src={product.displayImage}
                      height={300}
                      width={300}
                      alt={product.name}
                    />
                  </div>
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
           <p></p>
        )}
    </div>
  );
}
