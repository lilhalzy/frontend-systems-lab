# Frontend Systems Lab: Advanced React Architecture Showcase

A highly optimized React application focused on modern server-state synchronization, infinite pagination, and fluid user interactions. 

This project marks a comprehensive transition from traditional client-side data management (Context/Reducer architectures) to a highly performant, resilient architecture powered by **TanStack Query**.

This project is continuously refactored as new architectural patterns and frontend engineering concepts are explored.

---

## Key Architectural Achievements

### v1.0.0 Core Engineering & State Paradigms
* **Feature-Oriented Architecture:** Codebase organized strictly by feature domain (`features/users/`) rather than generic file types, optimizing scalability.
* **Service Layer Separation:** Complete decoupling of HTTP/API network request payloads from UI rendering files (`services/usersService.js`).
* **Custom React Hooks:** Encapsulation of complex local workflows (e.g., `useUserForm`) and async queries into reusable, clean modules with implemented core component layouts, structural forms, and simulated user state mutations.

### v2.0.0 High-Performance Server State (TanStack Query)
* **Query Factories:** Centralized, structured management of query keys to eliminate key typos and optimize caching predictability.
* **Optimistic Cache Management:** Applied deep immutable data patching patterns across active memory stores (`...spread` operational copies over direct reference mutation) to prevent component render freezing and guarantee deterministic UI updates.
* **Cache Architecture Enhancements:** Abstracted raw browser APIs (`IntersectionObserver`, `setInterval`) out of the presentation layer into highly cohesive custom hooks (`useInfiniteScroll`, `useInterval`).

### v3.0.0 — Real-Time WebSocket Streaming (Current)
* Migrated from simulated intervals to a true decoupled client-server architecture using full-duplex protocol channels.
* **Monorepo Split:** Restructured the repository workspace into a cleaner isolated package tree (`/client` running Vite/React and `/websocket-server` running a standalone Node.js server instance).
* **Bi-directional Communication:** Deployed a native `ws://` data layer enabling real-time JSON frame processing. The backend now dynamically broadcasts automated background growth cycles (e.g., intermittent automated subscriber metrics) down to listening client nodes via continuous data pipelines.

---

## Tech Stack & Patterns Covered

* **UI Foundation:** React 18+, Vite, Tailored Modular UI Components (`Button`, `Input`)
* **Server-State Orchestrator:** TanStack Query v5 (React Query)
* **Historical Architecture Iterations:** Local component state, Context API, useReducer state management, TanStack Query server-state architecture

These implementations were developed as part of the project's evolution and are retained in commit history for comparison and learning purposes.

---

## Progress Tracking & Milestones

The development history represents a deep-dive timeline through React's data management progression:

### React Fundamentals

* [x] Controlled Components
* [x] Form State Management
* [x] useEffect
* [x] localStorage Persistence
* [x] Component Extraction
* [x] Custom Hooks

---

### State Management

* [x] Context API
* [x] useReducer
* [x] Action Creators
* [x] UsersContext Architecture
* [x] Reducer-Based CRUD Flow

---

### TanStack Query Foundations

* [x] QueryClient Setup
* [x] useQuery
* [x] useMutation
* [x] Query Invalidation
* [x] Query Key Factory
* [x] Query Factory Pattern
* [x] Feature-Oriented Query Organization

---

### Optimistic Updates

* [x] Optimistic Create User
* [x] Optimistic Delete User
* [x] Optimistic Follow User
* [x] Rollback on Error
* [x] Cache Manipulation with setQueryData

---

### Infinite Data Loading

* [x] Paginated Queries
* [x] Query Prefetching
* [x] Infinite Queries
* [x] Infinite Scroll
* [x] Intersection Observer
* [x] Cache Shape Handling for Infinite Queries

---

### Real-Time Data Synchronization

* [x] Polling with React Query
* [x] Simulated External Updates
* [x] Event-Driven Cache Updates
* [x] Direct Cache Patching
* [x] Cross-Tab Synchronization
* [x] Browser Storage Event Integration
* [x] Domain Event Architecture

---

### WebSocket Foundations

* [x] WebSocket Server Setup
* [x] Native Browser WebSocket Client
* [x] WebSocket Lifecycle Management

  * [x] Connection
  * [x] Message Handling
  * [x] Disconnection
* [x] Custom WebSocket Hook
* [x] WebSocket → React Query Integration
* [x] Real-Time Cache Updates via WebSocket Events

---

### Architecture Patterns Learned

* [x] Feature-Based Folder Structure
* [x] Service Layer Pattern
* [x] Query Key Factory
* [x] Query Factory
* [x] Event Bus Pattern
* [x] Observer Pattern
* [x] Event-Driven State Synchronization
* [x] Cache-First UI Updates
* [x] Server Push Architecture

---

### Current Architecture

```
User Action / Server Event
↓
Domain Event
↓
React Query Cache
↓
Automatic UI Re-render
```
---

```text
frontend-systems-lab/
├── client/                 # Vite + React Frontend Application
│   ├── public/             # Static Assets
│   └── src/                # Modular Source Code
│       ├── components/     # UI Design System Components
│       ├── features/users/ # Isolated domain contexts (hooks, keys, queries)
│       └── hooks/          # Globally resilient layout & event hooks
│       └── websockets/     # Communication between a client and a server
├── websocket-server/       # Standalone Node.js WS Event Engine
│   └── server.js           # Full-duplex connection listener & broadcaster
└── README.md
```

---

## Getting Started & Local Development

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/lilhalzy/vite_setup_react.git](https://github.com/lilhalzy/vite_setup_react.git)