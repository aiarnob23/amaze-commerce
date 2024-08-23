//get popular productcts
export async function getPopularProducts() {
    const res = await fetch(
        " https://jsonplaceholder.typicode.com/posts?_limit=19",
        {cache:'force-cache'}
    );
    const data = await res.json();
    return data;
}