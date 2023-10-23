
function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}" />
        <p>Description: ${product.description}</p>
        <p>Category: ${product.category}</p>
        <p>Price: $${product.price}</p>
    `;
}

// Function to fetch and display products from a specific category
function getProducts() {
    const categorySelector = document.getElementById('category-selector');
    const selectedCategory = categorySelector.value;
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 

    fetchProductsByCategory(selectedCategory)
        .then(products => {
            if (products.length === 0) {
                productList.innerHTML = '<p>No products found in this category.</p>';
            } else {
                products.forEach(product => {
                    const productItem = document.createElement('div');
                    productItem.classList.add('product-item');
                    productItem.innerHTML = `
                        <img src="${product.image}"/>
                        <h3>${product.title}</h3>
                        <button onclick="displayProductDetails(${JSON.stringify(product)})">Show Details</button>
                    `;
                    productList.appendChild(productItem);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productList.innerHTML = '<p>Error fetching products.</p>';
        });
}

function fetchProductsByCategory(category) {
    
    return fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching products:', error);
            return [];
        });
}
