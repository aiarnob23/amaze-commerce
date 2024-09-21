import { Suspense } from "react";
import PopularProducts from "@/components/products/popularProducts";
import SearchResultsClient from "@/components/products/searchResultsClient";

export default function SearchResults() {
  return (
    <div className="container px-4 lg:px-0 mx-auto">
      <Suspense fallback={<div>Loading search results...</div>}>
        <SearchResultsClient />
      </Suspense>
      <hr className="mt-[80px] my-4 border-2 border-gray-300" />
      {/* popular products */}
      <div>
        <h3 className="mb-4 text-center">People also search for</h3>
        <PopularProducts />
      </div>
    </div>
  );
}
