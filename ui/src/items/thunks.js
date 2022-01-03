import {
    createItem,
    editItem,
    deleteItem,
    loadItemsSuccess,
    userLoginSuccess,
    userLogoutSuccess
} from "./actions";
import { push } from 'connected-react-router'
export const loadItems = () => async dispatch => {
    try {
        const result = await fetch('/api/items');
        const items = await result.json();
        dispatch(loadItemsSuccess(items));
    }
    catch(e) {
        console.error(e);
    }
}

export const loginRequest = (username, password) => async dispatch => {
    try {
        const body = JSON.stringify({username, password});
        const result = await fetch(`/api/users/check/${username}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        })
        const user = await result.json();
        dispatch(push('/'));
        dispatch(userLoginSuccess(user,user.token));
        }
    catch(e) {

    }
}

export const logoutRequest = () => async dispatch => {
    dispatch(userLogoutSuccess());
    localStorage.clear();
}

export const addItemRequest = (id,name,price) => async dispatch => {
    try {
        const body = JSON.stringify({id,name,price});
        const response = await fetch('/api/items/add', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const item = await response.json();
        dispatch(createItem(item));
    }
    catch(e) {
        console.error(e);
    }

}

export const deleteItemRequest = (id) => async dispatch => {
    try {
        const response = await fetch(`/api/items/delete/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'delete',
        });
        const deletedItem = await response.json();
        dispatch(deleteItem(deletedItem));
    }
    catch(e) {
        console.error(e);
    }

}

export const editItemRequest = (id,name,price) => async dispatch => {
    try {
        const body = JSON.stringify({name,price});
        const response = await fetch(`/api/items/edit/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'put',
            body,
        });
        const editedItem = await response.json();
        dispatch(editItem(editedItem));
    }
    catch(e) {
        console.error(e);
    }
}