import RatingComponent from "@/components/ui/rating";
import { getProductById, getRelatedProducts } from "@/lib/e-commerce";
import Link from "next/link";

export default async function SingleProduct({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const product = await getProductById(id);
  const tags : any = product?.tags ? product.tags[0] : product?.category;
  const relatedProducts = await getRelatedProducts(tags);

  return (
    <div className="min-h-screen container mx-auto">
      {/* products info  div */}
      <div className="flex justify-between gap-7 items-center">
        {/* info */}
        <div className="flex gap-10 h-full">
          <div>
            <img
              src={product?.displayImage}
              className="h-[400px] w-[400px] "
              alt={product?.name}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-3xl font-semibold mb-6">{product?.name}</h2>
            <p className="text-xl text-gray-600 mb-3">{product?.description}</p>
            <div>
              <div className="flex justify-center items-center gap-2">
                <p className="text-xl text-gray-500 mb-2">{product?.rating}</p>
                <div>
                  <RatingComponent rating={product?.rating} />
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="flex text-xl mb-2 font-medium text-gray-600 gap-3">
                  {product?.tags?.map((tag: string, index:number) => (
                    <p key={index}>{tag} |</p>
                  ))}
                </div>
              </div>
              <p className="text-xl text-gray-600 font-semibold mb-2">
                $ {product?.price}
              </p>
              <div className="flex gap-2 text-xl text-gray-700 mb-2">
                color:
                <div className="flex gap-2">
                  {product?.color.map((color: string, index:number) => (
                    <p key={index} className="">{color} |</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <p className="text-gray-600 text-xl">Brand:</p>
              <p className="text-xl font-semibold text-blue-400">
                {product?.brand}
              </p>
            </div>
          </div>
        </div>
        {/* add to cart div */}
        <div className="flex flex-col gap-3 border-2 p-4 rounded-lg border-gray-3 shadow-2xl">
          <div>
            <p className="text-2xl font-bold">
              <sup>$ </sup>
              {product?.price}
            </p>
          </div>
          <div>
            <p>
              Delivery within <span className="text-green-600">24hrs</span>
            </p>
          </div>
          <div>
            <p className="text-green-600">In Stock</p>
          </div>
          <div>
            <p>{product?.stock} available</p>
          </div>
          <div>
            <p>Ships from : Amaze Group</p>
          </div>
          <div>
            <p>Sold by : Amaze Group</p>
          </div>
          <div>
            <p>
              Returns <span className="text-green-600">30-day</span>
            </p>
          </div>
          <div>
            <form action="">
              <div>
                <label htmlFor="quantity">Quantity: </label>
                <input
                  defaultValue={1}
                  className=" border-2 input-sm rounded-lg border-gray-400 mb-4"
                  type="number"
                />
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="btn  bg-orange-400 w-full text-center rounded-lg text-sm"
                >
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr className="mt-[80px] border-2 border-gray-300" />
      {/* products you may like div */}
      {relatedProducts && (
        <div className="mt-14">
          <h2 className="text-gray-600 font-semibold text-xl ">
            Related products you may like
          </h2>
          <div className="flex flex-wrap gap-8 mt-8">
            {relatedProducts.map((product: any) => (
              <Link href={`/main/products/singleProduct/${product._id}`}
                className="shadow-slate-200 p-4 rounded-lg shadow-xl"
                key={product._id}
              >
                <div>
                  <img
                    src={product.displayImage}
                    className="h-[300px] w-[300px]"
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
