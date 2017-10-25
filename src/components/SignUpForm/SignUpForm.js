import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { startRegister } from '../../actions/auth';

import './SignUpForm.scss';

class SignUpForm extends Component {

    static propTypes = {
        dispatch: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.state = {
            login: {
                value: '',
                error: '*Required',
            },
            password: {
                value: '',
                error: '*Required',
            },
            passwordConfirm: {
                value: '',
                error: '*Required',
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePaste = this.handlePaste.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.checkLoginExists = this.checkLoginExists.bind(this);
        this.errorsExist = this.errorsExist.bind(this);
    }

    setFieldValue(name, value) {
        this.setState({ [name]: { ...this.state[name], value } });
    }

    setFieldError(name, error) {
        this.setState({ [name]: { ...this.state[name], error } });
    }

    clearFieldError(name) {
        if (this.state[name].error !== null) {
            this.setState({ [name]: { ...this.state[name], error: null } });
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const credentials = {};
        credentials.login = this.state.login.value;
        credentials.password = this.state.password.value;

        this.props.dispatch(startRegister(credentials));
    }

    errorsExist() {
        const errors = [];
        Object.keys(this.state).forEach((key) => {
            if (this.state[key].error) {
                errors.push(this.state[key].error);
            }
        });

        if (errors.length === 0) return true;
        return false;
    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        this.setFieldValue(name, target.value);
        if (this.checks[name]) {
            // this.checks[name] are anonymous and they dont have this, we pass it to them with call
            const result = this.checks[name].call(this, target);
            if (result instanceof Error) {
                this.setFieldError(name, result.message);
            } else {
                this.clearFieldError(name);
            }
        }
    }

    handlePaste(e) {
        const obj = {
            target: {
                name: e.target.name,
                value: e.clipboardData.getData('Text'),
                validity: {
                    valueMissing: false,
                    valid: true,
                },
            },
        };
        this.handleChange(obj);
    }

    // loginCheckTimeout = null;

    // checkLoginExists(login) {
    //     // debounce
    //     if (this.loginCheckTimeout !== null) {
    //         clearTimeout(this.loginCheckTimeout);
    //     }
    //     this.loginCheckTimeout = setTimeout(() => {
    //         axios.post('/api/checkEmailExistence', { login })
    //         .then((res) => {
    //             if (res.data === 'loginExists') {
    //                 this.setFieldError('login', '*Login already exists');
    //             } else if (res.data === 'loginDoesntExist') {
    //                 this.clearFieldError('login');
    //             } else {
    //                 console.log(res.data);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err.stack);
    //             console.log('Failed to check login');
    //         });
    //         console.log(login);
    //     }, 1000);
    // }

    checks = {
        login: (f) => {
            if (f.validity.valueMissing) {
                return new Error('*Required');
            }
            // this.checkLoginExists(f.value);
            return true;
        },

        password: (f) => {
            if (f.validity.valueMissing) {
                return new Error('*Required');
            }
            return true;
        },

        passwordConfirm: (f) => {
            if (f.value !== this.state.password.value) {
                return new Error('*Passwords do not match');
            }
            return true;
        },
    }

    errorMessage = m => (
        m !== null
            ? <div className="SignupForm--errorText">{m}</div>
            : ''
    )

    render() {
        return (
            <form className="SignupForm" onSubmit={this.handleSubmit} noValidate autoComplete="off">

                <input
                    placeholder="Login"
                    name="login"
                    id="login"
                    type="text"
                    className="validate"
                    required
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                    autoComplete="off"
                />
                {this.errorMessage(this.state.login.error)}

                <input
                    id="password"
                    type="password"
                    name="password"
                    className="validate"
                    required
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                    placeholder="Password"
                    autoComplete="off"
                />

                {this.errorMessage(this.state.password.error)}

                <input
                    id="password"
                    type="password"
                    name="passwordConfirm"
                    className="validate"
                    required
                    onChange={this.handleChange}
                    onPaste={this.handlePaste}
                    placeholder="Confirm Password"
                    autoComplete="off"
                />

                {this.errorMessage(this.state.passwordConfirm.error)}

                <div className="register-control">
                    <button
                        className="btn waves-effect waves-light "
                        type="submit"
                        name="action"
                        disabled={!this.errorsExist()}
                    >Sign Up
                    </button>
                    <Link
                        to="/"
                        className="modal-action modal-close waves-effect waves-green btn-flat"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        );
    }
}
export default connect()(SignUpForm);

