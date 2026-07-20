# SAMS: Strategic Authority Mapping System

![SAMS Banner](./docs/assets/banner.png) <!-- Placeholder -->

## Project Description
The Strategic Authority Mapping System (SAMS) is an advanced web application designed to visualize organizational structure, map decision-making authority, and track systemic responsibilities dynamically. SAMS moves beyond standard org charts by integrating Responsibility Matrices (RACI), Decision Flows, and AI-driven organizational insights into a single comprehensive intelligence platform.

## Key Features
- **Organization Studio**: Interactive Node-based visualization of the company hierarchy using `React Flow` and `Dagre`.
- **Responsibility Matrix (RACI)**: Dynamic tables and network views mapping accountabilities across departments.
- **Decision Flows**: Visual tracking of approval chains and authority delegation.
- **AI Copilot & Insights**: Context-aware AI chat and organizational health analytics.
- **Audit Logs & Version History**: Immutable tracking of structural changes and temporal snapshots of the organization.
- **Advanced Authentication**: Role-based access control with robust security standards.

## Technology Stack
- **Frontend**: React 19, Vite, Zustand (State Management), React Router, Xyflow (React Flow), Recharts, Tailwind-inspired Vanilla CSS.
- **Backend**: Node.js, Express, Sequelize ORM.
- **Database**: MySQL 8.0.
- **Security & Logging**: Helmet, HPP, Express-Rate-Limit, Winston.
- **Deployment**: Docker, Docker Compose, GitHub Actions.

## Folder Structure
```text
sams/
├── backend/               # Node.js Express API
│   ├── src/
│   │   ├── config/        # Database & Environment config
│   │   ├── controllers/   # Route handlers
│   │   ├── middlewares/   # Auth, Audit, Error, and Validation middlewares
│   │   ├── models/        # Sequelize ORM models
│   │   ├── routes/        # Express routers
│   │   └── utils/         # Helper utilities (Token, Email, Logger)
│   ├── tests/             # Backend unit tests
│   └── server.js          # Express server entry point
├── docs/                  # Project documentation
├── public/                # Static assets (images, icons)
├── scripts/               # Maintenance and CI/CD scripts
└── src/                   # React Frontend Source
    ├── components/        # Reusable UI Components
    ├── pages/             # Route-level components
    ├── store/             # Zustand state stores
    ├── services/          # Axios API configuration
    ├── utils/             # Frontend utility functions
    ├── App.jsx            # Application root component
    ├── main.jsx           # React entry point
    └── index.css          # Global styles
```

## Architecture Overview
SAMS follows a decoupled Client-Server architecture. The frontend is a Single Page Application (SPA) built with React and Vite, utilizing Zustand for global state management to handle complex organizational data. The backend is a RESTful API built on Express.js, utilizing Sequelize ORM to interface with a MySQL database. For detailed architecture documentation, see [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

## Installation Steps

### Prerequisites
- Node.js (v20+)
- MySQL (v8.0+)
- Docker & Docker Compose (optional but recommended)

### 1. Database Setup
Ensure your local MySQL instance is running. Create an empty database:
```sql
CREATE DATABASE sams_db;
```

### 2. Environment Variables
Copy the `.env.example` files to `.env` and fill in your local configurations:
- **Frontend**: Create `.env.production` or `.env.local` setting `VITE_API_URL=http://localhost:3000/api`
- **Backend**: `cd backend && cp .env.example .env` and update the `DB_PASSWORD` and `JWT_SECRET`.

### 3. Backend Setup
```bash
cd backend
npm install
npm start
```

### 4. Frontend Setup
In a new terminal window, from the project root:
```bash
npm install
npm run dev
```

## Build Commands
- **Frontend Build**: `npm run build`
- **Frontend Lint**: `npm run lint`
- **Backend Tests**: `cd backend && npm test`

## Deployment Steps
SAMS is fully Dockerized. For comprehensive deployment instructions using Docker or manual Node setup, refer to [DEPLOYMENT.md](./DEPLOYMENT.md).

## Future Enhancements
- Integration with Active Directory / LDAP.
- Advanced export capabilities (PDF, Visio).
- Enhanced AI simulation for reorganization impact analysis.

## Contributors
- Kanishka Suthar (Lead Developer)
