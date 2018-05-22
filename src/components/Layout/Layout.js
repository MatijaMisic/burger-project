import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Checkout from '../../containers/Checkout/Checkout'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css'
import Orders from '../../containers/Orders/Orders';

class Layout extends React.Component {
    constructor() {
        super()
        this.state = {
            showSideDrawer: true
        }
    }

    SideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return { showSideDrawer: !prevState.showSideDrawer } })
    }

    render() {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler} />
                <main className='Content'>
                    <Switch>
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/orders' component={Orders} />
                        <Route exact path='/' component={BurgerBuilder} />
                    </Switch>
                </main>
            </Fragment>
        );
    }
};

export default Layout;