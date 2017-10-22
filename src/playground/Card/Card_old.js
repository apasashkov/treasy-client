import React, { Component } from 'react';
import './Card.scss';
import flow from 'lodash/flow';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

// cardSource - A plain JavaScript object with a few allowed methods on it.
// It describes how the drag source reacts to the drag and drop events.

// beginDrag(props, monitor, component): Required. When the dragging starts, beginDrag is called.
// You must return a plain JavaScript object describing the data being dragged.
// What you return is the only information available to the drop targets
// about the drag source so it's important to pick the minimal data they need to know.
const cardSource = {
    beginDrag(props) {
        return {
            // id: props.id,
            // index: props.index,
        };
    },
};

// hover(props, monitor, component): Optional.
// Called when an item is hovered over the component.

// props: Your component's current props.

//monitor: An instance of DropTargetMonitor.
// Use it to query the information about the current drag state,
//  such as the currently dragged item and its type, the current
//  and initial coordinates and offsets,
// whether it is over the current target, and whether it can be dropped.

//component: When specified, it is the instance of your component.
// Use it to access the underlying DOM node for position or
//  size measurements, or to call setState, and other component methods.
const cardTarget = {
    hover(props, monitor, component) {
        // getItem(): Returns a plain object representing the currently dragged item.
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
                // Determine rectangle on screen

                // The Element.getBoundingClientRect() method
                // returns the size of an element and its position relative to the viewport.

                // The returned value is a DOMRect object which is the union of
                // the rectangles returned by getClientRects() for the element, i.e.,
                // the CSS border-boxes associated with the element. The result is
                // the smallest rectangle which contains the entire element,
                // with read-only left, top, right, bottom, x, y, width, and height
                // properties describing the overall border-box in pixels.
                // Properties other than width and height are relative to the top-left of the viewport.
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position

        // getClientOffset(): Returns the last recorded { x, y } client offset
        //  of the pointer while a drag operation is in progress.
        const clientOffset = monitor.getClientOffset()

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
}

// Drag and drop is inherently stateful. Either a drag operation is in progress,
//  or it isn't. Either there is a current type and a current item, or there isn't.
//  This state has to live somewhere.

// React DnD exposes this state to your components via a few tiny
// wrappers over the internal state storage called the monitors.
// The monitors let you update the props of your components in response
//  to the drag and drop state changes.

// For each component that needs to track the drag and drop state,
// you can define a collecting function that retrieves the relevant
// bits of it from the monitors. React DnD then takes care of timely
// calling your collecting function and merging its return value into
// your components' props.

const collectSource = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
};

const collectTarget = connect => ({
    connectDropTarget: connect.dropTarget(),
});

class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { connectDragSource, connectDropTarget, isDragging } = this.props;
        const opacity = isDragging ? 0 : 1
        return (
            connectDragSource(connectDropTarget(
            <div style={{ 'opacity': opacity }} className="card1">
                {this.props.text}
            </div>
            ))
        );
    }
}

export default flow(DragSource('card', cardSource, collectSource),
 DropTarget('card', cardTarget, collectTarget))(Card);