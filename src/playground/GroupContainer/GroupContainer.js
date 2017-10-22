import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Group from '../Group/Group';

class GroupContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: [
                {
                    title: 'Group1',
                    id: 'Group1id',
                    cards: [
                        { id: 1, text: 'Write a cool JS library', },
                        { id: 2, text: 'Make it generic enough', },
                        { id: 3, text: 'Write README', },
                        { id: 4, text: 'Create some examples', },
                        { id: 5, text: 'Spam in Twitter', },
                        { id: 6, text: '???', },
                        { id: 7, text: 'PROFIT', },
                    ],
                },
                {
                    title: 'Group2',
                    id: 'Group2id',
                    cards: [
                        { id: 8, text: 'aaaWrite a cool JS library', },
                        { id: 9, text: 'aaaMake it generic enough', },
                        { id: 10, text: 'aaaWrite README', },
                        { id: 11, text: 'aaaCreate some examples', },
                        { id: 12, text: 'aaaSpam in Twitter', },
                        { id: 13, text: 'aaa???', },
                        { id: 14, text: 'aaaPROFIT', },
                    ],
                },
            ],
            isScrolling: false,
        };

        this.moveCard = this.moveCard.bind(this);
        this.scrollRight = this.scrollRight.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
        this.scrollUp = this.scrollUp.bind(this);
        this.scrollDown = this.scrollDown.bind(this);
        this.stopScrolling = this.stopScrolling.bind(this);
        this.startScrolling = this.startScrolling.bind(this);
    }

    startScrolling(direction) {
        // if (!this.state.isScrolling) {
        switch (direction) {
          case 'toLeft':
            this.setState({ isScrolling: true }, this.scrollLeft());
            break;
          case 'toRight':
            this.setState({ isScrolling: true }, this.scrollRight());
            break;
          case 'toDown':
            this.setState({ isScrolling: true }, this.scrollDown());
            break;
          case 'toUp':
            this.setState({ isScrolling: true }, this.scrollUp());
            break;
          default:
            break;
        }
        // }
      }

      scrollRight() {
        function scroll() {
          window.scrollBy(10, 0)
        }
        this.scrollInterval = setInterval(scroll, 10);
      }

      scrollLeft() {
        function scroll() {
            window.scrollBy(-10, 0)
        }
        this.scrollInterval = setInterval(scroll, 10);
      }

      scrollDown() {
        function scroll() {
            window.scrollBy(0, 10)
        }
        this.scrollInterval = setInterval(scroll, 10);
      }

      scrollUp() {
        function scroll() {
          window.scrollBy(0, -10)
        }
        this.scrollInterval = setInterval(scroll, 10);
      }

      stopScrolling() {
        console.log('scrollStopped');
        this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
      }

    moveCard(lastX, lastY, nextX, nextY) {

        const newGroups = [...this.state.groups];
        if (lastX === nextX) {
            newGroups[lastX].cards.splice(nextY, 0, newGroups[lastX].cards.splice(lastY, 1)[0]);
        } else {
          // move element to new place
          newGroups[nextX].cards.splice(nextY, 0, newGroups[lastX].cards[lastY]);
          // delete element from old place
          newGroups[lastX].cards.splice(lastY, 1);
        }
        this.setState(() => {
            return { groups: newGroups,};
        });
    }

    render() {
        const { groups } = this.state;
        return (
            <div style={{ height: '100%' }}>
                { groups.map((item, i) => {

                    return <Group
                        key={item.id}
                        id={item.id}
                        groupContent={item}
                        moveCard={this.moveCard}
                        x={i}
                        startScrolling={this.startScrolling}
                        stopScrolling={this.stopScrolling}
                        isScrolling={this.state.isScrolling}
                    />;
                }
                )}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(GroupContainer);