import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { addGroup } from '../../actions/group';
import { startAddGroup } from '../../actions/group';


import './AddGroupCard.scss';

class AddGroupCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAddingGroup: false,
        };

        this.addGroup = this.addGroup.bind(this);
        this.submitGroup = this.submitGroup.bind(this);
    }

    addGroup() {
        this.setState(() => ({isAddingGroup: true}));
    }

    submitGroup() {
        this.setState(() => ({isAddingGroup: false}));
        // this.props.dispatch(addGroup({ title:this.textarea.value }));
        this.props.dispatch(startAddGroup({ title:this.textarea.value }));
    }

    componentDidUpdate() {
        if(this.state.isAddingGroup) {
            this.textarea.focus();
        }
    }

    renderInput() {
        return (
            <div className="addGroupCard-opened">
                <textarea
                    ref={(ref) => { this.textarea = ref; }}
                    // onBlur={() => (this.setState(() => ({ isAdding: false })))}
                />
                <button
                    className="btn green"
                    onClick={this.submitGroup}
                >
                    Add
                </button>
                <div className="closeButton">
                    <i
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState(() => ({ isAddingGroup: false }));
                        }
                    }
                    className="material-icons small"
                    >close
                    </i>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="addGroupCard">
            {this.state.isAddingGroup && this.renderInput()}
            {!this.state.isAddingGroup &&
                <div onClick={this.addGroup}>
                    Add Group...
                </div>
            }
            </div>
        );
    }
}

export default connect()(AddGroupCard)
