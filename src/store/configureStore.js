import { createStore, combineReducers } from 'redux';
import adsReducer from './reducers/ad';
import userReducer from './reducers/user';

const rootReducer = combineReducers({
  ads: adsReducer,
  users: userReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
