import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
    componentDidMount() {
        $('#modal1').modal({
            complete: () => console.log(111)
        });
        $('#modal1').modal('open');

    }

    render() {
        return (
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div className="modal-footer">
                        <Link to="/" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</Link>
                    </div>
                </div>
        );
    }
}

export default Card;