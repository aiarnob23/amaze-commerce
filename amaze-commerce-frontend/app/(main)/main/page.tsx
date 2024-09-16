
import Categories from "@/components/categories/categories";
import PopularProducts from "@/components/products/popularProducts";
import Slider from "@/components/ui/slider";



export default function Home() {
  return (
    <main className="w-full">
      <div className="relative container mx-2 md:mx-auto  z-0">
        <Slider />
      </div>
      <div className="relative container mx-2 md:mx-auto z-10">
        <Categories />
      </div>
      <div className="container mt-16 mx-2 md:mx-auto ">
        <h2 className="text-2xl font-semibold text-center my-10">Our Most Populars</h2>
        <PopularProducts />
      </div>
    </main>
  );
}
