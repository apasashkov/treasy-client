import React, { Component } from 'react';
// import Group from './Group/';
import GroupContainer from './GroupContainer';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Playground extends Component {
    render() {
        return (
            <GroupContainer />
        );
    }
}

export default DragDropContext(HTML5Backend)(Playground);