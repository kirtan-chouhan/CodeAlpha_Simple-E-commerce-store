// Global variables to store data
let products = []
let cart = []
let currentUser = null

// Sample product data
// Sample product data (updated with 2 new products)
const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and superior sound quality. Perfect for music lovers and professionals.",
    price: 99.99,
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
    stock: 10,
    category: "Electronics",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Premium leather ear cups",
      "Built-in microphone"
    ],
    specifications: {
      "Weight": "250g",
      "Frequency Response": "20Hz - 20kHz",
      "Driver Size": "40mm",
      "Impedance": "32 ohms"
    }
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Advanced fitness tracking smartwatch with heart rate monitoring, GPS, and comprehensive health insights.",
    price: 199.99,
    image: "https://i.pinimg.com/736x/d9/27/30/d92730d33faf10272562eb6827159bd8.jpg",
    stock: 5,
    category: "Electronics",
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant (50m)",
      "7-day battery life",
      "Sleep tracking"
    ],
    specifications: {
      "Display": "1.4 inch AMOLED",
      "Battery": "300mAh",
      "Connectivity": "Bluetooth, WiFi",
      "Sensors": "Heart rate, GPS, Accelerometer"
    }
  },
  {
    id: 3,
    name: "Laptop Bag",
    description: "Durable and stylish laptop bag with multiple compartments for all your tech accessories and documents.",
    price: 49.99,
    image: "https://i.pinimg.com/736x/c8/7f/29/c87f2906a607f0b24a70aac9cce648a0.jpg",
    stock: 15,
    category: "Accessories",
    features: [
      "Fits laptops up to 15.6 inches",
      "Water-resistant material",
      "Multiple compartments",
      "Padded shoulder straps",
      "Anti-theft zipper"
    ],
    specifications: {
      "Material": "Nylon",
      "Dimensions": "42 x 30 x 12 cm",
      "Weight": "800g",
      "Laptop Size": "Up to 15.6 inches"
    }
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with excellent sound quality and long-lasting battery for outdoor adventures.",
    price: 79.99,
    image: "https://i.pinimg.com/736x/8a/e9/ed/8ae9edfd45c6fd7581eece4dfde710f3.jpg",
    stock: 8,
    category: "Electronics",
    features: [
      "360-degree sound",
      "12-hour battery life",
      "IPX7 waterproof",
      "Voice assistant support",
      "Wireless stereo pairing"
    ],
    specifications: {
      "Power Output": "20W",
      "Battery": "2600mAh",
      "Connectivity": "Bluetooth 5.0",
      "Range": "30 meters"
    }
  },
  {
    id: 5,
    name: "Phone Case",
    description: "Protective phone case with shock absorption and premium materials to keep your device safe.",
    price: 19.99,
    image: "https://i.pinimg.com/736x/f8/67/fe/f867fed5418e53f25d93b166870da396.jpg",
    stock: 25,
    category: "Accessories",
    features: [
      "Drop protection up to 10 feet",
      "Scratch-resistant surface",
      "Wireless charging compatible",
      "Precise cutouts",
      "Easy installation"
    ],
    specifications: {
      "Material": "TPU + PC",
      "Compatibility": "iPhone 14/15 series",
      "Thickness": "2mm",
      "Weight": "45g"
    }
  },
  {
    id: 6,
    name: "USB Cable",
    description: "Fast charging USB-C cable with durable braided design for reliable data transfer and charging.",
    price: 14.99,
    image: "https://i.pinimg.com/736x/74/43/bd/7443bd76003f9cfc9bd8fb9e86687a11.jpg",
    stock: 30,
    category: "Accessories",
    features: [
      "Fast charging support",
      "Data transfer up to 480Mbps",
      "Braided nylon design",
      "6 feet length",
      "Universal compatibility"
    ],
    specifications: {
      "Length": "6 feet (1.8m)",
      "Connector": "USB-C to USB-A",
      "Current": "3A",
      "Data Speed": "480Mbps"
    }
  },
  // NEW PRODUCT 1
  {
    id: 7,
    name: "Gaming Mouse",
    description: "High-precision gaming mouse with RGB lighting, programmable buttons, and ultra-responsive sensor for competitive gaming.",
    price: 59.99,
    image: "https://i.pinimg.com/736x/bb/31/c2/bb31c26fcffdf72b62c5895e96d42b7a.jpg",
    stock: 20,
    category: "Electronics",
    features: [
      "16,000 DPI optical sensor",
      "RGB customizable lighting",
      "8 programmable buttons",
      "Ultra-lightweight design (68g)",
      "Braided cable with gold-plated USB"
    ],
    specifications: {
      "DPI": "Up to 16,000",
      "Polling Rate": "1000 Hz",
      "Buttons": "8 programmable",
      "Weight": "68g",
      "Cable Length": "1.8m braided"
    }
  },
  // NEW PRODUCT 2
  {
    id: 8,
    name: "Wireless Charger",
    description: "Fast wireless charging pad with LED indicator, compatible with all Qi-enabled devices. Sleek design perfect for desk or nightstand.",
    price: 34.99,
    image: "https://i.pinimg.com/736x/78/6b/a4/786ba452e6fc5a5df85333522b1ee078.jpg",
    stock: 35,
    category: "Accessories",
    features: [
      "15W fast wireless charging",
      "Qi-certified compatibility",
      "LED charging indicator",
      "Non-slip silicone surface",
      "Overheat protection"
    ],
    specifications: {
      "Input": "9V/2A, 5V/3A",
      "Output": "15W/10W/7.5W/5W",
      "Compatibility": "Qi-enabled devices",
      "Dimensions": "100 x 100 x 8mm",
      "Material": "Aluminum alloy + silicone"
    }
  }
]

