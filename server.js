const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb+srv://sudhamangla:5VBidwMlAY5hBrux@cluster0.mgrqz5r.mongodb.net/mern_todo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Event listener for the connection open event
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
// Event listener for connection error event
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.use(express.json());

// Create a Task schema
const taskSchema = new mongoose.Schema({
  text: String,
});

const Task = mongoose.model('Task', taskSchema);

// Add a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task({ text: req.body.text });
    console.log(task.text);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
