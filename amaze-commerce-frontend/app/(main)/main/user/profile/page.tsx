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
      {userProfile ? (
        <div className="flex flex-col justify-center items-center">
          {/* User Info Section */}
          <div className="flex border-2 p-8 shadow-lg shadow-slate-300 gap-5 text-gray-700 antialiased rounded-lg flex-col justify-start bg-white w-full max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile</h2>
            <div className="text-xl mb-4">
              <h4 className="font-semibold">Name:</h4>
              <p>{userProfile.name}</p>
            </div>
            <div className="text-xl mb-4">
              <h4 className="font-semibold">Email:</h4>
              <p>{userProfile.email}</p>
            </div>
            <div className="text-xl mb-4">
              <h4 className="font-semibold">Phone:</h4>
              <p>{userProfile.phone}</p>
            </div>
            <div className="text-xl mb-4">
              <h4 className="font-semibold">Role:</h4>
              <p className="capitalize">{userProfile.role}</p>
            </div>

          </div>

          {/* Order History Section */}
          <div className="flex flex-col justify-start w-full max-w-4xl mt-10 bg-white border-2 rounded-lg p-8 shadow-lg shadow-slate-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order History
            </h2>
            {userProfile?.orders && userProfile.orders.length > 0 ? (
              <ul className="space-y-4">
                {userProfile.orders.map((order: any, index: number) => (
                  <li key={index} className="border p-4 rounded-lg shadow-sm">
                    <h4 className="text-lg font-semibold">
                      Order ID: {order.id}
                    </h4>
                    <p className="text-gray-700">Total: ${order.total}</p>
                    <p className="text-gray-500">Status: {order.status}</p>
                    <p className="text-gray-500">
                      Date: {new Date(order.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No orders found.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading profile...</p>
      )}
    </div>
  );
};

export default withAuth(UserProfile);
