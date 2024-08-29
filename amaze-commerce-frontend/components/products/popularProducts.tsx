import { getPopularProducts } from "@/lib/e-commerce";
import Link from "next/link";


export default async function PopularProducts() {
  const popularProducts = await getPopularProducts();
    
  return (
    <div>
      <div className="grid lg:grid-cols-6 gap-4">
        {popularProducts.map((product: any) => (
          <Link href={`/products/singleProduct/${product._id}`}
            className="h-[200px] w-[200px] shadow-md shadow-stone-300 border-[1px] rounded-lg flex justify-center items-center p-2"
            key={product.userId}
          >
            <p className="text-gray-500 text-xl antialiased"><img src={product.displayImage} alt="" /></p>
          </Link>
        ))}
      </div>
    </div>
  );
}