# Frontend Systems Lab: Advanced React Architecture Showcase

A highly optimized React application focused on modern server-state synchronization, infinite pagination, and fluid user interactions. 

This project marks a comprehensive transition from traditional client-side data management (Context/Reducer architectures) to a highly performant, resilient architecture powered by **TanStack Query**.

This project is continuously refactored as new architectural patterns and frontend engineering concepts are explored.

---

## Key Architectural Achievements

The application has evolved past standard tutorial-level paradigms, implementing production-grade patterns:

### Core Engineering & State Paradigms
* **Feature-Oriented Architecture:** Codebase organized strictly by feature domain (`features/users/`) rather than generic file types, optimizing scalability.
* **Service Layer Separation:** Complete decoupling of HTTP/API network request payloads from UI rendering files (`services/usersService.js`).
* **Custom React Hooks:** Encapsulation of complex local workflows (e.g., `useUserForm`) and async queries into reusable, clean modules.

### High-Performance Server State (TanStack Query)
* **Query Factories:** Centralized, structured management of query keys to eliminate key typos and optimize caching predictability.
* **Infinite Queries & Infinite Scroll:** Implemented robust sequential pagination mapping (`getNextPageParam`) allowing users to dynamically stream large datasets.
* **Resilient Optimistic Updates:** State updates for user mutations (**Add**, **Delete**, **Follow**) execute instantaneously in the UI, backed by automatic context snapshots and robust query rollback patterns (`onMutate` / `onError`) in case of network disruptions.

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

---

### Current Architecture

src/
├── components/
├── pages/
├── features/
│   └── users/
│       ├── components/
│       ├── hooks/
│       └── services/
└── App.jsx

---

## Getting Started & Local Development

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/lilhalzy/vite_setup_react.git](https://github.com/lilhalzy/vite_setup_react.git)