import axios from 'axios';
import {
  GET_TODOS_LISTS,
  GET_TODOS_LIST,
  CREATE_TODOS_LIST,
  CREATE_TODO,
  UPDATE_TODOS_LIST,
  UPDATE_TODO,
  DELETE_TODOS_LIST,
  DELETE_TODO,
  SET_CURRENT,
  SET_CURRENT_TODO,
  CLEAR_CURRENT,
  CLEAR_CURRENT_TODO,
  TODOS_LISTS_ERROR,
  TODO_ERROR,
  SET_LOADING,
} from './types';

export const getTodosLists = () => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get('/todos-list');

    dispatch({
      type: GET_TODOS_LISTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODOS_LISTS_ERROR,
      payload: err.response.data.message,
    });
  }
};

export const getTodosList = (id) => async (dispatch) => {
  try {
    setLoading();

    const res = await axios.get(`/todos-list/${id}`);

    dispatch({
      type: GET_TODOS_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODOS_LISTS_ERROR,
      payload: err.response.data.message,
    });
  }
};

export const addTodosList = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    setLoading();

    const res = await axios.post('/todos-list', data, config);

    dispatch({
      type: CREATE_TODOS_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TODOS_LISTS_ERROR,
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

export const updateTodosList = (id, data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    setLoading();

    const res = await axios.patch(`/todos-list/${id}/`, data, config);

    dispatch({
      type: UPDATE_TODOS_LIST,
      payload: { data: res.data, id },
    });
  } catch (err) {
    dispatch({
      type: TODOS_LISTS_ERROR,
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

export const deleteTodosList = (id) => async (dispatch) => {
  try {
    setLoading();

    await axios.delete(`/todos-list/${id}`);

    dispatch({
      type: DELETE_TODOS_LIST,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TODOS_LISTS_ERROR,
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

export const setCurrent = (todosList) => {
  return {
    type: SET_CURRENT,
    payload: todosList,
  };
};

export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
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

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
