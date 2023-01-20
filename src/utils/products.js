import productsSampleData from "./products.json";

let productsBrowserData = localStorage.getItem("products_x101");
if (!productsBrowserData) localStorage.setItem("products_x101", JSON.stringify(productsSampleData));

export default function getProducts() { return JSON.parse(localStorage.getItem("products_x101")); }
export const getProductsByType = type => getProducts().filter(product => product.type === type);
export const getProductById = id => getProducts().find(product => product.id === id);
export const setProducts = products => localStorage.setItem("products_x101", JSON.stringify(products));
