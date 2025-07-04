// Simple Express.js server for the e-commerce backend
const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()
const PORT = 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(".")) // Serve static files from current directory

// Sample data (in real app, this would be in a database)
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 99.99,
    image: "https://via.placeholder.com/300x200/3498db/ffffff?text=Headphones",
    stock: 10,
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Fitness tracking smartwatch with heart rate monitor",
    price: 199.99,
    image: "https://via.placeholder.com/300x200/e74c3c/ffffff?text=Smart+Watch",
    stock: 5,
    category: "Electronics",
  },
  {
    id: 3,
    name: "Laptop Bag",
    description: "Durable laptop bag with multiple compartments",
    price: 49.99,
    image: "https://via.placeholder.com/300x200/2ecc71/ffffff?text=Laptop+Bag",
    stock: 15,
    category: "Accessories",
  },
]

const users = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    password: "password", // In real app, this would be hashed
  },
]

const orders = []

// Routes

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

// Get all products
app.get("/api/products", (req, res) => {
  res.json({
    success: true,
    data: products,
  })
})

// Get single product
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    })
  }

  res.json({
    success: true,
    data: product,
  })
})

// User registration
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body

  // Check if user already exists
  const existingUser = users.find((u) => u.email === email)
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists",
    })
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // In real app, hash this password
  }

  users.push(newUser)

  res.json({
    success: true,
    message: "User registered successfully",
    data: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  })
})

// User login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body

  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    })
  }

  res.json({
    success: true,
    message: "Login successful",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  })
})

// Create order
app.post("/api/orders", (req, res) => {
  const { userId, items, shippingAddress, paymentInfo } = req.body

  // Calculate total
  let total = 0
  items.forEach((item) => {
    const product = products.find((p) => p.id === item.id)
    if (product) {
      total += product.price * item.quantity
    }
  })

  // Create order
  const newOrder = {
    id: orders.length + 1,
    userId,
    items,
    total,
    shippingAddress,
    status: "pending",
    createdAt: new Date().toISOString(),
  }

  orders.push(newOrder)

  res.json({
    success: true,
    message: "Order created successfully",
    data: newOrder,
  })
})

// Get user orders
app.get("/api/orders/:userId", (req, res) => {
  const userId = parseInt(req.params.userId)
  const userOrders = orders.filter((o) => o.userId === userId)

  res.json({
    success: true,
    data: userOrders,
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  console.log("Available endpoints:")
  console.log("- GET / - Main website")
  console.log("- GET /api/products - Get all products")
  console.log("- GET /api/products/:id - Get single product")
  console.log("- POST /api/register - Register new user")
  console.log("- POST /api/login - User login")
  console.log("- POST /api/orders - Create new order")
  console.log("- GET /api/orders/:userId - Get user orders")
})

module.exports = app