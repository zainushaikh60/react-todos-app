const express = require('express');
const todosController = require('../controller/todosController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(todosController.getAllTodos)
  .post(todosController.createTodo);

router
  .route('/:id')
  .patch(todosController.updateTodo)
  .put(todosController.completedTodo)
  .delete(todosController.deleteTodo);

module.exports = router;
