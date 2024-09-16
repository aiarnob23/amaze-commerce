"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import { getCartOrders } from "@/lib/admin";
import withAdminAuth from "@/lib/hoc/withAdminAuth";
import React, { useCallback, useEffect, useState } from "react";

const Carts = () => {
  const [orders, setOrders] = useState<any>([]);
  const { user } = useAuth();

  const fetchOrders = useCallback(async () => {
    try {
      if (user) {
        const data = await getCartOrders();
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-6">Users Cart</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Product Id</th>
              <th className="px-6 py-3 text-left">Customer Id</th>
              <th className="px-6 py-3 text-left">Quantity</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.data?.map((order: any) => (
              <React.Fragment key={order?._id}>
                {order?.items?.map((item: any) => (
                  <tr key={item?.product}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item?.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.product}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order?._id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item?.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      ${item?.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                      {order?.status}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAdminAuth(Carts);
