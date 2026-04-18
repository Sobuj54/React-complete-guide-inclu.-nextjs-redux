# BSS Restaurant: Enterprise Restaurant Management System

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.96-ff4154?style=for-the-badge&logo=react-query)](https://tanstack.com/query/latest)
[![Material UI](https://img.shields.io/badge/MUI-7.3-007FFF?style=for-the-badge&logo=mui)](https://mui.com/)

An enterprise-grade, high-performance ERP solution built to modernize restaurant operations. This system bridges a cutting-edge **Next.js 16** frontend with a robust **external .NET API**, ensuring seamless data orchestration, real-time table management, and enterprise-level security.

- **Live Demo:** [BSS Restaurnat](https://bss-resto-nextjs.vercel.app/)

---

## Advanced Project Features

### Server-Side Authentication & Security

- **Native Next.js Cookies:** Leverages `next/headers` for secure, server-side cookie management. This ensures that session tokens are handled exclusively within the server environment, mitigating XSS risks.
- **Cross-Origin Compliance:** Fully configured with `httpOnly: true` within the server-side cookie options to ensure reliable session persistence across production environments (Vercel/Cloudflare).
- **JWT Integration:** Seamlessly handles JSON Web Tokens issued by the .NET backend for stateless, secure authorization.

### Proxy & Route Guarding

- **Edge-Ready Guarding:** Implements sophisticated route guards via **Next.js Proxy**. It intercepts requests at the edge to verify session integrity via server cookies before allowing access to private dashboard modules.

### External .NET API Consumption

- **Enterprise Integration:** Directly consumes a high-performance external **.NET Web API**.
- **Optimized Communication:** Leverages **Axios** with custom interceptors for automatic request/response handling.

### Professional CRUD Operations

- **Table & Floor Management:** Real-time tracking of table status (Occupied vs. Available), seating capacity, and physical location.
- **Staff Assignment:** A dynamic multi-select interface powered by **TanStack Query** for instant updates and "zero-latency" optimistic UI.
- **Secure Image Processing:** Custom `toBase64` conversion utility for processing images via Server Actions, ensuring compatibility with the backend media storage.

---

## Tech Stack

| Layer             | Technology                    | Role                                  |
| :---------------- | :---------------------------- | :------------------------------------ |
| **Framework**     | **Next.js 16.2 (App Router)** | Core infrastructure & Server Actions  |
| **State**         | **TanStack Query (v5.96)**    | State management & Caching            |
| **Validation**    | **Zod (v4.3)**                | Strict Type-safe schemas              |
| **UI Components** | **Material UI 7.3**           | Enterprise-level component design     |
| **Styling**       | **Tailwind CSS 4**            | Utility-first responsive layouts      |
| **Auth Logic**    | **next/headers (Cookies)**    | Secure Server-side session management |

---

## Architecture & Patterns

The module follows a **decoupled hook-based architecture**, separating business logic from UI representation:

1.  **Server Actions (`@/actions`):** Secure, server-side functions that handle mutations, utilizing Next.js 16's optimized action pipeline and native cookie handling.
2.  **Custom Data Hooks (`@/hooks`):** Abstracted logic using `useQuery` for fetching and `mutateAsync` for complex asynchronous workflows.
3.  **Optimistic Updates:** Uses the `onSuccess` and `invalidateQueries` pattern to ensure the UI remains the "source of truth" while background syncing occurs.

---

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Sobuj54/React-complete-guide-inclu.-nextjs-redux.git
    ```
2.  Change into `bss-restaurant-nextjs` file:
    ```bash
    cd bss-restaurant-nextjs
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Configure environment variables (`.env.local`):
    ```env
    API_URL=your-api-url
    IMG_URL=your-img-url
    NEXT_PUBLIC_IMG_URL=your-api-url
    NODE_ENV=development
    ```
5.  Start development:
    ```bash
    npm run dev
    ```

---

## Glossary of Command Words

- **`next/headers` (Cookies):** A built-in Next.js function used to read or set cookies **only on the server**. This is safer because the browser's JavaScript cannot easily mess with them.
- **Route Guard:** A security check that prevents users from seeing a page if they aren't logged in.
- **Proxy:** In Nextjs proxy allows to run code before a request is completed. Then based on incoming request, you can modify the response by rewriting, redirecting, by modifying the request or response headers.
- **Server Actions:** Modern Next.js functions that allow the frontend to talk directly to the backend logic safely.
- **CRUD:** The four basic functions of storage: **C**reate, **R**ead, **U**pdate, and **D**elete.

---

## Professional Acknowledgments

Developed by **Md Sobuj Ahmed** as part of the **Bangladesh Software Solution (BSS)**.

- **Engineering Oversight:** CEO & Founder Asheq Bin Mazib Forhad
- **Guidance:** Ishtiak, Azim, Fayaz, Farvez