// Initialize the app when page loads
document.addEventListener("DOMContentLoaded", () => {
  console.log("Page loaded, initializing...") // Debug log
  
  // Load cart first
  loadCartFromStorage()
  
  // Check which page we're on
  const currentPage = window.location.pathname.split('/').pop() || 'index.html'
  console.log("Current page:", currentPage) // Debug log
  
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get('product')
  
  if (productId && currentPage === 'product-detail.html') {
    // We're on a product detail page
    loadProductDetail(parseInt(productId))
  } else if (currentPage === 'cart.html') {
    // We're on the cart page
    console.log("Loading cart page, cart items:", cart.length) // Debug log
    loadCartPage()
  } else {
    // We're on the main page
    loadProducts()
  }
  
  checkUserLogin()
  setupEventListeners()
})

// Setup event listeners
function setupEventListeners() {
  // Login form
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Register form
  const registerForm = document.getElementById("register-form")
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }

  // Checkout form
  const checkoutForm = document.getElementById("checkout-form")
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", handleCheckout)
  }
}

// Save cart to localStorage
function saveCartToStorage() {
  try {
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log("Cart saved to storage:", cart) // Debug log
  } catch (error) {
    console.error("Error saving cart:", error)
  }
}

// Load cart from localStorage
function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      cart = JSON.parse(savedCart)
      console.log("Cart loaded from storage:", cart) // Debug log
    } else {
      cart = []
      console.log("No cart found in storage, starting with empty cart") // Debug log
    }
    updateCartDisplay()
  } catch (error) {
    console.error("Error loading cart:", error)
    cart = []
  }
}

// Update cart count display
function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count")
  if (cartCount) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    cartCount.textContent = totalItems
    console.log("Cart display updated, total items:", totalItems) // Debug log
  }
}

// Add product to cart (for main page)
function addToCart(productId) {
  console.log("Adding product to cart:", productId) // Debug log
  
  const product = sampleProducts.find((p) => p.id === productId)
  if (!product) {
    console.error("Product not found:", productId)
    return
  }

  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
    console.log("Updated existing item quantity:", existingItem.quantity) // Debug log
  } else {
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    }
    cart.push(newItem)
    console.log("Added new item to cart:", newItem) // Debug log
  }

  updateCartDisplay()
  saveCartToStorage()

  // Show success message
  alert(`${product.name} added to cart!`)
}

