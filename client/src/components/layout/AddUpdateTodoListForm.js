import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const AddUpdateTodoListForm = ({
  listName,
  setListName,
  onAddTodosList,
  current,
  clearInput,
}) => {
  let isListNameEmpty = true;

  if (listName && listName !== null) {
    isListNameEmpty = false;
  }
  return (
    <FormControl style={{ marginBottom: '20px' }}>
      <InputLabel>
        {current !== null ? `Update todos list name` : `Enter todos list name`}
      </InputLabel>
      <Input
        onChange={(e) => {
          setListName(e.target.value);
        }}
        value={listName !== null && listName}
        inputRef={clearInput}
        endAdornment={
          <InputAdornment position="end">
            {!isListNameEmpty && (
              <IconButton onClick={onAddTodosList}>
                <AddCircleIcon color="primary" fontSize="50px" />
              </IconButton>
            )}
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default AddUpdateTodoListForm;
