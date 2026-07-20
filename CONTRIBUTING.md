# Contributing to SAMS

Thank you for investing your time in contributing to the Strategic Authority Mapping System (SAMS)!

## Coding Standards

### Frontend
- **React Components**: Use Functional Components and React Hooks exclusively. No Class Components.
- **State Management**: Complex or shared state must reside in `zustand` stores located in `src/store`. Local ephemeral UI state can use `useState`.
- **CSS**: SAMS relies heavily on utility classes defined in `index.css`. Avoid inline styles unless computing dynamic coordinates (like in React Flow). Do not install Tailwind.

### Backend
- **ES6/CommonJS**: The backend currently uses CommonJS modules (`require`). Keep it consistent.
- **Async/Await**: Always use `async/await` and wrap controller functions in a `catchAsync` block or `try/catch` to allow the global error handler to capture exceptions.
- **Linting**: Both frontend and backend adhere to standard linting rules. Run `npm run lint` before committing.

## Git Workflow
We follow standard GitHub Flow:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`.
3. Commit your changes.
4. Push to the branch.
5. Submit a Pull Request targeting the `main` branch.

## Branch Naming Conventions
- `feature/<feature-name>` for new additions.
- `bugfix/<bug-name>` for fixing issues.
- `hotfix/<fix-name>` for critical production fixes.
- `docs/<doc-name>` for documentation updates.

## Commit Message Format
Use Conventional Commits formatting:
- `feat: added user audit trails`
- `fix: resolved navigation loop on login`
- `docs: updated architecture overview`
- `refactor: simplified auth middleware`
- `style: normalized table padding`

## Code Review Process
1. A Pull Request must pass all CI/CD pipelines (Lint, Tests, Build).
2. It requires at least one approval from a core maintainer.
3. PR titles should clearly state the changes.
4. If the PR closes an issue, include `Closes #IssueNumber` in the PR description.
