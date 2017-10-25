import axios from 'axios';
import Auth from '../utils/Auth';
import { baseUrl } from '../config/config';

// LOGIN
const logIn = login => ({
    type: 'LOGIN',
    login,
});

export const startLogIn = (credentials) => {
    return (dispatch) => {
        axios.post(`${baseUrl}/api/login`, credentials)
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

// REGISTER
export const startRegister = (credentials) => {
    return (dispatch) => {
        axios.post(`${baseUrl}/api/register`, credentials)
        .then((res) => {
            Auth.authenticateUser(res.data.token);
            dispatch(logIn(credentials.login));

            // this.context.router.history.push('/');
            $('#RegistrationForm--Modal').modal('close');
        })
        .catch((err) => {
            console.log(err.stack);
            console.log('Failed to register');
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
    };
};
