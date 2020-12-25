import {
  GET_TODOS,
  CREATE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  SET_CURRENT_TODO,
  CLEAR_CURRENT_TODO,
  CLEAR_TODOS,
  SET_LOADING,
  TODO_ERROR,
} from '../actions/types';

const initialState = {
  todos: null,
  currentTodo: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        loading: false,
      };
    case UPDATE_TODO:
    case COMPLETE_TODO:
      return {
        ...state,
        todos: state.todos.map((todos) =>
          todos._id === action.payload.id ? action.payload.data : todos
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todos) => todos._id !== action.payload),
      };
    case SET_CURRENT_TODO:
      return {
        ...state,
        currentTodo: action.payload,
      };
    case CLEAR_CURRENT_TODO:
      return {
        ...state,
        currentTodo: null,
      };
    case CLEAR_TODOS:
      return {
        ...state,
        todos: null,
        loading: true,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TODO_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
