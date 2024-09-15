"use client";
import Loading from "@/components/loading/CartLoadinSkeleton";
import { getLocalUser } from "../user";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";


export default function withAuth(Component: any) {
  return function WithAuth(props: any) {
    const path = usePathname();

    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null);
    const getUserData = useCallback(async () => {
      setLoading(true);
      try {
        const res = await getLocalUser();
        setUser(res);
        setLoading(false);
      }
      catch (error) {
        console.error("failed to find user", error);
        setLoading(false);
      }
    }, []);


    useEffect(() => {
      getUserData();
    },[getUserData])

    if (loading) {
     return (
       <div className="min-h-screen container mx-auto">
         <div className="">
           <Loading />
         </div>
       </div>
     );
    }
    
    if (!user) {
      window.location.replace(`/auth/login?redirect=${encodeURIComponent(path)}`);
      return (
        <div className="min-h-screen container mx-auto">
          <div className="">
            <Loading/>
          </div>
        </div>
      )
    }
    

    return <Component {...props} />;
  };
}
