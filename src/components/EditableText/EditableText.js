import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './EditableText.scss';

class EditableText extends Component {

    static propTypes = {
        className:  PropTypes.string,
        onSave: PropTypes.func,
        onSubmit: PropTypes.func,
        style: PropTypes.object,
        text: PropTypes.string,
        type: PropTypes.oneOf(['textarea', 'input']),
    }

    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            saving: false,
            text: this.props.text.trim(),
        };

        this.edit = this.edit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.saveEdit = this.saveEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    componentDidUpdate() {
        if(this.state.editing) {
            this.input.focus();
            this.input.select();
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
            this.props.onSubmit(this.input.value.trim());
            this.setState(() => ({ editing: false, saving:false, text: this.input.value.trim() || '' }));
        }
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.onSubmit(this.input.value);
            this.setState(() => ({ editing: false, saving:false, text: this.input.value.trim() || '' }));
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
                    onBlur={this.saveEdit}
                />
                <button

                    onClick={this.saveEdit}
                    disabled={this.state.saving}
                    className="waves-effect waves-light btn green"
                >
                    Save
                </button>
                <button
                    style={{'marginLeft': '10px'}}
                    onClick={this.cancelEdit}
                    disabled={this.state.saving}
                    className="waves-effect waves-light btn red"
                >
                    Cancel
                </button>
            </div>
        );
    }

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
                <div className={this.props.className}>
                    {this.renderEditableElement()}
                </div>
            );
        }

        const className = classNames(this.props.className, 'editableText');

        return (
                <div
                    style={this.props.style}
                    onClick={this.edit}
                    className={className}
                >
                    {this.state.text}
                </div>
        );
    }
}

EditableText.defaultProps = {
    onSave: null,
    style: {},
    text: '',
    type: '',
    className: '',
};

export default EditableText;