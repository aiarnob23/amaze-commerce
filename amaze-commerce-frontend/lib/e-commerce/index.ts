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
       const res = await fetch(`${SERVER_BASE_URL}/products?page=${page}&limit=${perPage}`, {
       });
    const data = await res.json();
    const products = data.data.data;
    const totalPages = Math.ceil(data.data.totalCounts / perPage);
    return {
        products,
        totalPages,
    }
}

//get single product by id
export async function getProductById(id:string) {
  const res = await fetch(`${SERVER_BASE_URL}/products/single/${id}`);
    const data = await res.json();
    return data.data;
}

//get related products 
export async function getRelatedProducts(tags: string[]) {
    const res = await fetch(`${SERVER_BASE_URL}/products?searchTerm=${tags[0]}`)
    const {data} = await res.json();
    return data.data;
}

//get search results
export async function getSearchResults(searchTerm: string) {
    const res = await fetch(`${SERVER_BASE_URL}/products?searchTerm=${searchTerm}`);
    const { data } = await res.json();
    return data.data;
}