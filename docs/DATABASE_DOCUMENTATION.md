# Database Documentation

SAMS uses a relational database (MySQL 8.0) mapped via Sequelize ORM.

## Entity Relationship Overview

The core of SAMS revolves around `Users`, `Roles`, `Departments`, and `Responsibility Matrices`. 
- A `User` belongs to one `Department` and has one `Role`.
- `Users` self-reference to establish a reporting hierarchy (`reportingManagerId`).
- `Roles` have many `Permissions` through a junction table.
- `Responsibility Matrices` define RACI assignments linking `Users`/`Roles` to specific tasks.

## Tables & Columns

### 1. `Users`
Stores employee profiles and credentials.
- `id` (UUID, Primary Key)
- `name` (String, Required)
- `email` (String, Unique, Required)
- `password` (String, Hashed)
- `designation` (String)
- `status` (Enum: 'Active', 'Inactive', 'On Leave')
- `role_id` (UUID, Foreign Key -> `Roles.id`)
- `department_id` (UUID, Foreign Key -> `Departments.id`)
- `reportingManagerId` (UUID, Foreign Key -> `Users.id`)

### 2. `Roles`
Defines access levels and organizational titles.
- `id` (UUID, Primary Key)
- `name` (String, Unique)
- `description` (Text)

### 3. `Permissions`
System access flags.
- `id` (UUID, Primary Key)
- `name` (String, Unique) - e.g., 'EDIT_ORG_CHART'

### 4. `RolePermissions`
Junction table mapping Roles to Permissions.
- `role_id` (UUID, Foreign Key -> `Roles.id`)
- `permission_id` (UUID, Foreign Key -> `Permissions.id`)

### 5. `Departments`
Organizational units.
- `id` (UUID, Primary Key)
- `departmentName` (String, Unique)
- `headOfDepartmentId` (UUID, Foreign Key -> `Users.id`)
- `budget` (Decimal)
- `color` (String)

### 6. `ResponsibilityMatrices` (RACI)
Defines who does what.
- `id` (UUID, Primary Key)
- `taskName` (String, Required)
- `description` (Text)
- `department_id` (UUID, Foreign Key -> `Departments.id`)
- `status` (Enum: 'Active', 'Draft', 'Archived')

### 7. `ResponsibilityAssignments`
Junction linking Users/Roles to RACI tasks.
- `matrix_id` (UUID, Foreign Key -> `ResponsibilityMatrices.id`)
- `user_id` (UUID, Nullable, Foreign Key -> `Users.id`)
- `role_id` (UUID, Nullable, Foreign Key -> `Roles.id`)
- `type` (Enum: 'R', 'A', 'C', 'I')

### 8. `AuditLogs`
Immutable record of actions.
- `id` (UUID, Primary Key)
- `action` (String)
- `userId` (UUID, Foreign Key -> `Users.id`)
- `details` (Text)
- `ipAddress` (String)
- `createdAt` (Timestamp)

### 9. `DecisionFlows` & `DecisionRequests`
Workflow approval configurations.
- `DecisionFlows`: Configures steps and required approvals.
- `DecisionRequests`: Instances of a flow currently pending approval.

## Indexes
- Unique index on `Users.email`.
- Foreign key indexes on `department_id`, `role_id`, `reportingManagerId`.
- Composite index on `(matrix_id, user_id, type)` in `ResponsibilityAssignments` to prevent duplicate RACI assignments.

## Security
- Passwords are never stored in plain text (bcrypt hashed).
- JWT refresh tokens are managed securely in the application layer.
