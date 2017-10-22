import React, { Component } from 'react';
import Card from '../Card/';
import update from 'immutability-helper';
import flow from 'lodash/flow';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import './Group.scss';
const CARD_HEIGHT = 100; // height of a single card(excluding marginBottom/paddingBottom)
const OFFSET_HEIGHT = 64 + 10 + 10; //  height offset from the top of the page (header heigt + margin group + margin card)
const CARD_MARGIN = 10; // height of a marginBottom+paddingBottom

function getPlaceholderIndex(y, scrollY) {

    const yPos = y - OFFSET_HEIGHT + scrollY;
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

        document.getElementById(monitor.getItem().id).style.display = 'block';
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
    // if (!props.isScrolling) {
    //     if (window.innerWidth - monitor.getClientOffset().x < 200) {
    //       props.startScrolling('toRight');
    //     } else if (monitor.getClientOffset().x < 200) {
    //       props.startScrolling('toLeft');
    //     }
    //   } else {
    //     if (window.innerWidth - monitor.getClientOffset().x > 200 &&
    //         monitor.getClientOffset().x > 200
    //     ) {
    //       props.stopScrolling();
    //     }
    //   }

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
    const placeholderIndex = getPlaceholderIndex(
        monitor.getClientOffset().y,
        findDOMNode(component).scrollTop
      );

          // IMPORTANT!
    // HACK! Since there is an open bug in react-dnd, making it impossible
    // to get the current client offset through the collect function as the
    // user moves the mouse, we do this awful hack and set the state (!!)
    // on the component from here outside the component.
    // https://github.com/gaearon/react-dnd/issues/179
    component.setState({ placeholderIndex });
    // when drag begins, we hide the card and only display cardDragPreview
    const item = monitor.getItem();
    document.getElementById(item.id).style.display = 'none';
    },
}

const collectTarget = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    item: monitor.getItem()
  })

class Group extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholderIndex: undefined,
        };
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
                cardList.push(<div key="placeholder" className="item placeholder" />);
              } else if (placeholderIndex > i) {
                isPlaceHold = true;
              }
            }
            if (item !== undefined) {
                cardList.push(
                  <Card
                    x={x}
                    y={i}
                    item={item}
                    key={item.id}
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

        return (
            connectDropTarget(
                <div className="group1" style={{ float: 'left' }}>
                    {cardList}
                </div>
            )
        );
    }
}

export default DropTarget('card', cardTarget, collectTarget)(Group);