# BSS Restaurant: Client-Side ERP Dashboard

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-ff4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query/latest)

A high-performance Single Page Application (SPA) designed for real-time restaurant management. This version focuses on a highly interactive, client-side architecture, managing complex state and external .NET API communication with speed and precision.

---

## Core Features

### Client-Side Authentication & State

- **Global Auth Context:** Utilizes the **React Context API** to provide a unified user session across the entire application, managing global login states.
- **Declarative Route Guards:** Protected routes implemented via **React Router 7**, ensuring unauthorized users are redirected to login before components mount.
- **Persistent Sessions:** Manages local storage and session persistence to keep users authenticated across browser refreshes.

### External .NET API Integration

- **Unified Data Consumption:** Connects to a centralized **.NET Web API**, mirroring the business logic of the Next.js implementation.
- **Axios Interceptors:** Custom logic to handle global request headers (Bearer Tokens) and centralized error handling (401/500 responses) automatically.

### Advanced Interactive Management

- **Real-time Table Orchestration:** Instant table status updates, capacity tracking, and staff assignments.
- **Optimistic UI Updates:** Powered by **TanStack Query** to ensure a lag-free user experience by updating the UI before the server confirmation is received.
- **Professional UI Kit:** A "pixel-perfect" interface built with **Material UI (MUI 7)** and **Tailwind CSS 4**, optimized for tablet and desktop floor management.

---

## 🛠Tech Stack

| Layer            | Technology                | Role                                        |
| :--------------- | :------------------------ | :------------------------------------------ |
| **Framework**    | **React 19.2 (Vite)**     | Modern UI rendering & Build tool            |
| **Routing**      | **React Router 7**        | Client-side navigation & Guards             |
| **Global State** | **Context API**           | Authentication & User profile management    |
| **Server State** | **TanStack Query (v5)**   | Data fetching, caching, and synchronization |
| **Styling**      | **MUI 7 & Tailwind 4**    | Component library and utility-first design  |
| **Forms**        | **React Hook Form & Zod** | Schema-based validation and form logic      |

---

## Technical Architecture

The application follows a **Modular Client-Side Pattern**:

1.  **Context Provider Layer:** Wraps the application to manage the `UserContext`, handling login/logout logic and sharing global state without "prop drilling."
2.  **Service Layer (Axios):** A centralized API service directory that manages all communication with the external .NET backend.
3.  **Hooks-Based Logic:** Custom hooks extract business logic from UI components, keeping the codebase clean and maintainable.
4.  **Guard Components:** Higher-Order Components (HOCs) or Wrapper Routes that wrap sensitive pages to enforce security protocols.

---

## Getting Started

### Prerequisites

- **Node.js 20.x** or higher
- **npm** or **yarn**

### Installation

1.  **Clone the project:**
    ```bash
    https://github.com/Sobuj54/React-complete-guide-inclu.-nextjs-redux.git
    ```
1.  **Switch to `bss-restaurant` directory:**
    ```bash
    cd bss-restaurant
    ```
1.  **Install dependencies:**
    ```bash
    npm install
    ```
1.  **Setup Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    VITE_API=your-backend-api-url
    ```
1.  **Run Development Server:**
    ```bash
    npm run dev
    ```

---

## Glossary of Command Words

- **SPA (Single Page Application):** A website that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server.
- **Context API:** A built-in React tool used to share data (like user login status) across many components without having to pass props down manually through every level.
- **Route Guard:** A security mechanism that checks if a user is "allowed" to see a page (e.g., checking for a token) before letting them enter.
- **Interceptors:** Functions that Axios runs for every request or response. They are great for automatically adding an Authorization header to every API call.
- **Prop Drilling:** A situation where you pass data through many layers of components just to get it to a child component. Context API fixes this.
