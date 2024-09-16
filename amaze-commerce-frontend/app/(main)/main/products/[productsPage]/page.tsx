import Pagination from "@/components/pagination/pagination";
import { getAllProducts } from "@/lib/e-commerce";
import Link from "next/link";
import Image from "next/image";

export default async function Products({
  params,
}: {
  params: { productsPage: string };
}) {
  const page = parseInt(params.productsPage);
  const perPage = 20;
  const { products, totalPages } = await getAllProducts(page, perPage);

  return (
    <div className="container mx-auto my-12 min-h-screen">
      {/* filtering div */}
      <div></div>

      {/* products div */}
      <div className="grid grid-cols-4 gap-7">
        {products.map((product: any) => (
          <Link
            href={`/main/products/singleProduct/${product._id}`}
            key={product._id}
            className="card bg-base-100 w-96 shadow-xl"
          >
            <figure className="px-10 pt-10 relative h-[300px]">
              {/* Fixed height for consistent layout */}
              <Image
                src={product.displayImage}
                alt={product.name}
                className="rounded-xl"
                fill={true}
                style={{ objectFit: "cover" }} // Ensures image covers container without distortion
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{product.name}</h2>
              <p>{product.body}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* pagination div */}
      <div>
        <Pagination
          totalPages={totalPages}
          initialPage={page}
          pageChangeFn="handlePageChange" // Use the callback function
        />
      </div>
    </div>
  );
}
