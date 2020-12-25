const express = require('express');
const todosListController = require('../controller/todosListController');
const todosListRoutes = require('../routes/todosRoutes');
const router = express.Router();

router
  .route('/')
  .get(todosListController.getAllTodosList)
  .post(todosListController.createTodoList);

router
  .route('/:id')
  .patch(todosListController.updateTodosList)
  .delete(todosListController.deleteTodosList);

router.use('/:id/todos', todosListRoutes);

module.exports = router;
