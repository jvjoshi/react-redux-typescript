import {
    REQUEST_GET_USERLIST,
    SUCCESS_GET_USERLIST,
    ERROR_GET_USERLIST,
    SET_SELECTED_USER,
    SET_SEARCH_STRING,
    CHANGE_SORT
} from '../actions/UserListActions';

import { sortBy } from 'lodash';

const initialState = {
    data: {
        all: [],
        fav: [],
        admin: [],
        nonAdmin: [],
        archieved: []
    },
    selectedUser: {
        label: "All Users",
        value: "all"
    },
    searchString: "",
    filteredList: [],
    defaultSort: "firstName"
}

const userListReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_GET_USERLIST: {
            return {
                ...state,
                isLoading: true
            }
        }

        case SUCCESS_GET_USERLIST: {
            const sortedData = sortBy(action.payload.result, (item) => item[state.defaultSort]);
            const data = sortedData.reduce((acc, val) => {
                if (val.favorites) {
                    acc.fav.push(val);
                }
                 if (val.admin) {
                     acc.admin.push(val);
                 }
                if (val.nonAdmin) {
                    acc.nonAdmin.push(val);
                }
                if (val.archieved) {
                    acc.archieved.push(val);
                }
                acc.all.push(val);
                return acc;
            },{
                all: [],
                fav: [],
                admin: [],
                nonAdmin: [],
                archieved: []
            });
            return {
                ...state,
                isLoading: false,
                data: data,
                filteredList: data[state.selectedUser.value]
            }
        }

        case ERROR_GET_USERLIST: {
            return {
                ...state,
                isLoading: false,
                data: initialState.data
            }
        }

        case SET_SELECTED_USER: {
            let filteredList = state.data[action.meta.value];
            if (state.searchString.length !== 0) {
                filteredList = getFilteredResults(state.data[action.meta.value], state.searchString)
            }
            return  {
                ...state,
                selectedUser: action.meta,
                filteredList: filteredList
            }
        }

        case SET_SEARCH_STRING: {
            let filteredList = state.data[state.selectedUser.value];
            if (action.meta.length !== 0) {
                filteredList = getFilteredResults(state.data[state.selectedUser.value], action.meta)
            }

            return  {
                ...state,
                searchString: action.meta,
                filteredList: filteredList
            }
        }

        case CHANGE_SORT: {
            let sortedData = sortBy(state.data[state.selectedUser.value], (item) => item[action.meta]);
            return {
                ...state,
                defaultSort: action.meta,
                filteredList: sortedData
            }
        }
        
        default: {
            return state
        }
    }
}

const getFilteredResults = (list, inputString) => {
    return list.filter(item => {
        const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
        const email = `${item.firstName}.${item.lastName}`.toLowerCase();
        const searchString = inputString.toLowerCase();
        return fullName.includes(searchString) || email.includes(searchString);
    });
}

export default userListReducer;