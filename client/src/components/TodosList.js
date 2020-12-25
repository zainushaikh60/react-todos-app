import React, { Fragment, useEffect, useState, useRef } from 'react';
import AddUpdateTodoListForm from './layout/AddUpdateTodoListForm';
import TodosListItem from './layout/TodosListItem';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  getTodosList,
  getTodosLists,
  addTodosList,
  updateTodosList,
  setCurrent,
  clearCurrent,
  deleteTodosList,
} from '../actions/todosListAction';
import { clearTodos } from '../actions/todosAction';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '400px',
    width: '100%',
  },

  fontBold: {
    fontWeight: 600,
  },
}));

const TodosList = ({
  setTodosListId,
  todosId,
  todoDate,
  setTodoDate,
  dateState,
  todosList: { todosLists, current, loading },
  getTodosLists,
  addTodosList,
  updateTodosList,
  setCurrent,
  clearCurrent,
  clearTodos,
  deleteTodosList,
}) => {
  useEffect(() => {
    getTodosLists();
  }, []);

  const classes = useStyles();

  const clearInput = useRef();
  const listNameState = '';
  const [listName, setListName] = useState(listNameState);
  const [id, setId] = useState();
  const newTodoList = { listName };

  useEffect(() => {
    if (current) {
      setListName(current.listName);
    }
  }, [current]);

  const [active, setActive] = useState(false);

  const clear = () => {
    clearInput.current.value = '';
  };

  const onAddTodosList = () => {
    if (current !== null) {
      updateTodosList(id, newTodoList);
      setListName(listNameState);
      clearCurrent();
      clear();
    } else {
      addTodosList(newTodoList);
      setListName(listNameState);
      clear();
    }
  };

  const onDeleteTodosList = (todosListId) => {
    deleteTodosList(todosListId);
    setTodosListId(null);
    clearTodos();
  };

  const onClickTodoList = (id) => {
    if (current !== null) {
      clearCurrent();
      setListName(listNameState);
      clear();
    }

    if (todoDate !== '') {
      setTodoDate(dateState);
    }

    setTodosListId(id);
    setActive((active) => !active);
  };

  return (
    <Fragment>
      <AddUpdateTodoListForm
        listName={listName}
        setListName={setListName}
        onAddTodosList={onAddTodosList}
        current={current}
        clearInput={clearInput}
      />

      {!loading && todosLists === null ? (
        <CircularProgress />
      ) : (
        <Box
          className={classes.root}
          borderRadius="7px"
          boxShadow={2}
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Box display="flex" padding="10px">
            <Box display="flex" alignItems="center" width="70%">
              <Typography variant="subtitle2" className={classes.fontBold}>
                Name
              </Typography>
            </Box>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="30%"
            >
              <Typography variant="subtitle2" className={classes.fontBold}>
                Edit
              </Typography>
              <Typography variant="subtitle2" className={classes.fontBold}>
                Delete
              </Typography>
            </Box>
          </Box>

          {todosLists.length === 0 ? (
            <Typography align="center" style={{ margin: '5px' }}>
              No Todo Lists Found
            </Typography>
          ) : (
            todosLists.map((todosList) => (
              <TodosListItem
                key={todosList._id}
                todosList={todosList}
                todosId={todosId}
                onClickTodoList={onClickTodoList}
                setCurrent={setCurrent}
                setId={setId}
                onDeleteTodosList={onDeleteTodosList}
              />
            ))
          )}
        </Box>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  todosList: state.todosLists,
});

export default connect(mapStateToProps, {
  getTodosLists,
  getTodosList,
  addTodosList,
  updateTodosList,
  setCurrent,
  clearCurrent,
  clearTodos,
  deleteTodosList,
})(TodosList);
