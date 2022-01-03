import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {loadItems, deleteItemRequest} from "../items/thunks";
import {getItems, getItemsLoading, getToken} from '../items/selectors';
import { useUser } from '../auth/useUser';

import {connect} from 'react-redux';

const Items = ({items = [], onDeletePressed, startLoadingItems, token}) => {
    const user = useUser();
    useEffect(() => {
        startLoadingItems()
    },[startLoadingItems])


    return (
        <>
        <Table striped bordered hover size="sm">
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Modify</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, key) => (
                <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                        <Link to={`/items/edit/${item.id}`}>Edit</Link>
                        {
                            token == ''
                            ? <Link to={`/items/login`}>Delete</Link>
                            :
                                <Link to={`/items`} onClick={() => onDeletePressed(item.id)}>Delete</Link>
                        }
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    </>
    )
}

const mapStateToProps = state => ({
    items: getItems(state),
    isLoading: getItemsLoading(state),
    token: getToken(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingItems: () => dispatch(loadItems()),
    onDeletePressed: (id) => dispatch(deleteItemRequest(id)),
})


export default connect(mapStateToProps,mapDispatchToProps)(Items);