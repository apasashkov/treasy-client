import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startGetGroups } from '../../actions/group';
import AddGroupCard from '../../components/AddGroupCard/';
import CardGroup from '../CardGroup';
import CardModal from '../../components/CardModal';
import Login from '../../components/Login';
import Registration from '../../components/Registration';

import './DashBoard.scss';

class DashBoard extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(startGetGroups());
    }

    render() {
        const cardGroups = this.props.groups.map((cardGroup) => (
            <CardGroup
                title={cardGroup.title}
                groupId={cardGroup.groupId}
                cards={cardGroup.cards}
                key={cardGroup.groupId}
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
}

export default connect(mapStateToProps)(DashBoard);

