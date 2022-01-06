import React, {useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, Dropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import {getFirstName, getToken, getUser} from "./items/selectors";
import {useHistory} from 'react-router-dom';
import {logoutRequest} from "./items/thunks";

const NavBar = ({user,token, onLogoutPressed, firstName}) => {
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
                </Nav>
                    <Nav className="ml-auto">
                    {token === '' ?
                        <LinkContainer to="/items/login" activeClassName="selected">
                            <Nav.Link >Login</Nav.Link>
                        </LinkContainer>
                    :
                        <Dropdown>
                            <Dropdown.Toggle variant="dark" id="dropdown-button-dark-example1">
                                Hi {firstName}
                            </Dropdown.Toggle>
                            <Dropdown.Menu variant="dark">
                        <LinkContainer to="/" className="ml-auto">
                            <Dropdown.Item onClick={() => { onLogoutPressed() }}> Logout</Dropdown.Item>
                        </LinkContainer>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </Nav>
        </Navbar>
        </>
    )
}

const mapStateToProps = state => ({
    user: getUser(state),
    token: getToken(state),
    firstName: getFirstName(state),
});

const mapDispatchToProps = dispatch => ({
    onLogoutPressed: () => dispatch(logoutRequest()),

})
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);