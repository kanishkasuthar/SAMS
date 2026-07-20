# Architecture Documentation

SAMS follows a decoupled client-server architecture. The frontend handles state management and visualization, while the backend acts as a stateless RESTful API.

## 1. Frontend Architecture
The frontend is a React Single Page Application (SPA) built using Vite.

- **State Management**: `Zustand` is used for global state management. Each domain has its own store (e.g., `useUserStore.js`, `useDepartmentStore.js`) to encapsulate API calls, loading states, and error handling.
- **Visualization**: `React Flow` handles the interactive rendering of the organization chart and decision workflows. `Dagre` is utilized as the auto-layout engine to compute hierarchical positioning.
- **Styling**: Uses an atomic, utility-first CSS approach defined in `index.css`, simulating a Tailwind-like experience without the heavy build constraints.

### Folder Structure (Frontend)
```text
src/
 ├── components/       # Reusable UI widgets and Modals
 ├── pages/            # Full-page views (Dashboard, OrgStudio)
 ├── store/            # Zustand stores interfacing with APIs
 ├── services/         # Axios instance and interceptors (api.js)
 └── utils/            # Shared logic and helpers
```

## 2. Backend Architecture
The backend is an Express.js application designed with modularity and separation of concerns in mind.

- **Routing**: `src/routes/` defines HTTP verbs and paths.
- **Controllers**: `src/controllers/` extracts logic from routes. Validates requests and calls models.
- **Models**: `src/models/` contains Sequelize Object-Relational Mappings defining the schema.
- **Middlewares**: `src/middlewares/` handles cross-cutting concerns like Authentication (`authMiddleware.js`), Error Handling (`errorHandler.js`), and Auditing (`auditMiddleware.js`).

### Folder Structure (Backend)
```text
backend/
 ├── src/
 │    ├── controllers/ # Business logic
 │    ├── middlewares/ # Express middlewares
 │    ├── models/      # Sequelize database definitions
 │    ├── routes/      # Express API routers
 │    ├── utils/       # JWT generators, loggers
 │    └── config/      # DB Connection logic
 └── server.js         # Entry point and global middlewares
```

## 3. Request Flow Example (Create User)
1. **Client**: User submits form in UI. `useUserStore.addUser(data)` is called.
2. **Client**: Zustand store executes `api.post('/users', data)`.
3. **Server**: `server.js` routes to `userRoutes.js`.
4. **Server**: `authMiddleware` verifies the JWT token.
5. **Server**: `userController.createUser` processes the request, hashes password, and saves via Sequelize.
6. **Server**: `auditMiddleware` silently logs the action to the `AuditLogs` table.
7. **Server**: Controller responds with 201 Created and the new User object.
8. **Client**: Zustand updates the internal state array. React triggers a re-render.

## 4. Authentication Flow
- **Login**: `POST /auth/login` returns an access token (15m expiry) and a refresh token (7d expiry).
- **Storage**: Tokens are stored in memory or `localStorage`.
- **Interceptors**: Axios (`src/services/api.js`) automatically attaches `Authorization: Bearer <token>` to outbound requests. If a 401 is encountered, the interceptor attempts to use the refresh token to silently re-authenticate.

## 5. Authorization Flow
- Access control is Role-Based (RBAC). 
- Middleware in the backend (`restrictTo('Admin', 'HR')`) checks the user's role against the required roles for a specific route.
- Fine-grained permissions are checked within controllers if necessary (e.g., comparing user ID to requested resource ID).
