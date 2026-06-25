# MyTasks App — REST API + Postman Collection

A simple task management REST API built with Node.js and Express, created as a hands-on QA practice project. The app exposes a full CRUD API that is tested manually using a structured Postman collection.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Postman Collection](#postman-collection)
- [Test Execution Order](#test-execution-order)
- [Notes](#notes)

---

## Project Overview

MyTasks App is a lightweight REST API that manages a list of tasks. It includes a browser-based UI served as a static page, but the primary focus of this project is **API testing via Postman**.

The project demonstrates:
- Manual API testing covering all HTTP methods (GET, POST, PUT, PATCH, DELETE)
- Request organisation by method type in Postman
- Validation of query parameters, request bodies, and status codes
- Understanding of RESTful API conventions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 4 |
| Data store | In-memory (array) |
| Dev server | Nodemon |
| API testing | Postman |

---

## Getting Started

**Prerequisites:** Node.js installed on your machine.

```bash
# 1. Navigate to the App directory
cd App

# 2. Install dependencies
npm install

# 3. Start the server (production mode)
npm start

# or start with auto-restart on file changes (dev mode)
npm run dev
```

The server starts at `http://localhost:3000`.

**Seed data** — two tasks are available immediately on every fresh start:

| ID | Title | Status |
|---|---|---|
| 1 | Buy groceries | Pending |
| 2 | Read a book | Done |

> The data store is in-memory, so all changes reset when the server restarts.

---

## API Reference

Base URL: `http://localhost:3000`

### GET /tasks

Returns all tasks. Accepts an optional `done` query parameter to filter by status.

| Parameter | Type | Values |
|---|---|---|
| `done` | query string | `true` / `false` |

**Examples:**

```
GET /tasks              → all tasks
GET /tasks?done=true    → completed tasks only
GET /tasks?done=false   → pending tasks only
```

**Response `200 OK`:**
```json
{
  "count": 2,
  "tasks": [
    { "id": 1, "title": "Buy groceries", "done": false, "createdAt": "..." },
    { "id": 2, "title": "Read a book",   "done": true,  "createdAt": "..." }
  ]
}
```

---

### GET /tasks/:id

Returns a single task by ID.

**Response `200 OK`:**
```json
{ "id": 1, "title": "Buy groceries", "done": false, "createdAt": "..." }
```

**Response `404 Not Found`:**
```json
{ "error": "Task not found" }
```

---

### POST /tasks

Creates a new task. Requires a `title` field in the JSON body.

**Request body:**
```json
{ "title": "Check Jira tickets" }
```

**Response `201 Created`:**
```json
{ "id": 3, "title": "Check Jira tickets", "done": false, "createdAt": "..." }
```

**Response `400 Bad Request`** (missing or empty title):
```json
{ "error": "\"title\" is required and must be a non-empty string" }
```

---

### PUT /tasks/:id

Replaces a task entirely. Both `title` (required) and `done` (optional) must be provided.

**Request body:**
```json
{ "title": "Buy groceries", "done": true }
```

**Response `200 OK`:**
```json
{ "id": 1, "title": "Buy groceries", "done": true, "createdAt": "...", "updatedAt": "..." }
```

**Response `400 Bad Request`** (missing title or invalid `done` type):
```json
{ "error": "\"title\" is required and must be a non-empty string" }
```

---

### PATCH /tasks/:id

Partially updates a task. Send only the fields you want to change (`title`, `done`, or both).

**Request body:**
```json
{ "done": false }
```

**Response `200 OK`:**
```json
{ "id": 3, "title": "Check Jira tickets", "done": false, "updatedAt": "..." }
```

---

### DELETE /tasks/:id

Deletes a task by ID.

**Response `200 OK`:**
```json
{ "message": "Task \"Check Jira tickets\" deleted successfully" }
```

**Response `404 Not Found`:**
```json
{ "error": "Task not found" }
```

---

## Postman Collection

The collection is located at:

```
Postman_Collection_Requests/MyTasks_App.postman_collection.json
```

### Importing the Collection

1. Open Postman
2. Click **Import** (top left)
3. Select the `.json` file from the `Postman_Collection_Requests` folder
4. The collection **MyTasks_App** will appear in your sidebar

### Collection Structure

Requests are organised into folders by HTTP method:

```
MyTasks_App
├── GET Requests
│   ├── Get All
│   ├── Get Completed Tasks
│   └── Get First Task
├── POST Requests
│   └── Add New Task
├── PUT Requests
│   └── Mark Task As Completed
├── PATCH Requests
│   └── Change Task Status
└── DELETE Request
    └── Remove Task
```

### Request Summary

| Folder | Request Name | Method | Endpoint | Body |
|---|---|---|---|---|
| GET Requests | Get All | GET | `/tasks` | — |
| GET Requests | Get Completed Tasks | GET | `/tasks?done=true` | — |
| GET Requests | Get First Task | GET | `/tasks/1` | — |
| POST Requests | Add New Task | POST | `/tasks` | `{"title": "Check Jira tickets"}` |
| PUT Requests | Mark Task As Completed | PUT | `/tasks/1` | `{"title": "Buy groceries", "done": true}` |
| PATCH Requests | Change Task Status | PATCH | `/tasks/3` | `{"done": false}` |
| DELETE Request | Remove Task | DELETE | `/tasks/3` | — |

---

## Test Execution Order

Because the data store is in-memory and resets on server restart, test execution order matters for requests that target task ID `3`.

Task ID `3` is not part of the seed data — it is created by the **Add New Task** POST request. The PATCH and DELETE requests both target ID `3`, so they must run after POST.

**Recommended order:**

1. GET All
2. GET Completed Tasks
3. GET First Task
4. POST — Add New Task *(creates task ID 3)*
5. PUT — Mark Task As Completed
6. PATCH — Change Task Status *(requires task 3 to exist)*
7. DELETE — Remove Task *(requires task 3 to exist)*

---

## Notes

- All request bodies use `raw JSON` format — Postman automatically sends the `Content-Type: application/json` header.
- The `done` field always expects a **boolean** (`true`/`false`), not a string.
- The API returns `404` for any request targeting a non-existent task ID.
- The UI is accessible at `http://localhost:3000` and uses the same API endpoints under the hood.
