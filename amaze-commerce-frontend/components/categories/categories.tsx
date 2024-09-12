import Image from "next/image";
import { Button } from "@mui/material";
import { categories } from "./categoriesList";
import Link from "next/link";

export default function Categories() {
  return (
    <div className="w-full animate-flip">
      <div className="-mt-28 gap-4 flex flex-wrap justify-evenly w-full">
        {categories.map((category) => (
          <Link
            href={`/main/searchResults?searchTerm=${category.name}`}
            className="h-[400px] w-[400px] border-gray-100 border-[1px] rounded-lg shadow-slate-400 shadow-lg bg-gray-50 relative overflow-hidden"
            key={category._id}
          >
            {/* Category Name */}
            <div className="absolute top-0 w-full text-center bg-gray-900 bg-opacity-40 text-white py-2 z-20">
              <h3 className="text-2xl font-semibold">{category.name}</h3>
            </div>

            {/* Category Image */}
            <Image
              src={category.image}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />

            {/* Explore Button */}
            <div className="absolute border-2 w-[90px] rounded-lg bg-gray-700 bg-opacity-70 bottom-4 text-start ml-2 z-20">
              <Button
                sx={{ textTransform: "none" }}
                className="lowercase text-yellow-300 rounded-lg text-xl"
              >
                Explore
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
