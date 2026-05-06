const API_URL = '/api';

// --- Utility Functions ---

async function fetchJSON(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.status !== 204 ? await response.json() : null;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function updateCartCount() {
    const cart = await fetchJSON(`${API_URL}/cart`);
    const countEl = document.getElementById('cart-count');
    if (countEl && cart) {
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        countEl.textContent = count;
        countEl.style.display = count > 0 ? 'block' : 'none';
    }
}

// --- Page Specific Logic ---

// 1. Index Page
async function loadBooks(searchQuery = '') {
    const grid = document.getElementById('book-grid');
    if (!grid) return;

    grid.innerHTML = '<p>Loading books...</p>';
    const url = searchQuery ? `${API_URL}/books?search=${encodeURIComponent(searchQuery)}` : `${API_URL}/books`;
    const books = await fetchJSON(url);
    
    if (!books || books.length === 0) {
        grid.innerHTML = '<p>No books found.</p>';
        return;
    }

    grid.innerHTML = books.map(book => `
        <a href="book.html?id=${book.id}" class="book-card">
            <img src="${book.imageUrl}" alt="${book.title}" class="book-image">
            <div class="book-info">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
                <div class="book-price">$${book.price.toFixed(2)}</div>
            </div>
        </a>
    `).join('');
}

// 2. Book Details Page
async function loadBookDetails() {
    const container = document.getElementById('book-details-container');
    if (!container) return;

    const id = getQueryParam('id');
    if (!id) {
        container.innerHTML = '<p>Book not found.</p>';
        return;
    }

    const book = await fetchJSON(`${API_URL}/books/${id}`);
    if (!book) {
        container.innerHTML = '<p>Book not found.</p>';
        return;
    }

    container.innerHTML = `
        <img src="${book.imageUrl}" alt="${book.title}" class="details-image">
        <div class="details-info">
            <h1>${book.title}</h1>
            <h2>${book.author}</h2>
            <div class="book-price">$${book.price.toFixed(2)}</div>
            <p class="details-desc">${book.description}</p>
            <button class="btn" onclick="addToCart(${book.id})">Add to Cart</button>
        </div>
    `;
}

async function addToCart(bookId) {
    const res = await fetchJSON(`${API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, quantity: 1 })
    });
    if (res) {
        alert('Book added to cart!');
        updateCartCount();
    }
}

// 3. Cart Page
async function loadCart() {
    const container = document.getElementById('cart-container');
    if (!container) return;

    const cart = await fetchJSON(`${API_URL}/cart`);
    if (!cart || cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    let html = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Book</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    let grandTotal = 0;

    cart.forEach(item => {
        const itemTotal = item.book.price * item.quantity;
        grandTotal += itemTotal;
        html += `
            <tr>
                <td>
                    <div style="display:flex; align-items:center; gap:1rem;">
                        <img src="${item.book.imageUrl}" width="50" style="border-radius:5px;">
                        <div>
                            <div><strong>${item.book.title}</strong></div>
                            <div style="font-size:0.8rem; color:var(--text-secondary);">${item.book.author}</div>
                        </div>
                    </div>
                </td>
                <td>$${item.book.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td><button class="btn btn-danger" style="padding:0.5rem 1rem;" onclick="removeFromCart(${item.id})">Remove</button></td>
            </tr>
        `;
    });

    html += `</tbody></table>
        <div class="cart-summary">
            <div class="cart-total">Total: $${grandTotal.toFixed(2)}</div>
            <button class="btn" onclick="checkout()">Proceed to Checkout</button>
        </div>
    `;

    container.innerHTML = html;
}

async function removeFromCart(cartItemId) {
    await fetch(`${API_URL}/cart/${cartItemId}`, { method: 'DELETE' });
    loadCart();
    updateCartCount();
}

async function checkout() {
    const order = await fetchJSON(`${API_URL}/checkout`, { method: 'POST' });
    if (order) {
        window.location.href = 'checkout.html';
    } else {
        alert('Failed to place order.');
    }
}

// 4. Auth
async function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const msgBox = document.getElementById('message-box');
    
    const user = await fetchJSON(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        msgBox.className = 'message error';
        msgBox.textContent = 'Invalid credentials';
    }
}

async function register(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const msgBox = document.getElementById('message-box');

    const user = await fetchJSON(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    if (user) {
        msgBox.className = 'message success';
        msgBox.textContent = 'Registration successful. You can now login.';
    } else {
        msgBox.className = 'message error';
        msgBox.textContent = 'Username already exists.';
    }
}

function checkAuth() {
    const user = localStorage.getItem('user');
    const authLink = document.getElementById('auth-link');
    if (authLink) {
        if (user) {
            const u = JSON.parse(user);
            authLink.innerHTML = `<a href="#" onclick="logout()">Logout (${u.username})</a>`;
        } else {
            authLink.innerHTML = `<a href="login.html">Login</a>`;
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    window.location.reload();
}

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    checkAuth();

    // Index page search handler
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => loadBooks(e.target.value));
        loadBooks();
    }

    // Load book details if on book page
    if (document.getElementById('book-details-container')) {
        loadBookDetails();
    }

    // Load cart if on cart page
    if (document.getElementById('cart-container')) {
        loadCart();
    }
});
