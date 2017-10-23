import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startEditCard, startRemoveCard } from '../../actions/group';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import './_datepicker.css';

import Modal from '../Modal';
import EditableText from '../EditableText';

import './CardModal.scss';

class CardModal extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            calendarFocused: false,
            isAddingDate: false,
            dueDate: this.props.card.dueDate,
        };

        this.changeCardTitle = this.changeCardTitle.bind(this);
        this.changeCardDescription = this.changeCardDescription.bind(this);
        this.renderCardDescription = this.renderCardDescription.bind(this);
        this.renderCardDescriptionInput = this.renderCardDescriptionInput.bind(this);
        this.renderCardDueDate = this.renderCardDueDate.bind(this);
        this.renderDueDateInput = this.renderDueDateInput.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.removeCard = this.removeCard.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object,
    }

    changeCardTitle(newCardTitle) {
        this.props.dispatch(startEditCard(this.props.cardId, { cardTitle: newCardTitle }));
    }

    changeCardDescription(newCardDescription) {
        this.props.dispatch(startEditCard(this.props.cardId, { description: newCardDescription }));
    }

    renderCardDescription(description) {
        return (
            <div>
                <h5> Description: </h5>
                <EditableText
                    onSubmit={this.changeCardDescription}
                    type="input"
                    text={description}
                    fieldName="fieldName"
                />
            </div>
        );
    }

    renderCardDescriptionInput() {
        return (
            <div style={{'textDecoration': 'underline'}}>
                <EditableText
                    onSubmit={this.changeCardDescription}
                    type="input"
                    text={'Add description...'}
                    fieldName="fieldName"
                />
            </div>
        )
    }

    onDateChange(date) {
        const dueDate = date.valueOf();
        this.setState({ dueDate, });
        this.props.dispatch(startEditCard(this.props.cardId, { dueDate, }));
    }

    renderCardDueDate() {
        return (
            <div>
                <div>Due date: {this.state.dueDate ? moment(this.state.dueDate).format('YYYY MMM Do') : 'No Due Date'}</div>
                <SingleDatePicker
                    date={this.state.dueDate ? moment(this.state.dueDate) : null}
                    onDateChange={this.onDateChange}
                    focused={this.state.calendarFocused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
            </div>
        );
    }

    renderDueDateInput() {
        return (
            <div onClick={() => this.setState({ isAddingDate: true })}
            style={{'textDecoration': 'underline', 'cursor': 'pointer'}}>
                Add Due Date...
            </div>
        )
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calendarFocused: focused }));
    }

    removeCard() {
        this.props.dispatch(startRemoveCard({ cardId: this.props.cardId }));
    }

    render() {
        const card = this.props.card;
        return (
            <Modal id="Card--Modal">
                <h1>
                <EditableText
                    onSubmit={this.changeCardTitle}
                    type="input"
                    text={card.cardTitle}
                    fieldName="fieldName"
                />
                </h1>
                {card.description ?
                    this.renderCardDescription(card.description) :
                    this.renderCardDescriptionInput()
                }

                { this.state.dueDate || this.state.isAddingDate ? this.renderCardDueDate(this.state.dueDate) :
                    this.renderDueDateInput()
                }

                <Link
                    className="modal-action modal-close waves-effect waves-light btn remove-button red"
                    onClick={this.removeCard}
                    to="/"
                >
                    Delete
                </Link>
            </Modal>
        );
    }
}

const findCard = (groups, cardId) => {
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        for( let j = 0; j < group.cards.length; j++) {
            const card = group.cards[j];
            if (card.cardId === cardId) {
                return card;
            }
        }
    }
};

const mapStateToProps = (state, props) => {
    return {
        card: findCard(state.groups, props.cardId),

    };
};

export default connect(mapStateToProps)(CardModal);