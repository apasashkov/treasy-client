import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import './Card.scss';

const cardSource = {
    beginDrag(props, monitor, component) {
        const { item, x, y } = props;
        const { cardId } = item;
        const { clientHeight } = findDOMNode(component);
        return { cardId, item,x, y, clientHeight };
    },

    endDrag(props, monitor) {
        // document.getElementById(monitor.getItem().id).style.display = 'block';
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
    }

    static defaultProps = {
        title: 'My Card',
    }

    constructor(props) {
        super(props);
    }

    render() {
        const { connectDragSource, item } = this.props;


        return connectDragSource(
            <div id={item.cardId} className="card">
                <Link to={`/cards/id=${item.cardId}`}>
                    <h5>{item.cardTitle}</h5>
                    {
                        item.dueDate !== 0 ?
                            <p> Due: {moment(item.dueDate).format('YYYY MMM Do')} </p> :
                            <p> No Due Date </p>
                    }
                </Link>
            </div>
        );
    }
}

export default DragSource('card', cardSource, collectSource)(Card);
