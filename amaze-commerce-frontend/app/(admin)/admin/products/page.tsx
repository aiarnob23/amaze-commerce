import { redirect } from "next/navigation";

   
export default function Products() {
    return (
        redirect('/admin/products/1')
  );
}