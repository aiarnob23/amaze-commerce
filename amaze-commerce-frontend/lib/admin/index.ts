
//get cart orders

import { SERVER_BASE_URL } from "../config";

//get popular products
export async function getCartOrders() {
  const res = await fetch(`${SERVER_BASE_URL}/auth/cart-orders`, {
    cache: "no-store",
  });
  const data = await res.json();
    return data;
}
