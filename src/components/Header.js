import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogOut } from '../actions/auth';

class Header extends Component {
    constructor(props) {
        super(props);

        this.handleLogOut = this.handleLogOut.bind(this);
    }
    handleLogOut() {
        this.props.dispatch(startLogOut());
    }
    render() {
        return (
            <nav>
            <div className="nav-wrapper">
                <NavLink
                    style={{'marginLeft' : '30px'}}
                    to="/"
                    exact={true}
                    activeClassName="is-active"
                    className="brand-logo"
                >
                    TREASY
                </NavLink>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {this.props.auth.loggedIn ?
                    <div style={{'userSelect': 'none', 'cursor': 'default'}}>
                        <li style={{'fontWeight' : '800', 'marginRight': '8px'}}> {this.props.auth.login} </li>
                        <li style={{'marginRight': '20px'}}><i className="material-icons">face</i></li>
                        <li><NavLink to="/" onClick={this.handleLogOut}>Logout</NavLink></li>
                    </div> :
                    <div>
                        <li><NavLink to="/registration">Register</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                    </div>
                }

              </ul>
            </div>
          </nav>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
}
export default connect(mapStateToProps)(Header);