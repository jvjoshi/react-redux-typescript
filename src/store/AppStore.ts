import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { compose, applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducer/RootReducer';

const createAppStore = () => {
    const logger = createLogger();
    const middleware = [thunkMiddleware, logger];
    const finalCreateStore = compose(applyMiddleware(...middleware))(createStore);
    return finalCreateStore(rootReducer);
}

export default createAppStore;