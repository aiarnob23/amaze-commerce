"use client";

import { useAuth } from "@/app/provider/AuthProvider";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: any) {
    return function WithAuth(props: any) {
        const { user ,loading} = useAuth();
        useEffect(() => {
            if (!user) {
                redirect('/auth/login');
            }
        }, [])
        if (loading) {
            <div>loading ......</div>
        }
        
        if (!user) {
            return null;
        }

        return <Component {...props} />
    }
}