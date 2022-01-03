import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getToken} from "../items/selectors";
import {useToken} from '../auth/useToken';

const Homepage = ({token}) => {
    const [unusedToken, setToken] = useToken();
    useEffect(() => {
        setToken(token);
    }, [token, setToken])
    return (
        <>
        <h1>Item Store</h1>
            <p>Welcome to Item Store</p>
            <div style={{textAlign: "left", paddingLeft: "30%"}}>
            <p> The project I built is to store the ID, name, and price of grocery store items </p>
            <p>into a database.</p>
            <p> Duplicate ID's cannot be stored into the database.</p>
            <p>A cloud MongoDB database is being used to store data.</p>
            <p>The login to update,delete, or create items is:</p>
            <p>user: rdesai</p>
            <p>password: password</p>
            <p>The Source code can be found at: </p>
                <p> <a href="https://github.com/rdesai26/Node-Web-Application">https://github.com/rdesai26/Node-Web-Application</a> </p>
            </div>
            </>
    )
}

const mapStateToProps = state => ({
    token: getToken(state),
});
export default connect(mapStateToProps)(Homepage);