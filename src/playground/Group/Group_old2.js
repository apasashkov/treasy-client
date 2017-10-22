import React, { Component } from 'react';
import Card from '../Card/';
import update from 'immutability-helper';
import flow from 'lodash/flow';
import { DragDropContext, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';

import HTML5Backend from 'react-dnd-html5-backend';

import './Group.scss';
const CARD_HEIGHT = 100; // height of a single card(excluding marginBottom/paddingBottom)
const OFFSET_HEIGHT = 64 + 10 + 10; //  height offset from the top of the page (header heigt + margin group + margin card)
const CARD_MARGIN = 10; // height of a marginBottom+paddingBottom

function getPlaceholderIndex(y, scrollY) {
    // y - monitor.getClientOffset().y - mouse position
    // scrollY - findDOMNode(component).scrollTop
    // // Свойство scrollTop считывает или устанавлиет количество пикселей,
    // прокрученных от верха элемента. scrollTop измеряет дистанцию
    // от верха элемента до верхней точки видимого контента.
    // Когда контент элемента не создаёт вертикальную прокрутку, его scrollTop равно 0.
    // shift placeholder if y position more than card height / 2
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
        // const lastX = monitor.getItem().x;
        const lastY = monitor.getItem().y;
        // const nextX = props.x;
        let nextY = placeholderIndex;

        if (lastY > nextY) { // move top
          nextY += 1;
        }

        if (lastY === nextY) { // if position equel
          return;
        }



        component.moveCard(lastY, nextY);
      },
    hover(props, monitor, component) {
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
            cards: [
                { id: 1, text: 'Write a cool JS library', },
                { id: 2, text: 'Make it generic enough', },
                { id: 3, text: 'Write README', },
                { id: 4, text: 'Create some examples', },
                { id: 5, text: 'Spam in Twitter', },
                { id: 6, text: '???', },
                { id: 7, text: 'PROFIT', },
            ],
            placeholderIndex: undefined,
        };
        this.moveCard = this.moveCard.bind(this);
    }

    moveCard(lastY, nextY) {

        const newCards = [...this.state.cards];
        newCards.splice(nextY, 0, newCards.splice(lastY, 1)[0]);
        this.setState(() => {
            return { cards: newCards,}
        });

        // const { lastX, lastY, nextX, nextY } = action;
        // if (lastX === nextX) {
        //   newLists[lastX].cards.splice(nextY, 0, newLists[lastX].cards.splice(lastY, 1)[0]);
        // } else {
        //   // move element to new place
        //   newLists[nextX].cards.splice(nextY, 0, newLists[lastX].cards[lastY]);
        //   // delete element from old place
        //   newLists[lastX].cards.splice(lastY, 1);
        // }
        // return state.withMutations((ctx) => {
        //   ctx.set('lists', newLists);
        // });


        // const { cards } = this.state;
        // const dragCard = cards[dragIndex];

        // this.setState(
		// 	update(this.state, {
		// 		cards: {
		// 			$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
		// 		},
		// 	}),
        // )
    }

    render() {
        const { cards, placeholderIndex } = this.state;
        const { connectDropTarget, isOver, canDrop } = this.props;

        let isPlaceHold = false;
        let cardList = [];

        cards.forEach((item, i) => {
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
                    y={i}
                    item={item}
                    key={item.id}
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
        if (isOver && canDrop && cards.length === 0) {
            cardList.push(<div key="placeholder" className="item placeholder" />);
        }

        return (
            connectDropTarget(
                <div className="group1">
                    {cardList}
                </div>
            )
        );
    }
}

// export default flow(DragDropContext(HTML5Backend),
// DropTarget('card', cardTarget, collectTarget))(Group);

export default DropTarget('card', cardTarget, collectTarget)(Group);