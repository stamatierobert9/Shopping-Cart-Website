// import router from "@/router";
import {ref} from "vue";
import {reactive} from "vue";


export const products= ref([]);
export let cart=reactive({});


export function fetchProductsFromDB() {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => {
            console.log('Fetched products:', json.products); // Log to check
            products.value = json.products; // Assuming products is a ref
        })
        .catch(err => console.error('Error fetching products:', err));
}



export function addToCart(product) {
    // cart.push(product)
    console.log(product in cart)
    if(product in cart){
        cart[product] += 1
    } else {
        cart[product] = 1
    }
}

export function removeFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
    }
}

export function getUniqueCategories() {
    const categories = new Set();
    products.value.forEach(product => {
        categories.add(product.category);
    });
    return Array.from(categories);
}

export function sortProductsByCategory() {
    const sortedProducts = {};
    products.value.forEach(product => {
        if (!sortedProducts[product.category]) {
            sortedProducts[product.category] = [];
        }
        sortedProducts[product.category].push(product);
    });
    return sortedProducts;
}

export function updateQuantity(productId, newQuantity) {
    if (cart[productId]) {
        cart[productId] = newQuantity;
    }
}
