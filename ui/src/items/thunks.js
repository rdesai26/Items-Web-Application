import {
    createItem,
    editItem,
    deleteItem,
    loadItemsSuccess,
    userLoginSuccess,
    userLogoutSuccess, userLoginFailure, resetLogin, setFirstName
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

export const getFirstName = (username) => async dispatch => {
    try {
        console.log(username);
        const result = await fetch(`/api/users/${username}`);
        const user = await result.json();
        const firstName = user.firstName;
        console.log(firstName);
        dispatch(setFirstName(firstName));
    }
    catch(e) {
        console.error(e);
    }
}

export const loginRequest = (username, password) => async dispatch => {
    dispatch(resetLogin());
    try {
        const body = JSON.stringify({username, password});
        const result = await fetch(`/api/users/check/${username}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        console.log(result);
        console.log(result.status);
        if (result.status === 200)
        {
            const user = await result.json();
            dispatch(getFirstName(username));
            dispatch(userLoginSuccess(user,user.token));
            dispatch(push('/'));

    /*     setTimeout(() => {
             dispatch(push('/'));
         },500); */ //delay to show success alert not necessary to have in setTimeout block
            console.log('done');
        }
        else if (result.status === 401) {
            dispatch(userLoginFailure());
        }


        }
    catch(e) {

    }
}

export const logoutRequest = () => async dispatch => {
    dispatch(userLogoutSuccess());
    dispatch(resetLogin());
    localStorage.clear();
    dispatch(push('/'));
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

