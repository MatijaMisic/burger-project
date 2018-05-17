import React, { Fragment } from 'react';
import './SideDrawer.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {

    let sideDrawerClass = 'SideDrawer Close'
    if(props.open) {
        sideDrawerClass = 'SideDrawer Open'
    }

    return (
        <Fragment>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={sideDrawerClass}>
            <div className='LogoMobile'>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Fragment>
    );
};

export default SideDrawer;