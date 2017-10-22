import React, { Component } from 'react';
import './Card.scss';
import { DragSource } from 'react-dnd';
import { findDOMNode } from 'react-dom';

const cardSource = {
    beginDrag(props, monitor, component) {
        // dispatch to redux store that drag is started
        const { item, x, y } = props;
        const { id, text } = item;
        const { clientHeight } = findDOMNode(component);

        return { id, text, item,x, y, clientHeight };
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
    constructor(props) {
        super(props);
    }

    render() {
        const { connectDragSource, item } = this.props;
        return (
            connectDragSource(
            <div id={item.id} className="card1">
                {item.text}
            </div>
            )
        );
    }
}

export default DragSource('card', cardSource, collectSource)(Card);