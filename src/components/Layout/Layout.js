import React, { Fragment }from 'react';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

const Layout = (props) => {
    return (
        <Fragment>
            <div> Tolbar, SideDrawe, Backdrop</div>
            <BurgerBuilder/>
        </Fragment>
    );
};

export default Layout;