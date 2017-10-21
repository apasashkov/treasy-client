import axios from 'axios';
import Auth from '../utils/Auth';
// LOGIN
const logIn = login => ({
    type: 'LOGIN',
    login,
});

export const startLogIn = (credentials) => {
    return (dispatch) => {
        axios.post('http://localhost:8000/api/login', credentials)
        .then((res) => {
            // add JWT to LocalStorage
            Auth.authenticateUser(res.data.token);

            dispatch(logIn(credentials.login));
        })
        .catch((err) => {
            console.log(err.stack);
            console.log('Failed to log in');
        });
    };
};

// LOGOUT
const logOut = () => ({
    type: 'LOGOUT',
});

export const startLogOut = () => {
    return (dispatch) => {
        // remove JWT from LocalStorage
        Auth.deauthenticateUser();

        dispatch(logOut());

    }
};
