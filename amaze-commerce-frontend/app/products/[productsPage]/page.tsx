import Pagination from "@/components/pagination/pagination";
import BasicBreadcrumbs from "@/components/ui/breadcrumbs";
import { getAllProducts } from "@/lib/e-commerce";
import Link from "next/link";

export default async function Products({ params }: { params: { productsPage: string } }) {
  const page = parseInt(params.productsPage);
  const perPage = 20;
    const { products, totalPages } = await getAllProducts(page, perPage);

  return (
    <div className="container mx-auto my-12 min-h-screen">
      <BasicBreadcrumbs />

      {/* filtering div */}
      <div></div>

      {/* products div */}
      <div className="grid grid-cols-4 gap-7">
        {products.map((product: any) => (
          <Link
            href={`/products/singleProduct/${product._id}`}
            key={product._id}
            className="card bg-base-100 w-96 shadow-xl"
          >
            <figure className="px-10 pt-10">
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
                className="rounded-xl"
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
        <Pagination totalPages={totalPages} initialPage={page} />
      </div>
    </div>
  );
}
