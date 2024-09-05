"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import withAuth from "@/lib/hoc/withAuth";
import { getUser } from "@/lib/user";
import { useCallback, useEffect, useState } from "react";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const { user } = useAuth();
const fetchUserData = useCallback(async () => {
  if (user?._id) {
    try {
      const res = await getUser(user._id);
      setUserProfile(res.data.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }
}, [user]);

useEffect(() => {
  fetchUserData();
}, [fetchUserData]);
  return (
    <div className="w-full container min-h-screen mt-28 mx-auto">
      {userProfile && (
        <div className="flex  flex-col justify-center items-center">
          <div className="flex border-2 p-16 shadow-lg shadow-slate-300 gap-5 text-4xl font-semibold text-gray-700 antialiased rounded-lg flex-col justify-start">
            <h4>Name: {userProfile.name}</h4>
            <p>Email: {userProfile.email}</p>
            <p>Phone: {userProfile.phone}</p>
            <p>Role: {userProfile.role}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(UserProfile);
