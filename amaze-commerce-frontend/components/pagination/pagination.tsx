"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type PaginationProps = {
  totalPages: number;
  initialPage: number;
  pageChangeFn: string;
};

export default function Pagination({
  totalPages,
  initialPage,
  pageChangeFn,
}: PaginationProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(initialPage);

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/main/products/${page}`);
  };

  const handleAdminProductsPageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/admin/products/${page}`);
  }

  const handleclick = (page :number) => {
    if (pageChangeFn == "handlePageChange") {
      handlePageChange(page);
    }
    if (pageChangeFn == "handleAdminProductsPageChange") {
      handleAdminProductsPageChange(page);
    }
  }

  return (
    <div className="flex flex-row space-x-8 my-8">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleclick(page)}
          className={`btn ${
            currentPage === page ? "btn-primary" : ""
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
