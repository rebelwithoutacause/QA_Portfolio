# Mini To-Do App

A full-stack mini to-do application built with Node.js/Express backend and vanilla HTML/CSS/JS frontend.

## Features

- ✅ Add new tasks
- ✅ Mark tasks as completed/uncompleted
- ✅ Delete tasks
- ✅ Clean, responsive UI
- ✅ Real-time updates

## Project Structure

```
Mini-To-Do-App/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── README.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

The backend server will run on http://localhost:3001

### Frontend Setup

1. Open `frontend/index.html` in your web browser
2. Or serve the frontend folder using a local HTTP server:
   ```bash
   cd frontend
   # Using Python 3
   python -m http.server 8080
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

## API Endpoints

- `GET /tasks` - Get all tasks
- `POST /tasks` - Create a new task (requires `title` in request body)
- `PUT /tasks/:id` - Toggle task completion status
- `DELETE /tasks/:id` - Delete a task

## Usage

1. Start the backend server first
2. Open the frontend in your browser
3. Add tasks using the input field
4. Click "Done" to mark tasks as completed
5. Click "Delete" to remove tasks
6. Click "Undo" on completed tasks to mark them as incomplete

## Technologies Used

### Backend
- Node.js
- Express.js
- CORS middleware

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API for HTTP requests