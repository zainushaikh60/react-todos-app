const mongoose = require('mongoose');

const todosListSchema = mongoose.Schema({
  listName: {
    type: String,
    required: [true, 'Todos list name can not be empty'],
  },

  date: {
    type: Date,
    default: Date.now,
  },

  todos: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Todos',
    },
  ],
});

const TodosList = mongoose.model('TodosList', todosListSchema);

module.exports = TodosList;
