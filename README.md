# E-commerce Backend

This is the backend API for an e-commerce application built with Node.js, Express, and MongoDB. It provides user authentication, item management, and shopping cart functionality.

## Features

- User registration and login with JWT authentication
- Item management (CRUD operations with filtering, search, and pagination)
- Shopping cart functionality (add, update, remove items)
- Secure password hashing with bcrypt
- CORS support for cross-origin requests
- Environment-based configuration

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start MongoDB service (if running locally).

## Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

The server will start on the port specified in the `.env` file (default: 5000).

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
  - Body: `{ "username": "string", "email": "string", "password": "string" }`
- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`

### Items
- `GET /api/items` - Get all items (with optional filters)
  - Query params: `category`, `minPrice`, `maxPrice`, `search`, `page`, `limit`, `sortBy`
- `POST /api/items` - Create a new item
  - Body: Item object
- `PUT /api/items/:id` - Update an item
  - Body: Updated item object
- `DELETE /api/items/:id` - Delete an item

### Cart (Requires Authentication)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
  - Body: `{ "itemId": "string", "quantity": number }`
- `POST /api/cart/update` - Update item quantity in cart
  - Body: `{ "itemId": "string", "quantity": number }`
- `POST /api/cart/remove` - Remove item from cart
  - Body: `{ "itemId": "string" }`

### Root
- `GET /` - Health check endpoint

## Environment Variables

- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Server port (optional, defaults to 5000)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the ISC License.
