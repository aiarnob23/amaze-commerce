"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import { getAllUsersData, updateRoleToAdmin } from "@/lib/admin";
import withAdminAuth from "@/lib/hoc/withAdminAuth";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const Customers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<any>([]);

  const fetchCustomersData = useCallback(async () => {
    try {
      if (user) {
        const data = await getAllUsersData();
        setUsers(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    fetchCustomersData();
  }, [fetchCustomersData]);

  const UserToAdmin = async (id: any) => {
    Swal.fire({
      title: "Promote to Admin?",
      text: "Please be sure!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await updateRoleToAdmin(id);
        if (res?.data?.success) {
          Swal.fire({
            title: "User promoted to admin!",
            text: "Only super admin can update admin's role",
            icon: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 400);
        }
      }
    });
  };

  return (
    <div className="w-full mx-auto py-12 px-8">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Customer Management
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="table-auto w-full text-left bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-4 text-gray-600 font-semibold">ID</th>
              <th className="px-6 py-4 text-gray-600 font-semibold">Name</th>
              <th className="px-6 py-4 text-gray-600 font-semibold">Email</th>
              <th className="px-6 py-4 text-gray-600 font-semibold">Phone</th>
              <th className="px-6 py-4 text-gray-600 font-semibold">Role</th>
              <th className="px-6 py-4 text-gray-600 font-semibold">
                Verified?
              </th>
              <th className="px-6 py-4 text-gray-600 font-semibold">
                Update Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users?.data?.map((singleUser: any, idx: number) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-700">{singleUser?._id}</td>
                <td className="px-6 py-4 text-gray-700">{singleUser?.name}</td>
                <td className="px-6 py-4 text-gray-700">{singleUser?.email}</td>
                <td className="px-6 py-4 text-gray-700">{singleUser?.phone}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      singleUser?.role === "admin"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {singleUser?.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {singleUser?.isVerified ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-600 font-semibold">No</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {singleUser?.role === "user" ? (
                    <button
                      onClick={() => UserToAdmin(singleUser?._id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-all duration-200"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-4 py-2 bg-gray-300 text-white rounded-md shadow"
                    >
                      Already Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAdminAuth(Customers);
