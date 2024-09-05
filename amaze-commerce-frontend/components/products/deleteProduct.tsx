"use client";

import { deleteProduct } from "@/lib/e-commerce";
import Swal from "sweetalert2";

export default function DeleteProduct({id}: {id:any}) {
    const handleDeleteProduct = async () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async(result) => {
            if (result.isConfirmed) {
                console.log(id);
              
                const res = await deleteProduct(id);
                if(res?.data?.success){
                     Swal.fire({
                       title: "Deleted!",
                       text: "Your file has been deleted.",
                       icon: "success",
                     });
                }
          }
        });
    }
  return (
      <div> 
         <button onClick={handleDeleteProduct} className="btn btn-error text-white">Delete</button>
      </div>
  );
}