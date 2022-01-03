import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import {editItemRequest} from "../items/thunks";
import {connect} from 'react-redux';
import {getItems} from "../items/selectors";

const Edit = ( {onEditPressed}) => {
    const params = useParams();
    const id = params.id;
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    return (
        <>
            <Form >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>ID</Form.Label>
                    :<Form.Control type="text" placeholder="ID" value={id} readOnly={true}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" onChange={(event) => setName(event.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="Price" onChange={(event) => setPrice(event.target.value)}/>
                </Form.Group>
                <Link to={`/items/`}>
                < Button variant="primary" type="submit" onClick={() => {
                    onEditPressed(id,name,price);
                }}>Update</Button>
                </Link>
            </Form>
        </>
    )
}

const mapStateToProps = state => ({
    items: getItems(state),
});

const mapDispatchToProps = dispatch => ({
    onEditPressed: (id,name,price) => dispatch(editItemRequest(id,name,price)),
})
export default connect(mapStateToProps,mapDispatchToProps)(Edit);