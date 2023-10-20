// Fetch product data from an API (replace with your own API URL)
const apiUrl = 'https://fakestoreapi.com/products';

// Store products and cart items
let products = [];
let cart = [];

// DOM elements
const productList = document.querySelector('.product-list');
const cartItems = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const clearCartButton = document.querySelector('#clear-cart');

// Fetch products and display them
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        products = await response.json();
        displayProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts() {
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
    addCartListeners();
}

function addCartListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const product = products.find(item => item.id == productId);
    if (product) {
        cart.push(product);
        displayCart();
    }
}

function displayCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `${item.title} - $${item.price}`;
        cartItems.appendChild(cartItem);
    });
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

clearCartButton.addEventListener('click', clearCart);

function clearCart() {
    cart = [];
    displayCart();
}

// Initialize the app
fetchProducts();
