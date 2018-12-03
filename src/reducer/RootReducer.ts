import { combineReducers } from "redux";
import userListReducer from '../user-list/reducer/userListReducer';

const rootReducer = combineReducers<any>({
    userListContext: userListReducer
});

export default rootReducer;