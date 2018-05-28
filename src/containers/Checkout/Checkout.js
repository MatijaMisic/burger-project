import React, { Component } from 'react';
import CheckoutSummry from '../../components/CheckoutSummary/CheckoutSummry'
import { connect } from "react-redux";


import { Route, Redirect  } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

   
    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued =() => {
        this.props.history.replace('/checkout/contact-data')
    }
    
    render() {
        let summary = <Redirect to='/'/>
        if(this.props.ings) {
            const purchasedRedirect =this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
            <div>
                {purchasedRedirect}
            <CheckoutSummry onCheckoutCancelled={this.onCheckoutCancelled} checkoutContinued={this.checkoutContinued} ingredients={this.props.ings}/>
            <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);