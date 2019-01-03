import { createStore, combineReducers } from 'redux';
import adsReducer from './reducers/ad';


const rootReducer = combineReducers({
  ads: adsReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
