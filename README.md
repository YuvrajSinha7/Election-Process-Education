# VoteWise: AI-Powered Election Encyclopedia

VoteWise is an enterprise-grade, nonpartisan election information and education platform. It combines a robust full-stack architecture with AI-driven interactivity to simplify the democratic process for citizens.

## 🚀 Key Features
- **Candidate Match Quiz**: High-precision policy alignment engine.
- **AI Assistant**: Real-time concept explanation and "ELI5" (Explain Like I'm 10) mode.
- **Encyclopedia Data**: Relational database for candidates, elections, and policy issues.
- **AWS Optimized**: Designed for high scalability and sub-second performance.

## 🛠 Tech Stack
- **Frontend**: Next.js 14 (App Router), Vanilla CSS Design System.
- **Backend**: Node.js, NextAuth.js (RBAC), Prisma ORM.
- **Database**: PostgreSQL (AWS RDS).
- **AI**: Gemini Pro / OpenAI API.
- **DevOps**: Docker, GitHub Actions, AWS App Runner.

## 📦 Deployment Guide (AWS)

### 1. Prerequisites
- AWS Account & GitHub Repository.
- `DATABASE_URL` (PostgreSQL).
- `GEMINI_API_KEY`.

### 2. Local Setup
```bash
npm install
npx prisma generate
npm run dev
```

### 3. AWS Launch (App Runner - Recommended)
1. Connect your GitHub repository to **AWS App Runner**.
2. Select the `Dockerfile` for the build configuration.
3. Add Environment Variables (`DATABASE_URL`, `GEMINI_API_KEY`, `NEXTAUTH_SECRET`).
4. Deploy. The database will automatically sync and seed on startup.

### 4. AWS Launch (Elastic Beanstalk)
1. Create a new EB environment with the **Docker** platform.
2. Upload the source code (including `Dockerfile` and `Dockerrun.aws.json`).
3. Configure environment variables in the EB console.

## 📄 Maintenance
- **Database Sync**: The app uses `prisma db push` and `db seed` on container startup to keep production data fresh.
- **CI/CD**: GitHub Actions validate every push to `main`.

## 📄 License
This project is licensed under the MIT License.
