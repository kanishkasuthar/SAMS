# Changelog

All notable changes to the SAMS project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-07-18
### Added
- Complete Backend API integration for Users, Roles, Departments, RACI Matrices, Notifications, and Reports.
- Real-time Organization Studio with React Flow and Dagre dynamic auto-layout.
- Interactive AI Copilot for organizational insights.
- Global Audit Logging and Version History snapshots.
- Automated Docker orchestration, CI/CD pipelines, and health endpoints.
- Comprehensive API, Database, and Architecture documentation.

### Changed
- Replaced frontend hardcoded mock data states with robust Zustand API stores.
- Upgraded form and table UI using a unified CSS utility system for stabilization.

### Security
- Integrated `hpp` to mitigate HTTP Parameter Pollution.
- Enforced strict environment-driven CORS origins.
- Scaled up error monitoring and logging utilizing Winston with daily rotation.
