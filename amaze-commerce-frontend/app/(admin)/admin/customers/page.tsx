"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import { getAllUsersData, updateRoleToAdmin } from "@/lib/admin";
import withAdminAuth from "@/lib/hoc/withAdminAuth";
import { useCallback, useEffect, useState } from "react";

const Customers = () => {
  const {user}= useAuth();
  const [users, setUsers] = useState<any>([]);

  const fetchCustomersData = useCallback(async () => {
    try {
      if (user) {
          const data = await getAllUsersData();
          setUsers(data);
        }
    }
    catch (error) {
      console.log(error);
    }
  },[user])

  useEffect(() => {
    fetchCustomersData();
  }, [fetchCustomersData]);

  return (
    <div className="w-full">
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Verified?</th>
            <th className="px-4 py-2">Update Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.data?.map((singleUser: any, idx: number) => (
            <tr key={idx} className="border-b">
              <td className="px-4 py-2">{singleUser?._id}</td>
              <td className="px-4 py-2">{singleUser?.name}</td>
              <td className="px-4 py-2">{singleUser?.email}</td>
              <td className="px-4 py-2">{singleUser?.phone}</td>
              <td className="px-4 py-2">{singleUser?.role}</td>
              <td className="px-4 py-2">{singleUser?.isVerified == true ? "Yes" : "No"}</td>
              <td className="px-4 py-2">
                {singleUser?.role === "user" ? (
                  <button onClick={()=>updateRoleToAdmin(singleUser?._id)} className="bg-blue-500 text-white px-4 py-1 rounded">
                    Make Admin
                  </button>
                ) : (
                  <button disabled className="bg-blue-500 btn btn-disabled text-white px-4 py-1 rounded">
                    Already admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withAdminAuth(Customers);