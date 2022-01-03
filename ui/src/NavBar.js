import React, {useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getToken, getUser} from "./items/selectors";
import {useHistory} from 'react-router-dom';
import {logoutRequest} from "./items/thunks";

const NavBar = ({user,token, onLogoutPressed}) => {
    const history = useHistory();
    return (
        <>
        <Navbar bg="dark" variant="dark">
                <Nav className="me-auto">
                    <LinkContainer to="/" activeClassName="selected">
                        <Nav.Link >Home</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/items" activeClassName="selected">
                        <Nav.Link >Items</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/items/add" activeClassName="selected">
                        <Nav.Link >Add</Nav.Link>
                    </LinkContainer>
                    {token === '' ?
                        <LinkContainer to="/items/login" activeClassName="selected">
                            <Nav.Link >Login</Nav.Link>
                        </LinkContainer>
                    :
                        <LinkContainer to="/" activeClassName="selected">
                            <Nav.Link onClick={() => { onLogoutPressed() }} >Logout</Nav.Link>
                        </LinkContainer>
                    }
                </Nav>
        </Navbar>
        </>
    )
}

const mapStateToProps = state => ({
    user: getUser(state),
    token: getToken(state),
});

const mapDispatchToProps = dispatch => ({
    onLogoutPressed: () => dispatch(logoutRequest()),
})
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);