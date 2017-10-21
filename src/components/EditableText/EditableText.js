import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './EditableText.scss';

const buttonCommon = {
    backgroundColor: 'white',
    border: 'none',
    textDecoration: 'underline',
    display: 'inline-block',
    color: 'blue',
    outline: 'none',
};

const centerDiv = {
    margin: 'auto',
    width: '10%',
};

class EditableText extends Component {

    static defaultProps = {
        fieldName: '',
        status: '',
        onSave: null,
        style: {},
        text: '',
        type: 'input',
    }
    static propTypes = {
        status: PropTypes.string,
        fieldName: PropTypes.string,
        onSave: PropTypes.func,
        style: PropTypes.object,
        text: PropTypes.string,
        type: PropTypes.oneOf(['textarea', 'input']),
    }

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            saving: false,
            text: this.props.text,
        };

        this.edit = this.edit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.status === 'success') {
    //         this.setState({
    //             saving: false,
    //             editing: false });

    //     } else if (nextProps.status === 'error') {
    //         this.setState({
    //             saving: false,
    //             editing: false });
    //     }
    // }

    componentDidUpdate() {
        if(this.state.editing) {
            this.input.focus();
        }
    }
    cancelEdit() {
        this.setState({ editing: false });
    }

    edit() {
        this.setState({ editing: true });
    }

    saveEdit() {
        this.setState({
            saving: true,
        });
        if (this.props.type === 'input' && this.input.value.length > 50) {
            this.setState({
                saving: false,
                editing: false });

        } else if (this.props.type === 'textarea' && this.input.value.length > 200) {
            this.setState({
                saving: false,
                editing: false });

        } else {
            this.props.onSubmit(this.input.value);
            this.setState(() => ({ editing: false, saving:false, text: this.input.value || 'Input' }));
            // this.props.onSave(this.input.value, this.props.fieldName);
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.onSubmit(this.input.value);
            this.setState(() => ({ editing: false, saving:false, text: this.input.value || 'Input' }));
        }
    }

    renderInput() {
        return (<input
            type="textarea"
            defaultValue={this.state.text}
            disabled={this.state.saving}
            ref={(input) => { this.input = input; }}
            onBlur={this.saveEdit}
            onKeyPress={this.handleKeyPress}
            spellCheck="false"
        />);
    }

    renderTextarea() {
        return (
            <div>
                <textarea
                    defaultValue={this.props.text}
                    disabled={this.state.saving}
                    ref={(input) => { this.input = input; }}
                    spellCheck="false"
                />);
                <button
                    style={buttonCommon}
                    onClick={this.saveEdit}
                    disabled={this.state.saving}
                >
                Save
                </button>
                <button
                    style={buttonCommon}
                    onClick={this.cancelEdit}
                    disabled={this.state.saving}
                >
                Cancel
                </button>

            </div>
    )}

    renderEditableElement() {
        switch (this.props.type) {
        case 'input':
            return this.renderInput();
        case 'textarea':
        default:
            return this.renderTextarea();
        }
    }

    render() {
        if (this.state.editing) {
            return (
                <div>
                    {this.renderEditableElement()}
                </div>
            );
        }

        return (
                <div
                    style={this.props.style}
                    onClick={this.edit}
                    className="editableText"
                >
                    {this.state.text}
                </div>
        );
    }
}

export default EditableText;