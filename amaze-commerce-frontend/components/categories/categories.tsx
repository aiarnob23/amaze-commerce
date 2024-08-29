import { Button } from "@mui/material";
import { categories } from "./categoriesList";
import Link from "next/link";



export default function Categories() {
  return (
    <div className="w-full animate-flip">
      <div className="-mt-28 gap-4 flex flex-wrap justify-evenly  w-full">
        {categories.map((category) => (
          <Link href={`/products/searchResults?searchTerm=${category.name}`}
            className="h-[400px] w-[400px] border-gray-100 border-[1px] rounded-lg shadow-slate-400 shadow-lg bg-gray-50"
            key={category._id}
          >
            <h3 className="text-3xl font-semibold text-blue-950 text-center my-4">
              {category.name}
            </h3>
            <div className="mt-[300px]">
              <Button sx={{ textTransform: "none" }} className="lowercase ">
                see more
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
