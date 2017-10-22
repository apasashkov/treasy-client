import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Card.scss';

class Card extends Component {

    static propTypes = {
        cardId: PropTypes.string.isRequired,
        description: PropTypes.string,
        dueDate: PropTypes.number,
        title: PropTypes.string,
    }

    static defaultProps = {
        title: 'My Card',
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link to={`/cards/id=${this.props.cardId}`}>
            <div className="card">
                <h5>{this.props.title}</h5>
                {this.props.dueDate !== 0 ? <p> Due: {moment(this.props.dueDate).format('YYYY MMM Do')} </p> : null }
            </div>
            </Link>
        );
    }

}

export default Card;
