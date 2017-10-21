import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { startAddCard, startEditGroup, startRemoveGroup } from '../../actions/group';

import Card from '../../components/Card/';
import EditableText from '../../components/EditableText/';

import './CardGroup.scss';


class CardGroup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdding: false,
        }

        this.addCard = this.addCard.bind(this);
        this.changeGroupTitle = this.changeGroupTitle.bind(this);
        this.submitCard = this.submitCard.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
    }
    static propTypes = {
        groupId: PropTypes.string.isRequired,
        cards: PropTypes.array,
        title: PropTypes.string,
    }

    static defaultProps = {
        title: 'My Group',
    }

    addCard() {
        this.setState(() => ({isAdding: true}));
    }

    submitCard() {
        this.props.dispatch(startAddCard(this.props.groupId, { cardTitle:this.textarea.value }));
        this.setState(() => ({isAdding: false}));
    }

    componentDidUpdate() {
        if(this.state.isAdding) {
            this.textarea.focus();
        }
    }

    removeGroup(e) {
        e.preventDefault();
        this.props.dispatch(startRemoveGroup({groupId: this.props.groupId}));
    }

    changeGroupTitle(newGroupTitle) {
        this.props.dispatch(startEditGroup(this.props.groupId, { title: newGroupTitle }));
    }

    renderInput() {
        return (
            <div className="AddCard-container">
                <textarea
                    ref={(ref) => { this.textarea = ref; }}
                    // onBlur={() => (this.setState(() => ({ isAdding: false })))}
                />
                <button
                    className="btn green"
                    onClick={this.submitCard}
                >
                    Add
                </button>
                <div className="closeButton">
                    <i
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState(() => ({isAdding: false}))
                        }
                    }
                    className="material-icons small"
                    >close
                    </i>
                </div>
            </div>
        );
    }

    render() {
        const cards = this.props.cards.map((card) => (
            <Card
                cardId={card.cardId}
                dueDate={card.dueDate}
                title={card.cardTitle}
                key={card.cardId}
                description={card.description}
            />
        ));
        return (
            <div className="cardGroup">

                <div className="cardGroupHeader">
                    <h5 className="cardGroupTitle">
                        <EditableText
                            onSubmit={this.changeGroupTitle}
                            type="input"
                            text={this.props.title}
                            fieldName="fieldName"
                        />
                    </h5>
                    <div className="removeGroupButton">
                        <i
                            onClick={this.removeGroup}
                            className="material-icons small"
                        >remove
                        </i>
                    </div>
                </div>

                {cards}
                {this.state.isAdding && this.renderInput()}
                {!this.state.isAdding &&
                    <i
                        onClick={this.addCard}
                        className="material-icons addCardButton"
                    >
                    add
                    </i>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        groups: state.groups,
    };
};

export default connect(mapStateToProps)(CardGroup);


