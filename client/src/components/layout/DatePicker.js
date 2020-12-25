import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const DatePicker = ({ selectedDate, todoDate, setTodoDate, setDate }) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around" style={{ marginBottom: '20px' }}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd-MM-yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date"
          disabled={todoDate === '' ? true : false}
          value={todoDate === '' ? selectedDate : todoDate}
          onChange={(val) => {
            setTodoDate(val);
            setDate(val);
          }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
