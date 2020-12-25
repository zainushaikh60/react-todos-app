const express = require('express');
const app = express();
const config = require('config');
const connectDB = require('./config/db');
const todosRouter = require('./routes/todosRoutes');
const todosListRouter = require('./routes/todosListRoutes');

const port = config.get('PORT') || 4000;

// Connect DB
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the Todo Application' });
});

// routes
app.use('/todos', todosRouter);
app.use('/todos-list', todosListRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
