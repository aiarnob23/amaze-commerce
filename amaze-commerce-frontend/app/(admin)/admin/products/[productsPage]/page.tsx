"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import Pagination from "@/components/pagination/pagination";
import DeleteProduct from "@/components/products/deleteProduct";
import BasicBreadcrumbs from "@/components/ui/breadcrumbs";
import { getAllProducts } from "@/lib/e-commerce";
import withAdminAuth from "@/lib/hoc/withAdminAuth";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const Products = ({ params }: { params: { productsPage: string } }) => {
  const { user } = useAuth();
  const page = parseInt(params.productsPage);
  const perPage = 12;
  const [products, setProducts] = useState<any>([]);
  const [totalPages, setTotalPages] = useState<any>();

  const fetchProducts = useCallback(async () => {
    try {
      const { products, totalPages } = await getAllProducts(page, perPage);
      setProducts(products);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
    }
  },[page]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, user]);

  return (
    <div className="container mt-2 mx-auto min-h-screen">
      <BasicBreadcrumbs />
      {/* filtering div */}
      <div></div>

      {/* products div */}
      <div className="grid grid-cols-3 w-full gap-16 mt-2 ">
        {products.map((product: any) => (
          <div key={product?._id} className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
              <Image
                src={product?.displayImage}
                alt="Shoes"
                className="rounded-xl"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{product.name}</h2>
              <div className="flex justify-evenly mt-4 w-full">
                <Link href={`/admin/products/editProduct/${product._id}`}>
                  <button className="btn btn-warning w-[100px] text-white text-xl">
                    Edit
                  </button>
                </Link>
                <div>
                  <DeleteProduct id={product?._id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* pagination div */}
      <div>
        <Pagination
          totalPages={totalPages}
          initialPage={page}
          pageChangeFn={"handleAdminProductsPageChange"}
        />
      </div>
    </div>
  );
};

export default withAdminAuth(Products);
