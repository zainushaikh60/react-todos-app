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

// routes
app.use('/todos', todosRouter);
app.use('/todos-list', todosListRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
