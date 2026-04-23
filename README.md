<div align="center">
  <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=150&fit=crop" alt="DineHub Banner" width="100%" />

  <h1>🍽️ DineHub - Restaurant Finder</h1>
  <p>A modern, full-stack web application designed for discovering, adding, and managing restaurant listings. Built with Clean Architecture principles.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" alt="MUI" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  </p>
</div>

---

##  Overview

**DineHub** is an industrial-level restaurant discovery platform. It allows users to seamlessly browse, search, and manage a curated list of restaurant locations. The application incorporates robust authentication, image handling, role-based access control, and follows best practices for scalable architecture via **Dependency Injection** and **Domain-Driven Design**.

##  Core Features

- **Robust Authentication:** Secure JWT-based authentication stored in `httpOnly` cookies to mitigate XSS attacks.
- **Role-Based Access Control (RBAC):** 
  - Standard Users can add, edit, and delete their *own* restaurant listings.
  - Admins retain overarching management capabilities across all listings.
- **Advanced State Management:** Custom React Context and custom hooks (`useAuth`) combined with efficient Axios interceptors.
- **Rich Media Handling:** Seamless image uploads and hosting provided via **Cloudinary**.
- **Modern UI/UX:** Responsive, mobile-first frontend adhering to Material UI (MUI v7) specifications, featuring debounced searches, pagination, custom themes (`#F97316` brand color), and smooth micro-animations.
- **Clean Architecture Backend:** Deeply structured backend leveraging **InversifyJS** for Dependency Injection, segmenting code into `Domain`, `Infrastructure`, `Application`, and `Presentation` layers.

---

##  Technology Stack

### **Frontend (`dineHub-client`)**
* **Framework:** React 18 + Vite
* **Language:** TypeScript (Strict mode enabled)
* **Routing:** React Router v6
* **Styling:** Material UI (MUI v7), Emotion
* **Data Fetching:** Axios (with custom interceptors)
* **Notifications:** React Hot Toast

### **Backend (`dineHub-api`)**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Database ORM:** Prisma
* **Database Provider:** Neon (Serverless PostgreSQL)
* **Dependency Injection:** InversifyJS & Reflect-Metadata
* **File Processing:** Multer
* **Cloud Storage:** Cloudinary
* **Security:** bcrypt (password hashing), jsonwebtoken (JWT validation)

---

##  Project Structure

This repository is split into two primary workspaces:

```text
DineHub/
├── dineHub-api/                    # Backend API Service
│   ├── src/
│   │   ├── application/            # Use Cases, DTOs, Mappers
│   │   ├── config/                 # Environment and Constants
│   │   ├── domain/                 # Core Entities, Repository Interfaces
│   │   ├── infrastructure/         # DB, External Services (Cloudinary), DI
│   │   └── presentation/           # Controllers, Routes, Middlewares
│   └── prisma/                     # Database Schema & Migrations
│
└── dineHub-client/                 # Frontend React Application
    ├── src/
    │   ├── api/                    # Axios Configuration
    │   ├── components/             # Reusable UI Components
    │   ├── config/                 # Router mapping and UI Messages
    │   ├── context/                # Global State (AuthContext)
    │   ├── hooks/                  # Custom Hooks (useAuth)
    │   ├── pages/                  # Page Level Components (Login, Profile, etc)
    │   └── theme/                  # MUI Custom Theme Configuration
```

---

##  Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* A [Neon](https://neon.tech/) PostgreSQL database (or any local Postgres instance)
* A [Cloudinary](https://cloudinary.com/) account for image storage

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/DineHub.git
cd DineHub
```

### 2. Backend Setup
Navigate to the API directory:
```bash
cd dineHub-api
npm install
```

Create a `.env` file in the `dineHub-api` root and populate it with your secure credentials:
```env
PORT=3000
DATABASE_URL="postgresql://user:password@host/dbname"
JWT_SECRET="your_highly_secure_jwt_secret"
CLIENT_URL="http://localhost:5173"

CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

Initialize the database schema:
```bash
npx prisma generate
npx prisma db push
```

Start the development server:
```bash
npm run dev
```
*(The backend runs on `http://localhost:3000`)*

### 3. Frontend Setup
Open a new terminal and navigate to the client directory:
```bash
cd dineHub-client
npm install
```

Create a `.env` file in the `dineHub-client` root:
```env
VITE_API_BASE_URL="http://localhost:3000/api"
```

Start the frontend development server:
```bash
npm run dev
```
*(The frontend runs on `http://localhost:5173`)*

---

##  Key API Endpoints

### **Authentication** (`/api/auth`)
* `POST /signup` - Register a new user
* `POST /login` - Authenticate a user and issue an `httpOnly` cookie
* `POST /logout` - Terminate the user session and clear the cookie
* `GET /me` - Validate the JWT stored in the cookie and return the current user profile

### **Restaurants** (`/api/restaurants`)
* `GET /` - Retrieve paginated and searchable list of all restaurants
* `GET /my` - Retrieve all restaurants created by the authenticated user
* `POST /` - Create a new restaurant listing (Requires Auth & Image upload)
* `GET /:id` - Retrieve a specific restaurant's details
* `PUT /:id` - Update a specific restaurant (Requires Auth, verified ownership/admin role)
* `DELETE /:id` - Disables/deletes a specific restaurant (Requires Auth, verified ownership/admin role)

---

##  Contribution Guidelines
1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

##  License
Designed and Built in 2026 for demonstration and educational purposes. All rights reserved.
