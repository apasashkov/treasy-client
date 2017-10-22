import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Modal.scss';

class Modal extends Component {
    static defaultProps = {
        id: 'modal1',
    }

    static contextTypes = {
        router: PropTypes.object,
    }

    static propTypes = {
        id: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]).isRequired,
    }

    constructor(props, context) {
        super(props, context);

        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        $(`#${this.props.id}`).modal({
            complete: () => {
                this.context.router.history.push('/');
            },
        });
        $(`#${this.props.id}`).modal('open');
    }

    closeModal() {
        $(`#${this.props.id}`).modal({
            complete: () => {
                this.context.router.history.push('/');
            },
        });
    }

    render() {
        return (
            <div id={this.props.id} className="modal">
            <Link
                to="/"
                className="modal-action modal-close waves-effect waves-green close-button"
                style={{'float': 'right'}}

            >
                <i className="small material-icons">close</i>
            </Link>
            <div className="modal-content">
                {this.props.children}
            </div>
            </div>
        );
    }
}

export default Modal;
