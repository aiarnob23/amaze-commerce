"use client";
import { useAuth } from "@/app/provider/AuthProvider";
import { getCartOrders } from "@/lib/admin";
import withAdminAuth from "@/lib/hoc/withAdminAuth";
import { useCallback, useEffect, useState } from "react";

const Orders = () => {
  // Fetch the latest cart orders
  const [orders, setOrders] = useState<any>([]);
  const { user } = useAuth();

  const fetchOrders = useCallback(async () => {
    try {
      if (user) {
        const data = await getCartOrders();
         setOrders(data);
      }
    }
    catch (error) {
      console.log(error);
    }
  },[user])

  useEffect(() => {
    fetchOrders();
  },[fetchOrders])


  return (
    <div>
      <h1 className="my-8 text-3xl font-bold">Cart Orders</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table text-xl antialiased">
            {/* head */}
            <thead>
              <tr>
                <th>Title</th>
                <th>Product Id</th>
                <th>Customer Id</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            {orders?.data?.map((order: any) => (
              <tbody key={order?._id}>
                {order?.items?.map((item: any) => (
                  <tr
                    key={item?.product}
                  className="py-4 px-4 border-b border-gray-300">
                    <th>{item?.title}</th>
                    <td>{item.product}</td>
                    <td>{order?._id}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.total}</td>
                    <td>{order?.status}</td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default withAdminAuth(Orders);