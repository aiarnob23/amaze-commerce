"use client";
import { getLocalUser } from "../user";
import { useCallback, useEffect, useState } from "react";

export default function withAdminAuth(Component: any) {
  return function WithAuth(props: any) {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<any>(null);

    const getUserData = useCallback(async () => {
      setLoading(true);
      try {
        const res = await getLocalUser();
        setUser(res);
        setLoading(false);
      } catch (error) {
        console.error("failed to find user", error);
        setLoading(false);
        window.location.replace('/auth/login');
      }
    }, []);

    useEffect(() => {
      getUserData();
    }, [getUserData]);

    if (loading) {
      return (
        <div className="min-h-screen container mx-auto">
          <div className="">
            Checking access...
          </div>
        </div>
      );
    }

    if (!user) {
      window.location.replace("/auth/login");
    }

    if (user?.role == "admin") {
       return <Component {...props} />;
    }

    if (user?.role != "admin") {
      window.location.replace('/auth/login');
   }
   
  };
}
