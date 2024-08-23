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
      <div className="container mx-2 md:mx-auto ">
        <PopularProducts />
      </div>
      <div></div>
    </main>
  );
}
