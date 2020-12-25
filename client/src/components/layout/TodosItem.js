import React from 'react';
import Box from '@material-ui/core/Box';
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

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

const TodosItem = ({
  todo,
  setCurrentTodo,
  setId,
  onDeleteTodo,
  handleChange,
}) => {
  const classes = useStyles();

  return (
    <ButtonBase key={todo._id}>
      <Box
        display="flex"
        borderTop={1}
        borderColor="grey.500"
        padding="10px"
        className={classes.onHover}
        width="100%"
      >
        <Box display="flex" alignItems="center" width="56%">
          <Checkbox
            color="primary"
            checked={todo.isComplete}
            onChange={() => handleChange(todo._id)}
          />
          <Typography
            variant="subtitle2"
            style={{
              textDecoration: !todo.isComplete ? 'none' : 'line-through',
            }}
          >
            {todo.title}
          </Typography>
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="44%"
        >
          <Typography variant="subtitle2">
            <Moment format="DD-MM-YYYY">{todo.date}</Moment>
          </Typography>

          <IconButton color="primary">
            <EditIcon
              className={classes.iconSize}
              onClick={() => {
                setId(todo._id);
                setCurrentTodo(todo);
              }}
            />
          </IconButton>

          <IconButton color="secondary">
            <DeleteIcon
              className={classes.iconSize}
              onClick={() => onDeleteTodo(todo._id)}
            />
          </IconButton>
        </Box>
      </Box>
    </ButtonBase>
  );
};

export default TodosItem;
