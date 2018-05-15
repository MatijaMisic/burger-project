import React from 'react';
import Logo from '../../Logo/Logo'
import './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationItems';

const Toolbar = (props) => {
    return (
        <header className="Toolbar">
            <div>MENU</div>
            <div className='LogoDesktop'>
            <Logo />
            </div>
            <nav className='DesktopOnly'>
                <NavigationItems />
            </nav>
        </header>

    );
};

export default Toolbar;