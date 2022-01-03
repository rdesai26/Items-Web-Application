import React, {useState} from 'react';
import {connect} from 'react-redux';
import {addItemRequest} from "../items/thunks";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import {getItems} from "../items/selectors";
import {Link} from "react-router-dom";

const Add = ({items, onCreatePressed}) => {
        const [id, setID] = useState('');
        const [name, setName] = useState('');
        const [price, setPrice] = useState('');

        return (
            <>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder="ID"  onChange={
                                (event) => setID(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Name"  onChange={(event) => setName(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" placeholder="Price"  onChange={(event) => setPrice(event.target.value)}/>
                    </Form.Group>
                    <Link to={`/items/`}>
                     < Button variant="primary" type="submit" onClick={(event) =>
                     {
                        onCreatePressed(id,name,price);
                     }}
                     >Create</Button>
                    </Link>
                </Form>
            </>
        )
}

const mapStateToProps = state => ({
    items: getItems(state),
});

const mapDispatchToProps = dispatch => ({
    onCreatePressed: (id,name,price) => dispatch(addItemRequest(id,name,price)),
});

export default connect(mapStateToProps,mapDispatchToProps)(Add);