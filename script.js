// State Management
let cart = [];

// Add Item to Cart
function addToCart(title, price) {
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ title, price, quantity: 1 });
    }
    updateCartUI();
    showNotification(`"${title}" berhasil ditambahkan ke keranjang!`);
}

// Update Cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Total Count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalCount;

    // Cart Items Content
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-msg">Keranjang Anda masih kosong.</p>';
        cartTotal.innerText = 'Rp 0';
        return;
    }

    let itemsHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        itemsHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h5>${item.title}</h5>
                    <span>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</span>
                </div>
                <button class="btn-add" style="width: 30px; height: 30px; font-size: 12px; background: #EF4444;" onclick="removeItem(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    cartItems.innerHTML = itemsHTML;
    cartTotal.innerText = `Rp ${total.toLocaleString('id-ID')}`;
}

// Remove Item from Cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Toggle Cart Modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('open');
}

// Category Filter
function filterCategory(category, element) {
    const cards = document.querySelectorAll('.menu-card');
    const tabs = document.querySelectorAll('.category-card');

    tabs.forEach(tab => tab.classList.remove('active'));
    element.classList.add('active');

    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Simple Toast Notification
function showNotification(message) {
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.right = '30px';
    toast.style.backgroundColor = '#111827';
    toast.style.color = '#FFF';
    toast.style.padding = '14px 24px';
    toast.style.borderRadius = '30px';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    toast.style.zIndex = '3000';
    toast.style.fontWeight = '600';
    toast.style.fontSize = '14px';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10B981;"></i> ${message}`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

// Checkout Function
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }
    alert('Terima kasih! Pesanan Anda telah diterima dan sedang diproses.');
    cart = [];
    updateCartUI();
    toggleCart();
}
