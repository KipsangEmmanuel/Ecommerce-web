//display product details
function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alr="${product.title}"/>
        <p>${product.description}</p>
        <p>${product.category}</p>
        <p>${product.price}</p>
    `;
}

function getProducts() {
    const categorySelector = document.getElementById('category-selector');
    const selectedCategory = categorySelector.value;
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    fetchProductsByCategory(selectedCategory)
        .then(products => {
            if (products.length === 0) {
                productList.innerHTML = '<p>No products found in this category</p>'
            }else {
                products.forEach(products => {
                    const productItem = document.createElement('div');
                    productItem.classList
                });
            }
        })




}