# Real Estate Website - Project Setup

## Project Overview
Full-stack real estate website using React (frontend) + Node.js/Express (backend) + MongoDB (database).

## Setup Checklist

- [x] Scaffold project structure (frontend & backend folders)
- [x] Install dependencies
- [x] Set up environment variables (backend/.env.example provided)
- [x] Create development tasks (.vscode/tasks.json)
- [x] Verify project files created

## Technology Stack
- **Frontend**: React 18, React Router, Axios
- **Backend**: Express.js, MongoDB, Mongoose
- **Database**: MongoDB (local or Atlas)
- **Dev Tools**: Node.js, npm, Nodemon
- **Authentication**: JWT, bcryptjs
- **File Upload**: Multer

## Project Structure
```
real-estate-app/
├── frontend/           # React application (port 3000)
├── backend/            # Express API (port 5000)
├── .vscode/           # VS Code configuration
├── .github/           # GitHub specific files
├── README.md          # Project documentation
└── .gitignore         # Git ignore patterns
```

## Quick Start

### 1. Configure Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB connection string
```

### 2. Start Development Servers
**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## API Endpoints
- `GET /api/health` - Health check
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

## Current Status
✅ Project setup complete! Ready for development.
