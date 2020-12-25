const express = require('express');
const app = express();
const config = require('config');
const connectDB = require('./config/db');
const todosRouter = require('./routes/todosRoutes');
const todosListRouter = require('./routes/todosListRoutes');
const path = require('path');

// Connect DB
connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routes
app.use('/todos', todosRouter);
app.use('/todos-list', todosListRouter);

const port = config.get('PORT') || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
