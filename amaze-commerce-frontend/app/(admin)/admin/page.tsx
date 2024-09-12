"use client";
import withAdminAuth from "@/lib/hoc/withAdminAuth";
import { redirect } from "next/navigation";

   
const Admin = () => { 
        redirect('/admin/products');
}

export default withAdminAuth(Admin);