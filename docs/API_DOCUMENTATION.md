# API Documentation

The SAMS API provides a RESTful interface to all core modules. The base URL for all endpoints is `/api`.

> **Note**: All endpoints (except Auth) require an `Authorization: Bearer <token>` header.

## Authentication
### `POST /api/auth/login`
- **Description**: Authenticate a user and return JWT.
- **Request Body**: `{ "email": "user@example.com", "password": "password123" }`
- **Response** (200): `{ "token": "...", "refreshToken": "..." }`
- **Status Codes**: 200 OK, 401 Unauthorized, 400 Bad Request

### `POST /api/auth/register`
- **Description**: Register a new user.
- **Request Body**: `{ "name": "John", "email": "john@ex.com", "password": "pass" }`
- **Response** (201): `{ "status": "success", "data": { "user": { ... } } }`

## Users
### `GET /api/users`
- **Description**: Retrieve a list of all users.
- **Response** (200): `{ "status": "success", "data": { "users": [ ... ] } }`

### `GET /api/users/org-chart`
- **Description**: Retrieve users formatted for the Organization Studio.
- **Response** (200): `{ "status": "success", "data": { "users": [ ... ] } }`

### `POST /api/users`
- **Description**: Create a new user.
- **Request Body**: `{ "name": "Jane", "email": "jane@ex.com", "role_id": 1, "department_id": 2 }`

### `PATCH /api/users/:id`
- **Description**: Update user details.
- **Request Body**: `{ "name": "Jane Doe", "designation": "Manager" }`

### `DELETE /api/users/:id`
- **Description**: Archive or delete a user.

## Roles & Permissions
### `GET /api/roles`
- **Description**: Retrieve all roles.
### `POST /api/roles`
- **Description**: Create a new role.
### `GET /api/roles/:id`
- **Description**: Get specific role details and its permissions.
### `PUT /api/roles/:id/permissions`
- **Description**: Assign permissions to a role.
- **Request Body**: `{ "permissions": ["VIEW_DASHBOARD", "EDIT_USERS"] }`

## Departments
### `GET /api/departments`
- **Description**: Retrieve all departments with metadata.
### `POST /api/departments`
- **Description**: Create a new department.
### `PATCH /api/departments/:id`
- **Description**: Update department details.
### `DELETE /api/departments/:id`
- **Description**: Delete a department.

## Responsibility Matrix
### `GET /api/responsibility-matrices`
- **Description**: Fetch all matrices.
### `POST /api/responsibility-matrices`
- **Description**: Create a RACI matrix.
### `PATCH /api/responsibility-matrices/:id`
- **Description**: Update RACI matrix.

## Decision Flow
### `GET /api/decision-flows`
- **Description**: Retrieve all configured decision flows.
### `POST /api/decision-flows`
- **Description**: Create a new decision flow rule.
### `GET /api/decision-requests`
- **Description**: Retrieve pending decision requests assigned to the user.
### `POST /api/decision-requests/:id/approve`
- **Description**: Approve a decision request.

## Notifications
### `GET /api/notifications`
- **Description**: Fetch user's notification history.
### `PATCH /api/notifications/:id/read`
- **Description**: Mark a notification as read.

## Reports & Analytics
### `GET /api/reports`
- **Description**: Fetch saved report configurations.
### `POST /api/reports/generate`
- **Description**: Generate an ad-hoc report.
### `GET /api/analytics/dashboard`
- **Description**: Fetch aggregate dashboard metrics.

## Audit Logs
### `GET /api/audit-logs`
- **Description**: Fetch immutable audit trails. Supports query parameters for filtering (`?action=Update&userId=123`).

## Version History
### `GET /api/version-history`
- **Description**: Fetch temporal snapshots of the organizational structure.
### `POST /api/version-history/restore/:id`
- **Description**: Roll back the organization structure to a previous snapshot.

## AI Insights
### `POST /api/ai/query`
- **Description**: Send a natural language query to the AI Copilot.
- **Request Body**: `{ "query": "Show me the headcount for IT", "context": {} }`
- **Response** (200): `{ "response": "The IT department currently has...", "data": [...] }`

## Settings
### `GET /api/settings`
- **Description**: Fetch global application settings.
### `PATCH /api/settings`
- **Description**: Update global settings (Admins only).
