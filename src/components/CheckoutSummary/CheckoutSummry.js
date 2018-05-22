import React from 'react';
import './CheckoutSummary.css';


import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const CheckoutSummry = (props) => {
    return (
        <div className='checkoutSummary'>
            <h1>We hope it tastes good!</h1>
            <div className='summaryDiv'>
                <Burger  ingredients={props.ingredients}/>
            </div>
            <Button btnType='Danger' clicked={props.onCheckoutCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default CheckoutSummry;