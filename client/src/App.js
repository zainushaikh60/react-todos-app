import { Fragment } from 'react';
import Home from './components/Home';
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Home />
      </Fragment>
    </Provider>
  );
}

export default App;
