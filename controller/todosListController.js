const TodosList = require('../models/todosListModel');
const Todos = require('../models/todosModel');

exports.createTodoList = async (req, res) => {
  try {
    const newTodosList = await TodosList.create({
      listName: req.body.listName,
    });

    res.status(201).json(newTodosList);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllTodosList = async (req, res) => {
  try {
    const todosLists = await TodosList.find();

    res.status(200).json(todosLists);
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateTodosList = async (req, res) => {
  try {
    const update = { listName: req.body.listName };

    const todosList = await TodosList.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!todosList)
      return res.status(404).json({
        status: 'fail',
        message: 'No todos list found with this ID',
      });

    res.status(200).json(todosList);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteTodosList = async (req, res) => {
  try {
    const id = req.params.id;

    const todosList = await TodosList.findById(id);

    if (!todosList)
      return res.status(404).json({
        status: 'fail',
        message: 'No todos list found with this ID',
      });

    todosList.todos.map(async (todo) => {
      await Todos.findByIdAndDelete(todo);
    });

    await TodosList.findByIdAndDelete(id);

    if (!todosList)
      return res.status(404).json({
        status: 'fail',
        message: 'No todos list found with this ID',
      });

    res.status(204).json(null);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
