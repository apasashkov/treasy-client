import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

import Card from '../../components/Card/';
import EditableText from '../../components/EditableText/';

// !!!!important cant use Redux here, see DashBoard comments

import './CardGroup.scss';

// !!!!important ******************************
// Cant use Redux here, see DashBoard comments
// !!!!important ******************************

const CARD_HEIGHT = 150; // height of a single card(excluding marginBottom/paddingBottom)
const OFFSET_HEIGHT = 64 + 46 + 10 + 10 + 6; //  height offset from the top of the page
const CARD_MARGIN = 10 + 10; // height of a marginBottom + paddingBottom

function getPlaceholderIndex(y) {
    document.getElementsByClassName('dashboard')[0].scrollTop;
    // const yPos = y - OFFSET_HEIGHT + window.scrollY;
    const yPos = y - OFFSET_HEIGHT + document.getElementsByClassName('dashboard')[0].scrollTop;
    let placeholderIndex;
    if (yPos < CARD_HEIGHT / 2) {
        placeholderIndex = -1; // place at the start
    } else {
        placeholderIndex = Math.floor((yPos - CARD_HEIGHT / 2) / (CARD_HEIGHT + CARD_MARGIN));
    }
    return placeholderIndex;
}

const cardTarget = {

        drop(props, monitor, component) {
            document.getElementById(monitor.getItem().cardId).style.display = 'block';
            const { placeholderIndex } = component.state;
            const lastX = monitor.getItem().x;
            const lastY = monitor.getItem().y;
            const nextX = props.x;
            let nextY = placeholderIndex;

            if (lastY > nextY) { // move top
                nextY += 1;
            } else if (lastX !== nextX) { // insert into another list
                nextY += 1;
            }

            if (lastX === nextX && lastY === nextY) { // if position equel
                return;
            }

            props.moveCard(lastX, lastY, nextX, nextY);
        },

        hover(props, monitor, component) {
            // horizontal scroll
            if (!props.isScrolling) {
                if (window.innerWidth - monitor.getClientOffset().x < 200) {
                    props.startScrolling('toRight');
                } else if (monitor.getClientOffset().x < 200) {
                    props.startScrolling('toLeft');
                }
            } else {
                if (window.innerWidth - monitor.getClientOffset().x > 200 &&
                    monitor.getClientOffset().x > 200
                ) {
                    props.stopScrolling();
                }
            }

            // vertical scroll
            if (!props.isScrolling) {
                if (window.innerHeight - monitor.getClientOffset().y < 200) {
                    props.startScrolling('toDown');
                } else if (monitor.getClientOffset().y < 200) {
                    props.startScrolling('toUp');
                }
            } else {
                if (window.innerHeight - monitor.getClientOffset().y > 200 &&
                    monitor.getClientOffset().y > 200
                ) {
                    props.stopScrolling();
                }
            }

            // defines where placeholder is rendered
            const placeholderIndex = getPlaceholderIndex(monitor.getClientOffset().y);

            component.setState(() =>({ placeholderIndex }));
            // when drag begins, we hide the card and only display cardDragPreview
            const item = monitor.getItem();
            document.getElementById(item.cardId).style.display = 'none';
        },
};

const collectTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem()
});


class CardGroup extends Component {
    static defaultProps = {
        title: 'My Group',
    }

    static propTypes = {
        canDrop: PropTypes.bool,
        connectDropTarget: PropTypes.func,
        changeGroupTitle: PropTypes.func,
        groupContent: PropTypes.object,
        isOver: PropTypes.bool,
        removeGroup: PropTypes.func,
        submitCard: PropTypes.func,
        stopScrolling: PropTypes.func,
        x: PropTypes.number,
    }

    constructor(props) {
        super(props);

        this.state = {
            isAdding: false,
            placeholderIndex: undefined,
        };

        this.addCard = this.addCard.bind(this);
        this.changeGroupTitle = this.changeGroupTitle.bind(this);
        this.submitCard = this.submitCard.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
    }

    componentDidUpdate() {
        if(this.state.isAdding) {
            this.textarea.focus();
        }
    }

    addCard() {
        this.setState(() => ({ isAdding: true }));
    }

    submitCard() {
        this.props.submitCard(this.props.groupContent.groupId, { cardTitle: this.textarea.value });
        this.setState(() => ({ isAdding: false }));
    }

    removeGroup(e) {
        e.preventDefault();
        this.props.removeGroup({ groupId: this.props.groupContent.groupId });
    }

    changeGroupTitle(newGroupTitle) {
        this.props.changeGroupTitle(this.props.groupContent.groupId, { title: newGroupTitle });
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
                            this.setState(() => ({ isAdding: false }));
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

        const { placeholderIndex } = this.state;
        const { connectDropTarget, isOver, canDrop, groupContent, x } = this.props;
        let isPlaceHold = false;
        let cardList = [];

        groupContent.cards.forEach((item, i) => {
            if (isOver && canDrop) {
                isPlaceHold = false;
                if (i === 0 && placeholderIndex === -1) {
                    cardList.push(<div key="placeholder" className="placeholder" />);
                } else if (placeholderIndex > i) {
                    isPlaceHold = true;
                }
            }
            if (item !== undefined) {
                cardList.push(
                    <Card
                        cardId={item.cardId}
                        key={item.cardId}
                        description={item.description}
                        x={x}
                        y={i}
                        item={item}
                        stopScrolling={this.props.stopScrolling}
                    />
                );
            }
            if (isOver && canDrop && placeholderIndex === i) {
                cardList.push(<div key="placeholder" className="item placeholder" />);
            }
        });

            // if placeholder index is greater than array.length, display placeholder as last
        if (isPlaceHold) {
            cardList.push(<div key="placeholder" className="item placeholder" />);
        }

        // if there is no items in cards currently, display a placeholder anyway
        if (isOver && canDrop && groupContent.cards.length === 0) {
            cardList.push(<div key="placeholder" className="item placeholder" />);
        }

        return connectDropTarget(
            <div className="cardGroup">
                <div className="cardGroupHeader">
                    <h5 className="cardGroupTitle">
                        <EditableText
                            onSubmit={this.changeGroupTitle}
                            type="input"
                            text={groupContent.title}
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

                {cardList}
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

export default DropTarget('card', cardTarget, collectTarget)(CardGroup);


