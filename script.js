
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
                <h3>${product.title}</h3>
                <img src="${product.image}" alt="${product.title}">
                <a href="#">Shop now</a>
            `;
            shopImages.appendChild(productCard);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

fetchAndDisplayProducts();
