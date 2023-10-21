
function displayProductDetails(product) {
    const productModal = document.getElementById('product-modal');
    const productTitle = document.getElementById('product-title');
    const productImage = document.getElementById('product-image');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const quantityInput = document.getElementById('product-quantity');
    const incrementButton = document.getElementById('increment-quantity');
    const decrementButton = document.getElementById('decrement-quantity');
    
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
}

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
