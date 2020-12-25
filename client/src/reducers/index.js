import { combineReducers } from 'redux';
import todosListReducer from './todosListReducer';
import todosReducer from './todosReducer';

export default combineReducers({
  todosLists: todosListReducer,
  todos: todosReducer,
});
