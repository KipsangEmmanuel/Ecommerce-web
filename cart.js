// document.addEventListener('DOMContentLoaded', function() {
//     // Retrieve cart data from localStorage
//     const cartData = JSON.parse(localStorage.getItem('cartData')) || [];

//     // Reference the cart items container
//     const cartItems = document.getElementById('cart-items');

//     // Loop through the cart data and display products
//     cartData.forEach(cartItem => {
//         const product = cartItem.product;
//         const quantity = cartItem.quantity;

//         const cartItemElement = document.createElement('li');
//         cartItemElement.innerHTML = `
//             <h2>${product.title}</h2>
//             <img src="${product.image}" alt="${product.title}">
//             <p>Description: ${product.description}</p>
//             <p>Price: $${product.price}</p>
//             <p>Quantity: ${quantity}</p>
//         `;
//         cartItems.appendChild(cartItemElement);
//     });

//     // Calculate and display the cart total
//     const cartTotalDisplay = document.getElementById('cart-total');
//     const cartTotal = cartData.reduce((total, cartItem) => {
//         return total + cartItem.product.price * cartItem.quantity;
//     }, 0);

//     cartTotalDisplay.textContent = `$${cartTotal.toFixed(2)}`;
// });
