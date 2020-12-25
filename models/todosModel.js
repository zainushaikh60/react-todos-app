const mongoose = require('mongoose');

const todosSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Todo title can not be empty'],
  },

  isComplete: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: new Date(),
  },

  todosList: {
    type: mongoose.Schema.ObjectId,
    ref: 'TodosList',
    required: [true, 'todo must belong to a todos list'],
  },
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
