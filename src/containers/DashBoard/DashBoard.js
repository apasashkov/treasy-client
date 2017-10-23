import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import flow from 'lodash/flow';
import HTML5Backend from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AddGroupCard from '../../components/AddGroupCard/';
import CardGroup from '../CardGroup';
import CardModal from '../../components/CardModal';
import Login from '../../components/Login';
import Registration from '../../components/Registration';
import {
    startGetGroups,
    startAddCard,
    startEditGroup,
    startRemoveGroup,
    startMoveCard,
} from '../../actions/group';

import './DashBoard.scss';

class DashBoard extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        groups: PropTypes.array,
        match: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = { isScrolling: false };

        this.moveCard = this.moveCard.bind(this);
        this.scrollRight = this.scrollRight.bind(this);
        this.scrollLeft = this.scrollLeft.bind(this);
        this.scrollUp = this.scrollUp.bind(this);
        this.scrollDown = this.scrollDown.bind(this);
        this.stopScrolling = this.stopScrolling.bind(this);
        this.startScrolling = this.startScrolling.bind(this);

        // these functions are needed here because in CardGroup we cant use both
        // react-dnd and redux because redux wraps the component and we cant
        // react the original's one state
        this.submitCard = this.submitCard.bind(this);
        this.changeGroupTitle = this.changeGroupTitle.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.moveCard = this.moveCard.bind(this);

    }

    componentWillMount() {
        if (!this.props.groups.length) {
            this.props.dispatch(startGetGroups());
        }
    }

    moveCard(lastX, lastY, nextX, nextY) {
        this.props.dispatch(startMoveCard(lastX, lastY, nextX, nextY));
    }

    startScrolling(direction) {
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
    }

    scrollRight() {
        function scroll() {
            document.getElementsByClassName('dashboard')[0].scrollLeft += 10;
        }
        this.scrollInterval = setInterval(scroll, 10);
    }

    scrollLeft() {
        function scroll() {
            document.getElementsByClassName('dashboard')[0].scrollLeft -= 10;
        }
        this.scrollInterval = setInterval(scroll, 10);
    }

    scrollDown() {
        function scroll() {
            document.getElementsByClassName('dashboard')[0].scrollTop += 10;
        }
        this.scrollInterval = setInterval(scroll, 10);
    }

    scrollUp() {
        function scroll() {
            document.getElementsByClassName('dashboard')[0].scrollTop -= 10;
        }
        this.scrollInterval = setInterval(scroll, 10);
    }

    stopScrolling() {
          this.setState({ isScrolling: false }, clearInterval(this.scrollInterval));
    }

    // these functions are needed here because in CardGroup we cant use both
    // react-dnd and redux because redux wraps the component and we cant
    // react the original's one state

    submitCard(groupId, cardTitle) {
        this.props.dispatch(startAddCard(groupId, cardTitle));
    }

    changeGroupTitle(groupId, newGroupTitle) {
        this.props.dispatch(startEditGroup(groupId, newGroupTitle));
    }

    removeGroup(groupId) {
        this.props.dispatch(startRemoveGroup(groupId));
    }

    render() {
        const cardGroups = this.props.groups.map((cardGroup, i) => (
            <CardGroup
                key={cardGroup.groupId}
                groupContent={cardGroup}

                startScrolling={this.startScrolling}
                stopScrolling={this.stopScrolling}
                isScrolling={this.state.isScrolling}
                x={i}

                changeGroupTitle={this.changeGroupTitle}
                moveCard={this.moveCard}
                submitCard={this.submitCard}
                removeGroup={this.removeGroup}
            />
        ));

        return (
            <div className="dashboard">
                {cardGroups}
                <AddGroupCard />

                {this.props.match.url === '/login' && <Login />}
                {this.props.match.url === '/registration' && <Registration />}
                {this.props.match.params.id && <CardModal cardId={this.props.match.params.id}/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        groups: state.groups,
    };
};

export default flow(connect(mapStateToProps), DragDropContext(HTML5Backend))(DashBoard);

