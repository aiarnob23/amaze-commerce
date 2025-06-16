import Image from "next/image";
import { categories } from "./categoriesList";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="py-4 mt-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-lg">
      <div className="text-center w-full font-bold text-4xl mb-8 text-gradient">
        <p>Shop by Category</p>
      </div>
      <div className="flex w-full flex-wrap justify-center gap-8">
        {categories.map((category) => (
          <Link
            href={`/main/searchResults?searchTerm=${category.name}`}
            key={category._id}
            className="w-[300px] sm:w-[350px] md:w-[400px] group transform transition-all hover:scale-105 hover:shadow-xl rounded-lg overflow-hidden bg-gray-50 relative border-[1px] border-gray-300"
          >
            {/* Category Name */}
            <div className="absolute top-0 w-full text-center bg-gradient-to-t from-black via-transparent to-transparent text-white py-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-2xl font-semibold">{category.name}</h3>
            </div>

            {/* Category Image */}
            <div className="relative w-full h-60 sm:h-72 md:h-80 overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Explore Button */}
            <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="button-gradient">
                Explore
              </button>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-end pr-[140px] mt-4">
        <button className="btn btn-ghost text-blue-700 font-semibold">see more</button>
      </div>
    </div>
  );
}
