import React, { Fragment } from 'react';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css'

class Layout extends React.Component {
    constructor () {
        super()
        this.state = {
            showSideDrawer:true
        }
    }

    SideDrawerClosedHandler = () => {
        this.setState({showSideDrawer:false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => { return {showSideDrawer: !prevState.showSideDrawer}})
    }

    render() {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
                <main className='Content'>
                    <BurgerBuilder />
                </main>
            </Fragment>
        );
    }
};

export default Layout;