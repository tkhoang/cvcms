import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const configureStore = () => {
  const store = createStore(
    require('../reducers').default,
    applyMiddleware(thunk)
  );
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers');
        store.replaceReducer(nextRootReducer);
        });
  }
  return store;
};

export default configureStore;
