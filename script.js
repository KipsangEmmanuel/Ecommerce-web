const cart = [];
let cartTotal = 0;

//update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total')

    //clear the existing cart disply
    cartItems.innerHTML = '';

    //check if the cart is empty
    if(cart.length === 0) {
        cartItems.styles.justifyContent = 'center';
    }else{
        cartItems.style.justifyContent = 'space-between';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item')
            const product = item.product;
            const quantity = item.quantity;
    
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}"/>
                <div>
                    <h3>${product.title}</h3>
                    <p>Description: ${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Quantity: ${quantity}</p>
                    <button class="delete-button" data-index="${index}">Remove</button>
                </div>
                
            `;
    
            cartItems.appendChild(cartItem);
        });

    }

    //cart total
    cartTotalDisplay.textContent = `$${cartTotal.toFixed(2)}`;

    //delete
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            deleteCartItem(index);
        });
    });
}
const clearCartButton = document.getElementById('clear-cart-button');
clearCartButton.addEventListener('click', () => {
    clearCart();
});
function clearCart() {
    cart.length = 0;
    cartTotal = 0;
    updateCartDisplay();

    // Clear cart
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTotal', '0.00');
}
//delete cart
function deleteCartItem(index) {
    const item = cart[index];
    const itemTotal = item.product.price * item.quantity;
    cartTotal -= itemTotal;
    cart.splice(index, 1);
    updateCartDisplay();
}

function addToCart(product, quantity) {
        // Check if the product is already in the cart
        const existingCartItem = cart.find(item => item.product.id === product.id);

        if(existingCartItem){
            existingCartItem.quantity = quantity;
        }else{
            const cartItem = {
                product: product,
                quantity: quantity
            };
            cart.push(cartItem);
        }

    //calculate total cost of item
    const itemTotal = product.price * quantity;
    cartTotal += itemTotal;
    updateCartDisplay();



}

function displayProductDetails(product) {
    const productModal = document.getElementById('product-modal');
    const productTitle = document.getElementById('product-title');
    const productImage = document.getElementById('product-image');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const quantityInput = document.getElementById('product-quantity');
    const incrementButton = document.getElementById('increment-quantity');
    const decrementButton = document.getElementById('decrement-quantity');
    const addToCartButton = document.getElementById('add-to-cart');
    
    productTitle.textContent = product.title;
    productImage.src = product.image;
    productDescription.textContent = `Description: ${product.description}`;
    productPrice.textContent = `Price: $${product.price}`;
    
    // Show the modal
    productModal.style.display = 'block';
 
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.addEventListener('click', () => {
        productModal.style.display = 'none';
    });

    let quantity = 1;
    quantityInput.value = quantity;
    
    incrementButton.addEventListener('click', () => {
        quantity++;
        quantityInput.value = quantity;
    });
    
    decrementButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
        }
    });

    //addToCart btn functionality
    addToCartButton.addEventListener('click', () => {
        addToCart(product, quantity);
        productModal.style.display = 'none';
    });
}


async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        const shopImages = document.querySelector('.shop-images');
        shopImages.innerHTML = ''; // Clear the existing content

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('shop-link');
            productCard.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.image}" alt="${product.title}">
                <a href="#">Shop now</a>
            `;
            productCard.addEventListener('click', () => {
                displayProductDetails(product);
            });
            shopImages.appendChild(productCard);
        });

        attachProductCardListeners(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Call the function to fetch and display products
fetchAndDisplayProducts();

function attachProductCardListeners(products) {
    const productCards = document.querySelectorAll('.shop-link');
    productCards.forEach((productCard, index) => {
        productCard.addEventListener('click', () => {
            displayProductDetails(products[index]);
        });
    });

}


async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        const shopImages = document.querySelector('.shop-images');
        shopImages.innerHTML = ''; 

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('shop-link');
            productCard.innerHTML = `
                
                <img src="${product.image}" alt="${product.title}">
                <a href="#">Shop now</a>
            `;
            shopImages.appendChild(productCard);
        });
        attachProductCardListeners(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

fetchAndDisplayProducts();
