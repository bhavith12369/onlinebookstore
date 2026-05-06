# 📚 Online Bookstore

A full-stack Online Bookstore web application built with **Spring Boot** (backend) and **HTML/CSS/JavaScript** (frontend), using an in-memory **H2 database**.

---

## 🚀 Features

- 🔐 User Registration & Login (Authentication)
- 📖 Browse and view books
- 🛒 Add to Cart & Manage Cart
- 💳 Checkout & Place Orders
- 📦 Order History
- 🗄️ H2 in-memory database with console access

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | Java 17, Spring Boot 3.2.5        |
| ORM        | Spring Data JPA, Hibernate        |
| Database   | H2 (In-Memory)                    |
| Frontend   | HTML, CSS, JavaScript             |
| Build Tool | Maven                             |
| Utilities  | Lombok                            |

---

## ⚙️ Getting Started

### Prerequisites

- Java 17+
- Maven 3.6+

### Run the Application

```bash
mvn spring-boot:run
```

The app will start on **http://localhost:8089**

---

## 🔗 Key Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | `/api/auth/register`  | Register a new user      |
| POST   | `/api/auth/login`     | Login                    |
| GET    | `/api/books`          | Get all books            |
| POST   | `/api/cart/add`       | Add item to cart         |
| GET    | `/api/cart`           | View cart                |
| POST   | `/api/orders/place`   | Place an order           |
| GET    | `/api/orders/history` | Get order history        |

---

## 🗄️ H2 Database Console

Access the H2 console at:

```
http://localhost:8089/h2-console
```

| Field    | Value              |
|----------|--------------------|
| JDBC URL | `jdbc:h2:mem:bookstoredb` |
| Username | `sa`               |
| Password | *(leave blank)*    |

---

## 📄 Pages

- `/login.html` — Login & Register
- `/index.html` — Book Listing
- `/book.html` — Book Details
- `/cart.html` — Shopping Cart
- `/checkout.html` — Checkout

---

## 👤 Author

**Bhavith** — [github.com/bhavith12369](https://github.com/bhavith12369)

---

## 📝 License

This project is for educational purposes.


NAME-BHAVITH
USN-4CB22CB014
