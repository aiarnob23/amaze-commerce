
import { SERVER_BASE_URL } from "../config";



//get popular products
export async function getPopularProducts() {
  const res = await fetch(`${SERVER_BASE_URL}/products?sort=-rating&limit=16`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data.data.data;
}

//get all products
export async function getAllProducts(page: number, perPage: number) {
  const res = await fetch(
    `${SERVER_BASE_URL}/products?page=${page}&limit=${perPage}`,
  );
  const data = await res.json();
  const products = data.data.data;
  const totalPages = Math.ceil(data.data.totalCounts / perPage);
  return {
    products,
    totalPages,
  };
}

//get single product by id
export async function getProductById(id: string) {
  const res = await fetch(`${SERVER_BASE_URL}/products/single/${id}`);
  const data = await res.json();
  console.log(data);
  return data.data;
}

//get related products
export async function getRelatedProducts(tags: any) {
  const searchTerm = tags || "";
  const res = await fetch(
    `${SERVER_BASE_URL}/products?searchTerm=${searchTerm}`
  );
  const { data } = await res.json();
  return data.data;
}


//get search results
export async function getSearchResults(searchTerm: string) {
  const res = await fetch(
    `${SERVER_BASE_URL}/products?searchTerm=${searchTerm}`
  );
  const { data } = await res.json();
  return data.data;
}

//add product to cart
export async function addToCart(userId: any, productId: any, title: string, displayImage: string, quantity: number) {
  const accessToken = localStorage.getItem("accessToken");
  const payload = { productId,title,displayImage, quantity };
  const res = await fetch(`${SERVER_BASE_URL}/cart/add-to-cart/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
    credentials: "include",
  });
    const data = await res.json();
  return {
    data,
    }
}

//get user cart data (based on user id)
export async function getUserCart(userId: any) {
  const accessToken = localStorage.getItem('accessToken');
  const res = await fetch(`${SERVER_BASE_URL}/cart/get-user-cart/${userId}`, {
    method: "GET",
    headers: {
      'Authorization': `${accessToken}`,
      'Content-Type': 'application/json'
    },
    cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();
  const cartItems = data?.data;
  return {
    cartItems,
  }
  
}

//delete item from cart 
export async function deleteCartItem(userId: any, productId: any) {
  try {
    const accessToken = localStorage.getItem('accessToken');
  const res = await fetch(`${SERVER_BASE_URL}/cart/delete-item/${userId}`, {
    method: "PATCH",
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
    cache: "no-store",
    credentials: "include",
  });
    const data = await res.json();
    if (data?.redirectTo) {
      window.location.replace(`${data.redirectTo}`);
    }
  console.log('response ' ,data);
  }
  catch (error) {
    console.log(error);
  }
}