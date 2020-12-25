import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
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
    },
  },

  active: {
    backgroundColor: '#007acc',
    color: '#fff',

    '& button': {
      color: '#fff',
    },
  },
}));

const TodosListItem = ({
  todosList,
  todosId,
  onClickTodoList,
  setCurrent,
  setId,
  onDeleteTodosList,
}) => {
  const classes = useStyles();
  return (
    <ButtonBase key={todosList._id}>
      <Box
        display="flex"
        borderTop={1}
        borderColor="grey.500"
        padding="10px"
        className={todosId === todosList._id ? classes.active : classes.onHover}
        width="100%"
        onClick={() => {
          onClickTodoList(todosList._id);
        }}
      >
        <Box display="flex" alignItems="center" width="70%">
          <Typography variant="subtitle2">{todosList.listName}</Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="30%"
        >
          <IconButton color="primary">
            <EditIcon
              className={classes.iconSize}
              onClick={() => {
                setCurrent(todosList);
                setId(todosList._id);
              }}
            />
          </IconButton>

          <IconButton color="secondary">
            <DeleteIcon
              className={classes.iconSize}
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTodosList(todosList._id);
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default TodosListItem;
