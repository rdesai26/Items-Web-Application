export const CREATE_ITEM = 'CREATE_ITEM';
export const createItem = item => ({
    type: CREATE_ITEM,
    payload: {item},
});

export const DELETE_ITEM = 'DELETE_ITEM';
export const deleteItem = (item) => ({
    type: DELETE_ITEM,
    payload: {item},
});

export const EDIT_ITEM = 'EDIT_ITEM';
export const editItem = (item) => ({
    type: EDIT_ITEM,
    payload: {item},
});

export const LOAD_ITEMS_SUCCESS = 'LOAD_ITEMS_SUCCESS';
export const loadItemsSuccess = (items) => ({
    type: LOAD_ITEMS_SUCCESS,
    payload: {items},
});

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const userLoginSuccess = (user, token) => ({
    type: USER_LOGIN_SUCCESS,
    payload: {user, token},
});

export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const userLoginFailure = () => ({
    type: USER_LOGIN_FAILURE,
});

export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const userLogoutSuccess = () => ({
    type: USER_LOGOUT_SUCCESS,
});

export const RESET_LOGIN = 'RESET_LOGIN';
export const resetLogin = () => ({
    type: RESET_LOGIN,
});