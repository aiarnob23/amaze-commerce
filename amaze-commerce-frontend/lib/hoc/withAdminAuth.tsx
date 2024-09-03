
import { useAuth } from "@/app/provider/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAdminAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user || user.role !== "admin") {
        router.replace("/auth/login");
      }
    }, [user, router]);

    if (!user || user.role !== "admin") {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
