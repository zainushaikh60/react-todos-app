import React, { Fragment, useEffect, useState, useRef } from 'react';
import AddUpdateTodoForm from './layout/AddUpdateTodoForm';
import DatePicker from './layout/DatePicker';
import TodosItem from './layout/TodosItem';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  getAllTodos,
  addTodo,
  updateTodo,
  completeTodo,
  deleteTodo,
  setCurrentTodo,
  clearCurrentTodo,
} from '../actions/todosAction';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '600px',
    width: '100%',
  },

  fontBold: {
    fontWeight: 600,
  },

  iconSize: {
    fontSize: '20px',
  },

  onHover: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#007acc',
      color: '#fff',

      '&:hover button': {
        color: '#fff',
      },

      '&hover input': {
        color: '#fff',
      },
    },
  },
}));

const Todos = ({
  todosListId,
  todos: { todos, loading, currentTodo },
  addTodo,
  updateTodo,
  completeTodo,
  deleteTodo,
  setCurrentTodo,
  clearCurrentTodo,
  getAllTodos,
}) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString()
  );

  const clearInput = useRef();
  const titleState = '';
  const dateState = '';
  const initialDate = '';
  const [title, setTitle] = useState(titleState);
  const [todoDate, setTodoDate] = useState(dateState);
  const [date, setDate] = useState(initialDate);
  const [tid, setId] = useState();
  const newTodo = { title, date };

  useEffect(() => {
    if (todosListId !== null) {
      getAllTodos(todosListId);
      setTitle(titleState);
      if (currentTodo !== null) {
        clearCurrentTodo();
        setTitle(titleState);
        clear();
      }
    }
  }, [todosListId]);

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title);
      setTodoDate(currentTodo.date);
    }
  }, [currentTodo]);

  const clear = () => {
    clearInput.current.value = '';
  };

  let isTitleEmpty = true;

  if (title && title !== null) {
    isTitleEmpty = false;
  }

  const onAddTodo = () => {
    if (currentTodo !== null) {
      updateTodo(tid, newTodo);
      setTitle(titleState);
      setTodoDate(dateState);
      clear();
      clearCurrentTodo();
    } else {
      addTodo(todosListId, newTodo);
      setTitle(titleState);
      clear();
    }
  };

  const onDeleteTodo = (id) => {
    deleteTodo(id);
  };

  const handleChange = (id) => {
    completeTodo(id);
  };

  return (
    <Fragment>
      <AddUpdateTodoForm
        setTitle={setTitle}
        onAddTodo={onAddTodo}
        currentTodo={currentTodo}
        title={title}
        clearInput={clearInput}
        isTitleEmpty={isTitleEmpty}
        todosListId={todosListId}
      />

      <DatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        todosListId={todosListId}
        setTodoDate={setTodoDate}
        todoDate={todoDate}
        setDate={setDate}
        date={date}
      />

      <Box
        className={classes.root}
        borderRadius="7px"
        boxShadow={2}
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
        <Box display="flex" padding="10px">
          <Box display="flex" alignItems="center" width="68%">
            <Typography variant="subtitle2" className={classes.fontBold}>
              Name
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="42%"
          >
            <Typography variant="subtitle2" className={classes.fontBold}>
              Date
            </Typography>
            <Typography variant="subtitle2" className={classes.fontBold}>
              Edit
            </Typography>
            <Typography variant="subtitle2" className={classes.fontBold}>
              Delete
            </Typography>
          </Box>
        </Box>

        {todosListId === null ? (
          <></>
        ) : !loading && todos === null ? (
          <CircularProgress style={{ margin: 'auto' }} />
        ) : todos && todos.length === 0 ? (
          <Typography
            variant="subtitle2"
            align="center"
            className={classes.fontBold}
            style={{ marginBottom: '8px' }}
          >
            No Todos
          </Typography>
        ) : (
          todos &&
          todos.map((todo) => {
            return (
              <TodosItem
                key={todo._id}
                todo={todo}
                setId={setId}
                setCurrentTodo={setCurrentTodo}
                onDeleteTodo={onDeleteTodo}
                handleChange={handleChange}
              />
            );
          })
        )}
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

export default connect(mapStateToProps, {
  getAllTodos,
  addTodo,
  updateTodo,
  completeTodo,
  deleteTodo,
  setCurrentTodo,
  clearCurrentTodo,
})(Todos);
