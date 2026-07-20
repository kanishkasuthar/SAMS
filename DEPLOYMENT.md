# SAMS Deployment Guide

This document outlines the steps to deploy the Strategic Authority Mapping System (SAMS) to a production environment.

## Prerequisites
- Docker and Docker Compose installed on the host server.
- Domain name mapped to the server IP (if applicable).
- Node.js v22+ (for manual deployment).

## Option A: Docker Deployment (Recommended)

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourcompany/sams.git
   cd sams
   ```

2. **Configure Environment Variables**
   - In the root folder, review `.env.production`.
   - In the `backend` folder, copy `.env.example` to `.env` and fill in your secure credentials (DB Password, JWT Secrets, SMTP credentials, CORS settings).
     ```bash
     cd backend
     cp .env.example .env
     ```

3. **Build and Run Containers**
   Navigate back to the project root and run:
   ```bash
   docker-compose up -d --build
   ```
   This will start:
   - `sams-db`: MySQL 8.0 instance on port 3306.
   - `sams-backend`: Node.js API server on port 3000.
   - `sams-frontend`: Nginx server hosting the built React SPA on port 80.

4. **Verify Deployment**
   - Check Backend API: `http://localhost:3000/api/health`
   - Check Frontend: `http://localhost:80/`
   
   *Note: In a real-world scenario, you should configure a reverse proxy (like NGINX or Traefik) in front of these containers to handle SSL/HTTPS via Let's Encrypt.*

## Option B: Manual Deployment

### 1. Database Setup
- Install MySQL 8.0.
- Create a database named `sams_db`.

### 2. Backend Setup
```bash
cd backend
npm ci --only=production
cp .env.example .env # Update with production values
npm start # (or use PM2: pm2 start server.js --name sams-backend)
```

### 3. Frontend Setup
```bash
npm ci
npm run build
```
- Configure an NGINX server block to serve the static files located in `dist/` and proxy `/api` requests to `http://localhost:3000/`.

## Database Backups
A backup script is provided at `scripts/backup-db.sh`. It retains backups for 30 days.

**To automate via Cron (run daily at 2 AM):**
```bash
crontab -e
# Add the following line
0 2 * * * /path/to/sams/scripts/backup-db.sh >> /var/log/sams-backup.log 2>&1
```

## Security Hardening Built-in
- **Helmet**: Secures HTTP headers.
- **HPP**: Protects against HTTP Parameter Pollution.
- **Rate Limiting**: Throttles brute force attempts.
- **Winston**: Logs saved to `backend/logs/` with daily rotation.
- **CORS**: Strictly enforces cross-origin limits based on your `.env` config.
