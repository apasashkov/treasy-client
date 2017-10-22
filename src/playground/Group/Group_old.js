import React, { Component } from 'react';
import Card from '../Card/';
import update from 'immutability-helper';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './Group.scss';

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
        };
        this.moveCard = this.moveCard.bind(this);
    }

    moveCard(dragIndex, hoverIndex) {
        const { cards } = this.state;
        const dragCard = cards[dragIndex];

        this.setState(
			update(this.state, {
				cards: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
				},
			}),
        )
    }

    render() {
        const { cards } = this.state;


        return (
            <div className="group1">
                {cards.map((card, i) =>
                    (<Card
                        key={card.id}
                        id={card.id}
                        text={card.text}
                        index={i}
                        moveCard={this.moveCard}
                    />)
                )}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Group);