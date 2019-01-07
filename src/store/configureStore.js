import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import adsReducer from './reducers/ad';
import userReducer from './reducers/user';
import uiReducer from './reducers/ui';

const rootReducer = combineReducers({
  ads: adsReducer,
  users: userReducer,
  ui: uiReducer,
});

const composeEnhancers = compose;

const configureStore = () => createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
