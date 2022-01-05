import React, {useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import {connect} from 'react-redux';
import {getLoginAttempt, getToken, getUser} from "../items/selectors";
import {loginRequest} from "../items/thunks";



const Login = ({user, token, onLoginPressed, loginAttempt}) => {

    const [loggedIn, setLoggedIn] = useState();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

return (
    <>
        { (loggedIn === false && loginAttempt === 'FAILED')
            ?
            <Alert variant="danger">
                <p>Invalid Username/Password</p>
            </Alert>
            :
            null
        }
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username"  onChange={(event) => {setUsername(event.target.value); setLoggedIn(true);}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  onChange={(event) => {setPassword(event.target.value); setLoggedIn(true);}}/>
            </Form.Group>
            < Button variant="primary" type="submit" onClick={(event) => {
             onLoginPressed(username,password);
             console.log("loginAttempt",loginAttempt);
             console.log("user",user);
             if (!token) {
                 setLoggedIn(false);
             }
                event.preventDefault();
               event.stopPropagation();
            }}
            >Login</Button>
        </Form>
    </>
)
}


const mapStateToProps = state => ({
    user: getUser(state),
    token: getToken(state),
    loginAttempt: getLoginAttempt(state)
});

const mapDispatchToProps = dispatch => ({
    onLoginPressed: (username,password) => dispatch(loginRequest(username,password)),
})
export default connect(mapStateToProps,mapDispatchToProps)(Login);
