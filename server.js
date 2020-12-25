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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
