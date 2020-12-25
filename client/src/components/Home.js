import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TodosList from './TodosList';
import Todos from './Todos';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
  },

  fullHeight: {
    height: '100%',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [todosListId, setTodosListId] = useState(null);
  const dateState = '';
  const [todoDate, setTodoDate] = useState(dateState);

  return (
    <div className={classes.root}>
      <Grid container className={classes.fullHeight}>
        <Grid item xs={12} container>
          <Grid
            item
            xs={6}
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <TodosList
              setTodosListId={setTodosListId}
              todosId={todosListId}
              todoDate={todoDate}
              setTodoDate={setTodoDate}
              dateState={dateState}
            />
          </Grid>

          <Grid item xs={6} container direction="column" alignItems="center">
            <Todos
              todosListId={todosListId}
              todoDate={todoDate}
              setTodoDate={setTodoDate}
              dateState={dateState}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
