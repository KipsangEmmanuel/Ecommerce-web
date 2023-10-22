



function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');

    // Clear the existing cart display
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('li');
        const product = item.product;
        const quantity = item.quantity;
        cartItem.classList.add('cart-item'); // Add the cart-item class
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div>
                <h3>${product.title}</h3>
                <p>Description: ${product.description}</p>
                <p>Price: $${product.price}</p>
                <p>Quantity: ${quantity}</p>
            </div>
            <button class="delete-button" data-index="${index}">Delete</button>
        `;
        cartItems.appendChild(cartItem);
    });

    // Cart total
    cartTotalDisplay.textContent = `$${cartTotal.toFixed(2)}`;

    // Attach click event listeners to the delete buttons
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            deleteCartItem(index);
        });
    });
}

// Function to delete a cart item by index
function deleteCartItem(index) {
    const item = cart[index];
    const itemTotal = item.product.price * item.quantity;
    cartTotal -= itemTotal;
    cart.splice(index, 1);
    updateCartDisplay();
}









