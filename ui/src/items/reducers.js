import {
    CREATE_ITEM,
    DELETE_ITEM,
    EDIT_ITEM,
    LOAD_ITEMS_SUCCESS, RESET_FIRSTNAME, RESET_LOGIN, SET_FIRSTNAME,
    USER_LOGIN_FAILURE,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS
} from './actions';

const initialItemsState = { isLoading: false, data: []};

export const items = (state = initialItemsState,action) => {
    const {type, payload} = action;

    switch (type) {
        case CREATE_ITEM: {
            const {item} = payload;
            return {
                ...state,
                data: state.data.concat(item)
            };
        }
        case DELETE_ITEM: {
            const {item: itemToDelete} = payload;
            return {
                ...state,
                data: state.data.filter(item => item.id !== itemToDelete.id)
            };
        }
        case EDIT_ITEM: {
            const {item: updatedItem} = payload;
            return {
                ...state,
                data: state.data.map(item => {
                    if (item.id === updatedItem.id) {
                        return updatedItem ;
                    }
                    return item;
                }),
            };
        }
        case LOAD_ITEMS_SUCCESS: {
            const {items} = payload;
            return {
                ...state,
                isLoading: false,
                data: items,
            };
        }
        default:
            return state;
    }
}

const initialUserState = {isLoggedIn: false, data: [], token: '', loginAttempt: '', firstName: ''};

export const users = (state = initialUserState,action) => {
    const {type, payload} = action;
    switch (type) {
        case USER_LOGIN_SUCCESS: {
            const {user, token: setToken} = payload;
            return {
                ...state,
                isLoggedIn: true,
                token: setToken,
                data: user,
                loginAttempt: 'SUCCESS'
            };
        }
        case USER_LOGIN_FAILURE: {
            return {
                ...state,
                loginAttempt: 'FAILED',
            }
        }
        case USER_LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoggedIn: false,
                token: '',
                data: {},

            }
        };
        case RESET_LOGIN: {
                return {
                    ...state,
                    loginAttempt: '',
                    firstName: '',
                };
        }
        case SET_FIRSTNAME: {
            const {firstName} = payload;
            return {
              ...state,
              firstName:   firstName,
            };
        }
        default:
            return state;
    }
}