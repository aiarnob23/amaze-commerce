import { SERVER_BASE_URL } from "../config";

//get cart orders
export async function getCartOrders() {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${SERVER_BASE_URL}/auth/cart-orders`, {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

//add new product
export async function addNewProduct(newProduct: any) {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${SERVER_BASE_URL}/products`, {
    method: "POST",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  return {
    data,
  };
}

//update a product
export async function updateProduct(id: any, updatedData: any) {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${SERVER_BASE_URL}/products/update-product/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
    cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  return {
    data,
  };
}

//delete a product
export async function deleteProduct(id: any) {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${SERVER_BASE_URL}/products/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);
  return {
    data,
  };
}

//get all users data
export async function getAllUsersData() {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${SERVER_BASE_URL}/auth/all-users`, {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

//promote user to admin
export async function updateRoleToAdmin(id: any) {
  const accessToken = localStorage.getItem("accessToken");
  const res = await fetch(`${SERVER_BASE_URL}/user/make-admin/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
  return {
    data,
  };
}
