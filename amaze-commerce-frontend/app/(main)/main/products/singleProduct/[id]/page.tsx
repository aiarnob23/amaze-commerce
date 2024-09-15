import AddToCart from "@/components/products/addToCart";
import { getProductById, getRelatedProducts } from "@/lib/e-commerce";
import Image from "next/image";
import Link from "next/link";

export default async function SingleProduct({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await getProductById(id);
  const tags: any = product?.tags ? product.tags[0] : product?.category;
  const relatedProducts = await getRelatedProducts(tags);

  return (
    <div className="min-h-screen container mx-auto">
      {/* products info  div */}
      <div className="flex justify-between gap-7 items-center">
        {/* info */}
        <div className="flex gap-10 h-full">
          <div>
            <Image
              height={400}
              width={400}
              src={product?.displayImage}
              alt={product?.name}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-3xl font-semibold mb-6">{product?.name}</h2>
            <p className="text-xl text-gray-600 mb-3">{product?.description}</p>
            <div>
              <div className="flex justify-center items-center gap-2">
                <p className="text-xl text-gray-500 mb-2">
                  Rating:{" "}
                  <span className="text-amber-600">{product?.rating}</span>
                </p>
              </div>
            </div>
            <div>
              <div className="flex text-xl mb-2 font-medium text-gray-600 gap-3">
                {product?.tags?.join(" | ")}
              </div>
              <p className="text-xl text-gray-600 font-semibold mb-2">
                $ {product?.price}
              </p>
              <div className="flex gap-2 text-xl text-gray-700 mb-2">
                color:
                <div className="flex gap-2">{product?.color.join(" | ")}</div>
              </div>
            </div>

            <div className="flex gap-2">
              <p className="text-gray-600 text-xl">Brand:</p>
              <p className="text-xl font-semibold text-blue-400">
                {product?.brand}
              </p>
            </div>

            {/* More about product section */}
            {product?.about && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-600 mb-4">
                  More about product:
                </h3>
                <ul className="list-disc list-inside text-lg text-gray-600">
                  {product.about.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* add to cart div */}
        <div>
          <AddToCart product={product} />
        </div>
      </div>

      <hr className="mt-[80px] border-2 border-gray-300" />

      {/* Related products section */}
      {relatedProducts && (
        <div className="mt-14">
          <h2 className="text-gray-600 font-semibold text-xl ">
            Related products you may like
          </h2>
          <div className="flex flex-wrap gap-8 mt-8">
            {relatedProducts.map((product: any) => (
              <Link
                href={`/main/products/singleProduct/${product._id}`}
                className="shadow-slate-200 p-4 rounded-lg shadow-xl"
                key={product._id}
              >
                <div>
                  <Image
                    src={product.displayImage}
                    height={300}
                    width={300}
                    alt={product.name}
                  />
                </div>
                <div>{product.name}</div>
                <div>{product.price}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
