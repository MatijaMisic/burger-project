import React, { Fragment, Component } from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';



class Modal extends Component {

    shouldComponentUpdate(nextProps, nexState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate(){
        console.log("[Modal] WillUpdate");
        
    }

    render() {
        const toggleModal = `Modal ${this.props.show ? "showModal" : "hideModal"}`;
        return (
            <Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={toggleModal}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;
