import React, {Component} from 'react';
import Modal from './Modal';

class NotFoundPage extends Component {
    render() {
        return (
            <Modal id="NotFoundPage--Modal">
                <h1> Ooops, page not found....</h1>
            </Modal>
        );
    }
}

export default NotFoundPage;
