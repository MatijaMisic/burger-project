import React, { Fragment }from 'react';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css'

const Layout = (props) => {
    return (
        <Fragment>
            <Toolbar />
            <SideDrawer />
            <main className='Content'>
            <BurgerBuilder/>
            </main>
        </Fragment>
    );
};

export default Layout;