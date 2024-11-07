// // Placeholder for cart functionality
// function addToCart(productId) {
//     alert(`Product ${productId} added to cart!`);
//     // Add server-side code to handle cart addition
// }

// // Placeholder for buy now functionality
// function buyNow(productId) {
//     alert(`Buying product ${productId}...`);
//     // Add server-side code to handle buy now action
// }

// Function to toggle favorites in localStorage
function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);

    if (!productCard) {
        return;
    }

    const product = {
        id: productId,
        name: productCard.querySelector('.product-title').textContent,
        price: productCard.querySelector('.product-price').textContent,
        image: productCard.querySelector('.product-image').src
    };

    const index = favorites.findIndex(fav => fav.id === productId);
    let notificationMessage = '';

    if (index === -1) {
        favorites.push(product);
        notificationMessage = `Product ${productId} added to favorites!`;
    } else {
        favorites.splice(index, 1);
        notificationMessage = `Product ${productId} removed from favorites!`;
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    showNotification(notificationMessage);
}

// Function to display a notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000); // Hide notification after 2 seconds
}

// Placeholder for share functionality
function shareProduct(productId) {
    alert(`Share link for product ${productId} copied!`);
    // Add logic for generating shareable link
}

// Placeholder for options functionality
function showOptions(productId) {
    alert(`Showing options for product ${productId}...`);
    // Add functionality as needed
}
