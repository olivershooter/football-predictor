# Football Statistics - Sports Analytics Platform

A modern football statistics platform built with cutting-edge web technologies. Designed to showcase sports analytics capabilities in a portfolio context.

## 🚀 Features

- Live football match statistics and predictions
- Responsive UI with smooth animations
- Historical match analysis

## 🛠️ Technologies Used

- **Frontend**: 
  - React + TypeScript
  - Vite
  - Tailwind CSS
  - Shadcn UI Components
  - Framer Motion (Animations)
  - TanStack Query (Data Fetching)

- **Backend**:
  - Python FastAPI

- **DevOps**:
  - Docker


## 📦 Installation

1. Clone repository:
```bash
git clone https://github.com/yourusername/football-predictor.git
cd football-predictor
```

2. Install frontend dependencies:
```bash
cd frontend && npm install
```

3. Install backend dependencies:
```bash
cd ../backend && pip install -r requirements.txt
```

4. Start development servers:
```bash
# Frontend (from frontend directory)
npm run dev

# Backend (from backend directory)
uvicorn main:app --reload
```

## 🐳 Docker Setup

You can also install this with Docker Compose. Simply:

```bash
docker-compose up --build
```
The frontend will be on:
http://localhost:5173

The backend will be on:
http://localhost:8000

## 🔧 Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
