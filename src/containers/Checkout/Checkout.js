import React, { Component } from 'react';
import CheckoutSummry from '../../components/CheckoutSummary/CheckoutSummry'

import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);        
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if(param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients:ingredients, totalPrice: price})
        
    }
    
    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued =() => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        return (
            <div>
                <CheckoutSummry onCheckoutCancelled={this.onCheckoutCancelled} checkoutContinued={this.checkoutContinued}ingredients={this.state.ingredients}/>                
                <Route path={this.props.match.path + '/contact-data'} render={(props) => {
                    return (<ContactData {...props} ingredients={this.state.ingredients} price={this.state.totalPrice}/>)
                }}/>
            </div>
        );
    }
}

export default Checkout;