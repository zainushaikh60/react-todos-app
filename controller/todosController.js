const Todos = require('../models/todosModel');
const TodosList = require('../models/todosListModel');

exports.createTodo = async (req, res) => {
  try {
    const todosList = await TodosList.findById(req.params.id);

    if (!todosList)
      return res.status(404).json({
        status: 'fail',
        message: 'No todos list found with this ID',
      });

    const newTodo = await Todos.create({
      title: req.body.title,
      todosList: req.params.id,
    });

    todosList.todos = newTodo._id;

    await todosList.save();

    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todos.find({
      todosList: { $eq: req.params.id },
    });

    res.status(200).json(todos.map((todo) => todo));
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { title, date } = req.body;

    const updatedFields = {};

    if (title) updatedFields.title = title;
    if (date) updatedFields.date = date;

    const todo = await Todos.findByIdAndUpdate(
      req.params.id,
      {
        $set: updatedFields,
      },
      { new: true, runValidators: true }
    );

    if (!todo)
      return res.status(404).json({
        status: 'fail',
        message: 'No todo found with this ID',
      });

    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.completedTodo = async (req, res) => {
  try {
    const todo = await Todos.findById(req.params.id);

    if (!todo)
      return res.status(404).json({
        status: 'fail',
        message: 'No todo found with this ID',
      });

    if (todo.isComplete === false) {
      todo.isComplete = true;
      await todo.save();
    } else {
      todo.isComplete = false;
      await todo.save();
    }

    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todos.findByIdAndDelete(req.params.id);

    if (!todo)
      return res.status(404).json({
        status: 'fail',
        message: 'No todo found with this ID',
      });

    res.status(204).json(null);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