// Add to cart from product detail page
function addToCartFromDetail(productId) {
  console.log("Adding product from detail page:", productId) // Debug log
  
  const quantitySelect = document.getElementById("quantity")
  const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1
  const product = sampleProducts.find(p => p.id === productId)
  
  if (!product) {
    console.error("Product not found:", productId)
    return
  }
  
  const existingItem = cart.find(item => item.id === productId)
  
  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    })
  }
  
  updateCartDisplay()
  saveCartToStorage()
  
  // Show success message
  alert(`${quantity} x ${product.name} added to cart!`)
}

// Load and display cart page
function loadCartPage() {
  console.log("Loading cart page with items:", cart.length) // Debug log
  displayCartPage()
}

// Display cart page content
function displayCartPage() {
  const cartPageContent = document.getElementById("cart-page-content")
  if (!cartPageContent) {
    console.error("Cart page content element not found")
    return
  }
  
  console.log("Displaying cart with", cart.length, "items") // Debug log
  
  if (cart.length === 0) {
    cartPageContent.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <a href="index.html#products" class="continue-shopping-btn">Continue Shopping</a>
      </div>
    `
    return
  }

  let subtotal = 0
  let cartItemsHTML = ''

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity
    subtotal += itemTotal

    cartItemsHTML += `
      <div class="cart-page-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <h3>${item.name}</h3>
          <p class="cart-item-price">$${item.price.toFixed(2)} each</p>
        </div>
        <div class="cart-item-quantity">
          <label>Quantity:</label>
          <div class="quantity-controls">
            <button onclick="changeQuantityOnPage(${item.id}, -1)" class="quantity-btn">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button onclick="changeQuantityOnPage(${item.id}, 1)" class="quantity-btn">+</button>
          </div>
        </div>
        <div class="cart-item-total">
          <p class="item-total">$${itemTotal.toFixed(2)}</p>
          <button onclick="removeFromCartOnPage(${item.id})" class="remove-btn">Remove</button>
        </div>
      </div>
    `
  })

  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + tax + shipping

  cartPageContent.innerHTML = `
    <div class="cart-page-layout">
      <div class="cart-items-section">
        <h2>Cart Items (${cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h2>
        <div class="cart-items-list">
          ${cartItemsHTML}
        </div>
        <div class="cart-actions">
          <a href="index.html#products" class="continue-shopping">← Continue Shopping</a>
          <button onclick="clearCart()" class="clear-cart-btn">Clear Cart</button>
        </div>
      </div>
      
      <div class="cart-summary-section">
        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-line">
            <span>Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="summary-line">
            <span>Tax (8%):</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          <div class="summary-line">
            <span>Shipping:</span>
            <span>${shipping === 0 ? 'Free' : '$' + shipping.toFixed(2)}</span>
          </div>
          ${shipping > 0 ? '<p class="free-shipping-note">💡 Add $' + (50 - subtotal).toFixed(2) + ' more for free shipping!</p>' : ''}
          <div class="summary-line total-line">
            <span><strong>Total:</strong></span>
            <span><strong>$${total.toFixed(2)}</strong></span>
          </div>
          <button onclick="proceedToCheckout()" class="checkout-btn-page">Proceed to Checkout</button>
          
          <div class="payment-methods">
            <p>We accept:</p>
            <div class="payment-icons">
              💳 Visa | 💳 Mastercard | 💳 PayPal
            </div>
          </div>
          
          <div class="security-info">
            <p>🔒 Secure checkout with SSL encryption</p>
          </div>
        </div>
      </div>
    </div>
  `
}

// Change quantity on cart page
function changeQuantityOnPage(productId, change) {
  console.log("Changing quantity for product:", productId, "change:", change) // Debug log
  
  const item = cart.find((item) => item.id === productId)
  if (!item) return

  item.quantity += change

  if (item.quantity <= 0) {
    removeFromCartOnPage(productId)
  } else {
    updateCartDisplay()
    saveCartToStorage()
    displayCartPage() // Refresh cart page display
  }
}

// Remove item from cart on cart page
function removeFromCartOnPage(productId) {
  console.log("Removing product from cart:", productId) // Debug log
  
  cart = cart.filter((item) => item.id !== productId)
  updateCartDisplay()
  saveCartToStorage()
  displayCartPage() // Refresh cart page display
}

// Clear entire cart
function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    cart = []
    updateCartDisplay()
    saveCartToStorage()
    displayCartPage()
  }
}

// Buy now function
function buyNow(productId) {
  addToCartFromDetail(productId)
  window.location.href = "cart.html"
}

// Load products and display them
function loadProducts() {
  products = sampleProducts
  displayProducts()
}

// Display products on the main page
function displayProducts() {
  const productsGrid = document.getElementById("products-grid")
  if (!productsGrid) return // Not on main page
  
  productsGrid.innerHTML = ""

  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description.substring(0, 100)}...</p>
            <div class="price">$${product.price.toFixed(2)}</div>
            <button onclick="addToCart(${product.id}); event.stopPropagation();">Add to Cart</button>
        `

    // Add click event to navigate to product detail page
    productCard.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        window.location.href = `product-detail.html?product=${product.id}`
      }
    })

    productsGrid.appendChild(productCard)
  })
}

