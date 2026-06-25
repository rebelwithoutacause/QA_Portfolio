const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store
let tasks = [
  { id: 1, title: 'Buy groceries', done: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Read a book', done: true, createdAt: new Date().toISOString() },
];
let nextId = 3;

// GET /tasks — list all tasks (optional ?done=true/false filter)
app.get('/tasks', (req, res) => {
  let result = tasks;
  if (req.query.done !== undefined) {
    const done = req.query.done === 'true';
    result = tasks.filter(t => t.done === done);
  }
  res.json({ count: result.length, tasks: result });
});

// GET /tasks/:id — get one task
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// POST /tasks — create a task
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: '"title" is required and must be a non-empty string' });
  }
  const task = { id: nextId++, title: title.trim(), done: false, createdAt: new Date().toISOString() };
  tasks.push(task);
  res.status(201).json(task);
});

// PUT /tasks/:id — replace a task
app.put('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  const { title, done } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: '"title" is required and must be a non-empty string' });
  }
  if (done !== undefined && typeof done !== 'boolean') {
    return res.status(400).json({ error: '"done" must be a boolean' });
  }

  tasks[index] = {
    ...tasks[index],
    title: title.trim(),
    done: done !== undefined ? done : tasks[index].done,
    updatedAt: new Date().toISOString(),
  };
  res.json(tasks[index]);
});

// PATCH /tasks/:id — partial update
app.patch('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, done } = req.body;
  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: '"title" must be a non-empty string' });
    }
    task.title = title.trim();
  }
  if (done !== undefined) {
    if (typeof done !== 'boolean') {
      return res.status(400).json({ error: '"done" must be a boolean' });
    }
    task.done = done;
  }
  task.updatedAt = new Date().toISOString();
  res.json(task);
});

// DELETE /tasks/:id — delete a task
app.delete('/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  const [deleted] = tasks.splice(index, 1);
  res.json({ message: `Task "${deleted.title}" deleted successfully` });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

app.listen(PORT, () => {
  console.log(`Tasks API running at http://localhost:${PORT}`);
  console.log('\nEndpoints:');
  console.log('  GET    /tasks           list all tasks');
  console.log('  GET    /tasks?done=true  filter by status');
  console.log('  GET    /tasks/:id        get one task');
  console.log('  POST   /tasks           create a task  { "title": "..." }');
  console.log('  PUT    /tasks/:id        replace a task { "title": "...", "done": false }');
  console.log('  PATCH  /tasks/:id        update fields  { "done": true }');
  console.log('  DELETE /tasks/:id        delete a task');
});
