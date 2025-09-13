const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

let tasks = [];
let nextId = 1;

// GET /tasks - return all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks - add a task with title
app.post('/tasks', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTask = {
    id: nextId++,
    title: title,
    done: false
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - mark task as done
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.done = !task.done;
  res.json(task);
});

// DELETE /tasks/:id - delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});