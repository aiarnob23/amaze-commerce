import { getPopularProducts } from "@/lib/e-commerce";


export default async function PopularProducts() {
  const popularProducts = await getPopularProducts();
    
  return (
    <div>
      <h3 className="text-3xl text-center font-semibold text-blue-950 mt-12 my-8">
        Most Popular
      </h3>
      <div className="grid lg:grid-cols-6 gap-4">
        {popularProducts.map((product: any) => (
          <div
            className="h-[200px] w-[200px] border-[1px] rounded-lg flex justify-center items-center p-2"
            key={product.userId}
          >
            <p className="text-gray-500 text-xl antialiased">{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}