// Load product detail page
function loadProductDetail(productId) {
  const product = sampleProducts.find(p => p.id === productId)
  if (!product) {
    document.body.innerHTML = "<h1>Product not found</h1>"
    return
  }
  
  // Update page title
  document.title = `${product.name} - CodeAlpha Store`
  
  // Display product details
  displayProductDetail(product)
}

// Display product detail
function displayProductDetail(product) {
  const productDetailContainer = document.getElementById("product-detail-container")
  if (!productDetailContainer) return
  
  productDetailContainer.innerHTML = `
    <div class="product-detail-page">
      <div class="product-images">
        <img src="${product.image}" alt="${product.name}" class="main-image">
      </div>
      
      <div class="product-info">
        <nav class="breadcrumb">
          <a href="index.html">Home</a> > 
          <a href="index.html#products">Products</a> > 
          <span>${product.name}</span>
        </nav>
        
        <h1>${product.name}</h1>
        <div class="price">$${product.price.toFixed(2)}</div>
        
        <div class="product-rating">
          <div class="stars">
            ★★★★☆
          </div>
          <span class="rating-text">(4.2 out of 5 - 24 reviews)</span>
        </div>
        
        <div class="product-description">
          <p>${product.description}</p>
        </div>
        
        <div class="stock-info">
          <span class="stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
            ${product.stock > 0 ? `✓ In Stock (${product.stock} available)` : '✗ Out of Stock'}
          </span>
        </div>
        
        <div class="product-actions">
          <div class="quantity-selector">
            <label for="quantity">Quantity:</label>
            <select id="quantity">
              ${Array.from({length: Math.min(product.stock, 10)}, (_, i) => 
                `<option value="${i + 1}">${i + 1}</option>`
              ).join('')}
            </select>
          </div>
          
          <button onclick="addToCartFromDetail(${product.id})" class="add-to-cart-btn" ${product.stock === 0 ? 'disabled' : ''}>
            ${product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          
          <button onclick="buyNow(${product.id})" class="buy-now-btn" ${product.stock === 0 ? 'disabled' : ''}>
            Buy Now
          </button>
        </div>
        
        <div class="product-features">
          <h3>Key Features</h3>
          <ul>
            ${product.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>
        
        <div class="product-specifications">
          <h3>Specifications</h3>
          <table>
            ${Object.entries(product.specifications).map(([key, value]) => 
              `<tr><td><strong>${key}:</strong></td><td>${value}</td></tr>`
            ).join('')}
          </table>
        </div>
        
        <div class="shipping-info">
          <h3>Shipping & Returns</h3>
          <ul>
            <li>🚚 Free shipping on orders over $50</li>
            <li>📦 Standard delivery: 3-5 business days</li>
            <li>🔄 30-day return policy</li>
            <li>🛡️ 1-year manufacturer warranty</li>
          </ul>
        </div>
      </div>
    </div>
  `
}

