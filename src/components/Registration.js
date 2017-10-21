import React, { Component } from 'react';

import Modal from './Modal';
import SignUpForm from './SignUpForm';

class Registration extends Component {
    render() {
        return (
            <Modal id="RegistrationForm--Modal">
                <h2> Sign Up! </h2>
                <SignUpForm />
            </Modal>
        );
    }
}

export default Registration;