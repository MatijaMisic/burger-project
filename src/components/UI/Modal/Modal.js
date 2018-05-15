import React, { Fragment } from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) => {

    const toggleModal =`Modal ${props.show ? "showModal" : "hideModal"}`;

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={toggleModal}>
            {props.children}
        </div>
        </Fragment>
    );
};

export default Modal;