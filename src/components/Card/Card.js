import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import Auth from '../../utils/Auth';
import './Card.scss';

const cardSource = {
    beginDrag(props, monitor, component) {
        if (!Auth.isUserAuthenticated()){
            return;
        }
        const { item, x, y } = props;
        const { cardId } = item;
        const { clientHeight } = findDOMNode(component);
        return { cardId, item,x, y, clientHeight };
    },

    endDrag(props, monitor) {
        document.getElementById(monitor.getItem().cardId).style.display = 'block';
        props.stopScrolling();
    },

    isDragging(props, monitor) {
        const isDragging = props.item && props.item.id === monitor.getItem().id;
        return isDragging;
    }
};

const collectSource = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
};

class Card extends Component {

    static propTypes = {
        connectDragSource: PropTypes.func,
        item: PropTypes.object,
        history: PropTypes.object,
    }

    static defaultProps = {
        title: 'My Card',
    }

    constructor(props) {
        super(props);

        this.onCardClick = this.onCardClick.bind(this);
    }

    onCardClick() {
        if (!Auth.isUserAuthenticated()) {
            this.props.history.push(`/login`);
            return;
        }
        this.props.history.push(`/cards/id=${this.props.item.cardId}`);
    }

    render() {
        const { connectDragSource, item } = this.props;

        return connectDragSource(
            <div id={item.cardId} className="card" onClick={this.onCardClick}>
                    <h5>{item.cardTitle}</h5>
                    {
                        item.dueDate !== 0 ?
                            <p> Due: {moment(item.dueDate).format('YYYY MMM Do')} </p> :
                            <p> No Due Date </p>
                    }
            </div>
        );
    }
}

export default DragSource('card', cardSource, collectSource)(Card);
