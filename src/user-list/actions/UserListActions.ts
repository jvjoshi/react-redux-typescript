import {userlist} from '../../userlist.js';
export const REQUEST_GET_USERLIST = "getUserList/request";
export const SUCCESS_GET_USERLIST = "getUserList/success";
export const ERROR_GET_USERLIST = "getUserList/error";

export const SET_SELECTED_USER = "setSelectedUser";
export const SET_SEARCH_STRING = "setSearchString"; 
export const CHANGE_SORT = "changeSort";

export const getUserList =  () => {
    return async dispatch => {
        dispatch(onUserListRequest);
        return await dispatch(onUserListSuccess(userlist)); //TODO:: This can be replaced with actual rest endpoint to fetch data
    }
}

export const setSelectedUser = (user) => {
    return dispatch => {
        dispatch(onSetSelectedUser(user));
    }
}

export const setSearchString = (string) => {
    return dispatch => {
        dispatch(onSetSearchString(string));
    }
}

export const changeSort = (sortType) => {
    return dispatch => {
        dispatch(onSortChange(sortType));
    }
}

export const onSetSelectedUser = (user) => ({type: SET_SELECTED_USER, meta: user});
export const onSetSearchString = (searchString) => ({type: SET_SEARCH_STRING, meta: searchString});
export const onUserListRequest = () => ({type: REQUEST_GET_USERLIST});
export const onUserListSuccess = (result: any) => ({payload: {result}, type: SUCCESS_GET_USERLIST});
export const onUserListError = () => ({type: ERROR_GET_USERLIST});
export const onSortChange = (sortType) => ({type: CHANGE_SORT, meta: sortType})