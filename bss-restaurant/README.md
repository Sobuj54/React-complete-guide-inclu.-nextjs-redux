# BSS Restaurant: Enterprise-Grade Management SPA

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-ff4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query/latest)

BSS Restaurant is a high-performance, real-time management dashboard built for modern restaurant operations. It leverages a sophisticated client-side architecture to manage complex business logic, real-time table orchestration, and seamless communication with a .NET backend API.

**Live Demo:** [BSS Restaurant](https://bss-resto.vercel.app/)

---

## Key Features

### Management & Operations

- **Real-time Table Orchestration:** Interactive floor management with instant status updates and capacity tracking.
- **Dynamic Ordering System:** Create, edit, and track customer orders with a responsive UI.
- **Menu Management:** Full control over the food menu, including categories and image support.
- **Employee Management:** Comprehensive staff directory with CRUD operations and table assignment capabilities.
- **Dashboard Analytics:** Visual overview of business performance and key metrics.

### Technical Excellence

- **Global Auth Context:** Secure user sessions using React Context API and JWT persistence.
- **Declarative Route Guards:** Advanced protection using React Router 7 to secure sensitive management routes.
- **Optimistic UI Updates:** Lag-free user experience powered by TanStack Query (React Query v5).
- **Professional UI Kit:** A pixel-perfect interface built with **Material UI (MUI 7)** and **Tailwind CSS 4**.
- **Schema Validation:** Robust form handling and data validation using **React Hook Form** and **Zod**.

---

## Tech Stack

| Layer                | Technology                                                |
| :------------------- | :-------------------------------------------------------- |
| **Frontend**         | React 19 (Vite), JavaScript (ES6+)                        |
| **State Management** | TanStack Query (Server State), Context API (Global State) |
| **Styling**          | Tailwind CSS 4, Material UI 7, Emotion                    |
| **Routing**          | React Router 7                                            |
| **Forms/Validation** | React Hook Form, Zod                                      |
| **API Client**       | Axios with Interceptors                                   |

---

## Project Structure

```text
src/
├── api/           # Axios instance & public configurations
├── components/    # Reusable UI components & Layout elements
├── context/       # Auth & Global state providers
├── hooks/         # Custom hooks (data fetching, business logic)
├── layout/        # Dashboard & Page layouts
├── pages/         # Feature-based page components
├── utils/         # Helper functions & token management
└── validation/    # Zod schemas for form validation
```

---

## Getting Started

### Prerequisites

- **Node.js:** 20.x or higher
- **Package Manager:** npm (v10+) or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Sobuj54/React-complete-guide-inclu.-nextjs-redux.git
   cd bss-restaurant
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:

   ```env
   VITE_API=https://your-api-url.com/api
   VITE_IMG_URL=https://your-api-url.com
   ```

4. **Launch the application:**
   ```bash
   npm run dev
   ```

---

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Runs ESLint to find and fix code style issues.
- `npm run preview`: Previews the production build locally.
