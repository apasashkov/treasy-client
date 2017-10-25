import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { startLogIn } from '../../actions/auth';

import './LoginForm.scss';

const getFormError = (loginError, passwordError) => {
    if (loginError && passwordError) {
        return '*Login and password are required';
    }
    if (loginError) {
        return '*Login is required';
    }
    if (passwordError) {
        return '*Password is required';
    }
    return '';
};

class LoginForm extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            login: {
                value: '',
                error: true,
            },
            password: {
                value: '',
                error: true,
            },
            error: '*Login and password are required',
            serverError: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        const credentials = {};

        credentials.login = this.state.login.value;
        credentials.password = this.state.password.value;
        this.props.dispatch(startLogIn(credentials));
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;

        const errors = {};
        errors.login = target.name === 'login'
            ? target.validity.valueMissing
            : this.state.login.error;
        errors.password = target.name === 'password'
            ? target.validity.valueMissing
            : this.state.password.error;
        const error = getFormError(errors.login, errors.password);

        this.setState(
            {
                [name]: {
                    value: target.value,
                    error: errors[target.name],
                },
                error,
                serverError: '',
            },
        );
    }

    handlePaste(e) {
        const obj = {
            target: {
                name: e.target.name,
                value: e.clipboardData.getData('Text'),
                validity: {
                    valueMissing: false,
                },
            },
        };
        this.handleChange(obj);
    }

    errorMessage(m) {
        if (m === null) {
            return <div style={{ display: 'inline-block' }} />
        }
        return <div className="LoginForm--errorText">{m}</div>
    }

    render() {
        return (
            <form className="LoginForm" onSubmit={this.handleSubmit} noValidate autoComplete="off">

                <input
                    placeholder="Login"
                    className="validate"
                    ref="login"
                    type="text"
                    name="login"
                    id="LoginForm--login"
                    required
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                    autoComplete="off"
                />

                <input
                    ref="password"
                    type="password"
                    name="password"
                    className="validate"
                    id="LoginForm--password"
                    required
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                    placeholder="Password"
                    autoComplete="off"
                />
                {this.errorMessage(this.state.serverError || this.state.error)}

                <button
                    className="btn modal-action modal-close waves-effect waves-light"
                    type="submit"
                    name="action"
                    disabled={this.state.error !== ''}
                >
                    Login
                </button>
                <Link
                    to="/"
                    className="modal-action modal-close waves-effect waves-green btn-flat"
                >
                    Cancel
                </Link>
            </form>
        );
    }
}

export default connect()(LoginForm);

