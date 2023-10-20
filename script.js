
function displayProductDetails(product) {
    const productModal = document.getElementById('product-modal');
    const productTitle = document.getElementById('product-title');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    
    productTitle.textContent = product.title;
    productDescription.textContent = `Description: ${product.description}`;
    productPrice.textContent = `Price: $${product.price}`;
    
    // Show the modal
    productModal.style.display = 'block';
 
    const closeBtn = document.getElementsByClassName('close')[0];
    closeBtn.addEventListener('click', () => {
        productModal.style.display = 'none';
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
        shopImages.innerHTML = ''; // Clear the existing content

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('shop-link');
            productCard.innerHTML = `
                <h3>${product.title}</h3>
                <img src="${product.image}" alt="${product.title}">
                <a href="#">Shop now</a>
            `;
            shopImages.appendChild(productCard);
        });

        //click event listeners to product cards
        attachProductCardListeners(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

fetchAndDisplayProducts();
