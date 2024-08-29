"use client";
import PopularProducts from "@/components/products/popularProducts";
import BasicBreadcrumbs from "@/components/ui/breadcrumbs";
import { getSearchResults } from "@/lib/e-commerce";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

   
export default async function SearchResults() {
 const searchParams = useSearchParams();
 const searchTerm = searchParams.get("searchTerm");
 
  const products = await getSearchResults(searchTerm || '');
  console.log(products);


  return (
    <div className="container mx-auto">
      <div className="text-gray-500 text-xl">
        <BasicBreadcrumbs />
      </div>
      {/* search results */}
      <div className="min-h-[400px]">
        {products && (
          <div className="mt-14">
            <h2 className="text-gray-600 font-semibold text-xl ">
              Related products you may like
            </h2>
            <div className="flex flex-wrap gap-8 mt-8">
              {products.map((product: any) => (
                <Link
                  href={`/products/singleProduct/${product._id}`}
                  className="shadow-slate-200 p-4 rounded-lg shadow-xl"
                  key={product._id}
                >
                  <div>
                    <img
                      src={product.displayImage}
                      className="h-[300px] w-[300px]"
                      alt={product.name}
                    />
                  </div>
                  <div>{product.name}</div>
                  <div>{product.price}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <hr className="mt-[80px] my-4 border-2 border-gray-300" />
      {/* popular products */}
      <div>
        <h3 className="mb-4 text-center">People also search for </h3>
        <PopularProducts />
      </div>
    </div>
  );
}