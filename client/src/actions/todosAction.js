import axios from 'axios';
import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  SET_CURRENT_TODO,
  CLEAR_CURRENT_TODO,
  CLEAR_TODOS,
  TODO_ERROR,
  SET_LOADING,
} from './types';

export const getAllTodos = (id) => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get(`/todos-list/${id}/todos`);

    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: err.response.data.message,
    });
  }
};

export const addTodo = (id, data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    setLoading();

    const res = await axios.post(`/todos-list/${id}/todos`, data, config);

    dispatch({
      type: CREATE_TODO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: err.response.data.message,
    });
  }
};

export const updateTodo = (id, data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    setLoading();

    const res = await axios.patch(`/todos/${id}`, data, config);

    dispatch({
      type: UPDATE_TODO,
      payload: { data: res.data, id },
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: err.response.data.message,
    });
  }
};

export const completeTodo = (id, data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    setLoading();

    const res = await axios.put(`/todos/${id}`, data, config);

    dispatch({
      type: COMPLETE_TODO,
      payload: { data: res.data, id },
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: err.response.data.message,
    });
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/todos/${id}`);

    dispatch({
      type: DELETE_TODO,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TODO_ERROR,
      payload: err.response.data.message,
    });
  }
};

export const setCurrentTodo = (todo) => {
  return {
    type: SET_CURRENT_TODO,
    payload: todo,
  };
};

export const clearCurrentTodo = () => {
  return {
    type: CLEAR_CURRENT_TODO,
  };
};

export const clearTodos = () => {
  return {
    type: CLEAR_TODOS,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
