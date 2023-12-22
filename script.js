document.addEventListener('DOMContentLoaded', function () {
    fetch('https://s3.amazonaws.com/open-to-cors/assignment.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => displayProductList(data.products))
        .catch(error => console.error('Error fetching data:', error));
});

function displayProductList(products) {
    // Sort products based on descending popularity
    const sortedProducts = products.sort((a, b) => b.popularity - a.popularity);

    // Create HTML for product list
    const productListHTML = sortedProducts
        .map(product => `
            <div class="product-item">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <p>Popularity: ${product.popularity}</p>
            </div>
        `)
        .join('');

    // Append product list to the document
    document.getElementById('productList').innerHTML = productListHTML;
}
