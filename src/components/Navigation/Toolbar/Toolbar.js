import React from 'react';
import Logo from '../../Logo/Logo'
import './Toolbar.css'
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => {
    return (
        <header className="Toolbar">
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className='LogoDesktop'>
            <Logo />
            </div>
            <nav className='DesktopOnly'>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </header>

    );
};

export default Toolbar;