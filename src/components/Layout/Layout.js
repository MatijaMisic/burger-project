import React, { Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Checkout from '../../containers/Checkout/Checkout'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import './Layout.css'
import Orders from '../../containers/Orders/Orders';
import Auth from '../../containers/Auth/Auth';
import Logout from '../../containers/Auth/Logout/Logout';

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
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler} />
                <main className='Content'>
                    <Switch>
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/orders' component={Orders} />
                        <Route path='/auth' component={Auth} />
                        <Route path='/logout' component={Logout} />
                        <Route exact path='/' component={BurgerBuilder} />
                    </Switch>
                </main>
            </Fragment>
        );
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default withRouter(connect(mapStateToProps)(Layout));