// Proceed to checkout from cart page
function proceedToCheckout() {
  if (!currentUser) {
    alert("Please login to checkout")
    showLogin()
    return
  }
  
  document.getElementById("checkout-modal").style.display = "block"
}

// Show login modal
function showLogin() {
  const modal = document.getElementById("login-modal")
  if (modal) modal.style.display = "block"
}

// Close login modal
function closeLogin() {
  const modal = document.getElementById("login-modal")
  if (modal) modal.style.display = "none"
}

// Show register modal
function showRegister() {
  closeLogin()
  const modal = document.getElementById("register-modal")
  if (modal) modal.style.display = "block"
}

// Close register modal
function closeRegister() {
  const modal = document.getElementById("register-modal")
  if (modal) modal.style.display = "none"
}

// Handle login form submission
function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  // Simple validation (in real app, this would be server-side)
  if (email === "demo@example.com" && password === "password") {
    currentUser = { email: email, name: "Demo User" }
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    updateUserDisplay()
    closeLogin()
    alert("Login successful!")
  } else {
    alert("Invalid email or password. Try: demo@example.com / password")
  }
}

// Handle register form submission
function handleRegister(e) {
  e.preventDefault()

  const name = document.getElementById("reg-name").value
  const email = document.getElementById("reg-email").value
  const password = document.getElementById("reg-password").value

  // Simple registration (in real app, this would be server-side)
  currentUser = { email: email, name: name }
  localStorage.setItem("currentUser", JSON.stringify(currentUser))
  updateUserDisplay()
  closeRegister()
  alert("Registration successful!")
}

// Check if user is logged in
function checkUserLogin() {
  const savedUser = localStorage.getItem("currentUser")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    updateUserDisplay()
  }
}

// Update user display in navigation
function updateUserDisplay() {
  const nav = document.querySelector("nav ul")
  if (!nav) return
  
  const loginLink = nav.querySelector("li:last-child")
  if (!loginLink) return

  if (currentUser) {
    loginLink.innerHTML = `<a href="#" onclick="logout()">Logout (${currentUser.name})</a>`
  } else {
    loginLink.innerHTML = '<a href="#" onclick="showLogin()">Login</a>'
  }
}

// Logout user
function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  updateUserDisplay()
  alert("Logged out successfully!")
}

// Close checkout modal
function closeCheckout() {
  const modal = document.getElementById("checkout-modal")
  if (modal) modal.style.display = "none"
}

// Handle checkout form submission
function handleCheckout(e) {
  e.preventDefault()

  // Create order object
  const order = {
    id: Date.now(),
    items: [...cart],
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    date: new Date().toISOString(),
    status: "confirmed",
  }

  // Save order to localStorage (in real app, send to server)
  const orders = JSON.parse(localStorage.getItem("orders") || "[]")
  orders.push(order)
  localStorage.setItem("orders", JSON.stringify(orders))

  // Clear cart
  cart = []
  updateCartDisplay()
  saveCartToStorage()

  closeCheckout()
  alert(`Order placed successfully! Order ID: ${order.id}`)
  
  // Redirect to home page
  window.location.href = "index.html"
}

// Smooth scroll to products section
function scrollToProducts() {
  const productsSection = document.getElementById("products")
  if (productsSection) {
    productsSection.scrollIntoView({
      behavior: "smooth",
    })
  }
}

// Close modals when clicking outside
window.addEventListener("click", (e) => {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = "none"
    }
  })
})