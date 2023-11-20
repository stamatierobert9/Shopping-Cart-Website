// import router from "@/router";
import {ref} from "vue";
import {reactive} from "vue";


export const products= ref([]);
export let cart=reactive({});
export const snackbar = ref(false);
export const snackbarText = ref('');

export function fetchProductsFromDB() {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => {
            products.value = json.products; // Assuming products is a ref
        })
        .catch(err => console.error('Error fetching products:', err));
}

const savedCart = localStorage.getItem('cart');
if (savedCart) {
    Object.assign(cart, JSON.parse(savedCart));
}

export function addToCart(product) {
    if(product in cart){
        cart[product] += 1
    } else {
        cart[product] = 1
    }
    updateLocalStorage()
    snackbarText.value = 'Product added to cart';
    snackbar.value = true;
}

export function removeFromCart(productId) {
    if (cart[productId]) {
        delete cart[productId];
        updateLocalStorage()
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
        updateLocalStorage()
    }
}

function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}