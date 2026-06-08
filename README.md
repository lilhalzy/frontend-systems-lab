# Frontend Systems Lab: Advanced React Architecture Showcase

A highly optimized React application focused on modern server-state synchronization, infinite pagination, and fluid user interactions. 

This project marks a comprehensive transition from traditional client-side data management (Context/Reducer architectures) to a highly performant, resilient architecture powered by **TanStack Query**.

This project is continuously refactored as new architectural patterns and frontend engineering concepts are explored.

---

## Key Architectural Achievements

The application has evolved past standard tutorial-level paradigms, implementing production-grade patterns:

### v1.0.0 Core Engineering & State Paradigms
* **Feature-Oriented Architecture:** Codebase organized strictly by feature domain (`features/users/`) rather than generic file types, optimizing scalability.
* **Service Layer Separation:** Complete decoupling of HTTP/API network request payloads from UI rendering files (`services/usersService.js`).
* **Custom React Hooks:** Encapsulation of complex local workflows (e.g., `useUserForm`) and async queries into reusable, clean modules with implemented core component layouts, structural forms, and simulated user state mutations.

### v2.0.0 High-Performance Server State (TanStack Query)
* **Query Factories:** Centralized, structured management of query keys to eliminate key typos and optimize caching predictability.
* **Optimistic Cache Management:** Applied deep immutable data patching patterns across active memory stores (`...spread` operational copies over direct reference mutation) to prevent component render freezing and guarantee deterministic UI updates.
* **Cache Architecture Enhancements:** Abstracted raw browser APIs (`IntersectionObserver`, `setInterval`) out of the presentation layer into highly cohesive custom hooks (`useInfiniteScroll`, `useInterval`).

---

## Tech Stack & Patterns Covered

* **UI Foundation:** React 18+, Vite, Tailored Modular UI Components (`Button`, `Input`)
* **Server-State Orchestrator:** TanStack Query v5 (React Query)
* **Historical Architecture Iterations:** Local component state, Context API, useReducer state management, TanStack Query server-state architecture

These implementations were developed as part of the project's evolution and are retained in commit history for comparison and learning purposes.

---

## Progress Tracking & Milestones

The development history represents a deep-dive timeline through React's data management progression:

- [x] Component Architecture, Props, & State Lifecycle
- [x] Controlled Forms & Custom Hook State Isolation
- [x] Context API & Reducer State Operations
- [x] Service Layer Isolation
- [x] TanStack Query Implementation & Strategy Refactor
- [x] Optimistic Updates with Rollback Lifecycles
- [x] Infinite Scroll Pagination Architecture
- [x] Multi-Version Feature Toggle/Flag Router Pattern

---

### Architecture Diagram

```text
UI Components
      │
      ▼
 Custom Hooks
      │
      ▼
TanStack Query
      │
      ▼
Service Layer
      │
      ▼
Mock API / Data Source
```

---

### Current Architecture

```text
src/
├── components/
├── pages/
├── features/
│   └── users/
│       ├── components/
│       ├── hooks/
│       └── services/
└── App.jsx
```

---

## Getting Started & Local Development

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/lilhalzy/vite_setup_react.git](https://github.com/lilhalzy/vite_setup_react.git)

# Frontend Systems Lab

A progressive sandbox engineering environment focused on optimizing client-side performance, state synchronizations, reusable React abstractions, and real-time event-driven streaming.

---

## 🚀 Lab Roadmap & Version Evolution

### v1.0.0 — Basic UI & State Foundation
* Implemented core component layouts, structural forms, and simulated user state mutations.
* Developed decoupled atomic design patterns using custom `<Input />`, `<Button />`, and `<ProfileCard />` components.

### v2.0.0 — Data Caching & Performance Optimization
* Integrated robust asynchronous data management using server-state fetching strategies.
* **Cache Architecture Enhancements:** Abstracted raw browser APIs (`IntersectionObserver`, `setInterval`) out of the presentation layer into highly cohesive custom hooks (`useInfiniteScroll`, `useInterval`).
* **Optimistic Cache Management:** Applied deep immutable data patching patterns across active memory stores (`...spread` operational copies over direct reference mutation) to prevent component render freezing and guarantee deterministic UI updates.
* *Reference Implementation:* See history adjustments in [Commit `80765bc`](https://github.com/lilhalzy/frontend-systems-lab/commit/80765bcbeb6116aab3f596c8d34e52bda88b0479).

### v3.0.0 — Real-Time WebSocket Streaming (Current)
* Migrated from simulated intervals to a true decoupled client-server architecture using full-duplex protocol channels.
* **Monorepo Split:** Restructured the repository workspace into a cleaner isolated package tree (`/client` running Vite/React and `/websocket-server` running a standalone Node.js server instance).
* **Bi-directional Communication:** Deployed a native `ws://` data layer enabling real-time JSON frame processing. The backend now dynamically broadcasts automated background growth cycles (e.g., intermittent automated subscriber metrics) down to listening client nodes via continuous data pipelines.

---

## 🛠️ Project Architecture

```text
frontend-systems-lab/
├── client/                 # Vite + React Frontend Application
│   ├── public/             # Static Assets
│   └── src/                # Modular Source Code
│       ├── components/     # UI Design System Components
│       ├── features/users/ # Isolated domain contexts (hooks, keys, queries)
│       └── hooks/          # Globally resilient layout & event hooks
├── websocket-server/       # Standalone Node.js WS Event Engine
│   └── server.js           # Full-duplex connection listener & broadcaster
└── README.md