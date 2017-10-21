import React, {Component} from 'react';
import LoginForm from './LoginForm';
import Modal from './Modal';

class Login extends Component {
    render() {
        return (
            <Modal id="LoginForm--Modal">
                <h2> Log In! </h2>
                <LoginForm />
            </Modal>
        );
    }
}

export default Login;