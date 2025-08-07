# 🛒 E-Commerce API

This is a RESTful API for a simple e-commerce platform built with **Node.js**, **Express**, **MongoDB**, and **JWT Authentication**. The API supports product management, user authentication, order creation, and more.

---

## 📦 Features

- User registration, login, and email verification
- JWT authentication and role-based access control
- Product management (CRUD)
- Order creation with stock deduction using MongoDB transactions
- Forgot/reset password functionality
- Swagger documentation
- Multilingual support using i18n

---

## 🚀 Technologies Used

- **Node.js** / **Express**
- **MongoDB** / **Mongoose**
- **JWT** for authentication
- **Swagger** for API documentation
- **TypeScript**
- **i18n** for multilingual support

---

## 🧾 Installation

```bash
git clone https://github.com/Abd-Ulrahman-Aita/ecommerce-api.git
cd ecommerce-api
yarn install
```

---

## ⚙️ Configuration

Create a `.env` file based on `.env.example`:

```env
PORT=5000

MONGO_URI=mongodb://localhost:27017/ecommerce

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

EMAIL_FROM="Ecommerce App" <your@email.com>
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

---

## 📂 Project Structure

```
src/
├── config/
├── controllers/
├── i18n/
├── locales/
├── middlewares/
├── models/
├── routes/
├── services/
├── types/
├── utils/
├── app.ts
├── server.ts
└── swagger.ts
```

---

## 🧪 Running the Server

```bash
yarn run dev   # development
yarn run build # build
yarn start     # production
```

---

## 🔐 Authentication

- Uses JWT in `Authorization` header (Bearer token)
- Role-based middleware for admin access

---

## 🛠 API Endpoints Overview

### ✅ Auth

| Method | Endpoint              | Description                      |
|--------|-----------------------|----------------------------------------|
| POST   | /auth/register        | Register a new user                    |
| POST   | /auth/verify-email    | Verify user email                      |
| POST   | /auth/login           | Login and receive token                |
| POST   | /auth/forgot-password | Send reset link                        |
| POST   | /auth/reset-password  | Reset password                         |
| GET    | /auth/profile         | Get logged-in user profile (protected) |

### 📦 Products

| Method | Endpoint       | Description                      |
|--------|----------------|----------------------------------|
| GET    | /products      | Get all products (public)        |
| GET    | /products/:id  | Get product details              |
| POST   | /products      | Create product (authenticated)   |
| PATCH  | /products/:id  | Update product (admin only)      |
| DELETE | /products/:id  | Delete product (admin only)      |

### 📬 Orders

| Method | Endpoint       | Description                      |
|--------|----------------|----------------------------------|
| POST   | /orders        | Create new order (protected)     |
| GET    | /orders        | Get current user's orders        |
| GET    | /orders/all    | Get all orders (admin only)      |
| DELETE | /orders/:id    | Delete order (admin only)        |

---

## 📘 API Documentation (Swagger)

Once the server is running, open your browser:

```
http://localhost:5000/api-docs
```

Swagger UI will allow you to explore and test all endpoints directly.

---

## 💾 MongoDB Transaction Support

Order creation uses MongoDB **transactions** to ensure that product stock and order creation are atomic operations. If either fails, the whole process rolls back.

---

## 🧑‍💻 Roles

- `USER` – can view products, place orders
- `ADMIN` – can manage products and view/delete all orders

---

## 🗣️ Localization

Supports multiple languages (e.g., Arabic/English) via `i18n`.

---

## 🌱 Seeders

To run the seed script:

```bash
yarn seed
```

don't miss to add seed script to package.json
```bash
"seed": "ts-node src/seed/seed.ts"
```

This creates an admin user (`admin@example.com` / `admin123`) and adds sample products if they don't already exist.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Made with ❤️ by Abd Ulrahman Aita