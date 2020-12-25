import {
  GET_TODOS_LIST,
  GET_TODOS_LISTS,
  CREATE_TODOS_LIST,
  UPDATE_TODOS_LIST,
  DELETE_TODOS_LIST,
  SET_CURRENT,
  CLEAR_CURRENT,
  TODOS_LISTS_ERROR,
  SET_LOADING,
} from '../actions/types';

const initialState = {
  todosLists: null,
  todos: null,
  current: null,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS_LISTS:
      return {
        ...state,
        todosLists: action.payload,
        loading: false,
      };
    case GET_TODOS_LIST:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case CREATE_TODOS_LIST:
      return {
        ...state,
        todosLists: [...state.todosLists, action.payload],
        loading: false,
      };
    case UPDATE_TODOS_LIST:
      return {
        ...state,
        todosLists: state.todosLists.map((todosList) =>
          todosList._id === action.payload.id ? action.payload.data : todosList
        ),
      };
    case DELETE_TODOS_LIST:
      return {
        ...state,
        todosLists: state.todosLists.filter(
          (todosList) => todosList._id !== action.payload
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TODOS_LISTS_ERROR:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
