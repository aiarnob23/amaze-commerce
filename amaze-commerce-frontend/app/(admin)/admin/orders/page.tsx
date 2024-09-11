import { getCartOrders } from "@/lib/admin";

export default async function Orders() {
  // Fetch the latest cart orders
  const cartOrders = await getCartOrders();
  console.log(cartOrders.data[0].items);

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
              {cartOrders?.data?.map((order: any) => (
                <tbody>
                  {order?.items?.map((item: any) => (
                    <tr>
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
