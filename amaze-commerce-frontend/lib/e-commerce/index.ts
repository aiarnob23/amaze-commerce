import { SERVER_BASE_URL } from "../config";

//get popular productcts
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
    {}
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
export async function addToCart(userId: any, productId: any,title:string, displayImage:string, quantity: number) {
  const payload = { productId,title,displayImage, quantity };
  const res = await fetch(`${SERVER_BASE_URL}/cart/add-to-cart/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
    credentials:"include",
  });
    const data = await res.json();
    console.log(data);
}

//get user cart data
export async function getUserCart(userId: any) {
  const res = await fetch(`${SERVER_BASE_URL}/cart/get-user-cart/${userId}`, {
    cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();
  const cartItems = data?.data?.items;
  return {
    cartItems,
  }
  
}