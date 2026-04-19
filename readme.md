# Next.js 16 & React 19: Mastering Modern Web Architectures

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-7.3-007FFF?style=for-the-badge&logo=mui)](https://mui.com/)
[![Status](https://img.shields.io/badge/Status-Learning%20Journey-brightgreen?style=for-the-badge)](#)

Welcome to my central repository for full-stack web development. This monorepo documents my **learning journey**, spanning from foundational React concepts to building complex, enterprise-ready dashboard systems.

It contains my progression through **Maximilian Schwarzmüller's "React - The Complete Guide (incl. Next.js, Redux)"** and culminates in the **BSS Restaurant** a restaurant management system, implemented in both React 19 and Next.js 16.

---

## Primary Projects: BSS Restaurant Dashboard

The "BSS Restaurant" project is a professional-grade ERP module designed during my time at **Bangladesh Software Solution**. I have implemented it twice to master the nuances between client-side and server-side architectures.

### 1. [BSS Restaurant (Next.js 16.2 Version)](./bss-restaurant-nextjs)

An enterprise-grade implementation focusing on high security and server-side performance.

- **Key Features:** Server Actions, `next/headers` (Secure Cookies), Proxy-based Route Guards, and Material UI 7 integration.
- **Architecture:** Consumes an external **.NET Core API** with server-side authentication logic.

### 2. [BSS Restaurant (React 19.2 Version)](./bss-restaurant)

A high-performance Client-Side Application (SPA) focusing on real-time interactivity.

- **Key Features:** Client-side state management, Vite-based build pipeline, and custom Axios interceptors for token handling, client-side route guards and context api for global state management.
- **Architecture:** Consumes an external **.NET Core API** .

---

## The Learning Curriculum

This section contains 20 modules documenting my deep dive into the React ecosystem through "The Complete Guide." Each folder represents a specific milestone in mastering modern frontend engineering.

| Module    | Topic                                                                                              |
| :-------- | :------------------------------------------------------------------------------------------------- |
| **01-08** | Fundamentals: JSX, Props, States, Tic-Tac-Toe, Project Management App, Context API, and Quiz Apps. |
| **09-13** | Logic & Data: HTTP Requests, Form Handling, `useActionState`, and a full Food Order application.   |
| **14-17** | State & Routing: Redux Toolkit, React Router (SPA), Authentication patterns, and TanStack Query.   |
| **18-19** | Next.js Deep Dive: Comprehensive exploration of both App Router and Pages Router patterns.         |
| **20**    | User Experience: Animating React applications with Framer Motion.                                  |

---

## Tech Stack Overview

| Category           | Technologies                                                    |
| :----------------- | :-------------------------------------------------------------- |
| **Frameworks**     | Next.js 16 (App Router), React 19, Vite                         |
| **Languages**      | TypeScript 5, JavaScript (ES6+)                                 |
| **UI & Styling**   | Material UI (MUI 7), Tailwind CSS 4, Framer Motion              |
| **Data & State**   | TanStack Query (v5), Redux Toolkit, Axios, Zod, React Hook Form |
| **Infrastructure** | WSL2 (Ubuntu), .NET Core API (External), Vercel                 |

---

## Key Architectures Explored

- **Hybrid Data Fetching:** Mastering the choice between `useQuery` (Client) and Server Actions (Server) for optimized performance.
- **Edge Security:** Implementing secure session management via the **Next.js Proxy** layer to handle HTTP-only cookies.
- **Optimistic UI:** Leveraging TanStack Query to create "zero-latency" experiences where the UI updates before the server confirms.

---

## Glossary of Command Words

- **Monorepo:** A single repository that stores multiple related projects (like my React and Next.js versions) in one place.
- **Implementation:** The actual act of writing the code and building the application based on a project plan.
- **Server Actions:** Functions that run on the server but can be called directly from your UI components, making data submission much simpler.
- **Hydration:** The process where React "attaches" itself to the HTML sent by the server to make the page interactive in the browser.

---

## Acknowledgments

- **Maximilian Schwarzmüller:** For the structured foundation provided in the Complete Guide.
- **BSS Engineering Team:** Gratitude to CEO Forhad and the senior developers (Ishtiak, Azim, Sizan, Fayaz, Farvez) for the mentorship during the BSS Resto development.

---

## License

This repository is for educational and portfolio purposes. The BSS Restaurant project architecture is proprietary to **Bangladesh Software Solution**.

---

_Created by Md Sobuj Ahmed — Trainee Software Engineer._
