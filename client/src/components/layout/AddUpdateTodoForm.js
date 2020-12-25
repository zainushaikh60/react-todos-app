import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const AddUpdateTodoForm = ({
  setTitle,
  onAddTodo,
  currentTodo,
  title,
  clearInput,
  isTitleEmpty,
  todosListId,
}) => {
  return (
    <FormControl style={{ marginBottom: '20px' }}>
      <InputLabel>
        {currentTodo === null ? 'Enter todos title' : 'Update todos title'}
      </InputLabel>
      <Input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title !== null && title}
        disabled={todosListId === null ? true : false}
        inputRef={clearInput}
        endAdornment={
          <InputAdornment position="end">
            {!isTitleEmpty && (
              <IconButton onClick={() => onAddTodo(todosListId)}>
                <AddCircleIcon color="primary" fontSize="50px" />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default AddUpdateTodoForm;
