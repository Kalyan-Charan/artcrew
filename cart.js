// Add items to the cart and save it to local storage
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
  
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    updateCart();
  }
  
  // Update cart and save changes to local storage
  function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    cartItemsContainer.innerHTML = '';
  
    let total = 0;
  
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
  
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'align-items-center');
  
      cartItem.innerHTML = `
        <div>
          <h6>${item.name} (x${item.quantity})</h6>
          <small>$${item.price} each</small>
        </div>
        <div>
          <strong>$${itemTotal.toFixed(2)}</strong>
          <button class="btn btn-danger btn-sm ms-3" onclick="removeFromCart('${item.name}')">Remove</button>
        </div>
      `;
  
      cartItemsContainer.appendChild(cartItem);
    });
  
    cartTotalElement.innerText = total.toFixed(2);
    checkoutBtn.disabled = cart.length === 0;
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
  }
  